import {
    gql
  } from "@apollo/client";

export const HELLO = gql`
  query Hello {
    hello
  }
`;

export const GET_MOVIE = gql`
query GetMoviesQuery ($limit: Int!, $offset: Int!, $toYear: Int, $genre: String, $fromYear: Int, $title: String){
  getMovies(limit: $limit, offset: $offset, toYear:$toYear, genre: $genre, fromYear: $fromYear, title: $title) {
    pages
    movies{
      id
      title
      posterurl
      storyline,
      genres,
      year
    }
  }
}
`;

