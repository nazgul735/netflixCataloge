import { url } from 'inspector';
import * as React from 'react';
import { useQuery } from "@apollo/client";
import { REVIEW, SINGLE_MOVIE } from '../api/graphqlQueries';
import ReviewCard from '../components/ReviewCard';


interface Review {
    rating: number,
    review?: string,
}

interface GetMoviesQueryType {
    getMovieByID: Movie
}

interface ReviewProps {
    movieID: string
}


interface Movie {
    id: string,
    title: string,
    year: string,
    genres: string[],
    actors: string[],
    posterurl: string,
    storyline: string,
}

function Review({ movieID }: ReviewProps) {

    const { data, error, loading } = useQuery(REVIEW, { variables: { "movieId": movieID } });



    if (error?.graphQLErrors[0]?.message === "Error: Reviews for given movie not found") {
        return (
            <div>DUMMYTEXT 😱</div>
        )
    }
    else if (error) {
        return (
            <div> Could not connect to reviews😱 </div>
        )
    }

    if (loading) {
        return (
            <div>Loading...</div>
        )
    }

    const reviewsToDisplay = data?.getReviewsByMovie && data?.getReviewsByMovie.map((review: Review) => <ReviewCard review={review.review} rating={review.rating} />);



    return (
        <div>
            <p>{reviewsToDisplay}</p>
        </div>
    )

}



function DetailedMovie() {


    const URLtoArray = window.location.href.split("/");
    const movieID = URLtoArray[URLtoArray.length - 1];





    const { data } = useQuery<GetMoviesQueryType>(SINGLE_MOVIE, { variables: { "movieId": movieID } })

 

    const movieToDisplay = data?.getMovieByID;

    return (
        <div>
            <h1> {movieToDisplay?.title} </h1>
            <Review movieID={movieID} />
        </div>

    )

}
export default DetailedMovie;

