import { Movie } from "./models/Movies";
import { Review } from "./models/Reviews";
export const resolvers = {
  Query: {
    hello: () => "Hello world",
    //Query for returning reviews for a given movie
    getReviewsByMovie: async (_,{movieID}) =>{
      try{
      const reviews = Review.find({movieID: movieID})
      //Throw error if reviews not found
      if(!reviews.length>0){
        //Throw custom error if reviews not found
        throw new Error("Reviews for given movie not found")
      }
      return reviews}
      // Throw default error from graphql if caught
      catch(error){throw new Error(error)}
    },
    //offset blir limit*side-1
    //Query for getting limited set of all movies based on offset and limit
    getMovies: async function (_, { limit, offset}){
    try{
    const movies= await Movie.find({})
    .limit(limit)
    .skip(offset)
    const allMovies = await Movie.find({})
    const pages = Math.floor(allMovies.length/limit)+1
    return {movies, pages}
  } catch (err) {
    throw new Error(err);
  }
  },
  //Query for retrieving movies only filtered by year
  getFilteredMoviesByYear: async function(_, {fromYear, toYear, limit, offset}) {
    try{
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
      return {movies:filteredMovies, pages}}
      catch(err){throw new Error(err)}
  },
  //Query for retrieving movies only filtered by genre 
  getFilteredMoviesByGenre: async function(_, {genre, limit, offset}) {
    try{
      const allFilteredMovies = await Movie.find({
      genres: genre
    })
    const filteredMovies= await Movie.find({
      genres: genre
    })
    .limit(limit)
    .skip(offset)
    const pages = Math.floor(allFilteredMovies.length/limit)+1
    return {movies:filteredMovies, pages}}
    catch(err){throw new Error(err)}
  },
  //Query for retrieving movies filtered by both year and genre
  getFilteredMoviesByYearAndGenre: async function(_, {fromYear, toYear, genre, limit, offset}) {
    toYear+=1
    // Try find the filtered movies
    try{
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
    }
    //Return graphql error if unable to query 
    catch(err){
      throw new Error(err)
    }
  },
},

  Mutation: {
    //Mutation for creating a new review
    createReview: async (_, { rating, review, movieID}) => {
      // If rating or movieID is not given, throw error
      if(!(rating|| movieID)){
        throw new Error('ID of the movie that you try to create review for has to be given and rating can not be null.')
      }
      // Else, create review and save to database 
      const reviewDocument = new Review({ rating,review,movieID });
      await reviewDocument.save();
      return reviewDocument;
    }
  }
}

