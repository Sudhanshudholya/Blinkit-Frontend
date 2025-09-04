// import React, { useState } from "react";
// import { FaCloudUploadAlt } from "react-icons/fa";
// import { useUploadImageMutation } from "../services/uploadImageSlice";
// import toast from "react-hot-toast";
// import Loading from "../components/Loading";
// import ViewImage from "../components/ViewImage";

// const UploadProducts = () => {
//   const [data, setData] = useState({
//     name: "",
//     image: [],
//     category: [],
//     subCategory: [],
//     unit: [],
//     stock: "",
//     price: "",
//     discount: "",
//     discription: "",
//     more_details: {},
//   });

//   const [uploadImage] = useUploadImageMutation();
//   const [imageLoading, setImageLoading] = useState(false);
//   const [viewImageURL, setViewImageURL] = useState("");

//   const handleOnChange = (e) => {
//     const { name, value } = e.target;
//     setData((prev) => ({ ...prev, [name]: value }));
//   };

//   // const handleUploadImage = async (e) => {
//   //   const file = e.target.files[0];

//   //   if (!file) {
//   //     return;
//   //   }

//   //   const formData = new FormData();
//   //   formData.append("image", file);

//   //   try {
//   //     setImageLoading(true);
//   //     const res = await uploadImage(formData).unwrap();
//   //     if (res) {
//   //       toast.success("Image uploaded");
//   //       setData((prev) => ({
//   //         ...prev,
//   //         image: [...(prev.image || []), res?.data?.url || res?.url, res],
//   //       }));
//   //     }
//   //   } catch (error) {
//   //     toast.error("Image upload failed, please try again");
//   //   } finally {
//   //     setImageLoading(false);
//   //   }
//   // };

//   const handleUploadImage = async (e) => {
//     const file = e.target.files[0];

//     if (!file) return;

//     const formData = new FormData();
//     formData.append("image", file);

//     try {
//       setImageLoading(true);
//       const res = await uploadImage(formData).unwrap();

//       const imageUrl = res?.data?.url || res?.url || res;

//       if (!imageUrl) {
//         toast.error("Image response invalid");
//         return;
//       }

//       toast.success("Image uploaded");
//       setData((prev) => ({
//         ...prev,
//         image: [...(prev.image || []), imageUrl], // ✅ only URL
//       }));
//     } catch (error) {
//       toast.error("Image upload failed, please try again");
//     } finally {
//       setImageLoading(false);
//     }
//   };

//   return (
//     <section className="p-4 max-w-7xl mx-auto">
//       {/* Header */}
//       <div className="bg-white shadow-sm rounded-md px-4 py-3 flex justify-between items-center mb-6">
//         <h2 className="text-xl font-semibold text-gray-800">Upload Product</h2>
//       </div>
//       <div className="grid p-3">
//         <form className="grid gap-3">
//           <div className="grid gap-1 ">
//             <label htmlFor="name">Name</label>
//             <input
//               id="name"
//               type="text"
//               name="name"
//               placeholder="Enter Product Name"
//               value={data.name || ""}
//               onChange={handleOnChange}
//               required
//               className="bg-blue-50 p-2 outline-none border focus-within:border-gray-100 rounded-2xl w-full"
//             />
//           </div>

//           <div className="grid gap-1 ">
//             <label htmlFor="discription">Discription</label>
//             <textarea
//               id="discription"
//               type="text"
//               name="discription"
//               placeholder="Enter Product Discription"
//               value={data.discription || ""}
//               onChange={handleOnChange}
//               multiple
//               rows={3}
//               required
//               className="bg-blue-50 p-2 outline-none resize-none border focus-within:border-gray-100 rounded-2xl w-full"
//             />
//           </div>

