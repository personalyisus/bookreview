import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BookContext from "../../context/BookContext";
import axios from "axios";
import "./Signup.css";

function Signup({ setSignup }) {
    const navigate = useNavigate();
    const { setCurrentUser } = useContext(BookContext);
    const [form, setForm] = useState("signup");
    const [users, setUsers] = useState([]);

    const handleSignUp = async (event) => {
        event.preventDefault();

        const formData = Object.fromEntries(new FormData(event.target));
        
        fetch("http://localhost:5000/signup", { method: "POST", headers: {"Content-Type": "application/json",}, body: JSON.stringify(formData),})
            .then(res => res.json())
            .then(data => console.log("Success", data))
            .catch(err => console.log("Error", err));
    
        setForm("signin");
        event.target.reset();
    }

    async function fetchData(url) {
        try {
            const res = await axios.get(url);
            setUsers(res.data);
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchData("http://localhost:5000/users");
    }, []);

    const handleSignIn = async (event) => {
        event.preventDefault();

        const formData = Object.fromEntries(new FormData(event.target));

        const success = users.find(user => user.email === formData.email && user.password === formData.password);
        if (!success) {
            alert("There is no such user! Try again");
            return;
        }
        setSignup(false);
        setCurrentUser(success);
        navigate("/");
        event.target.reset();
    }

    return (
        <>
            {form === "signup" && (
                <form onSubmit={handleSignUp} className="signin-form flex flex-column align-center">
                    <h1 className="color-blue mb-3">Sign Up Form</h1>
                    <input name="firstName" type="text" placeholder="First Name" required />
                    <input name="lastName" type="text" placeholder="Last Name" required />
                    <input name="email" type="email" placeholder="Email" required />
                    <input name="password" type="password" placeholder="Password" required />
                    <p>Already signed up? <button onClick={() => setForm("signin")} className="form-navigate">Sign In</button></p>
                    <button type="submit" className="mt-2">Sign Up</button>
                </form>
            )}
            {form === "signin" && (
                <form onSubmit={handleSignIn} className="signin-form flex flex-column align-center">
                    <h1 className="color-blue mb-3">Sign In Form</h1>
                    <input name="email" type="email" placeholder="Email" required />
                    <input name="password" type="password" placeholder="Password" required />
                    <p>Do not have account? <button onClick={() => setForm("signup")} className="form-navigate">Sign Up</button></p>
                    <button type="submit" className="mt-2">Sign In</button>
                </form>
            )}
        </>
    );
}

export default Signup;
