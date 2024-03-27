import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import useFetchData from "../../functions/FetchData";

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

        const res = await fetch("http://localhost:5000/signin", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: formData.email, password: formData.password })});

        const data = await res.json();

        setCurrentUser(data);
        navigate("/");
        event.target.reset();
    }

    return (
        <div className="signin-form">

            <form onSubmit={handleSignIn} className="form flex flex-column align-center">
                <h1 className="mb-3">Sign In Form</h1>
                <input name="email" type="email" placeholder="Email" required />
                <input name="password" type="password" placeholder="Password" required />
                <p>Do not have account? <button onClick={() => navigate("/signup")} className="form-navigate">Sign Up</button></p>
                <button type="submit" className="mt-2">Sign In</button>
            </form>

        </div>
    );
}

export default Signin;
