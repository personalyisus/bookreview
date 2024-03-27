import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetchData from "../../functions/FetchData";
import "./book.css";
import { useUserContext } from "../../context/UserContext";

function Book() {
    const requestedBook = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);

    const { currentUser } = useUserContext();

    useEffect(() => {
        useFetchData(`http://localhost:5000/books/${requestedBook.id}`, (data) => {
            setBook(data);
        });
    }, [requestedBook]);

    const handleComment = (event) => {
        event.preventDefault();

        if (!currentUser) {
            alert("You should sign up so that you comment. Click on Sign up button on Navbar");
            navigate("/");
            return;
        }

        const commentData = Object.fromEntries(new FormData(event.target));
    
        const newComment = {
            ...commentData,
            email: currentUser.email
        }

        fetch(`http://localhost:5000/books/${book.id}`, { method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(newComment) })
            .then(res => res.json())
            .then(data => {
                console.log("Success", data);
                const updatedBook = { ...book, comments: [...book.comments, data] };
                setBook(updatedBook);
            })
            .catch(err => console.log("Error", err));

        event.target.reset();
    }

    return (
        <div className="book-container">
            <div className="flex g-3">
                <div>
                    <img src={book?.image} alt={book?.name} />
                </div>
                <div>
                    <h1>{book?.name} by {book?.author}</h1>
                    <div className="mb-3 flex g-1">
                        {book?.genres.map(genre => (
                            <span key={genre}>{genre}</span>
                            ))}
                    </div>
                    <p className="mb-3">{book?.description}</p>
                    <button onClick={() => navigate("/books")}>Go Back</button>
                </div>
            </div>

            <div className="comments-section flex flex-column align-center ">
                
                <form onSubmit={handleComment} className="comment-form mb-3 flex">
                    <input name="comment" type="text" placeholder="Write your comment here..." />
                    <button type="submit">Comment</button>
                </form>

                <div className="comments-container flex flex-column g-3">
                    {book?.comments.length > 0 ? (
                        book?.comments.map(comment => (
                            <div className="comment-card flex align-end justify-space-between" key={comment.id}>
                                <div>
                                    <h4>{comment.email}</h4>
                                    <p>{comment.comment}</p>
                                </div>
                                <div>
                                    <p>Likes: {comment.likes}</p>
                                </div>
                            </div>
                        ))
                    ) 
                    : null
                    }
                </div>

            </div>
        </div>
    );
}

export default Book;
