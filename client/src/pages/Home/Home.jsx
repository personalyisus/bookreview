import { useUserContext } from "../../context/UserContext";

function Home() {
    const { currentUser } = useUserContext();
    return (
        <div>
            Welcome {currentUser?.firstName} 
        </div>
    );
}

export default Home;
