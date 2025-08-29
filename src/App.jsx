import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./app/components/Footer";
import Header from "./app/components/Header";
import toast, { Toaster } from "react-hot-toast";
import { useGetUserDetailsQuery } from "./app/services/userDetailsSlice";
import { setUserDetails } from "./app/store/userSlice";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  // const token = useSelector((state) => state?.user?.token);
  const token = localStorage.getItem("token");

  const { data, error, isSuccess, isLoading } = useGetUserDetailsQuery(undefined, {skip:!token});


  useEffect(() => {
    if (isSuccess && data) {
      toast.success("User details fetched");
      dispatch(setUserDetails(data?.data));
    }

    if (error) {
      toast.error("Failed to fetch user details");
    }
  }, [isSuccess, data, error]);

  if (isLoading) return <div>Loading...</div>;

  if (error) {
    const errorMsg = error?.data?.message || error?.error || "Unknown error";
    return <div>Error: {errorMsg}</div>;
  }

  return (
    <>
      <Header />
      <main className="min-h-[78vh]">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </>
  );
};

export default App;
