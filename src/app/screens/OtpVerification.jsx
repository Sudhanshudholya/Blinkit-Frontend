import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useOtpVerificationMutation } from "../services/otpVerificationSlice";

const OtpVerification = () => {
  const [data, setData] = useState(["", "", "", "", "", ""]);
  const navigate = useNavigate();
  const inputsRef = useRef([]);
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otpVerification] = useOtpVerificationMutation();


  useEffect(() => {
    if (!location?.state?.email) {
      navigate("/forgot-password");
    }
  }, []);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^[0-9]?$/.test(value)) return;

    const newData = [...data];
    newData[index] = value;
    setData(newData);

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const validate = data.every((ele) => ele);

  
  const handleKeyDown = (e, index) => {
    // Backspace moves focus to previous input if empty
    if (e.key === "Backspace") {
      const newData = [...data];

      if (data[index]) {
        // If current box has value, just clear it
        newData[index] = "";
        setData(newData);
      } else if (index > 0) {
        // If current box is empty, move to previous
        const prevInput = inputsRef.current[index - 1];
        if (prevInput) {
          prevInput.focus();

          // Optional: also clear previous box
          newData[index - 1] = "";
          setData(newData);
        }
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const res = await otpVerification({
        otp: data.join(""),
        email: location?.state?.email
      }).unwrap();

      if (res) {

        toast.success("OTP Verification successfully");
        setData(["", "", "", "", "", ""]);
        navigate("/reset-password", {
          state: {
            data,
            status: res?.status,
            message: res?.message,
            email: location?.state?.email,
            success:res?.success
          },
        });
      } else {
        toast.error("Something went wrong to verify");
      }
    } catch (error) {
      if (error?.data?.message) {
        toast.error(error.data.message);
      } else {
        toast.error("OTP verification failed. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };



  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">
        <p className="text-center">Enter OTP</p>
        <form className="grid gap-4 mt-6" onSubmit={handleSubmit}>
          {/* OTP */}
          <div className="grid gap-1">
            <label htmlFor="otp">Enter Your OTP :</label>
            <div className="flex items-center gap-2 justify-between mt-3">
              {data.map((element, index) => (
                <input
                  key={`otp ${index}`}
                  type="text"
                  id="otp"
                  value={data[index]}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  ref={(ref) => {
                    inputsRef.current[index] = ref;
                    return ref;
                  }}
                  maxLength={1}
                  className="w-10 max-w-18 bg-blue-50 p-2 border focus:border-slate-800 rounded outline-none text-center font-semibold"
                />
              ))}
            </div>
            {/* <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200">
              
            </div> */}
          </div>

          {/* Submit Button */}
          <button
            disabled={!validate || isSubmitting}
            onClick={handleSubmit}
            className={`${
              validate ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"
            } text-white py-2 rounded font-semibold my-3 tracking-wide cursor-pointer`}
          >
            Verify OTP
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

export default OtpVerification;
