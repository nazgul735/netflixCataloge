import mongoose  from "mongoose";
const { Schema } = mongoose;

// Set up for Review schema
const ReviewSchema = new Schema({
  rating: { type: Number, required: true },
  review: String,
  // Create relation with movie 
  movieID: { type: Schema.Types.ObjectId, ref: "Movie", required: true },
  username:String,
  // Create relation with user
  userID: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: String
});

export const Review = mongoose.model("Review", ReviewSchema);
