export interface ReviewType{
  rating: number,
  review?: string,
  username: string
}


export interface Movie{
    id:string,
    title: string,
    year: string,
    genres: string[],
    actors: string[],
    posterurl: string,
    storyline: string,
    reviews?: ReviewType[],
  }
export interface MovieResponse{
    pages: number,
    movies: [Movie?]
  }
export interface GetMoviesQueryType{
    getMovies: MovieResponse
  }
