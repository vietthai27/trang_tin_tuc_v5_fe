import { Outlet } from "react-router-dom";
import NotAuthorizePage from "../../Pages/NotAuthorizePage/NotAuthorizePage";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = (prop) => {
    const token = localStorage.getItem('token')
    if (token) {
        const decodeToken = jwtDecode(token)
        const isAdmin = decodeToken.roles.find((item) => (item.authority === prop.role))
        if (isAdmin) {
            return <Outlet />
        } else return <NotAuthorizePage />
    } else return <NotAuthorizePage />
}

export default ProtectedRoute