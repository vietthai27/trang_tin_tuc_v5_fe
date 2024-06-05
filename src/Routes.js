import HomePage from "./Pages/HomePage/HomePage";
import UserList from "./Pages/UserListPage/UserList";

const routes = [
    {
        path: "/",
        element: <HomePage />
    },
    {
        path: "/userList",
        element: <UserList />
    },
]

export default routes