//           <div>
//             <p>Image</p>
//             <div>
//               <label
//                 htmlFor="productImage"
//                 className="bg-blue-50 h-24 border rounded flex justify-center items-center  "
//               >
//                 <div className="flex flex-col justify-center items-center cursor-pointer">
//                   {imageLoading ? (
//                     <Loading />
//                   ) : (
//                     <>
//                       <FaCloudUploadAlt className="text-black  hover:text-blue-500" size={28} />
//                       <p>Upload Image</p>
//                     </>
//                   )}
//                 </div>
//                 <input
//                   type="file"
//                   id="productImage"
//                   className="hidden"
//                   onChange={handleUploadImage}
//                 />
//               </label>
//               <div className="my-2">
//                 {/* Display Uploaded */}
//                 {data?.image?.map((img, index) => (
//                   <div
//                     key={img + index}
//                     className="h-20 w-20 min-w-20 bg-blue-50"
//                   >
//                     <img
//                       src={img}
//                       alt={`product-image-${index}`}
//                       className="w-full h-full object-scale-down"
//                       onClick={() => setViewImageURL(img)}
//                     />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {viewImageURL && (
//             <ViewImage url={viewImageURL} close={() => setViewImageURL("")} />
//           )}
//         </form>
//       </div>
//     </section>
//   );
// };

// export default UploadProducts;


import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useUploadImageMutation } from "../services/uploadImageSlice";
import toast from "react-hot-toast";
import Loading from "../components/Loading";
import ViewImage from "../components/ViewImage";

const UploadProducts = () => {
  const [data, setData] = useState({
    name: "",
    image: [],
    category: [],
    subCategory: [],
    unit: [],
    stock: "",
    price: "",
    discount: "",
    discription: "",
    more_details: {},
  });

  const [uploadImage] = useUploadImageMutation();
  const [imageLoading, setImageLoading] = useState(false);
  const [viewImageURL, setViewImageURL] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      setImageLoading(true);
      const res = await uploadImage(formData).unwrap();
      console.log("Image Upload Response:", res);

      const imageUrl = res?.data?.url || res?.url || ""; // extract string url only

      if (!imageUrl || typeof imageUrl !== "string") {
        toast.error("Image upload returned invalid URL");
        return;
      }

      toast.success("Image uploaded");
      setData((prev) => ({
        ...prev,
        image: [...(prev.image || []), imageUrl], // ✅ only add URL
      }));
    } catch (error) {
      toast.error("Image upload failed, please try again");
    } finally {
      setImageLoading(false);
    }
  };

  return (
    <section className="p-4 max-w-7xl mx-auto">
      <div className="bg-white shadow-sm rounded-md px-4 py-3 flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Upload Product</h2>
      </div>

      <div className="grid p-3">
        <form className="grid gap-3">
          {/* Name */}
          <div className="grid gap-1">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Enter Product Name"
              value={data.name}
              onChange={handleOnChange}
              required
              className="bg-blue-50 p-2 border rounded-2xl w-full outline-none"
            />
          </div>

          {/* Description */}
          <div className="grid gap-1">
            <label htmlFor="discription">Description</label>
            <textarea
              id="discription"
              name="discription"
              placeholder="Enter Product Description"
              value={data.discription}
              onChange={handleOnChange}
              rows={3}
              required
              className="bg-blue-50 p-2 border rounded-2xl w-full resize-none outline-none"
            />
          </div>

          {/* Upload Image */}
          <div>
            <p>Image</p>
            <div>
              <label
                htmlFor="productImage"
                className="bg-blue-50 h-24 border rounded flex justify-center items-center cursor-pointer"
              >
                <div className="flex flex-col justify-center items-center">
                  {imageLoading ? (
                    <div className="scale-75">
                      <Loading />
                    </div>
                  ) : (
                    <>
                      <FaCloudUploadAlt className="text-black hover:text-blue-500" size={28} />
                      <p>Upload Image</p>
                    </>
                  )}
                </div>
                <input
                  type="file"
                  id="productImage"
                  className="hidden"
                  onChange={handleUploadImage}
                />
              </label>

              {/* Display uploaded images */}
              <div className="flex flex-wrap gap-2 mt-2">
                {data.image.map((img, index) => (
                  <div
                    key={img + index}
                    className="h-20 w-20 bg-blue-50 border rounded overflow-hidden cursor-pointer"
                    onClick={() => setViewImageURL(img)}
                  >
                    <img
                      src={img}
                      alt={`product-image-${index}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* View Full Image Modal */}
          {viewImageURL && (
            <ViewImage url={viewImageURL} close={() => setViewImageURL("")} />
          )}
        </form>
      </div>
    </section>
  );
};

export default UploadProducts;
