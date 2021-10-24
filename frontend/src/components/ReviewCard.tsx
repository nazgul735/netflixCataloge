

interface IProps {
    rating: number,
    review?: string,
    username?: string
}

function ReviewCard({ rating, review, username }: IProps) {

    return (
        <div>
            <p>User: {username}</p>
            <p>Rating: {rating}/5 </p>
            <p>Review: {review}</p>
        </div>
    )

}

export default ReviewCard

