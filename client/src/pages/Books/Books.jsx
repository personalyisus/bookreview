import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useBookContext } from "../../context/BookContext";
import BooksCard from "../../components/BooksCard/BooksCard";
import useFetchData from "../../functions/FetchData";
import "./books.css";

function Books() {
    const navigate = useNavigate();
    const { search } = useBookContext();

    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);

    useEffect(() => {
        useFetchData(`http://localhost:5000/books`, (data) => {
            setBooks(data);
            setFilteredBooks(data);
        });
    }, []);

    useEffect(() => {
        let filtered = books;
        filtered = filtered.filter(book => book.name.toLowerCase().replaceAll(" ", "").includes(search.toLowerCase().replaceAll(" ", "")));
        setFilteredBooks(filtered);
    }, [search]);

    function handleNavigate(id) {
        navigate(`/books/${id}`);
    } 

    return (
        <div className="books-container">
            {filteredBooks.length > 0 ? (
                filteredBooks.map(book => (
                    <BooksCard key={book.id} book={book} handleNavigate={handleNavigate} />
                ))
            ) : (<h1>No books to display</h1>)}
        </div>
    );
}

export default Books;
