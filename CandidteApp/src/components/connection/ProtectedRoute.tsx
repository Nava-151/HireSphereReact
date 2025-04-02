import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
    console.log(localStorage.getItem("token"));
    
    const token = localStorage.getItem("token")||useSelector((state: any) => state.user.token );
    
    return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
