import React, { useState } from "react";
import toast from "react-hot-toast";
import { FiMail } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useForgotPasswordMutation } from "../services/forgotPasswordSlice";

const ForgotPassword = () => {

    const navigate = useNavigate()
    const [forgotPassword] = useForgotPasswordMutation()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [data, setData] = useState({
    email: "",
  });


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

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const res = await forgotPassword({
        email: data?.email,
      }).unwrap();

      if (res) {
        toast.success("Forgot Password send successfully on your Email Login successfully");
        navigate("/otp-verification", {state:
          data
          });
        setData({
          email: "",
        });
      } else {
        toast.error("Something went wrong to send forgot password");
      }
    } catch (error) {
      if (error?.data?.message) {
        toast.error(error.data.message); // ✅ This line shows backend error like "Email already exists"
      } else {
        toast.error("Forgot passwword send failed. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">
        <p className="text-center">Forgot Password</p>
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

         

          {/* Submit Button */}
          <button
            disabled={!validate || isSubmitting}
            onClick={handleSubmit}
            className={`${
              validate ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"
            } text-white py-2 rounded font-semibold my-3 tracking-wide cursor-pointer`}
          >
            Send OTP
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

export default ForgotPassword;
