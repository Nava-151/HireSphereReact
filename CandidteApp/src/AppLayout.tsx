
import { Outlet } from "react-router";
import { Box } from "@mui/material";
import NavBar from "./components/CompInAllPages/NavBar";
import Footer from "./components/CompInAllPages/Footer";
import ChatWidget from "./components/CompInAllPages/ChatWidget";

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
            <ChatWidget/>
            <Footer />
        </>
    );
};

export default AppLayout;
