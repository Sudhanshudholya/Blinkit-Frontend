import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../../App";
import Home from "../screens/Home";
import SearchPage from "../screens/SearchPage";
import Register from "../screens/Register";
import Login from "../screens/Login";
import ForgotPassword from "../screens/ForgotPassword";
import OtpVerification from "../screens/OtpVerification";
import ResetPassword from "../screens/ResetPassword";

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
        element: <ResetPassword/>
      }
    ],
  },
]);

export default router;
