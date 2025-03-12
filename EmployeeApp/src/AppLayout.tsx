import { Outlet } from "react-router"
import Connect from "./connection/connect"

const AppLayout = () => {

    return (
        <>
            <Connect />
            <Outlet />
        </>
    )

}
export default AppLayout