import { Movie } from "./schemas/Movies";
import { Review } from "./schemas/Reviews";
import { User } from "./schemas/Users";
import { createMovieQuery } from "./util/createMovieQuery";
import {
  validateRegisterInput,
  validateLoginInput,
} from "./util/validators";
import { SECRET_KEY } from "./config";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserInputError } from "apollo-server";
import { validateAuth } from "./util/validateAuth";
import { Resolver, Query, Mutation, Arg, Ctx } from "type-graphql";
//import { prop, getModelForClass } from "@typegoose/typegoose";
import { MovieQueryByID, MovieQueryBySearch, MovieClass, MovieResponse } from "./schemas/Movies"
import { ReviewData, ReviewQueryByMovieID } from "./schemas/Reviews"
import { UserRegistration, UserLogin } from "./schemas/Users"

type User = {
  id: string,
  email: string,
  username: string
}

type Movie = {
 rating: number,
 review: string,
 MovieId: string,
}


function generateToken(user: User) {
  return jwt.sign(
      {
        id: user.id,
        email: user.email,
        username: user.username
      },
      SECRET_KEY,
      { expiresIn: '1h' }
    );
  }

   getMovieByID: async function (_, { movieID }) {
     try {
       const movie = await Movie.findById({ _id: movieID });

       if (!movie) {
         throw new Error("Movie does not exist");
       }

       return movie;
     } catch (error) {
       // Throw default error from graphql if caught
       throw new Error(error);
     }
   },

@Resolver(() => Movie)
export class MovieResolver {

  @Query(() => Movie)
  async getMovieByID(@Arg("movieQueryByID") movieID : MovieQueryByID ): Promise<MovieClass> {
    try {
      const movie = await Movie.findById(movieID);
      //const movie = await Movie.findById({ _id: movieID });
      if (!movie) {
        throw new Error("Movie does not exist");
      }
      return movie;
    } catch (error) {
      // Throw default error from graphql if caught
      throw new Error();
    }
  }

  //@Query(returns => MovieResponse)
  @Query(() => MovieResponse)
  async getMovies(@Arg("movieQueryBySearch") { title, genre, fromYear, toYear, limit, offset }: MovieQueryBySearch): Promise<MovieResponse> {
      try {
        let query                      = createMovieQuery(title, genre, fromYear, toYear);
        const allMovies: MovieClass[]  = await Movie.find(query);
        const movies:    MovieClass[]  = await Movie.find(query).limit(limit).skip(offset);
        const pages:     number        = Math.floor(allMovies.length/limit)+1;
        const resp:      MovieResponse = new MovieResponse();
        resp.movies                    = movies;
        resp.pages                     = pages;
        return resp;
      }
      catch(err){throw new Error()}
  }

}

@Resolver(() => Review)
export class ReviewResolver {
  @Mutation(() => Review)
  async createReview(@Ctx() context: any,
                     @Arg("creates a review") { rating, review, movieID }: ReviewData) {

    const user = validateAuth(context);
    console.log(user);
    // If rating or movieID is not given, throw error
    if (!(rating || movieID)) {
      throw new Error(
        "ID of the movie that you try to create review for has to be given and rating can not be null."
      );
    }
    // Else, create review and save to database
    let mockusername: string = "abd";
    let mockid: string = "1293091ik";
    //const reviewDocument = new Review({ rating, review, movieID, username: user.username, createdAt: new Date().toISOString(), userID: user.id });
    const reviewDocument = new Review({ rating, review, movieID, mockusername, createdAt: new Date().toISOString(), userID: mockid });
    await reviewDocument.save();
    return reviewDocument;
  }

  @Query(() => Review)
  async getReviewsByMovie(@Arg("Find all reviews for a particular movie") { movieID }: ReviewQueryByMovieID) {
    try {

      // Sort by newest posts
      // This is probably 50 IQ, but is a translation.
      const reviews = await Review.find({ movieID: movieID }).sort({ createdAt: -1 });
      //Throw error if reviews not found

      if (reviews.length < 1) {
        //Throw custom error if reviews not found
        throw new Error("Reviews for given movie not found");
      }
      return reviews;
    } catch (error) {
      // Throw default error from graphql if caught
      throw new Error();
    }
  }

}

