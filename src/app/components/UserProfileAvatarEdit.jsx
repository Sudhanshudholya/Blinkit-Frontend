import React, { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useUserAvatarUploadMutation } from "../services/userAvatarSlice";
import toast from "react-hot-toast";
import { updateAvatar } from "../store/userSlice";
import { IoClose } from "react-icons/io5";

const UserProfileAvatarEdit = ({close}) => {
  const user = useSelector((state) => state?.user);
  const dispatch = useDispatch()
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
        close()
      }
    } catch (error) {
      console.log("Upload-avatar-error-put", error);
      toast.error("Image not upload");
    } finally {
      setLoading(false);
    }
  };

  return (
    

    <section className="fixed inset-0 bg-gradient-to-br  from-neutral-400 via-neutral-500 to-neutral-600 bg-opacity-90 backdrop-blur-sm p-6 flex items-center justify-center z-50">
  <div className="max-w-sm w-full bg-white rounded-xl p-6 flex flex-col items-center shadow-lg relative">
    
    <button
      onClick={close}
      className="absolute top-4 right-4 cursor-pointer text-gray-500 hover:text-red-600 transition-colors"
      aria-label="Close modal"
    >
      <IoClose size={28} />
    </button>
    
    <div className="w-24 h-24 bg-red-500 rounded-full overflow-hidden flex items-center justify-center shadow-md border-4 border-white mb-6">
      {user.avatar ? (
        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
      ) : (
        <FaRegUser size={72} className="text-white" />
      )}
    </div>

    <form onSubmit={handleSubmit} className="w-full">
      <label
        htmlFor="uploadProfile"
        className="block w-full cursor-pointer text-center bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold py-2 rounded-lg shadow hover:from-green-500 hover:to-blue-600 transition-colors"
      >
        {loading ? "Uploading ..." : "Upload"}
      </label>
      <input
        type="file"
        id="uploadProfile"
        className="hidden"
        onChange={handleUploadAvatarImage}
      />
    </form>
  </div>
</section>
  );
};

export default UserProfileAvatarEdit;
