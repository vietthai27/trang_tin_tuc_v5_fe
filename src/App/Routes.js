import HomePage from "../Pages/HomePage/HomePage";
import UserPage from "../Pages/UserPage/UserPage";

export const publicRoutes = [
    {
        path: "/",
        element: <HomePage />
    }
]

export const protectedRoutes = [
    {
        path: "/user-page",
        element: <UserPage />,
        roles: ["ADMIN"]
    }
];
