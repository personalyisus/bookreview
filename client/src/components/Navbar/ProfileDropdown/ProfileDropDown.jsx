import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../../context/UserContext";
import "./ProfileDropdown.css";

const dropdown = ["Profile", "Books", "Accesibility", "Settings"];

function ProfileDropDown() {
    const navigate = useNavigate();
    const { currentUser, setCurrentUser } = useUserContext();

    const handleSignout = async () => {
        const res = await fetch("http://localhost:5000/signout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: currentUser.id })
        });

        const data = await res.json();


        setCurrentUser(null);
        localStorage.setItem("currentUser", null);
        navigate("/signin");
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
