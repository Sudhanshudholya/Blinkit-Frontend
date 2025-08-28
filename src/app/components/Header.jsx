import React from "react";
import logo from "../../assets/logo.png";
import Search from "./Search";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegUser, FaUserCircle } from "react-icons/fa";
import useMobile from "../hooks/useMobile";
import { BsCart4 } from "react-icons/bs";

const Header = () => {
  const [isMobile] = useMobile();
  const location = useLocation();
  const navigate = useNavigate()

  const isSearchPage = location.pathname == "/search";

  const redirectToLoginPage = () => {
    navigate("/login")
  }

  return (
    <header className=" h-24 lg:h-20 lg:shadow-md sticky top-0  flex flex-col justify-center gap-1 bg-white">
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

            <button className="text-neutral-600 lg:hidden">
              <FaRegUser size={26} />
            </button>

            {/* Display */}
            <div className="hidden lg:flex items-center gap-11">
              <button onClick={redirectToLoginPage} className="cursor-pointer text-lg px-2"> Login </button>
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
