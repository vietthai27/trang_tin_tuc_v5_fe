import { jwtDecode } from "jwt-decode";
import NotAuthorizePage from "./Pages/NotAuthorizePage/NotAuthorizePage";

const ProtectedRoute = ({ role, element }) => {
  const token = localStorage.getItem("token");
  if (!token) return <NotAuthorizePage />;

  try {
    const decoded = jwtDecode(token);
    const userRoles = decoded.roles?.map(r => r.authority) || [];
    const allowedRoles = Array.isArray(role) ? role : [role];
    const hasAccess = allowedRoles.some(r => userRoles.includes(r));
    return hasAccess ? element : <NotAuthorizePage />;
  } catch (e) {
    return <NotAuthorizePage />;
  }
};

export default ProtectedRoute