import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const ManageCandidates = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch, data: applications = [] } = useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      const res = await axiosSecure.get("/applications");
      return res.data;
    },
  });

  const handleAccept = (application) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to accept this application!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, accept!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Create the guide data object
        const guideData = {
          name: application?.name,
          email: application?.email,
          photo: application?.photo,
          whatsapp: application?.whatsapp,
          facebook: application?.facebook,
          extraSkill: application?.extraSkill,
          languageSkill: application?.languageSkill,
          // Add other fields from the application if needed
        };

        // Perform both PATCH and POST requests
        const patchPromise = axiosSecure.patch(
          `/users/guide/${application?.email}`
        );
        const postPromise = axiosSecure.post("/guides", guideData);

        // Handle both promises
        Promise.all([patchPromise, postPromise])
          .then(([patchResponse, postResponse]) => {
            const { data: patchData } = patchResponse;
            const { result, deleteResult } = postResponse.data;

            if (
              patchData.modifiedCount > 0 &&
              result.insertedId &&
              deleteResult.deletedCount > 0
            ) {
              refetch();
              Swal.fire({
                title: "Success!",
                text: "Candidate has been accepted, role updated, and added as a guide.",
                icon: "success",
              });
            } else {
              Swal.fire({
                title: "Error!",
                text: "Something went wrong. Please check the data and try again.",
                icon: "error",
              });
            }
          })
          .catch((error) => {
            Swal.fire({
              title: "Error!",
              text: "An error occurred while processing the request.",
              icon: "error",
            });
            console.error(error);
          });
      }
    });
  };

  const handleReject = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete application!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/applications/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "application has been deleted.",
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
        Guide Candidates
      </h2>

      {applications?.length === 0 ? (
        <div className="text-center text-primaryText">
          <p className="text-lg">No bookings found!</p>
        </div>
      ) : (
        <div className="bg-secondaryBg p-6 rounded-lg">
          <h3 className="text-2xl text-primaryText font-bold mb-6">
            Total Applications: {applications?.length}
          </h3>
          <div className="w-full overflow-x-auto">
            <table className="table table-xs table-pin-rows table-pin-cols w-full min-w-[600px]">
              <thead className="rounded-t-3xl">
                <tr className="bg-primaryText text-secondaryText text-lg font-bold">
                  <td className="p-4 first:rounded-tl-2xl"></td>
                  <td className="p-4"></td>
                  <td className="p-4">Name</td>
                  <td className="p-4">Email</td>
                  <td className="p-4">Action</td>
                  <td className="p-4 last:rounded-tr-2xl">
                    Action
                  </td>
                </tr>
              </thead>
              <tbody>
                {applications.map((application, idx) => (
                  <tr
                    key={application._id}
                    className="hover:bg-primaryBg border-b border-gray-200 text-secondaryText"
                  >
                    <td className="p-4">{idx + 1}</td>
                    <td>
                      {" "}
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={application?.photo}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="p-4 whitespace-normal break-words text-secondaryText max-w-[50px]">{application?.name}</td>
                    <td className="p-4 whitespace-normal break-words max-w-[100px] text-secondaryText">{application?.email}</td>
                    <td>
                      <button
                        onClick={() => handleAccept(application)}
                        className="btn shadow-none bg-transparent hover:bg-transparent border-none text-primaryText"
                      >
                        Accept
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => handleReject(application?._id)}
                        className="btn shadow-none bg-transparent hover:bg-transparent border-none text-red-500"
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

export default ManageCandidates;
