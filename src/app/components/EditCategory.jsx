import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useUpdateCategoryMutation } from "../services/updateCategorySlice";
import toast from "react-hot-toast";
import { useUploadImageMutation } from "../services/uploadImageSlice";

const EditCategory = ({ data: categoryData, close }) => {
  const [data, setData] = useState({
    _id: categoryData?._id,
    name: categoryData?.name,
    image: categoryData?.image,
  });
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [uploadImage] = useUploadImageMutation()
  const [updateCategory] = useUpdateCategoryMutation();

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data._id || !data.name || !data.image) return;

    try {
      setLoading(true);
      // 👇 Add artificial delay of 3000ms
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const res = await updateCategory({
        _id: data._id,
        name: data?.name,
        image: data?.image,
      }).unwrap();
      if (res) {
        toast.success("Category updated successfully");
        close();
      }
    } catch (error) {
      console.log("CATEGORY-ERRRR", error);
      toast.error("Failed to update category");
    } finally {
      setLoading(false);
    }
  };

  const handleUploadCategoryImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      setImageLoading(true);
      const res = await uploadImage(formData).unwrap();
      console.log("UPLOAD RESPONSE:", res);
      if (res) {
        toast.success("Image uploaded");
        setData((prev) => ({
          ...prev,
          image: res?.data?.data?.url || res?.data?.url,
        }));
      }
    } catch (error) {
      toast.error("Image upload failed");
    } finally {
      setImageLoading(false);
    }
  };



  return (
    <section className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white w-full max-w-lg mx-4 p-6 rounded-xl shadow-xl relative backdrop-blur-md">
        <button
          onClick={close}
          className="absolute top-3 right-3 text-gray-600 hover:text-red-600 transition"
        >
          <IoClose size={26} />
        </button>

        <h2 className="text-xl font-semibold mb-4 text-center">
          Edit Category
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Name input */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              Category Name
            </label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleOnchange}
              placeholder="e.g. Sports, Electronics"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Category Image
            </label>
            <div className="flex items-center gap-4 flex-col sm:flex-row">
              <div className="w-32 h-32 border rounded bg-gray-100 flex items-center justify-center overflow-hidden">
                {data.image ? (
                  <img
                    src={data.image}
                    alt="Category Preview"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <span className="text-gray-400 text-sm">No image</span>
                )}
              </div>

              <label className="cursor-pointer inline-block px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded hover:bg-blue-600 transition">
                {imageLoading ? "Uploading..." : "Uploaded"}
                <input
                  type="file"
                  onChange={handleUploadCategoryImage}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={!data.name || !data.image || loading}
            className={`w-full py-2 rounded-md font-semibold transition cursor-pointer ${
              !data.name || !data.image || loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {loading ? "Updating..." : "Update Category"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditCategory;
