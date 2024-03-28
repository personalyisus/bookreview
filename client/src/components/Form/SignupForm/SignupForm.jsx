import { NavLink } from "react-router-dom";

function SignupForm({ handleSignUp }) {
    return (
        <div className="signup-form">

            <form onSubmit={handleSignUp} className="form flex flex-column align-center">
                <h1 className="mb-3">Sign Up Form</h1>
                <input name="firstName" type="text" placeholder="First Name" required />
                <input name="lastName" type="text" placeholder="Last Name" required />
                <input name="email" type="email" placeholder="Email" required />
                <input name="password" type="password" placeholder="Password" required />
                <p>Already signed up? <NavLink exact to="/signin" className="form-navigate">Sign In</NavLink></p>
                <button type="submit" className="mt-2">Sign Up</button>
            </form>

        </div>
    );
}

export default SignupForm;
