"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = exports.ReviewQueryByMovieID = exports.ReviewClass = exports.ReviewData = void 0;
const type_graphql_1 = require("type-graphql");
const typegoose_1 = require("@typegoose/typegoose");
const Movie_1 = require("./Movie");
const User_1 = require("./User");
let ReviewData = class ReviewData {
};
__decorate([
    typegoose_1.prop({ type: Number }),
    type_graphql_1.Field(_ => type_graphql_1.Int)
], ReviewData.prototype, "rating", void 0);
__decorate([
    typegoose_1.prop({ type: String }),
    type_graphql_1.Field(_ => String)
], ReviewData.prototype, "review", void 0);
__decorate([
    typegoose_1.prop({ type: String }),
    type_graphql_1.Field(_ => Movie_1.MovieClass)
], ReviewData.prototype, "movieID", void 0);
ReviewData = __decorate([
    type_graphql_1.ObjectType()
], ReviewData);
exports.ReviewData = ReviewData;
let ReviewClass = class ReviewClass extends ReviewData {
};
__decorate([
    typegoose_1.prop({ type: String }),
    type_graphql_1.Field(_ => String)
], ReviewClass.prototype, "username", void 0);
__decorate([
    typegoose_1.prop({ type: String }),
    type_graphql_1.Field(_ => User_1.UserClass)
], ReviewClass.prototype, "userID", void 0);
__decorate([
    typegoose_1.prop({ type: String }),
    type_graphql_1.Field(_ => String)
], ReviewClass.prototype, "createdAt", void 0);
ReviewClass = __decorate([
    type_graphql_1.ObjectType()
], ReviewClass);
exports.ReviewClass = ReviewClass;
let ReviewQueryByMovieID = class ReviewQueryByMovieID {
};
__decorate([
    type_graphql_1.Field(_ => Movie_1.MovieClass)
], ReviewQueryByMovieID.prototype, "movieID", void 0);
ReviewQueryByMovieID = __decorate([
    type_graphql_1.ObjectType()
], ReviewQueryByMovieID);
exports.ReviewQueryByMovieID = ReviewQueryByMovieID;
exports.Review = typegoose_1.getModelForClass(ReviewClass);
