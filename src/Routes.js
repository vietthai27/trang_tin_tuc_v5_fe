import HomePage from "./Pages/HomePage/HomePage";
import MenuListPage from "./Pages/MenuListPage/MenuListPage";
import NewsDetailPage from "./Pages/NewsDetailPage/NewsDetailPage";
import AddNewsListPage from "./Pages/NewsListPage/AddNewsListPage";
import EditNewsListPage from "./Pages/NewsListPage/EditNewsListPage";
import NewsListPage from "./Pages/NewsListPage/NewsListPage";
import NewsSubMenuPage from "./Pages/NewsListPage/NewsSubMenuPage";
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
    {
        path: "/newsDetail/:id",
        element: <NewsDetailPage />
    },
    {
        path: "/newsBySubmenu/:id/:subMenu",
        element: <NewsSubMenuPage />
    }
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
    {
        path: "/addNewsPaperList",
        element: <AddNewsListPage/>
    },
    {
        path: "/editNewsPaperList/:id",
        element: <EditNewsListPage/>
    },
]
