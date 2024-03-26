import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import BookContext from "../../../context/BookContext";
import "./ProfileDropdown.css";

const dropdown = ["Profile", "Books", "Accesibility", "Settings"];

function ProfileDropDown() {
    const navigate = useNavigate();

    const { setCurrentUser } = useContext(BookContext);

    const handleSignout = () => {
        setCurrentUser(null);
        localStorage.setItem("currentUser", null);
        navigate("/");
    }

    return (
        <div className="dropdown">
            {dropdown.map(element => (
                <p onClick={() => navigate(`/${element.toLowerCase()}`)} key={element}>{element}</p>
            ))}
            <p onClick={handleSignout}>Sign Out</p>
        </div>
    );
}

export default ProfileDropDown;
