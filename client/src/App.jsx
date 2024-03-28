import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import UserContextProvider from "./context/UserContext";
import BookContextProvider from "./context/BookContext";
import ThemeProvider from "./context/ThemeContext";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ProtectedRoutes from "./routes/ProtectedRoutes";

const Home = lazy(() => import("./pages/Home"));
const Books = lazy(() => import("./pages/Books"));
const Book = lazy(() => import("./pages/Book"));

function App() {
    return (
        <>
            <ThemeProvider>
                <UserContextProvider>
                    <BookContextProvider>
                        <Suspense fallback={<h1>Loading...</h1>}>
                            <Routes>
                                <Route exact path="/signin" element={<Signin />} />
                                <Route exact path="/signup" element={<Signup />} />
                                <Route element={<ProtectedRoutes />}>
                                    <Route exact path="/" element={<Home />} />
                                    <Route exact path="/books" element={<Books />} />
                                    <Route exact path="/books/:id" element={<Book />} />
                                </Route>
                            </Routes>
                        </Suspense>
                    </BookContextProvider>
                </UserContextProvider>
            </ThemeProvider>
        </>
    );
}

export default App;
