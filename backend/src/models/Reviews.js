import mongoose  from "mongoose";
const { Schema } = mongoose;

// Set up for Review documents 
const ReviewSchema = new Schema({
  rating: { type: Number, required: true },
  review: String,
  movieID: { type: Schema.Types.ObjectId, ref: "Movie", required: true },
});

export const Review = mongoose.model("Review", ReviewSchema);
