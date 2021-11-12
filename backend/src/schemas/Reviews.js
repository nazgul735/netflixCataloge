"use strict";
exports.__esModule = true;
exports.Review = void 0;
var mongoose = require("mongoose");
var mongoose_1 = require("mongoose");
// Set up for Review schema
var ReviewSchema = new mongoose_1.Schema({
    rating: { type: Number, required: true },
    review: String,
    // Create relation with movie 
    movieID: { type: mongoose_1.Schema.Types.ObjectId, ref: "Movie", required: true },
    username: String,
    // Create relation with user
    userID: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    createdAt: String
});
exports.Review = mongoose.model("Review", ReviewSchema);
