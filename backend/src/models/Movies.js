import mongoose from "mongoose";
const { Schema } = mongoose;

//Schema for Music instance
const MovieSchema = new Schema({
    title: { type: String, required: true },
    year: {type:String, required:true},
    genres: { type: Array, required: true },
    actors: { type: Array, required: true },
    posterurl: String,
    storyline: {type:String, required: true},
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  });

// Set up for model for Music 
export const Movie = mongoose.model("Movie", MovieSchema);
