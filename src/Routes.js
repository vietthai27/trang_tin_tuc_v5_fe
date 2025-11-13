import AccountPage from "./Pages/AccountPage/AccountPage";
import BillPage from "./Pages/BillPage/BillPage";
import NotAuthorizePage from "./Pages/NotAuthorizePage/NotAuthorizePage";

export const routes = [
    {
        path: "/",
        element: <AccountPage />
    },
    {
        path: "/notAuthorize",
        element: <NotAuthorizePage />
    },
    {
        path: "/account-list",
        element: <AccountPage />
    },
    {
        path: "/bill",
        element: <BillPage />
    }
]

