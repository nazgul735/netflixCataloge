

interface IProps {
    rating: number,
    review?: string,
    username?: string
}

function ReviewCard({ rating, review, username }: IProps) {

    return (
        <div>
            <p>User: {username || "guest"}</p>
            <p>Rating: {rating}/10 </p>
            <p>Review: {review}</p>
        </div>
    )

}

export default ReviewCard

