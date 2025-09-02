import React, { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import UserProfileAvatarEdit from "../components/UserProfileAvatarEdit";
import { useUserUpdateMutation } from "../services/userUpdateSlice";
// import { setUserDetails } from "./app/store/userSlice";

import toast from "react-hot-toast";
import { setUserDetails } from "../store/userSlice";
import { useGetUserDetailsQuery } from "../services/userDetailsSlice";

const Profile = () => {
  const user = useSelector((state) => state?.user);
  console.log("Profile.jsx", user);
  const [openProfileAvatarEdit, setOpenProfileAvatarEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userUpdate] = useUserUpdateMutation();
  const accessToken = localStorage.getItem("accessToken");
  const dispatch = useDispatch();
  const { data, refetch } = useGetUserDetailsQuery(undefined, {
    skip: !accessToken,
  });

  console.log(data, "USER-UPDATE-SUCCESS");

  const [userData, setUserData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    mobile: user?.mobile || "",
  });

  useEffect(() => {
    setUserData({
      name: user?.name || "",
      email: user?.email || "",
      mobile: user?.mobile || "",
    });
  }, [user]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setUserData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await userUpdate(userData).unwrap();
      if (res) {
        toast.success("User updated successfully");
        dispatch(setUserDetails(res?.data));
      }
      await refetch();
    } catch (error) {
      console.log("Update-User-Error", error);
      toast.error(error?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* Profile upload and displya image  */}
      <div className="w-20 h-20 bg-red-400 flex items-center justify-center rounded-full overflow-hidden drop-shadow-sm">
        {user.avatar ? (
          <img src={user.avatar} alt={user.name} className="w-full h-full" />
        ) : (
          <FaRegUser size={65} />
        )}
      </div>
      <button
        onClick={() => setOpenProfileAvatarEdit(true)}
        className="text-sm min-w-20 border border-gray-600 hover:border-slate-900 hover:bg-green-500 hover:text-white cursor-pointer px-3 py-1 rounded-full mt-5"
      >
        Edit
      </button>
      {openProfileAvatarEdit && (
        <UserProfileAvatarEdit close={() => setOpenProfileAvatarEdit(false)} />
      )}
      {/* Name mobile email change password  */}

      <form className="my-4 grid gap-4" onSubmit={handleSubmit}>
        <div className="grid">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            placeholder="Enter your name"
            name="name"
            value={userData?.name}
            onChange={handleOnChange}
            required
            className="p-2 bg-sky-200 outline-none border focus-within:border-amber-300 rounded-2xl"
          />
        </div>

        <div className="grid">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            value={userData?.email}
            onChange={handleOnChange}
            required
            className="p-2 bg-sky-200 outline-none border focus-within:border-amber-300 rounded-2xl"
          />
        </div>

        <div className="grid">
          <label htmlFor="mobile">Mobile:</label>
          <input
            type="text"
            placeholder="Enter your mobile"
            name="mobile"
            value={userData?.mobile}
            onChange={handleOnChange}
            required
            className="p-2 bg-sky-200 outline-none border focus-within:border-amber-300 rounded-2xl"
          />
        </div>

        <button className="border border-gray-500  px-4 py-2 font-semibold bg-amber-50 hover:bg-yellow-400 cursor-pointer">
          {loading ? "Loading..." : "Submit"}
        </button>

  
      </form>
    </div>
  );
};

export default Profile;
