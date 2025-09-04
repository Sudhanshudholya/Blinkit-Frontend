import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./app/components/Footer";
import Header from "./app/components/Header";
import toast, { Toaster } from "react-hot-toast";
import { useGetUserDetailsQuery } from "./app/services/userDetailsSlice";
import { setUserDetails } from "./app/store/userSlice";
import { setAllCategory } from "./app/store/productSlice";
import { useDispatch } from "react-redux";
import { useGetCategoryQuery } from "./app/services/getCategorySlice";

const App = () => {

  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("accessToken");
  const { data: userData,error,isLoading,isError,isSuccess} = useGetUserDetailsQuery(undefined, { skip: !accessToken });
  const {data: categoryData, error: categoryError, isLoading: categoryIsLoading, isError: categoryIsError, isSuccess: categoryIsSuccess} = useGetCategoryQuery();

  useEffect(() => {
    if (isSuccess && userData) {
      dispatch(setUserDetails(userData?.data));
    }
    if (error) {
      toast.error("Failed to fetch user details");
    }
  }, [isSuccess, userData, error, dispatch]);

  useEffect(() => {
    if (categoryIsSuccess && categoryData) {
      dispatch(setAllCategory(categoryData?.data));
    }
    if (categoryError) {
      toast.error("Failed to fetch category details");
    }
  }, [categoryIsSuccess, categoryData, categoryError, dispatch]);

  if (isLoading || categoryIsLoading) return <div>Loading...</div>;

  if (isError || categoryIsError) {
  return (
    <div>
      Error: {error?.data?.message || categoryError?.data?.message || error?.error || "Unknown error"}
    </div>
  );
}


  return (
    <div>
      <Header />
      <main className="min-h-[78vh]">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
};

export default App;
