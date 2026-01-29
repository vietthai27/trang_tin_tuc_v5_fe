import CategoryNewsPage from "../Pages/CategoryNewsPage/CategoryNewsPage";
import CategoryPage from "../Pages/CategoryPage/CategoryPage";
import HomePage from "../Pages/HomePage/HomePage";
import ManagementPage from "../Pages/ManagementPage/ManagementPage";
import NewsDetailPage from "../Pages/NewsDetailPage/NewsDetailPage";
import NewsManageAdd from "../Pages/NewsManagePage/NewsManageAdd";
import NewsManageEdit from "../Pages/NewsManagePage/NewsManageEdit";
import NewsManageList from "../Pages/NewsManagePage/NewsManageList";
import SubCategoryPage from "../Pages/SubCategoryPage/SubCategoryPage";
import UserPage from "../Pages/UserPage/UserPage";

export const publicRoutes = [
    {
        path: "/",
        element: <HomePage />
    },
    {
        path: "/category-news/:id",
        element: <CategoryNewsPage />
    },
    {
        path: "/news-detail/:id",
        element: <NewsDetailPage/>
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
    },
    {
        path: "/menu-page",
        element: <CategoryPage />,
        roles: ["ADMIN","MODER"]
    },
    {
        path: "/sub-menu-page/:id",
        element: <SubCategoryPage />,
        roles: ["ADMIN","MODER"]
    },
    {
        path: "/news-manage-page",
        element: <NewsManageList />,
        roles: ["ADMIN","MODER"]
    },
    {
        path: "/news-manage-page-add",
        element: <NewsManageAdd />,
        roles: ["ADMIN","MODER"]
    },
    {
        path: "/news-manage-page-edit/:id",
        element: <NewsManageEdit />,
        roles: ["ADMIN","MODER"]
    }
];
