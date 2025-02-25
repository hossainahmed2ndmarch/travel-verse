import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import ReactSelect from "react-select"; // Dropdown for filtering
import Select from "react-select";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";
import { FaUsers } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");
  const [role, setRole] = useState(null);
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data: data = {}, refetch } = useQuery({
    queryKey: ["users", search, role, page],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`, {
        params: { search, role: role?.value, page, limit },
      });
      return res.data;
    },
    keepPreviousData: true,
  });

  const users = data.users || [];
  const totalPages = data.totalPages || 1;

  // Options for role filter
  const roles = [
    { value: "admin", label: "Admin" },
    { value: "guide", label: "Guide" },
    { value: "tourist", label: "Tourist" },
  ];

  // Make Admin Functionality
  const handleMakeAdmin = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make admin!",
    }).then((result) => {
      if (result.isConfirmed)
        axiosSecure.patch(`/users/admin/${user?.email}`).then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              position: "center",
              icon: "success",
              title: `${user.name} is now an Admin`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
    });
  };

  // Delete User Functionality
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete user!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "User has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  // Custon style for react select
  const customStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: "var(--secondary-bg-color)", // Background color from CSS variable
      border: "2px solid var(--primary-text-color)", // Border color from CSS variable
      boxShadow: state.isFocused ? "0 0 8px var(--primary-text-color)" : "none", // Glowing effect on focus
      borderRadius: "0px", // Square edges
      color: "var(--primary-text-color)", // Text color
      "&:hover": { borderColor: "var(--primary-text-color)" }, // Border color on hover
    }),
    placeholder: (base) => ({
      ...base,
      color: "var(--secondary-text-color)", // Placeholder text color
    }),
    singleValue: (base) => ({
      ...base,
      color: "var(--primary-text-color)", // Selected value text color
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "var(--primary-bg-color)" // Selected option background
        : state.isFocused
        ? "var(--secondary-bg-color)" // Focused option background
        : "var(--secondary-bg-color)", // Default option background
      color: "var(--primary-text-color)", // Option text color
      cursor: "pointer",
      transition: "all 0.2s ease-in-out",
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "var(--secondary-bg-color)", // Dropdown menu background
    }),
    clearIndicator: (base) => ({
      ...base,
      color: "var(--primary-text-color)", // Clear button color
      "&:hover": { color: "var(--primary-text-color)" }, // Hover effect
    }),
  };

  return (
    <div className="min-h-screen mt-12 py-10 px-4">
      <h2 className="text-4xl font-bold text-center text-primaryText mb-8">
        All Users
      </h2>

      {/* Search and Filter Section */}
      <div className="flex flex-wrap items-center justify-between gap-4 my-10">
        <label className="input flex items-center gap-2 w-full max-w-xs md:w-auto rounded-none border border-primaryText bg-secondaryBg">
          <input
            type="text"
            placeholder="Search by Name or Email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <IoSearch className="text-primaryText text-xl" />
        </label>

        <Select
          options={roles}
          placeholder="Filter by Role"
          isClearable
          onChange={(selectedOption) => setRole(selectedOption)}
          styles={customStyles}
        />
      </div>

      {users.length === 0 ? (
        <div className="text-center text-primaryText">
          <p className="text-lg">No users found!</p>
        </div>
      ) : (
        <div className="bg-secondaryBg p-6 rounded-lg">
          <h3 className="text-2xl text-primaryText font-bold mb-6">
            Total Users: {data.totalUsers}
          </h3>

          {/* Scrollable Table */}
          <div className="w-full overflow-x-auto">
            <table className="table table-xs table-pin-rows table-pin-cols w-full min-w-[600px]">
              <thead className="rounded-t-3xl">
                <tr className="bg-primaryText text-secondaryText text-lg font-bold">
                  <td className="p-4 first:rounded-tl-2xl"></td>
                  <td className="p-4">User Name</td>
                  <td className="p-4">User Email</td>
                  <td className="p-4">Role</td>
                  <td className="p-4 last:rounded-tr-2xl">Action</td>
                </tr>
              </thead>
              <tbody>
                {users.map((user, idx) => (
                  <tr
                    key={user._id}
                    className="hover:bg-primaryBg border-b border-gray-200 "
                  >
                    <td className="p-4 text-secondaryText">
                      {(page - 1) * limit + idx + 1}
                    </td>
                    <td className="p-4 whitespace-normal break-words text-secondaryText max-w-[50px]">
                      {user.name}
                    </td>
                    <td className="p-4 whitespace-normal break-words max-w-[100px] text-secondaryText">
                      {user.email}
                    </td>
                    <td className="p-4">
                      {user?.role === "admin" ? (
                        <span className="text-primaryText">Admin</span>
                      ) : user?.role === "guide" ? (
                        <span className="text-primaryText">Guide</span>
                      ) : (
                        <button
                          onClick={() => handleMakeAdmin(user)}
                          className="btn btn-sm bg-transparent text-primaryText hover:bg-transparent shadow-none border-none"
                        >
                          <FaUsers />
                        </button>
                      )}
                    </td>
                    <td className="p-4">
                      <button
                        disabled={user?.role === "admin"}
                        onClick={() => handleDelete(user._id)}
                        className="btn btn-sm bg-transparent text-red-500 hover:bg-transparent shadow-none border-none"
                      >
                        <RiDeleteBin6Line />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        {[...Array(totalPages).keys()].map((pageNumber) => (
          <button
            key={pageNumber}
            className={`btn btn-sm mx-1 ${
              page === pageNumber + 1
                ? "btn-primary border-none bg-primaryText text-secondaryBg rounded-none hover:bg-primaryText hover:text-secondaryBg"
                : "btn-outline bg-secondaryBg border-primaryText hover:border-primaryText text-primaryText rounded-none hover:bg-secondaryBg hover:text-primaryText"
            }`}
            onClick={() => setPage(pageNumber + 1)}
          >
            {pageNumber + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllUsers;
