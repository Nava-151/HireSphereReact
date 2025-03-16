import { Outlet } from "react-router"
import Home from "./components/Home"

const AppLayout = () => {

    return (
        <>
        
            <Home />
            <Outlet />
        </>
    )

}
export default AppLayout