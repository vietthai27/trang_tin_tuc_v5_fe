import HomePage from "../Pages/HomePage/HomePage";
import ManagementPage from "../Pages/ManagementPage/ManagementPage";
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
    },
      {
        path: "/assignment-page",
        element: <ManagementPage />,
        roles: ["ADMIN"]
    }
];
