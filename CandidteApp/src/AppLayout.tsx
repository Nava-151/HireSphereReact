
import { Outlet } from "react-router";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { Box } from "@mui/material";

const AppLayout = () => {
    return (
        <>
            <NavBar />
            <Outlet />
            <Box sx={{ height: "350px" }}></Box>
            <Footer />
        </>
    );
};

export default AppLayout;
