import { useState, useEffect } from "react";
import "./CommentCard.css";

function CommentCard({ comment, handleLike }) {
   
    return (
        <div className="comment-card flex align-end justify-space-between" key={comment.id}>
            <div>
                <h4>{comment.email}</h4>
                <p>{comment.comment}</p>
            </div>
            <div>
                <p className="flex align-center g-1">
                    <button onClick={() => handleLike(comment.id)} className="btn-like">Like</button>
                    {comment.likes}
                </p>
            </div>
        </div>      
    );
}

export default CommentCard;
