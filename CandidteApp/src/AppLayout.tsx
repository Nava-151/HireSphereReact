import { Outlet } from "react-router"
import NavBar from "./components/NavBar"

const AppLayout = () => {

    return (
        <>
            <NavBar />
            {/* <Home /> */}
            {/* <Blog/> */}

            <Outlet />
        </>
    )

}
export default AppLayout