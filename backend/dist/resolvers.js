"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = exports.ReviewResolver = exports.MovieResolver = void 0;
const Movies_1 = require("./schemas/Movies");
const Reviews_1 = require("./schemas/Reviews");
const Users_1 = require("./schemas/Users");
const createMovieQuery_1 = require("./util/createMovieQuery");
const validators_1 = require("./util/validators");
const config_1 = require("./config");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const apollo_server_1 = require("apollo-server");
const validateAuth_1 = require("./util/validateAuth");
const type_graphql_1 = require("type-graphql");
//import { prop, getModelForClass } from "@typegoose/typegoose";
const Movies_2 = require("./schemas/Movies");
function generateToken(user) {
    return jsonwebtoken_1.default.sign({
        id: user.id,
        email: user.email,
        username: user.username
    }, config_1.SECRET_KEY, { expiresIn: '1h' });
}
getMovieByID: function (_, { movieID }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const movie = yield Movies_1.Movie.findById({ _id: movieID });
            if (!movie) {
                throw new Error("Movie does not exist");
            }
            return movie;
        }
        catch (error) {
            // Throw default error from graphql if caught
            throw new Error(error);
        }
    });
}
let MovieResolver = class MovieResolver {
    getMovieByID(movieID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const movie = yield Movies_1.Movie.findById(movieID);
                //const movie = await Movie.findById({ _id: movieID });
                if (!movie) {
                    throw new Error("Movie does not exist");
                }
                return movie;
            }
            catch (error) {
                // Throw default error from graphql if caught
                throw new Error();
            }
        });
    }
    //@Query(returns => MovieResponse)
    getMovies({ title, genre, fromYear, toYear, limit, offset }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let query = createMovieQuery_1.createMovieQuery(title, genre, fromYear, toYear);
                const allMovies = yield Movies_1.Movie.find(query);
                const movies = yield Movies_1.Movie.find(query).limit(limit).skip(offset);
                const pages = Math.floor(allMovies.length / limit) + 1;
                const resp = new Movies_2.MovieResponse();
                resp.movies = movies;
                resp.pages = pages;
                return resp;
            }
            catch (err) {
                throw new Error();
            }
        });
    }
};
__decorate([
    type_graphql_1.Query(() => Movies_1.Movie),
    __param(0, type_graphql_1.Arg("movieQueryByID"))
], MovieResolver.prototype, "getMovieByID", null);
__decorate([
    type_graphql_1.Query(() => Movies_2.MovieResponse),
    __param(0, type_graphql_1.Arg("movieQueryBySearch"))
], MovieResolver.prototype, "getMovies", null);
MovieResolver = __decorate([
    type_graphql_1.Resolver(() => Movies_1.Movie)
], MovieResolver);
exports.MovieResolver = MovieResolver;
let ReviewResolver = class ReviewResolver {
    createReview(context, { rating, review, movieID }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = validateAuth_1.validateAuth(context);
            console.log(user);
            // If rating or movieID is not given, throw error
            if (!(rating || movieID)) {
                throw new Error("ID of the movie that you try to create review for has to be given and rating can not be null.");
            }
            // Else, create review and save to database
            let mockusername = "abd";
            let mockid = "1293091ik";
            //const reviewDocument = new Review({ rating, review, movieID, username: user.username, createdAt: new Date().toISOString(), userID: user.id });
            const reviewDocument = new Reviews_1.Review({ rating, review, movieID, mockusername, createdAt: new Date().toISOString(), userID: mockid });
            yield reviewDocument.save();
            return reviewDocument;
        });
    }
    getReviewsByMovie({ movieID }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Sort by newest posts
                // This is probably 50 IQ, but is a translation.
                const reviews = yield Reviews_1.Review.find({ movieID: movieID }).sort({ createdAt: -1 });
                //Throw error if reviews not found
                if (reviews.length < 1) {
                    //Throw custom error if reviews not found
                    throw new Error("Reviews for given movie not found");
                }
                return reviews;
            }
            catch (error) {
                // Throw default error from graphql if caught
                throw new Error();
            }
        });
    }
};
__decorate([
    type_graphql_1.Mutation(() => Reviews_1.Review),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Arg("creates a review"))
], ReviewResolver.prototype, "createReview", null);
__decorate([
    type_graphql_1.Query(() => Reviews_1.Review),
    __param(0, type_graphql_1.Arg("Find all reviews for a particular movie"))
], ReviewResolver.prototype, "getReviewsByMovie", null);
ReviewResolver = __decorate([
    type_graphql_1.Resolver(() => Reviews_1.Review)
], ReviewResolver);
exports.ReviewResolver = ReviewResolver;
let UserResolver = class UserResolver {
    register({ username, email, password, confirmPassword }) {
        return __awaiter(this, void 0, void 0, function* () {
            // Validate user data
            try {
                const { valid, errors } = validators_1.validateRegisterInput(username, email, password, confirmPassword);
                if (!(username || email || password || confirmPassword)) {
                    throw new Error("You must provide username, email and password.");
                }
                if (!valid) {
                    throw new apollo_server_1.UserInputError("Errors", { errors });
                }
                const user = yield Users_1.User.findOne({ username });
                if (user) {
                    throw new apollo_server_1.UserInputError("Username is taken", {
                        errors: {
                            username: "This username is taken",
                        },
                    });
                }
                // hash password and create an auth token
                password = yield bcryptjs_1.default.hash(password, 12);
                const newUser = new Users_1.User({
                    username,
                    email,
                    password,
                    createdAt: new Date().toISOString(),
                });
                const res = yield newUser.save();
                const token = generateToken(res);
                return Object.assign(Object.assign({}, res._doc), { id: res._id, token });
            }
            catch (err) {
                throw new Error();
            }
        });
    }
    login({ username, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { errors, valid } = validators_1.validateLoginInput(username, password);
                if (!(username && password)) {
                    throw new Error("You must provide a username and password.");
                }
                if (!valid) {
                    throw new apollo_server_1.UserInputError("Errors", { errors });
                }
                const user = yield Users_1.User.findOne({ username });
                if (!user) {
                    errors.username = "User not found";
                    throw new apollo_server_1.UserInputError("User not found", { errors });
                }
                const match = yield bcryptjs_1.default.compare(password, user.password);
                if (!match) {
                    errors.password = "Wrong credentials";
                    throw new apollo_server_1.UserInputError("Wrong credentials", { errors });
                }
                const token = generateToken(user);
                return Object.assign(Object.assign({}, user._doc), { id: user._id, token });
            }
            catch (err) {
                throw new Error();
            }
        });
    }
};
__decorate([
    type_graphql_1.Mutation(() => Users_1.User),
    __param(0, type_graphql_1.Arg("Register a user"))
], UserResolver.prototype, "register", null);
__decorate([
    type_graphql_1.Query(),
    __param(0, type_graphql_1.Arg("Make an attempt at logging in"))
], UserResolver.prototype, "login", null);
UserResolver = __decorate([
    type_graphql_1.Resolver(() => Users_1.User)
], UserResolver);
exports.UserResolver = UserResolver;
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
