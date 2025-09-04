import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useCreateSubCategoryMutation } from "../services/createSubCategorySlice";
import { useUploadImageMutation } from "../services/uploadImageSlice";

const UploadSubCategoryModel = ({ close}) => {
  const [data, setData] = useState({ name: "", image: "", category: [] });
  const [uploadImage] = useUploadImageMutation()
  const [createSubCategory] = useCreateSubCategoryMutation()
  const [imageLoading, setImageLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const categories = useSelector((state) => state?.product?.allCategory || []);

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.name || !data.image|| !data.category.length) {
      return;
    }

    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const res = await createSubCategory({
        name: data?.name,
        image: data?.image,
        category: data?.category.map((cat) => cat._id),
      }).unwrap();
      if (res) {
        toast.success("Sub Category added successfully");
        close();
      }
    } catch (error) {
      console.log("SUB CATEGORY-ERRRR", error);
      toast.error("Failed to add sub category");
    } finally {
      setLoading(false);
    }
  };

 
  const handleChange = (e) => {
    const value = e.target.value;
    const category = categories.find((cat) => cat._id === value);

    if (category) {
      setData((prev) => {
        // Check if already added
        const alreadyExists = prev.category.some(
          (cat) => cat._id === category._id
        );
        if (alreadyExists) return prev;

        return {
          ...prev,
          category: [...prev.category, category],
        };
      });
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

  const handleRemoveCategorySelected = (categoryId) => {
    const index = data.category.findIndex((el) => el._id == categoryId);

    data.category.splice(index, 1);
    setData((prev) => ({
      ...prev,
    }));
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
          Add New Sub Category
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Name input */}
          <div>
            <label className="block mb-1 text-sm font-medium" htmlFor="name">
              Sub Category Name
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
          <div className="grid gap-1">
            <label className="block mb-2 text-sm font-medium">
              Sub Category Image
            </label>
            <div className="flex items-center gap-4 flex-col sm:flex-row">
              <div className="w-32 h-32 border rounded bg-gray-100 flex items-center justify-center overflow-hidden">
                {data.image ? (
                  <img
                    src={data.image}
                    alt="Sub Category Preview"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <span className="text-gray-400 text-sm">No image</span>
                )}
              </div>

              <label className="cursor-pointer inline-block px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded hover:bg-blue-600 transition">
                {imageLoading
                  ? "Uploading..."
                  : data.image
                  ? "Change Image"
                  : "Upload Image"}

                <input
                  type="file"
                  disabled={!data.name}
                  onChange={handleUploadCategoryImage}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <div className="grid gap-2">
            {/* Label */}
            <label className="text-sm font-semibold text-gray-700">
              Select Category
            </label>

            {/* Container with border and padding */}
            <div className="border border-gray-300 rounded-lg p-3 bg-white shadow-sm focus-within:border-blue-500 transition">
              {/* Selected Category Chips */}
              <div className="flex flex-wrap gap-2 mb-3">
                {data?.category?.length > 0 ? (
                  data.category.map((cat) => (
                    <span
                      key={cat?._id + "selectedValue"}
                      className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium shadow hover:shadow-md transition-all"
                    >
                      {cat?.name}
                      <button
                        type="button"
                        onClick={() => handleRemoveCategorySelected(cat._id)}
                        className="text-blue-700 cursor-pointer hover:text-red-600"
                        title="Remove"
                      >
                        <IoClose size={16} />
                      </button>
                    </span>
                  ))
                ) : (
                  <span className="text-gray-400 text-sm italic">
                    No categories selected
                  </span>
                )}
              </div>

              {/* Dropdown Select */}
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition"
                onChange={handleChange}
              >
                <option value="">-- Select a Category --</option>
                {categories.length > 0 &&
                  categories.map((cat) => (
                    <option
                      key={cat?._id + "subcategory"}
                      value={cat?._id}
                      disabled={data.category?.some((c) => c._id === cat._id)}
                    >
                      {cat?.name}
                    </option>
                  ))}
              </select>
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
            {loading ? "Adding..." : "Add Sub Category"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default UploadSubCategoryModel;
