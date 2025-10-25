import { createBrowserRouter } from "react-router-dom";
import { MainLayout, DashboardLayout } from "../layouts";
import Home from "../components/Home.jsx";
import ProductGallery from "../components/ProductGallery.jsx";
import ProductDetail from "../components/ProductDetail.jsx";
import About from "../pages/About.jsx";
import Contact from "../pages/Contact.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import Overview from "../components/dashboard/dashboard-sections/Overview.jsx";
import Products from "../components/dashboard/dashboard-sections/Products.jsx";
import Orders from "../components/dashboard/dashboard-sections/Orders.jsx";
import Customers from "../components/dashboard/dashboard-sections/Customers.jsx";
import Analytics from "../components/dashboard/dashboard-sections/Analytics.jsx";
import Shipping from "../components/dashboard/dashboard-sections/Shipping.jsx";
import Payments from "../components/dashboard/dashboard-sections/Payments.jsx";
import Notifications from "../components/dashboard/dashboard-sections/Notifications.jsx";
import Settings from "../components/dashboard/dashboard-sections/Settings.jsx";

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
        ],
    },
    {
        path: "/dashboard",
        element: <DashboardLayout />,
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
        ],
    },
]);

export default router;