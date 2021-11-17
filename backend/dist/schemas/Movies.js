"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Movie = exports.MovieResponse = exports.MovieClass = exports.MovieQueryBySearch = exports.MovieQueryByID = void 0;
const type_graphql_1 = require("type-graphql");
const typegoose_1 = require("@typegoose/typegoose");
const Reviews_1 = require("./Reviews");
//export (_type: any) MovieQuery = MovieQueryByID | MovieQueryBySearch;
let MovieQueryByID = class MovieQueryByID {
};
__decorate([
    type_graphql_1.Field((_type) => MovieClass)
], MovieQueryByID.prototype, "movieID", void 0);
MovieQueryByID = __decorate([
    type_graphql_1.ObjectType()
], MovieQueryByID);
exports.MovieQueryByID = MovieQueryByID;
let MovieQueryBySearch = class MovieQueryBySearch {
};
__decorate([
    typegoose_1.prop({ type: String }),
    type_graphql_1.Field(() => String)
], MovieQueryBySearch.prototype, "title", void 0);
__decorate([
    typegoose_1.prop({ type: String }),
    type_graphql_1.Field(() => String)
], MovieQueryBySearch.prototype, "genre", void 0);
__decorate([
    typegoose_1.prop({ type: Number }),
    type_graphql_1.Field(() => type_graphql_1.Int)
], MovieQueryBySearch.prototype, "fromYear", void 0);
__decorate([
    typegoose_1.prop({ type: Number }),
    type_graphql_1.Field(() => type_graphql_1.Int)
], MovieQueryBySearch.prototype, "toYear", void 0);
__decorate([
    typegoose_1.prop({ type: Number }),
    type_graphql_1.Field(() => type_graphql_1.Int)
], MovieQueryBySearch.prototype, "limit", void 0);
__decorate([
    typegoose_1.prop({ type: Number }),
    type_graphql_1.Field(() => type_graphql_1.Int)
], MovieQueryBySearch.prototype, "offset", void 0);
MovieQueryBySearch = __decorate([
    type_graphql_1.ObjectType({ description: "Movie" })
], MovieQueryBySearch);
exports.MovieQueryBySearch = MovieQueryBySearch;
let MovieClass = class MovieClass {
};
__decorate([
    typegoose_1.prop({ type: String }),
    type_graphql_1.Field((_type) => String)
], MovieClass.prototype, "movieID", void 0);
__decorate([
    typegoose_1.prop({ type: String }),
    type_graphql_1.Field((_type) => String)
], MovieClass.prototype, "title", void 0);
__decorate([
    typegoose_1.prop({ type: Number }),
    type_graphql_1.Field((_type) => type_graphql_1.Int)
], MovieClass.prototype, "year", void 0);
__decorate([
    typegoose_1.prop({ type: String }),
    type_graphql_1.Field((_type) => [String])
], MovieClass.prototype, "genres", void 0);
__decorate([
    typegoose_1.prop({ type: String }),
    type_graphql_1.Field((_type) => [String])
], MovieClass.prototype, "actors", void 0);
__decorate([
    typegoose_1.prop({ type: String }),
    type_graphql_1.Field((_type) => String)
], MovieClass.prototype, "posterUrl", void 0);
__decorate([
    typegoose_1.prop({ type: String }),
    type_graphql_1.Field((_type) => String)
], MovieClass.prototype, "storyline", void 0);
__decorate([
    typegoose_1.prop({ type: [Reviews_1.ReviewClass] }),
    type_graphql_1.Field((_type) => Reviews_1.ReviewClass)
], MovieClass.prototype, "reviews", void 0);
MovieClass = __decorate([
    type_graphql_1.ObjectType()
], MovieClass);
exports.MovieClass = MovieClass;
let MovieResponse = class MovieResponse {
};
__decorate([
    type_graphql_1.Field(() => [MovieClass])
], MovieResponse.prototype, "movies", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int)
], MovieResponse.prototype, "pages", void 0);
MovieResponse = __decorate([
    type_graphql_1.ObjectType()
], MovieResponse);
exports.MovieResponse = MovieResponse;
exports.Movie = typegoose_1.getModelForClass(MovieClass);
