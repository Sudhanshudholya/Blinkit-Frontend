import React, { useState } from "react";
import toast from "react-hot-toast";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../services/registerSlice";

const Register = () => {
  const navigate = useNavigate();
  const [register] = useRegisterMutation();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
  const toggleConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const validate = Object.values(data).every((ele) => ele);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
      toast.error("Password and confirm Password do not match");
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await register({
        name: data.name,
        email: data.email,
        password: data.password,
      }).unwrap();

      if (res) {
        toast.success("User register successfully");
        navigate("/login");
        setData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      } else {
        toast.error("Something went wrong to create user");
      }
    } catch (error) {
      if (error?.data?.message) {
        toast.error(error.data.message); // ✅ This line shows backend error like "Email already exists"
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">
        <p className="text-center">Welcome to Binkeyit</p>
        <form className="grid gap-4 mt-6" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="grid gap-1">
            <label htmlFor="name">Name :</label>
            <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200">
              <FiUser className="text-gray-400 mr-2" />
              <input
                type="text"
                id="name"
                autoFocus
                className="w-full bg-transparent outline-none"
                name="name"
                value={data.name}
                onChange={handleChange}
                placeholder="Enter your name"
              />
            </div>
          </div>

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
          </div>

          {/* Confirm Password */}
          <div className="grid gap-1">
            <label htmlFor="confirmPassword">Confirm Password :</label>
            <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200">
              <FiLock className="text-gray-400 mr-2" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                className="w-full bg-transparent outline-none"
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={handleChange}
                placeholder="Enter your confirm password"
              />
              <div
                onClick={toggleConfirmPassword}
                className="ml-2 cursor-pointer text-gray-400"
              >
                {showConfirmPassword ? <FiEye /> : <FiEyeOff />}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            disabled={!validate || isSubmitting}
            className={`${
              validate ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"
            } text-white py-2 rounded font-semibold my-3 tracking-wide`}
          >
            Register
          </button>
        </form>

        <p className="text-center">
          Already have account ?{" "}
          <Link
            to={"/login"}
            className="font-semibold text-green-700 hover:text-green-800"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
