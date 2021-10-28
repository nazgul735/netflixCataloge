

interface IProps {
    rating: number,
    review?: string,
    username?: string
}

function ReviewCard({ rating, review, username }: IProps) {

    return (
        <div className="reviewCard">
            <p><strong>User:</strong> {username}</p>
            <p><strong>Rating:</strong> {rating}/5 </p>
            <p><strong>Review:</strong> {review}</p>
        </div>
    )

}

export default ReviewCard

