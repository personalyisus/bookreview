import "./BooksCard.css";

function BooksCard({ book, handleNavigate }) {
    return (
        <div onClick={() => handleNavigate(book.id)} className="books-card flex flex-column align-center g-1">
            <img src={book.image} alt={book.name} />
            <h3 className="text-center">{book.name}</h3>
            <p className="text-center">{book.author}</p>
        </div>
    );
}

export default BooksCard;
