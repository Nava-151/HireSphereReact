import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
    
    const token = sessionStorage.getItem("token")||useSelector((state: any) => state.user.token );
    
    return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
