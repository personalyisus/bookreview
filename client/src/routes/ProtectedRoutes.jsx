import React from "react";
import { useUserContext } from "../context/UserContext";
import Navbar from "../components/Navbar/Navbar";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoutes() {
    const { currentUser } = useUserContext();

    return currentUser?.token ? (
        <>
            <Navbar/>
            <Outlet/>  
        </>
    ) 
    : <Navigate to="/signin" />;
}

export default ProtectedRoutes;
