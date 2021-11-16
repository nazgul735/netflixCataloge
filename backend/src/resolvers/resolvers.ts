import { Movie, movieInterface } from "../schemas/Movies";
import { Review, reviewInterface } from "../schemas/Reviews";
import { User, userInterface } from "../schemas/Users";
import { SECRET_KEY } from "../config.js";

import {
    validateRegisterInput,
    validateLoginInput,
  } from "../util/validators";
import {AllObjects, validateAuth} from "../util/validateAuth";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ApolloError, UserInputError } from "apollo-server";
import { createMovieQuery } from "../util/createMovieQuery";

function generateToken(_user:userInterface) {
    return jwt.sign(
        {
          id: _user.id,
          email: _user.email,
          username: _user.username
        },
        SECRET_KEY,
        { expiresIn: '1h' }
      );
    }
//Brukes ikke direkte i kode men blir graphQL blir typa deretter i typedefs
export const resolvers = {
    Mutation: {
        //Mutation for creating a new review
        async createReview (_:unknown, {rating, review, movieID}: reviewInterface, context:AllObjects) {
        // Validate user
        const user = validateAuth(context);
        // If rating or movieID is not given, throw error
        if (!(rating || movieID)) {
            throw new Error(
            "ID of the movie that you try to create review for has to be given and rating can not be null."
            );
        }
        let userID:string="";
        // Else, create review and save to database
        const reviewDocument = new Review({ rating, review, movieID, username:User, createdAt: new Date().toISOString(), userID});
        await reviewDocument.save();
        return reviewDocument;
        },
        
    register: async (_:unknown, { username, email, password, confirmPassword }:userInterface) => {
        // Validate user data
        try {
            const { valid, errors } = validateRegisterInput(
            {username:username,
            email:email,
            password:password,
            confirmPassword:confirmPassword}
            );
            if (!(username||email||password||confirmPassword)) {
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
        } catch (error) {
            throw new Error("error");
    }
},
},
    Query: {
        hello: () => "Hello world",

        getMovieByID: async function (_:unknown, { movieID }:reviewInterface) {
        try {
            const movie = await Movie.findById({ _id: movieID });

            if (!movie) {
            throw new Error("Movie does not exist");
            }

            return movie;
        } catch (error) {
            // Throw default error from graphql if caught
            throw new ApolloError("error");
        }
        },
        login: async (_:unknown, { username, password }:userInterface) => {
            try {
              const { errors, valid } = validateLoginInput(username, password);
              if (!(username && password)) {
                throw new ApolloError("You must provide a username and password.")
              }
      
              if (!valid) {
                throw new UserInputError("Errors", { errors });
              }
      
              const user = await User.findOne({ username });
      
              if (!user) {
                errors.username = "User not found"; //added user insted of general
                throw new UserInputError("User not found", { errors });
              }
      
              const match = await bcrypt.compare(password, user.password);
              if (!match) {
                errors.password = "Wrong credentials"; //added password instead of general
                throw new UserInputError("Wrong credentials", { errors });
              }
      
              const token = generateToken(user);
              return {
                ...user._doc,
                id: user._id,
                token,
              };
            } catch (error) {
              throw new ApolloError("Couldn't generate token #154");
            }
          },
            getReviewsByMovie: async function (_:unknown, { movieID }:reviewInterface) {
            try {
                // Sort by newest posts
                const reviews = await Review.find({ movieID }).sort({ createdAt: -1 });
                //Throw error if reviews not found
                
                if (!(reviews.length > 0)) {
                //Throw custom error if reviews not found
                throw new Error("Reviews for given movie not found");
                }
                return reviews;
            } catch (error) {
                // Throw default error from graphql if caught
                throw new ApolloError("No review #170");
            }
        },
        getMovies: async function(_:unknown, {title, genre, fromYear, toYear, limit, offset}:movieInterface) {
            try {
                let query = createMovieQuery({title:title, genre:genre, fromYear:fromYear, toYear:toYear});
                const allMovies = await Movie.find(query);
                const movies = await Movie.find(query).limit(limit).skip(offset);
                const pages = Math.floor(allMovies.length/limit)+1;
                return {movies:movies, pages};
            }
            catch(err){throw new ApolloError("err")}
          }
        }
      }
      
