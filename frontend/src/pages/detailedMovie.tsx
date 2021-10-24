import { useMutation, useQuery } from "@apollo/client";
import { CREATE_REVIEW, REVIEW, SINGLE_MOVIE } from '../api/graphqlQueries';
import ReviewCard from '../components/ReviewCard';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import TextField from '@mui/material/TextField';
import { FunctionComponent, useState } from "react";
import Button from '@mui/material/Button';
import { ErrorMessage } from "./register/Register";
interface ReviewType {
    rating: number,
    review?: string,
    username: string
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
interface CreateReviewProps {
    movieID: string
}


const CreateReview: FunctionComponent<CreateReviewProps> = ({movieID}) => {
    const [rating, setRating] = useState<number>(3);
    const [review, setReview] = useState<string>(""); 
    const [publishReview] = useMutation(CREATE_REVIEW);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [showCreatedReview, setShowCreatedReview] = useState<boolean>(false);
    const [data, setData] = useState<ReviewType>({rating:1, review:"", username:""});
    console.log(review)
    const labels: { [index: string]: string } = {
        1: 'Very bad',
        2: 'Poor',
        3: 'Ok',
        4: 'Good',
        5: 'Excellent',
      };
    const handlePublishReview = async ()=>{
        try {
            // Try create review, will work if user is logged in
            const { data } = await publishReview({ variables: {
                "rating": rating as number,
                "movieId": movieID,
                "review": review,
              } });
              setData(data.createReview);
              setShowCreatedReview(true); 
     
    }// If error, then invalid token is given or invalid argument. Set error message if error given
     catch (error:any) {
        setErrorMessage("Something went wrong");
      }
}
    const displayCreatedReview = showCreatedReview &&  <ReviewCard review={data.review} rating={data.rating} username={data.username}/> 
    return (
        <div>
        <ErrorMessage message={errorMessage}/>
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
            onChange={(e:any)=>setRating(parseInt(e.target.value))}
            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
        <Box sx={{ ml: 2 }}>{labels[rating]}</Box>
        </Box>
        <div style={{display:"flex", alignItems:"center", width:"50vw", flexDirection:'column', 
        justifyContent:"space-between", margin:"0 auto"}}>
        <TextField
            id="review"
            label="Review"
            placeholder="Write your review here"
            multiline
            onChange={(event: React.ChangeEvent<HTMLInputElement>)=>{setReview(event.target.value as string)}}
        />
        <Button onClick={()=> handlePublishReview()} variant="outlined">Publish review</Button>
        </div>
        {displayCreatedReview}
        </div>
        );
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
    console.log(data?.getReviewsByMovie)
    const reviewsToDisplay = data?.getReviewsByMovie && data?.getReviewsByMovie.map((review: ReviewType) => <ReviewCard review={review.review} rating={review.rating} username={review.username} />);



    return (
        <div>
            {reviewsToDisplay}
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
            {sessionStorage.getItem("jwt") &&<CreateReview movieID={movieID}/>}
            <Review movieID={movieID} />
        </div>

    )

}
export default DetailedMovie;

