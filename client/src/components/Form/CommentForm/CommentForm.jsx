import "./CommentForm.css";

function CommentForm({ handleComment }) {
    return (
        <form onSubmit={handleComment} className="comment-form mb-3 flex">
            <input name="comment" type="text" placeholder="Write your comment here..." />
            <button type="submit">Comment</button>
        </form>
    );
}

export default CommentForm;
