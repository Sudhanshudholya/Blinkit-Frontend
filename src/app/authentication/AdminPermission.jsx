import React from "react";
import { useSelector } from "react-redux";
import isAdmin from "../utils/IsAdmin";
import { FaLock } from "react-icons/fa";

const AdminPermission = ({ children }) => {
  const user = useSelector((state) => state.user);

  return (
    <>
      {isAdmin(user.role) ? (
        children
      ) : (
        <div className="flex flex-col items-center justify-center h-[70vh] text-center bg-red-50 rounded-md shadow-sm p-8 animate-fade-in">
          <FaLock size={48} className="text-red-500 mb-4" />
          <h2 className="text-2xl font-semibold text-red-700 mb-2">
            Access Denied
          </h2>
          <p className="text-gray-700 max-w-md">
            You do not have the required permission to view this page. Please
            contact your administrator if you believe this is a mistake.
          </p>
        </div>
      )}
    </>
  );
};

export default AdminPermission;
