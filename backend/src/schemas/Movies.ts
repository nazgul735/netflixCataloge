import mongoose from "mongoose";
const { Schema } = mongoose;

export interface movieInterface {
  title: string, 
    genre:string, 
    fromYear:number, 
    toYear:number, 
    limit:number, 
    offset:number
}
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
export const Movie = mongoose.model("Movie", MovieSchema);

