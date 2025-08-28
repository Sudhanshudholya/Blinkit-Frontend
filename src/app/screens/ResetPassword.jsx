import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff, FiLock, FiMail } from "react-icons/fi";
import { useResetPasswordMutation } from "../services/resetPasswordSlice";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetPassword] = useResetPasswordMutation();
  const [data, setData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (!location?.state?.success) {
      navigate("/");
    }

    if (location?.state?.email) {
      setData((prev) => {
        return {
          ...prev,
          email: location?.state?.email,
        };
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const validate = Object.values(data).every((ele) => ele);

  const togglePassword = () => setShowPassword(!showPassword);
  const toggleConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    if (data.newPassword !== data.confirmPassword) {
      toast.error("New pasword and confirm password is not match");
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await resetPassword({
        email: data?.email,
        newPassword: data?.newPassword,
        confirmPassword: data?.confirmPassword,
      }).unwrap();

      if (res) {
        toast.success("Password Change Successfully");
        navigate("/login");
        setData({
          email: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
    } catch (error) {
      if (error?.data?.message) {
        toast.error(error.data.message); // ✅ This line shows backend error like "Change Password already exists"
      } else {
        toast.error("Change password failed. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">
        <p className="text-center">Enter Your Password</p>
        <form className="grid gap-4 mt-6" onSubmit={handleSubmit}>
          {/* New Password */}
          <div className="grid gap-1">
            <label htmlFor="password">New Password :</label>
            <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200">
              <FiLock className="text-gray-400 mr-2" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full bg-transparent outline-none"
                name="newPassword"
                value={data?.newPassword}
                onChange={handleChange}
                placeholder="Enter your New Password"
              />
              <div
                onClick={togglePassword}
                className="ml-2 cursor-pointer text-gray-400"
              >
                {showPassword ? <FiEye /> : <FiEyeOff />}
              </div>
            </div>
          </div>

          {/* Confirm Password  */}

          <div className="grid gap-1">
            <label htmlFor="confirmPassword">Confirm Password :</label>
            <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200">
              <FiLock className="text-gray-400 mr-2" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                className="w-full bg-transparent outline-none"
                name="confirmPassword"
                value={data?.confirmPassword}
                onChange={handleChange}
                placeholder="Enter your Confirm Password"
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
            onClick={handleSubmit}
            className={`${
              validate ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"
            } text-white py-2 rounded font-semibold my-3 tracking-wide cursor-pointer`}
          >
            Change Password
          </button>
        </form>

        <p className="text-center">
          Already have an account ?{" "}
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

export default ResetPassword;
