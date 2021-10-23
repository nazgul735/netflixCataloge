import { Movie } from "./models/Movies";
import { Review } from "./models/Reviews";
import { User } from "./models/Users";
import {
  validateRegisterInput,
  validateLoginInput,
} from "./../util/validators";
import { SECRET_KEY } from "./config";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserInputError } from "apollo-server";

function generateToken(user) {
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
// Util function for creating query object used for filtering movies
function createQuery(title, genre, fromYear, toYear) {
  let query = {};
  if (title) {
    query.title= {$regex:title, $options:"i"};
    console.log(query)
  }
  if (genre) {
    query["genres"] = genre;
  }
  if (fromYear && toYear) {
    query["year"] = {
      $lte: toYear.toString(),
      $gte: fromYear.toString()
    };
  }
  return query;
}

export const resolvers = {
  Mutation: {
    //Mutation for creating a new review
    createReview: async (_, { rating, review, movieID }) => {
      // If rating or movieID is not given, throw error
      if (!(rating || movieID)) {
        throw new Error(
          "ID of the movie that you try to create review for has to be given and rating can not be null."
        );
      }
      // Else, create review and save to database
      const reviewDocument = new Review({ rating, review, movieID });
      await reviewDocument.save();
      return reviewDocument;
    },
    register: async (_, { username, email, password, confirmPassword }) => {
      // Validate user data
      try {
        const { valid, errors } = validateRegisterInput(
          username,
          email,
          password,
          confirmPassword
        );
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
          email,
          username,
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
        throw new Error(err);
      }
    },
  },
  Query: {
    hello: () => "Hello world",

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

    login: async (_, { username, password }) => {
      try {
        const { errors, valid } = validateLoginInput(username, password);

        if (!valid) {
          throw new UserInputError("Errors", { errors });
        }

        const user = await User.findOne({ username });

        if (!user) {
          errors.general = "User not found";
          throw new UserInputError("User not found", { errors });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          errors.general = "Wrong credentials";
          throw new UserInputError("Wrong credentials", { errors });
        }

        const token = generateToken(user);

        return {
          ...user._doc,
          id: user._id,
          token,
        };
      } catch (err) {
        throw new Error(err);
      }
    },
    //Query for returning reviews for a given movie
    getReviewsByMovie: async function (_, { movieID }) {
      try {
        const reviews = await Review.find({ movieID: movieID });
        //Throw error if reviews not found
        
        if (!reviews.length > 0) {
          //Throw custom error if reviews not found
          throw new Error("Reviews for given movie not found");
        }
        return reviews;
      } catch (error) {
        // Throw default error from graphql if caught
        throw new Error(error);
      }
    },
    // Query for retrieving movies, either whole list or filtered based on what inputs are given
    getMovies: async function(_, {title, genre, fromYear, toYear, limit, offset}) {
      try {
        let query = createQuery(title, genre, fromYear, toYear);
        const allMovies = await Movie.find(query);
        // Disable offset if search on title is given
        if(title){
          offset=0;
        }
        const movies = await Movie.find(query).limit(limit).skip(offset);
        const pages = Math.floor(allMovies.length/limit)+1;
        return {movies:movies, pages};
      }
      catch(err){throw new Error(err)}
    }
  }
}


