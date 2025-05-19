
import { Outlet } from "react-router";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { Box } from "@mui/material";

const AppLayout = () => {
    return (
        <>
          <Box
            display="flex"
            flexDirection="column"
            minHeight="100vh"
        >
            <NavBar />
            <Outlet />
        </Box>
            
            <Footer />
        </>
    );
};

export default AppLayout;
