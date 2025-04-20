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

const AppLayout = () => {
    return (
        <>
            <NavBar />
            <Outlet />

            <Footer />
        </>
    );
};

export default AppLayout;
