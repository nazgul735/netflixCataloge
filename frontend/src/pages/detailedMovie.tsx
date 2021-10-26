import "./detailedMovie.css"
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_REVIEW, REVIEW, SINGLE_MOVIE } from '../api/graphqlQueries';
import ReviewCard from '../components/ReviewCard';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import TextField from '@mui/material/TextField';
import { FunctionComponent, useEffect, useState } from "react";
import Button from '@mui/material/Button';
import { ErrorMessage } from "./register/Register";
import { ReviewType, Movie } from "../type/movieTypes";
import { useHistory } from 'react-router-dom';


interface GetMoviesQueryType {
    getMovieByID: Movie
}

interface ReviewProps {
    movieID: string
}

interface CreateReviewProps {
    movieID: string
}

//Component handling creation of a new review 
const CreateReview: FunctionComponent<CreateReviewProps> = ({ movieID }) => {
    // State for selected rating from the starts
    const [rating, setRating] = useState<number>(3);
    // State for written review in text field 
    const [review, setReview] = useState<string>("");
    // Define mutate function for publishing review and make a call to createReview mutation
    const [publishReview] = useMutation(CREATE_REVIEW);
    // State for error message 
    const [errorMessage, setErrorMessage] = useState<string>("");
    // State for conditional rendering of newly added review if review successfully added
    const [showCreatedReview, setShowCreatedReview] = useState<boolean>(false);
    // State for the data returned when creating new review
    const [createdReview, setCreatedReview] = useState<ReviewType>({ rating: 1, review: "", username: "" });
    // Labeling the rating
    const labels: { [index: string]: string } = {
        1: 'Very bad',
        2: 'Poor',
        3: 'Ok',
        4: 'Good',
        5: 'Excellent',
    };
    const handlePublishReview = async () => {
        try {
            // Try create review, will work if user is logged in
            const { data } = await publishReview({
                variables: {
                    "rating": rating as number,
                    "movieId": movieID,
                    "review": review,
                }
            });
            setCreatedReview(data.createReview);
            setShowCreatedReview(true);

        }// If error, then invalid token is given or invalid argument. Set error message if error given
        catch (error: any) {
            setErrorMessage("Something went wrong");
        }
    }
    // Display created review if created
    const displayCreatedReview = showCreatedReview && <ReviewCard review={createdReview.review} rating={createdReview.rating} username={createdReview.username} />
    return (
        <div>
            <ErrorMessage message={errorMessage} />
            <Box sx={{
                width: 300,
                display: 'flex',
                alignItems: 'center',
                margin: "0 40vw"
            }} >
                <Rating
                    name="rating"
                    value={rating}
                    precision={1}
                    onChange={(e: any) => setRating(parseInt(e.target.value))}
                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                />
                <Box sx={{ ml: 2 }}>{labels[rating]}</Box>
            </Box>
            <div style={{
                display: "flex", alignItems: "center", width: "50vw", flexDirection: 'column',
                justifyContent: "space-between", margin: "0 auto"
            }}>
                <TextField
                    id="review"
                    label="Review"
                    placeholder="Write your review here"
                    multiline
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setReview(event.target.value as string) }}
                />
                <Button onClick={() => handlePublishReview()} variant="outlined">Publish review</Button>
            </div>
            {displayCreatedReview}
        </div>
    );
}



function Review({ movieID }: ReviewProps) {
    //Retrieve reviews for the given movie
    const { data, error, loading } = useQuery(REVIEW, { variables: { "movieId": movieID } });
    if (error?.graphQLErrors[0]?.message === "Error: Reviews for given movie not found") {
        return (
            <div>No reviews yet.</div>
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
    //Return list of reviews as ReviewCard components
    const reviewsToDisplay = data?.getReviewsByMovie && data?.getReviewsByMovie.map((review: ReviewType) => <ReviewCard review={review.review} rating={review.rating} username={review.username} />);
    return (
        <div>
            {reviewsToDisplay}
        </div>
    )

}



const DetailedMovie: React.FC = () => {
    const URLtoArray = window.location.href.split("/");
    //Extract id from the url
    const movieID = URLtoArray[URLtoArray.length - 1];
    //Fetch movie based on the given ID from the url
    const { data } = useQuery<GetMoviesQueryType>(SINGLE_MOVIE, { variables: { "movieId": movieID } })
    //Retrieve data
    const movieToDisplay = data?.getMovieByID;

    useEffect(() => { console.log(movieToDisplay?.storyline); }, [movieToDisplay]);

    console.log(movieToDisplay?.posterurl);
    console.log(movieToDisplay?.title);

    const history = useHistory();
    const handleClick = () => history.push('/');



    return (
        <div>
            <button className="BTN" onClick={handleClick}>Go back</button>
            <div className="grid-container2 ">
                <h1 className="movieName"> {movieToDisplay?.title} </h1>


                <img className="moviePicture" src={movieToDisplay?.posterurl} alt="moviePoster"></img>

                <div className="storyline">
                    <p> <strong>Description: </strong>
                        {movieToDisplay?.storyline}</p>
                </div>


                <p className="actors">
                    <strong>Actors: </strong>{movieToDisplay?.actors[0]}, {movieToDisplay?.actors[1]}, {movieToDisplay?.actors[2]}
                </p>

                <p className="year"><strong>Released: </strong>{movieToDisplay?.year}</p>
                <p className="genre"> <strong>Genre: </strong>{movieToDisplay?.genres[0]}, {movieToDisplay?.genres[1]}</p>





            </div>
            <div className="review">
                {sessionStorage.getItem("jwt") && <CreateReview movieID={movieID} />}
                <Review movieID={movieID} />
            </div>
        </div>
    )

}
export default DetailedMovie;

