import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
    const token = useSelector((state: any) => state.user.token
    )||localStorage.getItem("token"); // בדיקה אם יש משתמש מחובר
    console.log(token+" IN INTERCEPTOR");
    
    return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

