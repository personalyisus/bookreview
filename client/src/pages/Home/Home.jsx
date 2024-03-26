import { useContext } from "react";
import BookContext from "../../context/BookContext";

function Home() {
    const { currentUser } = useContext(BookContext);
    return (
        <div>
            Welcome {currentUser?.firstName} 
        </div>
    );
}

export default Home;
