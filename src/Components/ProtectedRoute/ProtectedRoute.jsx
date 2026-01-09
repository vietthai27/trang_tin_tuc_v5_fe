import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Forbiden from "../Forbiden/Forbiden";

export default function ProtectedRoute({ allowedRoles }) {

    const { userRoles } = useSelector(state => state.app);
    
    if (allowedRoles) {
        const hasRole = userRoles?.some(role =>
            allowedRoles.includes(role.authority)
        );

        if (!hasRole) {
            return <Forbiden/>
        }
    }

    return <Outlet />;
}
