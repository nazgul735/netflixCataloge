import { Movie } from "./models/Movies";
import { Review } from "./models/Reviews";
export const resolvers = {
  Query: {
    hello: () => "Hello world",
    getMovies: async (_, { limit, offset}) => await Movie.find({})
    .limit(limit)
    .skip(offset)
  },
  Mutation: {
    createReview: async (_, { rating, review, movieID}) => {
      const reviewDocument = new Review({ rating,review,movieID });
      await reviewDocument.save();
      return reviewDocument;
    }
  }
};