@Resolver(() => User)
export class UserResolver {
  @Mutation(() => User)
  async register(@Arg ("Register a user") { username, email, password, confirmPassword }: UserRegistration): Promise<User> {
      // Validate user data
      try {
        const { valid, errors } = validateRegisterInput(
          username,
          email,
          password,
          confirmPassword
        );
        if (!(username || email || password || confirmPassword)) {
          throw new Error("You must provide username, email and password.");
        }
        if (!valid) {
          throw new UserInputError("Errors", { errors });
        }
        const user = await User.findOne({ username });
        if (user) {
          throw new UserInputError("Username is taken", {
            errors: {
              username: "This username is taken",
            },
          });
        }
        // hash password and create an auth token
        password = await bcrypt.hash(password, 12);

        const newUser = new User({
          username,
          email,
          password,
          createdAt: new Date().toISOString(),
        });

        const res = await newUser.save();

        const token = generateToken(res);

        return {
          ...res._doc,
          id: res._id,
          token,
        };
      } catch (err) {
        throw new Error();
      }
    }
  @Query()
  async login(@Arg ("Make an attempt at logging in") { username, password }: UserLogin): Promise<User> {
    try {
      const { errors, valid } = validateLoginInput(username, password);
      if (!(username && password)) {
        throw new Error("You must provide a username and password.")
      }

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const user = await User.findOne({ username });

      if (!user) {
        errors.username= "User not found";
        throw new UserInputError("User not found", { errors });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.password= "Wrong credentials";
        throw new UserInputError("Wrong credentials", { errors });
      }

      const token = generateToken(user);
      return {
        ...user._doc,
        id: user._id,
        token,
      };
    } catch (err) {
      throw new Error();
    }
  }
}

//export const resolvers = {
//  Mutation: {
//    //Mutation for creating a new review
//    createReview: async (_, { rating, review, movieID}, context) => {
//      // Validate user
//      const user = validateAuth(context);
//      // If rating or movieID is not given, throw error
//      if (!(rating || movieID)) {
//        throw new Error(
//          "ID of the movie that you try to create review for has to be given and rating can not be null."
//        );
//      }
//      // Else, create review and save to database
//      const reviewDocument = new Review({ rating, review, movieID, username: user.username, createdAt: new Date().toISOString(), userID: user.id });
//      await reviewDocument.save();
//      return reviewDocument;
//    },
//    register: async (_, { username, email, password, confirmPassword }) => {
//      // Validate user data
//      try {
//        const { valid, errors } = validateRegisterInput(
//          username,
//          email,
//          password,
//          confirmPassword
//        );
//        if (!(username||email||password||confirmPassword)) {
//          throw new Error("You must provide username, email and password.");
//        }
//        if (!valid) {
//          throw new UserInputError("Errors", { errors });
//        }
//        const user = await User.findOne({ username });
//        if (user) {
//          throw new UserInputError("Username is taken", {
//            errors: {
//              username: "This username is taken",
//            },
//          });
//        }
//        // hash password and create an auth token
//        password = await bcrypt.hash(password, 12);
//
//        const newUser = new User({
//          email,
//          username,
//          password,
//          createdAt: new Date().toISOString(),
//        });
//
//        const res = await newUser.save();
//
//        const token = generateToken(res);
//
//        return {
//          ...res._doc,
//          id: res._id,
//          token,
//        };
//      } catch (err) {
//        throw new Error(err);
//      }
//    },
//  },
//  Query: {
//    hello: () => "Hello world",
//
//    getMovieByID: async function (_, { movieID }) {
//      try {
//        const movie = await Movie.findById({ _id: movieID });
//
//        if (!movie) {
//          throw new Error("Movie does not exist");
//        }
//
//        return movie;
//      } catch (error) {
//        // Throw default error from graphql if caught
//        throw new Error(error);
//      }
//    },
//
//    login: async (_, { username, password }) => {
//      try {
//        const { errors, valid } = validateLoginInput(username, password);
//        if (!(username && password)) {
//          throw new Error("You must provide a username and password.")
//        }
//
//        if (!valid) {
//          throw new UserInputError("Errors", { errors });
//        }
//
//        const user = await User.findOne({ username });
//
//        if (!user) {
//          errors.general = "User not found";
//          throw new UserInputError("User not found", { errors });
//        }
//
//        const match = await bcrypt.compare(password, user.password);
//        if (!match) {
//          errors.general = "Wrong credentials";
//          throw new UserInputError("Wrong credentials", { errors });
//        }
//
//        const token = generateToken(user);
//        return {
//          ...user._doc,
//          id: user._id,
//          token,
//        };
//      } catch (err) {
//        throw new Error(err);
//      }
//    },
//    //Query for returning reviews for a given movie
//    getReviewsByMovie: async function (_, { movieID }) {
//      try {
//        // Sort by newest posts
//        const reviews = await Review.find({ movieID: movieID }).sort({ createdAt: -1 });
//        //Throw error if reviews not found
//
//        if (!reviews.length > 0) {
//          //Throw custom error if reviews not found
//          throw new Error("Reviews for given movie not found");
//        }
//        return reviews;
//      } catch (error) {
//        // Throw default error from graphql if caught
//        throw new Error(error);
//      }
//    },
//    // Query for retrieving movies, either whole list or filtered based on what inputs are given
//    getMovies: async function(_, {title, genre, fromYear, toYear, limit, offset}) {
//      try {
//        let query = createMovieQuery(title, genre, fromYear, toYear);
//        const allMovies = await Movie.find(query);
//        const movies = await Movie.find(query).limit(limit).skip(offset);
//        const pages = Math.floor(allMovies.length/limit)+1;
//        return {movies:movies, pages};
//      }
//      catch(err){throw new Error(err)}
//    }
//  }
//}
//
//
