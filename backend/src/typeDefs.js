import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Query {
    hello: String!
    getMovies(limit: Int!, offset: Int!): MovieResponse!
    getFilteredMoviesByYearAndGenre(fromYear:Int!, toYear:Int!, genre:String!, limit:Int!, offset: Int!): MovieResponse!
    getFilteredMoviesByYear(fromYear:Int!, toYear:Int!,limit:Int!, offset: Int!): MovieResponse!
    getFilteredMoviesByGenre(genre:String!, limit:Int!, offset: Int!): MovieResponse!
  }
  type Review{
    id: ID!
    rating: Int!
    review: String
    movieID: String!
  }
  type MovieResponse{
    movies: [Movie],
    pages: Int!
  }
  type Movie{
    id: ID!,
    title: String!,
    year: String!,
    genres: [String]!,
    actors: [String]!,
    posterurl: String,
    storyline: String!,
    reviews: [Review],
  }
  type Mutation {
    createReview(rating: Int!, review: String, movieID:String!): Review!
  }
`;