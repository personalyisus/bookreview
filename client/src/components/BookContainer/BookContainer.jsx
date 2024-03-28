import { useNavigate } from "react-router-dom";

function BookContainer({ book }) {
    const navigate = useNavigate();
    return (
        <div className="flex g-3">
            <div>
                <img src={book?.image} alt={book?.name} />
            </div>
            <div>
                <h1>
                    {book?.name} by {book?.author}
                </h1>
                <div className="mb-3 flex g-1">
                    {book?.genres.map((genre) => (
                        <span key={genre}>{genre}</span>
                    ))}
                </div>
                <p className="mb-3">{book?.description}</p>
                <button onClick={() => navigate("/books")}>Go Back</button>
            </div>
        </div>
    );
}

export default BookContainer;
