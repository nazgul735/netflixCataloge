import { Movie }  from "./models/Movies.js";
import { Review } from "./models/Reviews.js";
import { User }   from "./models/Users.js";
import { validateRegisterInput, validateLoginInput} from './../util/validators.js';
import { SECRET_KEY } from './config.js';
import validateAuth from "../util/validateAuth.js";
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server')

function generateToken(user){
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

export const resolvers = {
  Mutation: {
    //Mutation for creating a new review
    createReview: async (_, { rating, review, movieID}, context) => {
      validateAuth(context.req)
      // If rating or movieID is not given, throw error
      if(!(rating|| movieID)){
        throw new Error('ID of the movie that you try to create review for has to be given and rating can not be null.')
      }
      // Else, create review and save to database
      const reviewDocument = new Review({ rating,review,movieID });
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
          throw new UserInputError('Errors', { errors });
        }
        // TODO: Make sure user doesnt already exist
        const user = await User.findOne({ username });
        if (user) {
          throw new UserInputError('Username is taken', {
            errors: {
              username: 'This username is taken'
            }
          });
        }
        // hash password and create an auth token
        password = await bcrypt.hash(password, 12);

        const newUser = new User({
          email,
          username,
          password,
          createdAt: new Date().toISOString()
        });

        const res = await newUser.save();

        const token = generateToken(res);

        return {
          ...res._doc,
          id: res._id,
          token
        };
      }
      catch (err) { throw new Error(err) }
    }
  },
  Query: {
    hello: () => "Hello world",
    //kode her

    login: async (_, { username, password }) => {
      try {
        const { errors, valid } = validateLoginInput(username, password);

        if (!valid) {
          throw new UserInputError('Errors', { errors });
        }

        const user = await User.findOne({ username });

        if (!user) {
          errors.general = 'User not found';
          throw new UserInputError('User not found', { errors });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          errors.general = 'Wrong credentials';
          throw new UserInputError('Wrong credentials', { errors });
        }

        const token = generateToken(user);

        return {
          ...user._doc,
          id: user._id,
          token
        }
      } catch(err) {throw new Error(err);}
    },
    //Query for returning reviews for a given movie
    getReviewsByMovie: async function(_,{movieID}){
      try{
      const reviews = Review.find({movieID: movieID});
      //Throw error if reviews not found
      if(!reviews.length>0){
        //Throw custom error if reviews not found
        throw new Error("Reviews for given movie not found");
      }
      return reviews
    }
      // Throw default error from graphql if caught
      catch(error){throw new Error(error)}
    },
    //offset blir limit*side-1
    //Query for getting limited set of all movies based on offset and limit
    getMovies: async function (_, { limit, offset}){
      try {
        const movies= await Movie.find({})
        .limit(limit)
        .skip(offset)
        const allMovies = await Movie.find({})
        const pages = Math.floor(allMovies.length/limit)+1
        return {movies, pages};
      } catch (err) {
        throw new Error(err);
      }
    },
  //Query for retrieving movies only filtered by year
    getFilteredMoviesByYear: async function(_, {fromYear, toYear, limit, offset}) {
      try {
        toYear+=1
        const allFilteredMovies = await Movie.find({
          year: {
            $gte: fromYear.toString(),
            $lt: toYear.toString()
          }
        })
        const filteredMovies= await Movie.find({
          year: {
            $gte: fromYear.toString(),
            $lt: toYear.toString()
          }
        })
        .limit(limit)
        .skip(offset)
        const pages = Math.floor(allFilteredMovies.length/limit)+1
        return {movies:filteredMovies, pages}}
        catch(err){throw new Error(err)}
    },
    //Query for retrieving movies only filtered by genre
    getFilteredMoviesByGenre: async function(_, {genre, limit, offset}) {
      try{
        const allFilteredMovies = await Movie.find({
        genres: genre
      })
      const filteredMovies= await Movie.find({
        genres: genre
      })
      .limit(limit)
      .skip(offset)
      const pages = Math.floor(allFilteredMovies.length/limit)+1
      return {movies:filteredMovies, pages}}
      catch(err){throw new Error(err)}
    },
    //Query for retrieving movies filtered by both year and genre
    getFilteredMoviesByYearAndGenre: async function(_, {fromYear, toYear, genre, limit, offset}) {
      toYear+=1
      // Try find the filtered movies
      try{
        const allFilteredMovies = await Movie.find({
          year: {
            $gte: fromYear.toString(),
            $lt: toYear.toString()
          },
          genres: genre
        })
        const filteredMovies= await Movie.find({
          year: {
            $gte: fromYear.toString(),
            $lt: toYear.toString()
          },
          genres: genre
        })
        .limit(limit)
        .skip(offset)
        const pages = Math.floor(allFilteredMovies.length/limit)+1
        return {movies:filteredMovies, pages}
      }
      //Return graphql error if unable to query
      catch(err){
        throw new Error(err)
      }
    }
  }
}


