"use strict";
exports.__esModule = true;
exports.Movie = void 0;
var mongoose_1 = require("mongoose");
var Schema = mongoose_1["default"].Schema;
//Schema for Movie instance
var MovieSchema = new Schema({
    title: { type: String, required: true },
    year: { type: String, required: true },
    genres: { type: Array, required: true },
    actors: { type: Array, required: true },
    posterurl: String,
    storyline: { type: String, required: true },
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }]
});
// Set up for model for Movie
exports.Movie = mongoose_1["default"].model("Movie", MovieSchema);
