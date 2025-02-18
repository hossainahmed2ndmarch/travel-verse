import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import ReactSelect from "react-select"; // Dropdown for filtering
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";
import { FaUsers } from "react-icons/fa6";

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

  return (
    <div className="min-h-screen overflow-x-auto mt-12 py-10 px-4 md:px-16">
      <h2 className="text-4xl font-bold text-center text-primary mb-8">
        All Users
      </h2>

      {/* Search and Filter Section */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by Name or Email"
          className="input input-bordered w-full max-w-xs md:w-auto rounded-none border border-primary bg-light"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <ReactSelect
          options={roles}
          placeholder="Filter by Role"
          isClearable
          onChange={(selectedOption) => setRole(selectedOption)}
        />
      </div>

      {users.length === 0 ? (
        <div className="text-center text-gray-500">
          <p className="text-lg">No users found!</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-light p-12">
          <h3 className="text-2xl font-bold mb-10">
            Total Users: {data.totalUsers}
          </h3>
          <table className="table table-xs table-pin-rows table-pin-cols ">
            <thead className="rounded-t-3xl">
              <tr className="bg-primary text-white text-lg font-bold">
                <td className="p-4 first:rounded-tl-2xl">#</td>
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
                  className="hover:bg-gray-100 border-b border-gray-200"
                >
                  <th className="p-4">{(page - 1) * limit + idx + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {user?.role === "admin" ? (
                      <span className="text-primary">Admin</span>
                    ) : user?.role === "guide" ? (
                      <span className="text-primary">Guide</span>
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className="btn btn-md bg-primary text-light flex items-center gap-1"
                      >
                        <FaUsers />
                      </button>
                    )}
                  </td>
                  <td>
                    <button
                      disabled={user?.role === "admin"}
                      onClick={() => handleDelete(user._id)}
                      className="btn btn-md text-red-500 flex items-center gap-1"
                    >
                      <RiDeleteBin6Line />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        {[...Array(totalPages).keys()].map((pageNumber) => (
          <button
            key={pageNumber}
            className={`btn btn-sm mx-1 ${
              page === pageNumber + 1
                ? "btn-primary border-none bg-primary text-light rounded-none hover:bg-light hover:text-primary "
                : "btn-outline bg-light text-primary rounded-none hover:bg-light hover:text-primary"
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
