import React, { use, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./app/components/Footer";
import Header from "./app/components/Header";
import toast, { Toaster } from "react-hot-toast";
import { useGetUserDetailsQuery } from "./app/services/userDetailsSlice";
import { setUserDetails } from "./app/store/userSlice";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
  const dispatch = useDispatch();

  const accessToken = localStorage.getItem("accessToken");

  // const { data, isError, isSuccess, isLoading, error } = useGetUserDetailsQuery();

  const {
    data: userData,
    error,
    isSuccess,
    isLoading,
    isError,
    refetch,
  } = useGetUserDetailsQuery(undefined, { skip: !accessToken });

  useEffect(() => {
    if (isSuccess && userData) {
      dispatch(setUserDetails(userData?.data));
    }

    if (error) {
      toast.error("Failed to fetch user details");
    }
  }, [isSuccess, userData, error, dispatch]);

  if (isLoading) return <div>Loading user details...</div>;
  if (isError)
    return (
      <div>
        Error: {error?.userData?.message || error?.error || "Unknown error"}
      </div>
    );

  console.log("Access-Token bhej rahe Hain:", accessToken);
  console.log("User Details App Data:", userData);

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
