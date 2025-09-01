import React, { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useUserAvatarUploadMutation } from "../services/userAvatarSlice";
import toast from "react-hot-toast";
import { updateAvatar } from "../store/userSlice";
import { IoClose } from "react-icons/io5";

const UserProfileAvatarEdit = ({close}) => {
  const user = useSelector((state) => state?.user);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [userAvatarUpload] = useUserAvatarUploadMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleUploadAvatarImage = async (e) => {
    const file = e.target.files[0];

    if(!file){
      return
    }

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      setLoading(true);
      const res = await userAvatarUpload(formData);
      if (res) {
        toast.success("Avatar upload successfully");
        dispatch(updateAvatar(res?.data?.avatar));
        
      }
    } catch (error) {
      console.log("Upload-avatar-error-put", error);
      toast.error("Image not upload");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 bg-neutral-900 opacity-60 p-4 flex items-center justify-center">
      <div className="bg-white max-w-sm w-full rounded p-4 flex flex-col items-center justify-center">
        <button onClick={close} className=" text-gray-700 hover:text-red-700 w-fit block ml-auto cursor-pointer">
          <IoClose size={27}/>
        </button>
        <div className="w-20 h-20 bg-red-500 flex items-center justify-center rounded-full overflow-hidden drop-shadow-sm">
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-full h-full" />
          ) : (
            <FaRegUser size={65} />
          )}
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="uploadProfile">
            <div className="border cursor-pointer px-4 py-1 rounded text-sm my-3 border-blue-950 hover:border-red-900 hover:bg-green-400 hover:text-white">
              {loading ? "Uploading ..." : "Upload"}
            </div>
          </label>
          <input
            type="file"
            id="uploadProfile"
            className="cursor-pointer hidden"
            onChange={handleUploadAvatarImage}
          />
        </form>
      </div>
    </section>
  );
};

export default UserProfileAvatarEdit;
