

import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./AppLayout";
import RegisterForm from "./components/connection/RegisterForm";
import LoginForm from "./components/connection/LoginForm";
import Connect from "./components/connection/Connect";
import Blog from "./components/Blog";
import Home from "./components/Home";
import Gallery from "./components/Gallery";


export const isProtected=()=>{

}
export const router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            { path: "", element: <Home /> },
            { path: "blog", element: <Blog /> },
            { path: "connection", element: <Connect /> },
            { path: "register", element: <RegisterForm /> },
            { path: "login", element: <LoginForm /> },
            { path: "gallery", element: <Gallery /> }
        ],

    }
]);



