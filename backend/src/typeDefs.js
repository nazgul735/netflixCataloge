<<<<<<< HEAD
import { gql } from 'apollo-server';
=======
//onst { gql } = require('apollo-server');
import { gql } from "apollo-server";
>>>>>>> 8dd2aee2751bc9b2f798cf2af637331d1412b598

export const typeDefs = gql`
  type Query {
    hello: String!
    getMoviesBySearchstring(searchstring: String!, limit: Int!, offset:Int!): MovieResponse!
    getReviewsByMovie(movieID:String!): Review!
    getMovies(title: String, genre: String, fromYear: Int, toYear: Int, limit: Int!, offset: Int!): MovieResponse!
    getFilteredMoviesByYearAndGenre(fromYear:Int!, toYear:Int!, genre:String!, limit:Int!, offset: Int!): MovieResponse!
    getFilteredMoviesByYear(fromYear:Int!, toYear:Int!,limit:Int!, offset: Int!): MovieResponse!
    getFilteredMoviesByGenre(genre:String!, limit:Int!, offset: Int!): MovieResponse!
    login(username:String!, password: String!): User!
<<<<<<< HEAD

  }

=======

  }
>>>>>>> 8dd2aee2751bc9b2f798cf2af637331d1412b598
  type User{
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
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
<<<<<<< HEAD
    register(username: String!,password: String!,confirmPassword: String!,email: String!): User!
=======
    register(registrerInput: RegisterInput): User!
>>>>>>> 8dd2aee2751bc9b2f798cf2af637331d1412b598
    

  }

  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
`;
