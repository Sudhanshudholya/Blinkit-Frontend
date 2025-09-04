// import React from "react";
// import { CiEdit } from "react-icons/ci";
// import { MdOutlineDelete } from "react-icons/md"; 

// const DisplaySubCategoryTable = ({ data, onEdit, onDelete }) => {
//   return (
//     <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
//       <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
//         Sub Category Table
//       </h2>

//       <div className="overflow-x-auto">
//         <table className="w-full bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
//           <thead>
//             <tr className="bg-green-600 text-white">
//               <th className="py-4 px-6 text-left">Id</th>
//               <th className="py-4 px-6 text-left">Sub Category</th>
//               <th className="py-4 px-6 text-left">Image</th>
//               <th className="py-4 px-6 text-left">Category</th>
//               <th className="py-4 px-6 text-left">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {data?.map((item, index) => (
//               <tr
//                 key={index}
//                 className={`transition duration-200 ${
//                   index % 2 === 0 ? "bg-gray-50" : "bg-white"
//                 } hover:bg-gray-100`}
//               >
//                 <td className="py-3 px-6">{index + 1}</td>
//                 <td className="py-3 px-6 font-medium text-gray-800">
//                   {item.name}
//                 </td>
//                 <td className="py-3 px-6">
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="w-16 h-16 rounded-lg object-cover border"
//                   />
//                 </td>
//                 <td className="py-3 px-6 text-gray-700">{item?.category?.[0]?.name}</td>
//                 <td className="py-3 px-6">
//                   <div className="flex space-x-3">
//                     <button
//                       onClick={() => onEdit(item)}
//                       className="flex items-center gap-1 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm"
//                       title="Edit"
//                     >
//                       <CiEdit className="text-lg" />
//                     </button>
//                     <button
//                     onClick={()=> onDelete(item)}
//                       className="flex items-center gap-1 px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm"
//                       title="Delete"

//                     >
//                       <MdOutlineDelete className="text-lg" />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default DisplaySubCategoryTable;



import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import ViewImage from "./ViewImage"; // ✅ make sure path is correct

const DisplaySubCategoryTable = ({ data, onEdit, onDelete }) => {
  const [imageToView, setImageToView] = useState(null); // ✅ holds image URL

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Sub Category Table
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <thead>
            <tr className="bg-green-600 text-white">
              <th className="py-4 px-6 text-left">Id</th>
              <th className="py-4 px-6 text-left">Sub Category</th>
              <th className="py-4 px-6 text-left">Image</th>
              <th className="py-4 px-6 text-left">Category</th>
              <th className="py-4 px-6 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {data?.map((item, index) => (
              <tr
                key={index}
                className={`transition duration-200 ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100`}
              >
                <td className="py-3 px-6">{index + 1}</td>
                <td className="py-3 px-6 font-medium text-gray-800">
                  {item.name}
                </td>
                <td className="py-3 px-6">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover border cursor-pointer"
                    onClick={() => setImageToView(item.image)} // ✅ open modal
                    title="Click to view"
                  />
                </td>
                <td className="py-3 px-6 text-gray-700">
                  {item?.category?.[0]?.name}
                </td>
                <td className="py-3 px-6">
                  <div className="flex space-x-3">
                    <button
                      onClick={() => onEdit(item)}
                      className="flex items-center gap-1 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm"
                      title="Edit"
                    >
                      <CiEdit className="text-lg" />
                    </button>
                    <button
                      onClick={() => onDelete(item)}
                      className="flex items-center gap-1 px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm"
                      title="Delete"
                    >
                      <MdOutlineDelete className="text-lg" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Conditionally render ViewImage modal */}
      {imageToView && (
        <ViewImage
          url={imageToView}
          close={() => setImageToView(null)} // ✅ close handler
        />
      )}
    </div>
  );
};

export default DisplaySubCategoryTable;

