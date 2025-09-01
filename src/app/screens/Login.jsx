import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../services/loginSlice";
import { useDispatch } from "react-redux";
import { useGetUserDetailsQuery } from "../services/userDetailsSlice";
import { setUserDetails } from "../store/userSlice";
import { useRefreshTokenMutation } from "../services/refreshTokenSlice";

const Login = () => {
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  // const { data: userData } = useGetUserDetailsQuery();
  const token = localStorage.getItem("accessToken");
  const { data: userData, refetch } = useGetUserDetailsQuery(undefined, {
    skip: !token,
  });

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const togglePassword = () => setShowPassword(!showPassword);

  const validate = Object.values(data).every((ele) => ele);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await login({
        email: data?.email,
        password: data?.password,
      }).unwrap();

      if (res) {
        toast.success("User Login successfully");
        localStorage.setItem(
          "accessToken",
          res?.data?.accessToken || res?.accessToken
        );
        localStorage.setItem(
          "refreshToken",
          res?.data?.refreshToken || res?.refreshToken
        );

        refetch()
      }
      setData({
        email: "",
        password: "",
      });
      navigate("/");
    } catch (error) {
      // All errors handled here, no success toast can reach here
      toast.error(
        error?.data?.message || "Login failed. Please try again later."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">
        <p className="text-center">Login</p>
        <form className="grid gap-4 mt-6" onSubmit={handleSubmit}>
          {/* Email */}
          <div className="grid gap-1">
            <label htmlFor="email">Email :</label>
            <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200">
              <FiMail className="text-gray-400 mr-2" />
              <input
                type="email"
                id="email"
                className="w-full bg-transparent outline-none"
                name="email"
                value={data.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </div>
          </div>

          {/* Password */}
          <div className="grid gap-1">
            <label htmlFor="password">Password :</label>
            <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200">
              <FiLock className="text-gray-400 mr-2" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full bg-transparent outline-none"
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
              <div
                onClick={togglePassword}
                className="ml-2 cursor-pointer text-gray-400"
              >
                {showPassword ? <FiEye /> : <FiEyeOff />}
              </div>
            </div>
            <Link
              to={"/forgot-password"}
              className="block ml-auto text-blue-500 hover:text-sky-800"
            >
              Forgot Password
            </Link>
          </div>

          {/* Submit Button */}
          <button
            disabled={!validate || isSubmitting}
            className={`${
              validate ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"
            } text-white py-2 rounded font-semibold my-3 tracking-wide cursor-pointer`}
          >
            Login
          </button>
        </form>

        <p className="text-center">
          Don't have an account ?{" "}
          <Link
            to={"/register"}
            className="font-semibold text-green-700 hover:text-green-800"
          >
            Register
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
