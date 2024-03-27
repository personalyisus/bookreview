import React, { useState, useContext } from "react";

const ThemeContext = React.createContext();

export function useTheme() {
    return useContext(ThemeContext);
}

function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(false);

    const handleTheme = () => {
        setTheme(!theme);
    }

    return (
        <ThemeContext.Provider value={{ theme, handleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export default ThemeProvider;
