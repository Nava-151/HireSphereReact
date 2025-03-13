import { Outlet } from "react-router"
import Connect from "./components/connection/connect"
import { Home } from "@mui/icons-material"
import HomePage from "./components/HomePage"

const AppLayout = () => {

    return (
        <>
        
            <HomePage />
            <Outlet />
        </>
    )

}
export default AppLayout