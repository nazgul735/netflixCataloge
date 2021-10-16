import { Movie } from "./models/Movies";
import { Review } from "./models/Reviews";
export const resolvers = {
  Query: {
    hello: () => "Hello world",

    //offset blir limit*side-1
    getMovies: async function (_, { limit, offset}){
    const movies= await Movie.find({})
    .limit(limit)
    .skip(offset)
    const allMovies = await Movie.find({})
    const pages = Math.floor(allMovies.length/limit)+1
    return {movies, pages}
  },
  getFilteredMoviesByYear: async function(_, {fromYear, toYear, limit, offset}) {
    toYear+=1
    const allFilteredMovies = await Movie.find({
      year: {
        $gte: fromYear.toString(), 
        $lt: toYear.toString()
      }
    })
    const filteredMovies= await Movie.find({
      year: {
        $gte: fromYear.toString(), 
        $lt: toYear.toString()
      }
    })
    .limit(limit)
    .skip(offset)
    const pages = Math.floor(allFilteredMovies.length/limit)+1
    return {movies:filteredMovies, pages}
  },
  getFilteredMoviesByGenre: async function(_, {genre, limit, offset}) {
    const allFilteredMovies = await Movie.find({
      genres: genre
    })
    const filteredMovies= await Movie.find({
      genres: genre
    })
    .limit(limit)
    .skip(offset)
    const pages = Math.floor(allFilteredMovies.length/limit)+1
    return {movies:filteredMovies, pages}
  },
  getFilteredMoviesByYearAndGenre: async function(_, {fromYear, toYear, genre, limit, offset}) {
    toYear+=1
    const allFilteredMovies = await Movie.find({
      year: {
        $gte: fromYear.toString(), 
        $lt: toYear.toString()
      },
      genres: genre
    })
    const filteredMovies= await Movie.find({
      year: {
        $gte: fromYear.toString(), 
        $lt: toYear.toString()
      },
      genres: genre
    })
    .limit(limit)
    .skip(offset)
    const pages = Math.floor(allFilteredMovies.length/limit)+1
    return {movies:filteredMovies, pages}
  },
},

  Mutation: {
    createReview: async (_, { rating, review, movieID}) => {
      const reviewDocument = new Review({ rating,review,movieID });
      await reviewDocument.save();
      return reviewDocument;
    }
  }
}

