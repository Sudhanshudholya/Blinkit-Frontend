import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../../App";
import Home from "../screens/Home";
import SearchPage from "../screens/SearchPage";
import Register from "../screens/Register";
import Login from "../screens/Login";
import ForgotPassword from "../screens/ForgotPassword";
import OtpVerification from "../screens/OtpVerification";
import ResetPassword from "../screens/ResetPassword";
import UserMenuMobile from "../screens/UserMenuMobile";
import Dashboard from "../layouts/Dashboard";
import Profile from "../screens/Profile";
import MyOrders from "../screens/MyOrders";
import Address from "../screens/Address";
import CategoryPage from "../screens/CategoryPage";
import SubcategoryPage from "../screens/SubcategoryPage";
import UploadProducts from "../screens/UploadProducts";
import ProductAdmin from "../screens/ProductAdmin";
import AdminPermission from "../authentication/AdminPermission";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "otp-verification",
        element: <OtpVerification />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
      {
        path: "user-menu",
        element: <UserMenuMobile />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
        children: [
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "my-orders",
            element: <MyOrders />,
          },
          {
            path: "address",
            element: <Address />,
          },
          {
            path: "category",
            element: <AdminPermission><CategoryPage /></AdminPermission>,
          },
          {
            path: "sub-category",
            element: <AdminPermission><SubcategoryPage /></AdminPermission>,
          },
          {
            path: "upload-products",
            element: <AdminPermission><UploadProducts /></AdminPermission>,
          },
          {
            path: "products",
            element: <AdminPermission><ProductAdmin/></AdminPermission>,
          },
        ],
      },
    ],
  },
]);

export default router;
