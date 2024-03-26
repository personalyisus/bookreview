import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import { useBookContext } from "../../context/BookContext";
import Signup from "../Signup";
import ProfileDropDown from "./ProfileDropdown/ProfileDropDown";
import "./navbar.css";

function Navbar() {
    const { setSearch } = useBookContext();
    const { currentUser } = useUserContext();

    const [signup, setSignup] = useState(false);
    const [drowdown, setDropdown] = useState(false);

    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    return (
        <>
            <nav className="navbar flex align-center justify-space-between">
                <NavLink to="/" className="link">
                    <h1 className="logo">BookReview</h1>
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
                        <div onClick={() => setDropdown(!drowdown)} className="profile flex align-center justify-center">
                            <h2>{currentUser?.firstName?.charAt(0).toUpperCase()}</h2>
                            
                            {drowdown 
                            ? <ProfileDropDown />
                            : null
                            }

                        </div>
                    )
                    : <button onClick={() => setSignup(!signup)}>Sign Up</button>
                    }

                </div>
            </nav>

            {signup ? <Signup setSignup={setSignup}/> : null}            
        </>
    );
}

export default Navbar;
