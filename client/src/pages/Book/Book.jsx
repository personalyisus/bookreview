import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./book.css";

function Book() {
    const requestedBook = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);

    async function fetchData(url) {
        try {
            const res = await axios.get(url);
            setBook(res.data);
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchData(`http://localhost:5000/books/${requestedBook.id}`);
    }, [requestedBook]);

    return (
        <div className="book-container flex">
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
    );
}

export default Book;
