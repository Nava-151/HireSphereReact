import { Outlet } from "react-router"
import NavBar from "./components/NavBar"

const AppLayout = () => {

    return (
        <>
            <NavBar />

            <Outlet />
        </>
    )

}
export default AppLayout