import React from "react";
import { FaDollarSign } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAssigned from "../../../hooks/useAssigned";
import moment from "moment";

const MyAssignedTours = () => {
  const [assigned, refetch] = useAssigned();
  const axiosSecure = useAxiosSecure();

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
    <div className="min-h-screen mt-12 py-10 px-4">
      <h2 className="text-4xl font-bold text-center text-primaryText mb-8">
        My Assigned Tours
      </h2>

      {assigned?.length === 0 ? (
        <div className="text-center text-primaryText">
          <p className="text-lg">No assigned tours found!</p>
        </div>
      ) : (
        <div className="bg-secondaryBg p-6 rounded-lg">
          <h3 className="text-2xl text-primaryText font-bold mb-6">
            Total Assigned Tours: {assigned?.length}
          </h3>
          <div className="w-full overflow-x-auto">
            <table className="table table-xs table-pin-rows table-pin-cols w-full min-w-[600px]">
              <thead className="rounded-t-3xl">
                <tr className="bg-primaryText text-secondaryText text-lg font-bold">
                  <td className="p-4 first:rounded-tl-2xl"></td>
                  <td className="p-4">Package</td>
                  <td className="p-4">Tourist</td>
                  <td className="p-4">Date</td>
                  <td className="p-4">Price</td>
                  <td className="p-4">Status</td>
                  <td className="text-center p-4">Accept</td>
                  <td className="p-4 last:rounded-tr-2xl">Reject</td>
                </tr>
              </thead>
              <tbody>
                {assigned.map((assign, idx) => (
                  <tr
                    key={assign._id}
                    className="hover:bg-primaryBg border-b border-gray-200"
                  >
                    <td className="p-4">{idx + 1}</td>
                    <td className="p-4 whitespace-normal break-words text-secondaryText max-w-[50px]">
                      {assign.tripTitle}
                    </td>
                    <td className="p-4 whitespace-normal break-words text-secondaryText max-w-[50px]">
                      {assign.touristName}
                    </td>
                    <td className="p-4 whitespace-normal break-words text-secondaryText max-w-[100px]">
                      {moment(assign.tourDate).format("YYYY-MM-DD")}
                    </td>
                    <td className="p-4 whitespace-normal break-words text-primaryText max-w-[50px]">
                      {assign.packagePrice} $
                    </td>
                    <td
                      className={`font-bold p-4 whitespace-normal break-words max-w-[50px] ${
                        assign.status === "Accepted"
                          ? "text-primaryText"
                          : assign.status === "Rejected"
                          ? "text-red-500"
                          : "text-yellow-500"
                      }`}
                    >
                      {assign.status}
                    </td>
                    <td>
                      {assign.status !== "in-review"? (
                        <button
                          disabled
                          className="btn btn-sm shadow-none bg-transparent hover:bg-transparent border-none  text-primaryText"
                        >
                          Accept
                        </button>
                      ) : (
                        <button
                          onClick={() => handleAccept(assign._id)}
                          className="btn btn-sm shadow-none bg-transparent hover:bg-transparent border-none  text-primaryText"
                        >
                          Accept
                        </button>
                      )}
                    </td>
                    <td>
                      <button
                        onClick={() => handleReject(assign._id)}
                        className="btn btn-sm bg-transparent hover:bg-transparent border-none shadow-none text-red-500"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAssignedTours;
