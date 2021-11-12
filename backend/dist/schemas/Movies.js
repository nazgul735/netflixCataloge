"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Movie = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
//Schema for Movie instance
const MovieSchema = new Schema({
    title: { type: String, required: true },
    year: { type: String, required: true },
    genres: { type: Array, required: true },
    actors: { type: Array, required: true },
    posterurl: String,
    storyline: { type: String, required: true },
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
});
// Set up for model for Movie
exports.Movie = mongoose_1.default.model("Movie", MovieSchema);
