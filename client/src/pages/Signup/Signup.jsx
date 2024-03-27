import React from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

function Signup() {
    const navigate = useNavigate();

    const handleSignUp = async (event) => {
        event.preventDefault();
        const formData = Object.fromEntries(new FormData(event.target));
        
        fetch("http://localhost:5000/signup", { method: "POST", headers: {"Content-Type": "application/json",}, body: JSON.stringify(formData),})
            .then(res => res.json())
            .then(data => console.log("Success", data))
            .catch(err => console.log("Error", err));
    
        navigate("/signin");
        event.target.reset();
    }

    return (
        <div className="signup-form">

            <form onSubmit={handleSignUp} className="form flex flex-column align-center">
                <h1 className="mb-3">Sign Up Form</h1>
                <input name="firstName" type="text" placeholder="First Name" required />
                <input name="lastName" type="text" placeholder="Last Name" required />
                <input name="email" type="email" placeholder="Email" required />
                <input name="password" type="password" placeholder="Password" required />
                <p>Already signed up? <button onClick={() => navigate("/signin")} className="form-navigate">Sign In</button></p>
                <button type="submit" className="mt-2">Sign Up</button>
            </form>

        </div>
    );
}

export default Signup;
