import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
    const token = useSelector((state: any) => state.user.token
    )||localStorage.getItem("token"); 
    return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

