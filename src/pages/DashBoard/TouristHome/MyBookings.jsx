import React from "react";
import { FaDollarSign, FaTimesCircle } from "react-icons/fa";
import useBooking from "../../../hooks/useBooking";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import moment from "moment/moment";

const MyBookings = () => {
  const [bookings, refetch] = useBooking();
  const axiosSecure = useAxiosSecure();
  // const [modalOpen, setModalOpen] = useState(false);
  // const [selectedBookingId, setSelectedBookingId] = useState(null);

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
        axiosSecure.patch(`/bookings/${id}`).then((res) => {
          if (res.data.modifiedCount > 0) {
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
    <div className="min-h-screen mt-12 py-10 px-4">
      <h2 className="text-4xl font-bold text-center text-primaryText mb-8">
        My Bookings
      </h2>

      {bookings?.length === 0 ? (
        <div className="text-center text-primaryText">
          <p className="text-lg">No bookings found!</p>
        </div>
      ) : (
        <div className="bg-secondaryBg p-6 rounded-lg">
          <h3 className="text-2xl text-primaryText font-bold mb-6">
            Total Trips: {bookings?.length}
          </h3>
          <div className="w-full overflow-x-auto">
          <table className="table table-xs table-pin-rows table-pin-cols w-full min-w-[600px]">
            <thead className="rounded-t-3xl">
              <tr className="bg-primaryText text-secondaryText text-lg font-bold">
                <td className="p-4 first:rounded-tl-2xl"></td>
                <td className="p-4">Package</td>
                <td className="p-4">Guide</td>
                <td className="p-4">Date</td>
                <td className="p-4">Price</td>
                <td className="p-4">Status</td>
                <td className="text-center p-4">Action</td>
                <td className="p-4 last:rounded-tr-2xl">Action</td>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, idx) => (
                <tr
                  key={booking._id}
                  className="hover:bg-primaryBg border-b border-gray-200"
                >
                  <td className="p-4">{idx + 1}</td>
                  <td className="p-4 whitespace-normal break-words text-secondaryText max-w-[50px]">{booking.tripTitle}</td>
                  <td className="p-4 whitespace-normal break-words text-secondaryText max-w-[50px]">{booking.guideName}</td>
                  <td className="p-4 whitespace-normal break-words text-secondaryText max-w-[100px]">{moment(booking.tourDate).format("YYYY-MM-DD")}</td>
                  <td className="p-4 whitespace-normal break-words text-primaryText font-bold max-w-[50px]">
                    {booking.packagePrice} $
                  </td>
                  <td
                    className={`font-bold p-4 whitespace-normal break-words max-w-[50px] ${
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
                    {booking.status === "in-review" ? (
                      <button
                        disabled
                        className="btnbtn-sm text-primaryText opacity-50 cursor-not-allowed"
                      >
                        Paid
                      </button>
                    ) : (
                      <Link
                        to="/dashBoard/payment"
                        state={{ booking: booking }}
                        className="btn btn-success text-light"
                      >
                        Pay
                      </Link>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => handleCancel(booking._id)}
                      className="btn btn-sm bg-transparent hover:bg-transparent border-none shadow-none text-red-500"
                    >
                      Cancel
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

export default MyBookings;
