import "./BooksCard.css";

function BooksCard({ book, handleNavigate }) {
    return (
        <div onClick={() => handleNavigate(book.id)} className="books-card flex flex-column align-center">
            <img src={book.image} alt={book.name} />
            <h3>{book.name}</h3>
            <p>{book.author}</p>
        </div>
    );
}

export default BooksCard;
