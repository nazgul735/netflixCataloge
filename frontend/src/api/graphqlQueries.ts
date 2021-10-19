import {
    gql
  } from "@apollo/client";

export const HELLO = gql`
  query Hello {
    hello
  }
`;

export const MOVIE = gql`
query GetMoviesQuery ($limit: Int!, $offset: Int!){
  getMovies(limit: $limit, offset: $offset) {
    pages
    movies{
      id
      title
      posterurl
      storyline
    }
  }
}
`;
