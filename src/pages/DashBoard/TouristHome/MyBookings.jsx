import React from "react";
import { FaDollarSign, FaTimesCircle } from "react-icons/fa";
import useBooking from "../../../hooks/useBooking";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyBookings = () => {
  const [bookings, refetch] = useBooking();
  const axiosSecure = useAxiosSecure();

  const handlePay = (id) => {
    console.log("Pay clicked for booking ID:", id);
    // Add payment logic here
  };

  const handleCancel = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel booking!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/bookings/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Canceled!",
              text: "Your booking has been canceled.",
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
        My Bookings
      </h2>

      {bookings?.length === 0 ? (
        <div className="text-center text-gray-500">
          <p className="text-lg">No bookings found!</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-light p-12">
          <h3 className="text-2xl font-bold mb-10">
            Total Trips: {bookings?.length}
          </h3>
          <table className="table w-full border-collapse border border-secondary">
            <thead className="rounded-t-3xl">
              <tr className="bg-primary text-white text-lg font-bold">
                <th className="p-4 first:rounded-tl-2xl"></th>
                <th className="p-4">Package Name</th>
                <th className="p-4">Guide Name</th>
                <th className="p-4">Tour Date</th>
                <th className="p-4">Price</th>
                <th className="p-4">Status</th>
                <th className="text-center p-4">Action</th>
                <th className="text-center last:rounded-tr-2xl p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, idx) => (
                <tr
                  key={booking._id}
                  className="hover:bg-gray-100 border-b border-gray-200"
                >
                  <td className="p-4">{idx + 1}</td>
                  <td>{booking.tripTitle}</td>
                  <td>{booking.guideName}</td>
                  <td>{booking.tourDate}</td>
                  <td className="flex items-center space-y-2">
                    <FaDollarSign className="text-primary text-lg" />
                    {booking.packagePrice}
                  </td>
                  <td
                    className={`font-bold ${
                      booking.status === "Accepted"
                        ? "text-green-500"
                        : booking.status === "Rejected"
                        ? "text-red-500"
                        : "text-yellow-500"
                    }`}
                  >
                    {booking.status}
                  </td>
                  <td>
                    <button
                      onClick={() => handlePay(booking._id)}
                      className="btn btn-success text-light"
                    >
                      {" "}
                      Pay
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleCancel(booking._id)}
                      className="btn btn-error text-light"
                    >
                      Cancel
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

export default MyBookings;
