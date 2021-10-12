import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Query {
    hello: String!
    getMovies(limit: Int!, offset: Int!): [Movie!]!
  }
  type Review{
    id: ID!
    rating: Int!
    review: String
    movieID: String!
  }
  type Movie{
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