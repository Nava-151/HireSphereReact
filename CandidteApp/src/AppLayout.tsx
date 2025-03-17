import { Outlet } from "react-router"
import Home from "./components/Home"
import NavBar from "./components/NavBar"

const AppLayout = () => {

    return (
        <>
            <NavBar />
            <Home />
            <Outlet />
        </>
    )

}
export default AppLayout