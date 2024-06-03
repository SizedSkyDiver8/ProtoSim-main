import { Outlet } from "react-router-dom"
import MessagesTable from "./Table"

function MainScreen() {
    return (
        <div className="container">
             <MessagesTable />
             <Outlet />
        </div>

    )
}

export default MainScreen
