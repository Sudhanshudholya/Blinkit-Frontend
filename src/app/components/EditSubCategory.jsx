import { useState } from "react";
import { useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import { useUpdateSubCategoryMutation } from "../services/updateSubCategorySlice";
import toast from "react-hot-toast";
import { useUploadImageMutation } from "../services/uploadImageSlice";

const EditSubCategory = ({ data: subCategoryData, close }) => {
  const [data, setData] = useState({
    _id: subCategoryData?._id,
    name: subCategoryData?.name || "",
    image: subCategoryData?.image || "",
    category: subCategoryData?.category?.[0]?._id || "", // assuming single category
  });

  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
const [uploadImage] = useUploadImageMutation()
const [updateSubCategory] = useUpdateSubCategoryMutation()

  // Get all categories from Redux store
  const allCategories = useSelector(
    (state) => state?.product?.allCategory || []
  );

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      setImageLoading(true);
      const res = await uploadImage(formData).unwrap();

      if (res?.data?.url) {
        setData((prev) => ({
          ...prev,
          image: res.data.url,
        }));
        toast.success("Image uploaded");
      }
    } catch (err) {
      toast.error("Image upload failed");
    } finally {
      setImageLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data._id || !data.name || !data.image || !data.category) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      await new Promise((res) => setTimeout(res, 3000)); // optional delay

      const response = await updateSubCategory({
        _id: data._id,
        name: data.name,
        image: data.image,
        category: [data.category], // must be array
      }).unwrap();

      if (response?.success) {
        toast.success("Sub Category updated successfully");
        close();
      }
    } catch (err) {
      console.error("UPDATE ERROR:", err);
      toast.error("Failed to update subcategory");
    } finally {
      setLoading(false);
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
          Edit Sub Category
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Name input */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              Sub Category Name
            </label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleOnChange}
              placeholder="e.g. Mobile Accessories"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* Category Select */}
          <div>
            <label className="block mb-1 text-sm font-medium">Category</label>
            <select
              name="category"
              value={data.category}
              onChange={handleOnChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300 bg-white"
            >
              <option value="">Select a category</option>
              {allCategories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Image Upload */}
          <div>
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
                {imageLoading ? "Uploading..." : "Upload Image"}
                <input
                  type="file"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={!data.name || !data.image || !data.category || loading}
            className={`w-full py-2 rounded-md font-semibold transition cursor-pointer ${
              !data.name || !data.image || !data.category || loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 text-white"
            }`}
          >
            {loading ? "Updating..." : "Update Sub Category"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditSubCategory;
