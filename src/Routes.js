import HomePage from "./Pages/HomePage/HomePage";
import MenuListPage from "./Pages/MenuListPage/MenuListPage";
import NewsListPage from "./Pages/NewsListPage/NewsListPage";
import NotAuthorizePage from "./Pages/NotAuthorizePage/NotAuthorizePage";
import SubMenuListPage from "./Pages/SubMenuListPage/SubMenuListPage";
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

export const protectedRoutesAdmin = [
    {
        path: "/userList",
        element: <UserList />
    },
    {
        path: "/menuList",
        element: <MenuListPage />
    },
    {
        path: "/subMenuList/:idCha/:tenDanhMuc",
        element: <SubMenuListPage/>
    },

]

export const protectedRoutesModer = [

    {
        path: "/newsPaperList",
        element: <NewsListPage/>
    },
]
