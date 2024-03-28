import React from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import SignupForm from "../../components/Form/SignupForm/SignupForm";

function Signup() {
    const navigate = useNavigate();

    const handleSignUp = async (event) => {
        event.preventDefault();
        const formData = Object.fromEntries(new FormData(event.target));
        
        fetch("http://localhost:5000/signup", { 
            method: "POST", 
            headers: {"Content-Type": "application/json",}, 
            body: JSON.stringify(formData),
        })
            .then(res => res.json())
            .then(data => console.log("Success", data))
            .catch(err => console.log("Error", err));
    
        navigate("/signin");
        event.target.reset();
    }

    return (
        <SignupForm handleSignUp={handleSignUp} />
    );
}

export default Signup;
