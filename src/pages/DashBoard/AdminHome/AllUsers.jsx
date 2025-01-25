import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";
import { FaUsers } from "react-icons/fa6";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
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
    <div className="min-h-screen py-10 px-4 md:px-16">
      <h2 className="text-4xl font-bold text-center text-primary mb-8">
        All Users
      </h2>

      {users?.length === 0 ? (
        <div className="text-center text-gray-500">
          <p className="text-lg">No users found!</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-light p-12">
          <h3 className="text-2xl font-bold mb-10">
            Total Users: {users?.length}
          </h3>
          <table className="table w-full border-collapse border border-secondary">
            <thead className="rounded-t-3xl">
              <tr className="bg-primary text-white text-lg font-bold">
                <th className="p-4 first:rounded-tl-2xl"></th>
                <th className="p-4"></th>
                <th className="p-4">User Name</th>
                <th className="p-4">User Email</th>
                <th className="p-4">Role</th>
                <th className="text-center p-4">Action</th>
                <th className="text-center last:rounded-tr-2xl p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-100 border-b border-gray-200"
                >
                  <td className="p-4">{idx + 1}</td>
                  <td>
                    {" "}
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={user?.photo}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td className="flex items-center space-y-2"></td>

                  <td>
                    <button
                      // onClick={() => handlePay(booking._id)}
                      className="btn btn-md bg-primary text-2xl text-light"
                    >
                      {" "}
                      <FaUsers></FaUsers>
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(user?._id)}
                      className="btn btn-md text-red-500 text-2xl"
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
    </div>
  );
};

export default AllUsers;
