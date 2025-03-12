
import { createBrowserRouter } from "react-router";
import AppLayout from "./AppLayout";
import RegisterForm from "./connection/RegisterForm";
import LoginForm from "./connection/LoginForm";
import Connect from "./connection/connect";

export const Router = createBrowserRouter([
    {
        path: "",
        element: <><AppLayout /></>,
        children: [{ path: "connection", element: <><Connect /></> },
        { path: "/register", element: <><RegisterForm /></> }, { path: "/login", element: <><LoginForm /></> }]
    },
    { path: "connection", element: <><Connect /></> }

])




