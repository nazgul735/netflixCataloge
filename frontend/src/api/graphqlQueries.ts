import {
  gql
} from "@apollo/client";

export const HELLO = gql`
  query Hello {
    hello
  }
`;

export const REVIEW = gql`
query ReviewQuery($movieId: String!) {
  getReviewsByMovie(movieID: $movieId) {
    id
    rating
    review
    movieID
  }
}
`;


export const SINGLE_MOVIE = gql`
query QuerySingleMovie($movieId: String!) {
  getMovieByID(movieID: $movieId) {
    title
    year
    genres
    actors
  }
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

export const LOGIN = gql`
query LoginQuery($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    id
    email
    token
    username
    createdAt
  }
}`;

export const REGISTER = gql`
mutation RegisterMutation($username: String!, $password: String!, $confirmPassword: String!, $email: String!) {
  register(username: $username, password: $password, confirmPassword: $confirmPassword, email: $email) {
    id
    email
    token
    username
    createdAt
  }
}
`;