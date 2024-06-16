import HomePage from "./Pages/HomePage/HomePage";
import NotAuthorizePage from "./Pages/NotAuthorizePage/NotAuthorizePage";
import UserList from "./Pages/UserListPage/UserList";

export const routes = [
    {
        path: "/",
        element: <HomePage />
    },
    {
        path: "/notAuthorize",
        element: <NotAuthorizePage />
    },
]

export const protectedRoutes = [
    {
        path: "/userList",
        element: <UserList />
    },
]
