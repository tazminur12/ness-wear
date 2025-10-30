import { createBrowserRouter } from "react-router-dom";
import { MainLayout, DashboardLayout } from "../layouts";
import ProtectedRoute from "../components/ProtectedRoute";
import Home from "../components/Home.jsx";
import ProductGallery from "../components/ProductGallery.jsx";
import ProductDetail from "../components/ProductDetail.jsx";
import About from "../pages/About.jsx";
import Contact from "../pages/Contact.jsx";
import Login from "../pages/Login.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import AddProduct from "../pages/Dashboard/Products/AddProduct.jsx";
import EditProduct from "../pages/Dashboard/Products/EditProduct.jsx";
import Clothes from "../pages/Clothes.jsx";
import Shoes from "../pages/Shoes.jsx";
import Accessories from "../pages/Accessories.jsx";
import Overview from "../components/dashboard/dashboard-sections/Overview.jsx";
import Products from "../pages/Dashboard/Products/Products.jsx";
import Orders from "../components/dashboard/dashboard-sections/Orders.jsx";
import Customers from "../components/dashboard/dashboard-sections/Customers.jsx";
import Analytics from "../components/dashboard/dashboard-sections/Analytics.jsx";
import Shipping from "../components/dashboard/dashboard-sections/Shipping.jsx";
import Payments from "../components/dashboard/dashboard-sections/Payments.jsx";
import Notifications from "../components/dashboard/dashboard-sections/Notifications.jsx";
import Settings from "../components/dashboard/dashboard-sections/Settings.jsx";
// Category imports
import Categories from "../pages/Dashboard/Category/Categories.jsx";
import AddCategory from "../pages/Dashboard/Category/AddCategory.jsx";
import EditCategory from "../pages/Dashboard/Category/EditCategory.jsx";
import CategoryDetail from "../pages/Dashboard/Category/CategoryDetail.jsx";
import SubCategories from "../pages/Dashboard/Category/SubCategories.jsx";
import AddSubCategory from "../pages/Dashboard/Category/AddSubCategory.jsx";
import EditSubCategory from "../pages/Dashboard/Category/EditSubCategory.jsx";
import SubCategoryDetail from "../pages/Dashboard/Category/SubCategoryDetail.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/products",
                element: <ProductGallery />,
            },
            {
                path: "/product/:id",
                element: <ProductDetail />,
            },
            {
                path: "/about",
                element: <About />,
            },
            {
                path: "/contact",
                element: <Contact />,
            },
            {
                path: "/clothes",
                element: <Clothes />,
            },
            {
                path: "/shoes",
                element: <Shoes />,
            },
            {
                path: "/accessories",
                element: <Accessories />,
            },
        ],
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/dashboard",
        element: <ProtectedRoute><DashboardLayout /></ProtectedRoute>,
        children: [
            {
                path: "/dashboard",
                element: <Dashboard />,
            },
            {
                path: "/dashboard/overview",
                element: <Overview />,
            },
            {
                path: "/dashboard/products",
                element: <Products />,
            },
            {
                path: "/dashboard/products/add",
                element: <AddProduct />,
            },
            {
                path: "/dashboard/products/edit/:id",
                element: <EditProduct />,
            },
            {
                path: "/dashboard/orders",
                element: <Orders />,
            },
            {
                path: "/dashboard/customers",
                element: <Customers />,
            },
            {
                path: "/dashboard/analytics",
                element: <Analytics />,
            },
            {
                path: "/dashboard/shipping",
                element: <Shipping />,
            },
            {
                path: "/dashboard/payments",
                element: <Payments />,
            },
            {
                path: "/dashboard/notifications",
                element: <Notifications />,
            },
            {
                path: "/dashboard/settings",
                element: <Settings />,
            },
            // Category routes
            {
                path: "/dashboard/categories",
                element: <Categories />,
            },
            {
                path: "/dashboard/categories/add",
                element: <AddCategory />,
            },
            {
                path: "/dashboard/categories/edit/:id",
                element: <EditCategory />,
            },
            {
                path: "/dashboard/categories/:id",
                element: <CategoryDetail />,
            },
            // SubCategory routes
            {
                path: "/dashboard/subcategories",
                element: <SubCategories />,
            },
            {
                path: "/dashboard/subcategories/add",
                element: <AddSubCategory />,
            },
            {
                path: "/dashboard/subcategories/edit/:id",
                element: <EditSubCategory />,
            },
            {
                path: "/dashboard/subcategories/:id",
                element: <SubCategoryDetail />,
            },
        ],
    },
]);

export default router;