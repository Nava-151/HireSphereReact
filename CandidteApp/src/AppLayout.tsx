// import { Outlet } from "react-router"
// import NavBar from "./components/NavBar"
// import Footer from "./components/Footer"

// const AppLayout = () => {

//     return (
//         <>
//             <div className="app-layout">
//                 <NavBar />
//                 <main className="app-main">
//                     <Outlet />
//                 </main>
//                 <Footer />
//             </div>
//         </>
//     )

// }
// export default AppLayout
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
