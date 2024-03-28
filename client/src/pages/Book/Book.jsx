import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetchData from "../../functions/FetchData";
import { useUserContext } from "../../context/UserContext";
import BookContainer from "../../components/BookContainer/BookContainer";
import CommentForm from "../../components/Form/CommentForm/CommentForm";
import CommentCard from "../../components/CommentCard";
import "./book.css";

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




    const [liked, setLiked] = useState(false);

    const handleLike = async (id) => {
        let comment = book.comments.find(comment => comment.id === id);
        console.log(comment)

        if (liked) {
            setLiked(false);
            comment.likes--;
        }
        else {
            setLiked(true);
            comment.likes++;
        }

        const res = await fetch(`http://localhost:5000/books/${book.id}/comments/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ likes: comment.likes })
        });

        if (!res.ok) {
            console.error("Error:", res.statusText);
        }
    }


    return (
        <div className="book-container">
            
            <BookContainer book={book} />

            <div className="comments-section flex flex-column align-center ">
                <CommentForm handleComment={handleComment} />

                <div className="comments-container flex flex-column g-3">
                    {book?.comments.length > 0 ? (
                        book?.comments.map(comment => (
                            <CommentCard comment={comment} handleLike={handleLike} key={comment.id} />
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
