

import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./AppLayout";
import RegisterForm from "./components/connection/RegisterForm";
import LoginForm from "./components/connection/LoginForm";
import Blog from "./components/Blog";
import Home from "./components/Home";
import Gallery from "./components/Gallery";
import UploadFile from "./components/File/UploadFile";



export const Router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            { path: "", element: <Home /> },
            { path: "blog", element: <Blog /> },
            // { path: "connection", element: <Connect /> },
            { path: "register", element: <RegisterForm /> },
            { path: "login", element: <LoginForm /> },
            { path: "upload", element: <UploadFile /> },
            { path: "gallery", element: <Gallery /> }
            
        ],

    }
]);



