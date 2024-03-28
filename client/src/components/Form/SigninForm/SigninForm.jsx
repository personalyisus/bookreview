import { NavLink } from "react-router-dom";

function SigninForm({ handleSignIn }) {
    return (
        <div className="signin-form">

            <form onSubmit={handleSignIn} className="form flex flex-column align-center">
                <h1 className="mb-3">Sign In Form</h1>
                <input name="email" type="email" placeholder="Email" required />
                <input name="password" type="password" placeholder="Password" required />
                <p>Do not have account? <NavLink exact to="/signup" className="form-navigate">Sign Up</NavLink></p>
                <button type="submit" className="mt-2">Sign In</button>
            </form>

        </div>
    );
}

export default SigninForm;
