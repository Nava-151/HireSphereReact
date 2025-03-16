
import { createBrowserRouter } from "react-router";
import AppLayout from "./AppLayout";
import RegisterForm from "./components/connection/RegisterForm";
import LoginForm from "./components/connection/LoginForm";
import HomePage from "./components/HomePage";
import Connect from "./components/connection/Connect";

export const Router = createBrowserRouter([
    {
        path: "",
        element: <><AppLayout /></>,
        children: [
            {path: "", element: <><HomePage /></>, children: [
            { path: "/connection", element: <><Connect /></> },
        { path: "/register", element: <><RegisterForm /></> }, { path: "/login", element: <><LoginForm /></> }]}]
    },
    { path: "connection", element: <><Connect /></> }

])




