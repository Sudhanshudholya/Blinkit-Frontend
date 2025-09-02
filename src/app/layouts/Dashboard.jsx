import React from "react";
import UserMenu from "../components/UserMenu";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const user = useSelector(state => state?.user)

  console.log("DASHBOARD-USER",  user)
  return (
    <section className="bg-white">
      <div className="container mx-auto p-3 grid lg:grid-cols-[250px_minmax(900px,_1fr)_100px] gap-4">
        {/* Left part for menu */}
        <div className="py-4 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto hidden lg:block border-r">
          <UserMenu />
        </div>

        {/* Right part for content  */}
        <div className="bg-white min-h-[75vh] ">
          <Outlet/>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
