import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Divider from "./Divider";
import toast from "react-hot-toast";
import { useLogoutMutation } from "../services/logOutSlice";
import { logout } from "../store/userSlice";
import { RiExternalLinkFill } from "react-icons/ri";
import isAdmin from "../utils/IsAdmin";

const UserMenu = ({ close }) => {
  const user = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const [logoutUser] = useLogoutMutation();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    const accessToken = localStorage.getItem("accessToken")

    if(!accessToken){
      toast.success("User already logged out")
      return
    }
    try {
      const res = await logoutUser().unwrap();
      if (res) {
        if (close) close();
        dispatch(logout());
        localStorage.clear();
        toast.success(res?.status || "User Logout successfully");
        navigate("/");
      }
    } catch (error) {
      toast.error(error || "Something went wrong to logout user");
    }
  };

  const handleClose = () => {
    if (close) {
      close();
    }
  };
  return (
    <div>
      <div className="font-bold">My account</div>
      <div className="font-sans flex items-center gap-1">
        <span className="max-w-52 text-ellipsis line-clamp-1">
          {" "}
          {user.name || user.mobile}{" "}
          <span className="bg-green-500 p-1 rounded-4xl text-white font-serif">{user.role == "ADMIN" ? "Admin" : "User"}</span>
        </span>
        <Link
          onClick={handleClose}
          to={"/dashboard/profile"}
          className="hover:text-blue-900"
        >
          <RiExternalLinkFill size={15} />
        </Link>
      </div>

      <Divider />

      <div className="text-sm grid gap-1">
        {isAdmin(user.role) && (
          <Link
            onClick={handleClose}
            to={"/dashboard/category"}
            className="px-2 hover:bg-orange-300 py-1"
          >
            Category
          </Link>
        )}

        {isAdmin(user.role) && (
          <Link
            onClick={handleClose}
            to={"/dashboard/sub-category"}
            className="px-2 hover:bg-orange-300 py-1"
          >
            Sub-Category
          </Link>
        )}

        {isAdmin(user.role) && (
          <Link
            onClick={handleClose}
            to={"/dashboard/upload-products"}
            className="px-2 hover:bg-orange-300 py-1"
          >
            Upload Product
          </Link>
        )}

        {isAdmin(user.role) && (
          <Link
            onClick={handleClose}
            to={"/dashboard/products"}
            className="px-2 hover:bg-orange-300 py-1"
          >
            Products
          </Link>
        )}

          <Link
            onClick={handleClose}
            to={"/dashboard/my-orders"}
            className="px-2 hover:bg-orange-300 py-1"
          >
            My Orders
          </Link>
       

      
          <Link
            onClick={handleClose}
            to={"/dashboard/address"}
            className="px-2 hover:bg-orange-300 py-1"
          >
            Save Address
          </Link>
     

        <button
          onClick={handleLogOut}
          className="text-left px-2 cursor-pointer hover:bg-orange-300 py-1"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
