import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import { useBookContext } from "../../context/BookContext";
import { useTheme } from "../../context/ThemeContext";
import ProfileDropDown from "./ProfileDropdown/ProfileDropDown";
import "./navbar.css";

import { FaSun } from "react-icons/fa";
import { FaMoon } from "react-icons/fa";

function Navbar() {
    const navigate = useNavigate();
    const { setSearch } = useBookContext();
    const { currentUser } = useUserContext();
    const { theme, handleTheme } = useTheme();

    const [drowdown, setDropdown] = useState(false);

    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    useEffect(() => {
        document.body.className = theme ? "dark" : "light";
    }, [theme]);


    const [profile, setProfile] = useState(currentUser?.firstName?.charAt(0).toUpperCase());

    const handleMouseOver = () => {
        setProfile(currentUser?.firstName);
    }

    const handleMouseLeave = () => {
        setProfile(currentUser?.firstName?.charAt(0).toUpperCase());
    }

    return (
        <>
            <nav className="navbar flex align-center justify-space-between">
                <NavLink to="/" className="link">
                    <h1>BookReview</h1>
                </NavLink>
                <div>
                    <form>
                        <input onChange={handleSearch} type="search" placeholder="Search..." />
                    </form>
                </div>
                <div className="navbar-right flex align-center g-3">
                    <NavLink to="/books" className="link">
                        Books
                    </NavLink>

                    {currentUser ? (
                        <div onClick={() => setDropdown(!drowdown)} style={{backgroundColor: currentUser.profileColor}} className="profile flex align-center justify-center">
                            <h2 onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>{profile}</h2>
                            
                            {drowdown 
                            ? <ProfileDropDown />
                            : null
                            }

                        </div>
                    )
                    : <button onClick={() => navigate("/signin")}>Sign In</button>
                    }

                    <div className="theme-container">
                        <button onClick={handleTheme} className="theme-toggle">
                            {theme ? <FaSun /> : <FaMoon />}
                        </button>
                    </div>

                </div>
            </nav>
        </>
    );
}

export default Navbar;
