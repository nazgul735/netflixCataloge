interface Review{
    id: string,
    rating: number,
    review: string,
    movieID: string,
  }

export interface Movie{
    id:string,
    title: string,
    year: string,
    genres: string[],
    actors: string[],
    posterurl: string,
    storyline: string,
    reviews?: Review[],
  }
export interface MovieResponse{
    pages: number,
    movies: [Movie?]
  }
export interface GetMoviesQueryType{
    getMovies: MovieResponse
  }
