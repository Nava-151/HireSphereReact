

import { createBrowserRouter } from "react-router-dom";
import Blog from "./components/NavBarComponents/Blog";
import Gallery from "./components/NavBarComponents/Gallery";
import UploadFile from "./components/File/FileUploader";
import CodingChallenge from "./components/NavBarComponents/CodingChallenge";
import CompletionPage from "./components/NavBarComponents/CompletionPage";
import UpdateDetails from "./components/Candidate/UpdateDetails";
import ProtectedRoute from "./components/Connection/ProtectedRoute";
import AppLayout from "./AppLayout";
import FileUploadGuard from "./components/File/FileUploadGuard";
import VideoCall from "./components/NavBarComponents/VideoCall";
import Home from "./components/HomePage/Home";
import RegisterForm from "./components/Connection/RegisterForm";
import LoginForm from "./components/Connection/LoginForm";



 const Router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            { path: "", element: <Home /> },
            { path: "blog", element: <Blog /> },
            { path: "register", element: <RegisterForm /> },
            { path: "login", element: <LoginForm /> },
            { path: "gallery", element: <Gallery /> },
            {
                element: <ProtectedRoute />,
                children: [
                    
                    { path: "upload", element: <FileUploadGuard><UploadFile /></FileUploadGuard> },
                    { path: "tests", element: <CodingChallenge /> },
                    { path: "end", element: <CompletionPage /> },
                    { path: "updateDetails", element: <UpdateDetails /> },
                    {path:"interview", element:<VideoCall/>}
                ],
            }

        ],
    }
]);
export default Router;


