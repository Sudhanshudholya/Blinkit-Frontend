import React, { useEffect, useState } from "react";
import UploadSubCategoryModel from "../components/UploadSubCategoryModel";
import { useGetAllSubCategoryQuery } from "../services/getAllSubCategorySlice";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import DisplaySubCategoryTable from "../components/DisplaySubCategoryTable";
import EditSubCategory from "../components/EditSubCategory";
import Swal from "sweetalert2";
import { useDeleteSubCategoryMutation } from "../services/deleteSubCategorySlice";

const SubcategoryPage = () => {
  const [openAddSubCategory, setOpenAddSubCategory] = useState(false);
  const [data, setData] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteData, setDeleteData] = useState(false)
  const [editId, setEditId] = useState(null)
  const [editData, setEditData] = useState(null);
  const dispatch = useDispatch();
  const {
    data: subCategoryData,
    isSuccess,
    isError,
    isLoading,
    error,
  } = useGetAllSubCategoryQuery();
const [deleteSub] = useDeleteSubCategoryMutation()
  const subCategory = useSelector((state) => state?.product?.allCategory || []);

  console.log("SUB-CATEGORY", subCategoryData);
  useEffect(() => {
    if (isSuccess && subCategoryData) {
      setData(subCategoryData?.data || []);
    }
    if (error) {
      toast.error("Failed to fetch user details");
    }
  }, [isSuccess, subCategoryData, error, dispatch]);

  if (isLoading) return <Loading />;

  if (isError) {
    return (
      <div>
        Error: {error?.data?.message || error?.error || "Unknown error"}
      </div>
    );
  }

  
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
        await deleteSub({ _id: id }).unwrap();
        Swal.fire("Deleted!", "The Sub Category has been deleted.", "success");
      } catch (error) {
        console.log(error, "error")
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
        <h2 className="text-xl font-semibold text-gray-800">
          Sub Category List
        </h2>
        <button
          onClick={() => setOpenAddSubCategory(true)}
          className="flex items-center cursor-pointer gap-2 text-sm font-medium bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition"
        >
          Add Sub Category
        </button>
      </div>

      {/* Table */}

      <div>
        <DisplaySubCategoryTable
          data={data}
          onEdit={(item) => {
            setEditData(item);
            setOpenEdit(true);
          }}
          onDelete={(item)=> {
            console.log("DELETE ITEM", item)
            handleDelete(item._id);
          }}
        />
      </div>

      {/* Modal  */}
      {openAddSubCategory && (
        <UploadSubCategoryModel close={() => {setOpenAddSubCategory(false)}}   />
      )}

      {openEdit && (
        <EditSubCategory
          data={editData}
          close={() => {
            setOpenEdit(false);
            setEditId(null);
          }}
        />
      )}
    </section>
  );
};

export default SubcategoryPage;
