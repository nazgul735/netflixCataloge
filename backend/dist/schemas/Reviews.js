"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = void 0;
const mongoose = __importStar(require("mongoose"));
const mongoose_1 = require("mongoose");
const ReviewSchema = new mongoose_1.Schema({
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
