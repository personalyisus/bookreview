import { Route, Routes } from "react-router-dom";
import UserContextProvider from "./context/UserContext";
import BookContextProvider from "./context/BookContext";
import ThemeProvider from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Books from "./pages/Books/Books";
import Book from "./pages/Book";

function App() {
    return (
        <>
            <ThemeProvider>
                <UserContextProvider>
                    <BookContextProvider>
                        <Navbar />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/books" element={<Books />} />
                            <Route path="/books/:id" element={<Book />} />
                        </Routes>
                    </BookContextProvider>
                </UserContextProvider>
            </ThemeProvider>
        </>
    );
}

export default App;
