import React, { useState, useContext } from "react";

const BookContext = React.createContext();

export function useBookContext() {
    return useContext(BookContext);
}

function BookContextProvider({ children }) {
    const [search, setSearch] = useState(null);

    return (
        <BookContext.Provider value={{ search, setSearch }}>
            {children}
        </BookContext.Provider>
    );
}

export default BookContextProvider;
