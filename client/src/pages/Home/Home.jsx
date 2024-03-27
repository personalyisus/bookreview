import { useUserContext } from "../../context/UserContext";

function Home() {
    const { currentUser } = useUserContext();
    return (
        <div>
            {currentUser ? <h1>Welcome {currentUser.firstName}</h1> : <h1>Not logged in</h1>} 
        </div>
    );
}

export default Home;
