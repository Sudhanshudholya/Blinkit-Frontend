import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import toast from "react-hot-toast";
import { useUploadCategoryImageMutation } from "../services/uploadCategoryImageSlice";
import { useAddCategoryMutation } from "../services/addCategorySlice";

const UploadCategoryModel = ({ close }) => {
  const [data, setData] = useState({ name: "", image: "" });
  const [uploadCategoryImage] = useUploadCategoryImageMutation();
  const [addCategory] = useAddCategoryMutation()
 const [loading, setLoading] = useState(false)


  const handleOnchange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
       setLoading(true) 
       const res = await addCategory({ name: data.name, image: data.image }).unwrap()
       if(res){
        toast.success("Category added successfully")
        close()
       }
       console.log("ADD-CATEGORY-RESPONSE", res)
    } catch (error) {
        console.log("CATEGORY-ERRRR",error)
    }finally{
        setLoading(false)
    }
  };

  const handleUploadCategoryImage = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await uploadCategoryImage(formData).unwrap();
      if (res) {
        toast.success("Image Uploaded Successfully");
        setData((prev) => {
          return {
            ...prev,
            image: res?.data?.data?.url || res?.data?.url,
          };
        });
      }

      console.log("CATEGORY-IMAGE-UPLOAD", res);
    } catch (error) {
      console.log("Upload-category-image-error", error);
      toast.error("Image not upload");
    }
  };

  return (
    <section className="fixed top-0 bottom-0 right-0 left-0 p-4 bg-neutral-800 opacity-80 flex items-center justify-center">
      <div className="bg-white max-w-4xl w-full p-4 rounded-md">
        <div className="flex items-center justify-between">
          <h1 className="font-serif">Category</h1>
          <button
            onClick={close}
            className=" w-fit block cursor-pointer ml-auto"
          >
            <IoClose
              className="bg-gray-500 rounded-2xl text-white hover:bg-red-600"
              size={25}
            />
          </button>
        </div>
        <form className="my-3 grid gap-2" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label htmlFor="categoryName">Name:</label>
            <input
              type="text"
              id="categoryName"
              placeholder="Enter Category name"
              value={data.name}
              name="name"
              onChange={handleOnchange}
              className="bg-blue-50 p-2 border border-nuetral-400 focus-within:border-slate-900 outline-none rounded"
            />
          </div>

          <div className="grid gap-1">
            <p>Image: </p>
            <div className="flex gap-4 flex-col lg:flex-row items-center">
              <div className="border bg-blue-50 h-36 w-full lg:w-36 flex items-center justify-center rounded-md">
                {data.image ? (
                  <img
                    alt="category"
                    src={data.image}
                    className="w-full h-full object-scale-down"
                  />
                ) : (
                  <p className="text-sm text-red-900">No image</p>
                )}
              </div>
              <label htmlFor="upload-category-image">
                <div
                  className={` cursor-pointer rounded-2xl px-4 py-2 border font-mono
                 ${
                   !data.name
                     ? "bg-gray-400 text-amber-100"
                     : "bg-blue-500 border-none text-white hover:bg-blue-600"
                 }
                `}
                >
                  Upload image
                </div>
                <input
                  type="file"
                  disabled={!data.name}
                  onChange={handleUploadCategoryImage}
                  id="upload-category-image"
                  className="cursor-pointer hidden "
                />
              </label>
            </div>
          </div>

          <button className={` py-2 cursor-pointer font-extrabold text-white ${data.name && data.image ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-500"} : ""`}>Add Category</button>
        </form>
      </div>
    </section>
  );
};

export default UploadCategoryModel;
