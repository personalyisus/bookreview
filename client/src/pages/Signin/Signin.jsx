import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import useFetchData from "../../functions/FetchData";
import SigninForm from "../../components/Form/SigninForm/SigninForm";

function Signin() {
    const navigate = useNavigate();
    const { setCurrentUser } = useUserContext();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        useFetchData("http://localhost:5000/users", (data) => {
            setUsers(data);
        });
    }, []);

    const handleSignIn = async (event) => {
        event.preventDefault();
        const formData = Object.fromEntries(new FormData(event.target));

        const success = users.find(user => user.email === formData.email && user.password === formData.password);
        if (!success) {
            alert("There is no such user!");
            return;
        }

        const res = await fetch("http://localhost:5000/signin", { 
            method: "POST", 
            headers: { "Content-Type": "application/json" }, 
            body: JSON.stringify({ 
                email: formData.email, 
                password: formData.password 
            })});

        const data = await res.json();

        setCurrentUser(data);
        navigate("/");
        event.target.reset();
    }

    return (
        <SigninForm handleSignIn={handleSignIn} />
    );
}

export default Signin;
