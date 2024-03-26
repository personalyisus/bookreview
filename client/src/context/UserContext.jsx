import React, { useState, useEffect, useContext } from "react";

const UserContext = React.createContext();

export function useUserContext () {
    return useContext(UserContext);
} 

function UserContextProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("currentUser")) || null);

    useEffect(() => {
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }, [currentUser]);

    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;
