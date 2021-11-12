"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.resolvers = void 0;
var Movies_1 = require("../schemas/Movies");
var Reviews_1 = require("../schemas/Reviews");
var Users_1 = require("../schemas/Users");
var config_js_1 = require("../config.js");
var validators_1 = require("../util/validators");
var validateAuth_1 = require("../util/validateAuth");
var bcryptjs_1 = require("bcryptjs");
var jsonwebtoken_1 = require("jsonwebtoken");
var apollo_server_1 = require("apollo-server");
var createMovieQuery_1 = require("../util/createMovieQuery");
function generateToken(_user) {
    return jsonwebtoken_1["default"].sign({
        id: _user.id,
        email: _user.email,
        username: _user.username
    }, config_js_1.SECRET_KEY, { expiresIn: '1h' });
}
exports.resolvers = {
    Mutation: {
        //Mutation for creating a new review
        createReview: function (_, _a, context) {
            var rating = _a.rating, review = _a.review, movieID = _a.movieID;
            return __awaiter(this, void 0, void 0, function () {
                var user, userID, reviewDocument;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            user = (0, validateAuth_1.validateAuth)(context);
                            // If rating or movieID is not given, throw error
                            if (!(rating || movieID)) {
                                throw new Error("ID of the movie that you try to create review for has to be given and rating can not be null.");
                            }
                            userID = "";
                            reviewDocument = new Reviews_1.Review({ rating: rating, review: review, movieID: movieID, username: Users_1.User, createdAt: new Date().toISOString(), userID: userID });
                            return [4 /*yield*/, reviewDocument.save()];
                        case 1:
                            _b.sent();
                            return [2 /*return*/, reviewDocument];
                    }
                });
            });
        },
        register: function (_, _a) {
            var username = _a.username, email = _a.email, password = _a.password, confirmPassword = _a.confirmPassword;
            return __awaiter(void 0, void 0, void 0, function () {
                var _b, valid, errors, user, newUser, res, token, error_1;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _c.trys.push([0, 4, , 5]);
                            _b = (0, validators_1.validateRegisterInput)(username, email, password, confirmPassword), valid = _b.valid, errors = _b.errors;
                            if (!(username || email || password || confirmPassword)) {
                                throw new Error("You must provide username, email and password.");
                            }
                            if (!valid) {
                                throw new apollo_server_1.UserInputError("Errors", { errors: errors });
                            }
                            return [4 /*yield*/, Users_1.User.findOne({ username: username })];
                        case 1:
                            user = _c.sent();
                            if (user) {
                                throw new apollo_server_1.UserInputError("Username is taken", {
                                    errors: {
                                        username: "This username is taken"
                                    }
                                });
                            }
                            return [4 /*yield*/, bcryptjs_1["default"].hash(password, 12)];
                        case 2:
                            password = _c.sent();
                            newUser = new Users_1.User({
                                email: email,
                                username: username,
                                password: password,
                                createdAt: new Date().toISOString()
                            });
                            return [4 /*yield*/, newUser.save()];
                        case 3:
                            res = _c.sent();
                            token = generateToken(res);
                            return [2 /*return*/, __assign(__assign({}, res._doc), { id: res._id, token: token })];
                        case 4:
                            error_1 = _c.sent();
                            throw new Error("error");
                        case 5: return [2 /*return*/];
                    }
                });
            });
        }
    },
    Query: {
        hello: function () { return "Hello world"; },
        getMovieByID: function (_, _a) {
            var movieID = _a.movieID;
            return __awaiter(this, void 0, void 0, function () {
                var movie, error_2;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, Movies_1.Movie.findById({ _id: movieID })];
                        case 1:
                            movie = _b.sent();
                            if (!movie) {
                                throw new Error("Movie does not exist");
                            }
                            return [2 /*return*/, movie];
                        case 2:
                            error_2 = _b.sent();
                            // Throw default error from graphql if caught
                            throw new apollo_server_1.ApolloError("error");
                        case 3: return [2 /*return*/];
                    }
                });
            });
        },
        login: function (_, _a) {
            var username = _a.username, password = _a.password;
            return __awaiter(void 0, void 0, void 0, function () {
                var _b, errors, valid, user, match, token, error_3;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _c.trys.push([0, 3, , 4]);
                            _b = (0, validators_1.validateLoginInput)(username, password), errors = _b.errors, valid = _b.valid;
                            if (!(username && password)) {
                                throw new apollo_server_1.ApolloError("You must provide a username and password.");
                            }
                            if (!valid) {
                                throw new apollo_server_1.UserInputError("Errors", { errors: errors });
                            }
                            return [4 /*yield*/, Users_1.User.findOne({ username: username })];
                        case 1:
                            user = _c.sent();
                            if (!user) {
                                errors.username = "User not found"; //added user insted of general
                                throw new apollo_server_1.UserInputError("User not found", { errors: errors });
                            }
                            return [4 /*yield*/, bcryptjs_1["default"].compare(password, user.password)];
                        case 2:
                            match = _c.sent();
                            if (!match) {
                                errors.password = "Wrong credentials"; //added password instead of general
                                throw new apollo_server_1.UserInputError("Wrong credentials", { errors: errors });
                            }
                            token = generateToken(user);
                            return [2 /*return*/, __assign(__assign({}, user._doc), { id: user._id, token: token })];
                        case 3:
                            error_3 = _c.sent();
                            throw new apollo_server_1.ApolloError("Couldn't generate token #154");
                        case 4: return [2 /*return*/];
                    }
                });
            });
        },
        getReviewsByMovie: function (_, _a) {
            var movieID = _a.movieID;
            return __awaiter(this, void 0, void 0, function () {
                var reviews, error_4;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, Reviews_1.Review.find({ movieID: movieID }).sort({ createdAt: -1 })];
                        case 1:
                            reviews = _b.sent();
                            //Throw error if reviews not found
                            if (!(reviews.length > 0)) {
                                //Throw custom error if reviews not found
                                throw new Error("Reviews for given movie not found");
                            }
                            return [2 /*return*/, reviews];
                        case 2:
                            error_4 = _b.sent();
                            // Throw default error from graphql if caught
                            throw new apollo_server_1.ApolloError("No review #170");
                        case 3: return [2 /*return*/];
                    }
                });
            });
        },
        getMovies: function (_, _a) {
            var title = _a.title, genre = _a.genre, fromYear = _a.fromYear, toYear = _a.toYear, limit = _a.limit, offset = _a.offset;
            return __awaiter(this, void 0, void 0, function () {
                var query, allMovies, movies, pages, err_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 3, , 4]);
                            query = (0, createMovieQuery_1.createMovieQuery)(title, genre, fromYear, toYear);
                            return [4 /*yield*/, Movies_1.Movie.find(query)];
                        case 1:
                            allMovies = _b.sent();
                            return [4 /*yield*/, Movies_1.Movie.find(query).limit(limit).skip(offset)];
                        case 2:
                            movies = _b.sent();
                            pages = Math.floor(allMovies.length / limit) + 1;
                            return [2 /*return*/, { movies: movies, pages: pages }];
                        case 3:
                            err_1 = _b.sent();
                            throw new apollo_server_1.ApolloError("err");
                        case 4: return [2 /*return*/];
                    }
                });
            });
        }
    }
};
