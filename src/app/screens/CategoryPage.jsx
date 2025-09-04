import React, { useEffect, useState } from "react";
import UploadCategoryModel from "../components/UploadCategoryModel";
import { useGetCategoryQuery } from "../services/getCategorySlice";
import Loading from "../components/Loading";
import NoData from "../components/NoData";
import { FaEdit, FaTrash } from "react-icons/fa";
import EditCategory from "../components/EditCategory";
import { useDeleteCategoryMutation } from "../services/deleteCategorySlice";
import Swal from "sweetalert2";
import SmallSpinner from "../components/SmallSpinner";
import { useSelector } from "react-redux";

const CategoryPage = () => {
  
  const [openUploadCatgory, setOpenUplaoadCategory] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [editId, setEditId] = useState(null);
  const {refetch} = useGetCategoryQuery();
  const [deleteCategory] =useDeleteCategoryMutation();
  const categories = useSelector(state => state?.product?.allCategory || [] )

  
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        setDeleteId(id);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        await deleteCategory({ _id: id }).unwrap();
        Swal.fire("Deleted!", "The Category has been deleted.", "success");
        refetch();
      } catch (error) {
        Swal.fire(
          "Error!",
          "There was a problem deleting the product.",
          "error"
        );
      } finally {
        setDeleteId(null);
      }
    }
  };

  return (
    <section className="p-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white shadow-sm rounded-md px-4 py-3 flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Category List</h2>
        <button
          onClick={() => setOpenUplaoadCategory(true)}
          className="flex cursor-pointer items-center gap-2 text-sm font-medium bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition"
        >
          Add Category
        </button>
      </div>

      {/* No Data */}
      {!categories.length && <NoData message="No categories found. Add one!" />}

      {/* Category Grid */}
      <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {categories.map((cat) => (
          <div
            key={cat._id}
            className="bg-white rounded-lg shadow-md overflow-hidden transition transform hover:scale-105"
          >
            {/* Image */}
            <div className="h-36 bg-gray-100 flex items-center justify-center p-2">
              <img
                src={cat.image}
                alt={cat.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            {/* Category Name */}
            <div className="px-3 pt-2 pb-1 text-center">
              <p className="text-sm font-semibold text-gray-800 truncate">
                {cat.name}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex border-t">
              <button
                title="Edit"
                onClick={() => {
                  setOpenEdit(true);
                  setEditData(cat);
                  setEditId(cat._id);
                }}
                className="flex-1  py-2 flex items-center justify-center gap-1 text-sm text-blue-600 hover:bg-blue-50 transition"
              >
                {editId == cat._id ? (
                  <span className="text-xs">
                    <SmallSpinner size={16} color="text-blue-500" />
                  </span>
                ) : (
                  <FaEdit size={17} />
                )}
              </button>
              <button
                title="Delete"
                onClick={() => handleDelete(cat._id)}
                className="flex-1 cursor-pointer py-2 flex items-center justify-center gap-1 text-sm text-red-600 hover:bg-red-50 transition border-l"
              >
                {deleteId == cat._id ? (
                  <span className="text-xs">
                    <SmallSpinner size={16} color="text-red-500" />
                  </span>
                ) : (
                  <FaTrash size={17} />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {openUploadCatgory && (
        <UploadCategoryModel
          close={() => {
            setOpenUplaoadCategory(false);
            refetch()
           
          }}
        />
      )}

      {openEdit && (
        <EditCategory data={editData} close={() =>{ setOpenEdit(false); setEditId(null)}} />
      )}
    </section>
  );
};

export default CategoryPage;
