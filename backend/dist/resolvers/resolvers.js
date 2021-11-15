"use strict";
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
exports.resolvers = void 0;
const Movies_1 = require("../schemas/Movies");
const Reviews_1 = require("../schemas/Reviews");
const Users_1 = require("../schemas/Users");
const config_js_1 = require("../config.js");
const validators_1 = require("../util/validators");
const validateAuth_1 = require("../util/validateAuth");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const apollo_server_1 = require("apollo-server");
const createMovieQuery_1 = require("../util/createMovieQuery");
// type Review = {
//     rating : number,
//     review : string,
//     movieID : string,
// }
// type Movie = {
//     title: string, 
//     genre:string, 
//     fromYear:number, 
//     toYear:number, 
//     limit:number, 
//     offset:number
// }
function generateToken(_user) {
    return jsonwebtoken_1.default.sign({
        id: _user.id,
        email: _user.email,
        username: _user.username
    }, config_js_1.SECRET_KEY, { expiresIn: '1h' });
}
exports.resolvers = {
    Mutation: {
        //Mutation for creating a new review
        createReview(_, { rating, review, movieID }, context) {
            return __awaiter(this, void 0, void 0, function* () {
                // Validate user
                const user = (0, validateAuth_1.validateAuth)(context);
                // If rating or movieID is not given, throw error
                if (!(rating || movieID)) {
                    throw new Error("ID of the movie that you try to create review for has to be given and rating can not be null.");
                }
                let userID = "";
                // Else, create review and save to database
                const reviewDocument = new Reviews_1.Review({ rating, review, movieID, username: Users_1.User, createdAt: new Date().toISOString(), userID });
                yield reviewDocument.save();
                return reviewDocument;
            });
        },
        register: (_, { username, email, password, confirmPassword }) => __awaiter(void 0, void 0, void 0, function* () {
            // Validate user data
            try {
                const { valid, errors } = (0, validators_1.validateRegisterInput)({ username: username,
                    email: email,
                    password: password,
                    confirmPassword: confirmPassword });
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
                password = yield bcryptjs_1.default.hash(password, 12);
                const newUser = new Users_1.User({
                    email,
                    username,
                    password,
                    createdAt: new Date().toISOString(),
                });
                const res = yield newUser.save();
                const token = generateToken(res);
                return Object.assign(Object.assign({}, res._doc), { id: res._id, token });
            }
            catch (error) {
                throw new Error("error");
            }
        }),
    },
    Query: {
        hello: () => "Hello world",
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
                    throw new apollo_server_1.ApolloError("error");
                }
            });
        },
        login: (_, { username, password }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { errors, valid } = (0, validators_1.validateLoginInput)(username, password);
                if (!(username && password)) {
                    throw new apollo_server_1.ApolloError("You must provide a username and password.");
                }
                if (!valid) {
                    throw new apollo_server_1.UserInputError("Errors", { errors });
                }
                const user = yield Users_1.User.findOne({ username });
                if (!user) {
                    errors.username = "User not found"; //added user insted of general
                    throw new apollo_server_1.UserInputError("User not found", { errors });
                }
                const match = yield bcryptjs_1.default.compare(password, user.password);
                if (!match) {
                    errors.password = "Wrong credentials"; //added password instead of general
                    throw new apollo_server_1.UserInputError("Wrong credentials", { errors });
                }
                const token = generateToken(user);
                return Object.assign(Object.assign({}, user._doc), { id: user._id, token });
            }
            catch (error) {
                throw new apollo_server_1.ApolloError("Couldn't generate token #154");
            }
        }),
        getReviewsByMovie: function (_, { movieID }) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    // Sort by newest posts
                    const reviews = yield Reviews_1.Review.find({ movieID }).sort({ createdAt: -1 });
                    //Throw error if reviews not found
                    if (!(reviews.length > 0)) {
                        //Throw custom error if reviews not found
                        throw new Error("Reviews for given movie not found");
                    }
                    return reviews;
                }
                catch (error) {
                    // Throw default error from graphql if caught
                    throw new apollo_server_1.ApolloError("No review #170");
                }
            });
        },
        getMovies: function (_, { title, genre, fromYear, toYear, limit, offset }) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    let query = (0, createMovieQuery_1.createMovieQuery)({ title: title, genre: genre, fromYear: fromYear, toYear: toYear });
                    const allMovies = yield Movies_1.Movie.find(query);
                    const movies = yield Movies_1.Movie.find(query).limit(limit).skip(offset);
                    const pages = Math.floor(allMovies.length / limit) + 1;
                    return { movies: movies, pages };
                }
                catch (err) {
                    throw new apollo_server_1.ApolloError("err");
                }
            });
        }
    }
};
