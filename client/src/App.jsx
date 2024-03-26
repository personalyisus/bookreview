import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import BookContext from "./context/BookContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Books from "./pages/Books/Books";
import Book from "./pages/Book";

function App() {
    const [search, setSearch] = useState(null);
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("currentUser")) || null);
 
    useEffect(() => {
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }, [currentUser]);

    // connect context then browser works

    return (
        <>
            <BookContext.Provider value={{ search, setSearch, currentUser, setCurrentUser }}>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/books" element={<Books />} />
                    <Route path="/books/:id" element={<Book />} />
                </Routes>
            </BookContext.Provider>
        </>
    );
}

export default App;
