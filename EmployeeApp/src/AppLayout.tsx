import { Outlet } from "react-router"
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