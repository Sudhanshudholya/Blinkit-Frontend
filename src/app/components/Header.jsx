import React, { useState } from "react";
import logo from "../../assets/logo.png";
import Search from "./Search";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegUser, FaUserCircle } from "react-icons/fa";
import useMobile from "../hooks/useMobile";
import { BsCart4 } from "react-icons/bs";
import { useSelector } from "react-redux";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import UserMenu from "./UserMenu";

const Header = () => {
  const [isMobile] = useMobile();
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user);
  const [openUserMenu, setOpenUserMenu] = useState(false);

  console.log("User-Details-From-Headers", user);

  const isSearchPage = location.pathname == "/search";

  const redirectToLoginPage = () => {
    navigate("/login");
  };

  const handleCloseUser = () => {
    setOpenUserMenu(false);
  };

const  handleMobileUser = ()  => {
  // Check if user is logged in (i.e. user has a valid _id)
  if(!user?._id){
     // If not logged in, redirect to the login page
    navigate("/login")
  }{
    // If user is logged in, navigate to the user-menu page
    navigate("user-menu")
  }
}



  return (
    <header className=" h-24 lg:h-20 lg:shadow-md sticky top-0 z-40 flex flex-col justify-center gap-1 bg-white">
      {!(isSearchPage && isMobile) && (
        <div className="container mx-auto items-center flex px-2 justify-between ">
          {/* Logo */}
          <div className="h-full">
            <Link to={"/"} className="h-full flex justify-center items-center">
              <img
                src={logo}
                width={170}
                height={60}
                alt="logo"
                className="hidden lg:block"
              />
              <img
                src={logo}
                width={120}
                height={60}
                alt="logo"
                className=" lg:hidden"
              />
            </Link>
          </div>

          {/* Search  */}

          <div className="hidden lg:block">
            <Search />
          </div>

          {/* Login and my cart  */}
          <div className="">
            {/* User icons display in only mobile version */}

            <button
              className="text-red-600 lg:hidden cursor-pointer"
              onClick={handleMobileUser}
              
            >
              <FaRegUser size={26} />
            </button>

            {/* Desktop */}
            <div className="hidden lg:flex items-center gap-11">
              {user?._id ? (
                <div className="relative">
                  <div
                    onClick={() => setOpenUserMenu(!openUserMenu)}
                    className="flex select-none items-center gap-2 cursor-pointer"
                  >
                    <p>Account</p>
                    {openUserMenu ? (
                      <GoTriangleUp size={25} />
                    ) : (
                      <GoTriangleDown size={25} />
                    )}
                  </div>
                  {openUserMenu && (
                    <div className="absolute right-0 top-13">
                      <div className="bg-white rounded p-4 min-w-52 lg:shadow-lg ">
                        <UserMenu close={handleCloseUser} />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={redirectToLoginPage}
                  className="cursor-pointer text-lg px-2"
                >
                  {" "}
                  Login{" "}
                </button>
              )}
              <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-3 rounded-2xl text-amber-50 cursor-pointer ">
                {/* {add to cart icon} */}
                <div className="animate-spin">
                  <BsCart4 size={26} />
                </div>

                <div className="font-semibold">
                  <p>My cart</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-2 lg:hidden">
        <Search />
      </div>
    </header>
  );
};

export default Header;
