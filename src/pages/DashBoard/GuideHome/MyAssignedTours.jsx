import React from "react";
import { FaDollarSign } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAssigned from "../../../hooks/useAssigned";

const MyAssignedTours = () => {
  const [assigned, refetch] = useAssigned(); // Custom hook to fetch assigned tours
  const axiosSecure = useAxiosSecure(); // Axios instance with authentication

  // Handle Accept
  const handleAccept = async (id) => {
    try {
      const res = await axiosSecure.patch(`/bookings/assigned/${id}`, {
        action: "accept",
      });
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire("Accepted!", "The tour has been accepted.", "success");
      }
    } catch (error) {
      console.error("Error accepting tour:", error);
      Swal.fire(
        "Error",
        "Failed to accept the tour. Please try again.",
        "error"
      );
    }
  };

  // Handle Reject
  const handleReject = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action will reject the tour.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, reject it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch(`/bookings/assigned/${id}`, {
            action: "reject",
          });
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire("Rejected!", "The tour has been rejected.", "success");
          }
        } catch (error) {
          console.error("Error rejecting tour:", error);
          Swal.fire(
            "Error",
            "Failed to reject the tour. Please try again.",
            "error"
          );
        }
      }
    });
  };

  return (
    <div className="min-h-screen py-10 px-4 md:px-16">
      <h2 className="text-4xl font-bold text-center text-primary mb-8">
        My Assigned Tours
      </h2>

      {assigned?.length === 0 ? (
        <div className="text-center text-gray-500">
          <p className="text-lg">No assigned tours found!</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-light p-12">
          <h3 className="text-2xl font-bold mb-10">
            Total Assigned Tours: {assigned?.length}
          </h3>
          <table className="table w-full border-collapse border border-secondary">
            <thead>
              <tr className="bg-primary text-white text-lg font-bold">
                <th className="p-4 first:rounded-tl-2xl"></th>
                <th className="p-4">Package Name</th>
                <th className="p-4">Tourist Name</th>
                <th className="p-4">Tour Date</th>
                <th className="p-4">Price</th>
                <th className="p-4">Status</th>
                <th className="text-center p-4">Accept</th>
                <th className="text-center last:rounded-tr-2xl p-4">Reject</th>
              </tr>
            </thead>
            <tbody>
              {assigned.map((assign, idx) => (
                <tr
                  key={assign._id}
                  className="hover:bg-gray-100 border-b border-gray-200"
                >
                  <td className="p-4">{idx + 1}</td>
                  <td>{assign.tripTitle}</td>
                  <td>{assign.touristName}</td>
                  <td>{assign.tourDate}</td>
                  <td className="flex items-center">
                    <FaDollarSign className="text-primary text-lg mr-2" />
                    {assign.packagePrice}
                  </td>
                  <td
                    className={`font-bold ${
                      assign.status === "Accepted"
                        ? "text-green-500"
                        : assign.status === "Rejected"
                        ? "text-red-500"
                        : "text-yellow-500"
                    }`}
                  >
                    {assign.status}
                  </td>
                  <td>
                    {assign.status === "pending" ||
                    assign.status === "Rejected" ? (
                      <button
                        disabled
                        className="btn btn-success text-light opacity-50 cursor-not-allowed"
                      >
                        Accept
                      </button>
                    ) : (
                      <button
                        onClick={() => handleAccept(assign._id)}
                        className="btn btn-success text-light"
                      >
                        Accept
                      </button>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => handleReject(assign._id)}
                      className="btn btn-error text-light"
                    >
                      Reject
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

export default MyAssignedTours;
