import { Movie } from "./models/Movies";
import { Review } from "./models/Reviews";
export const resolvers = {
  Query: {
    hello: () => "Hello world",
    getMovies: async () => await Movie.find({}).limit(10)
  },
  Mutation: {
    createReview: async (_, { rating, review, movieID}) => {
      const reviewDocument = new Review({ rating,review,movieID });
      await reviewDocument.save();
      return reviewDocument;
    }
  }
};