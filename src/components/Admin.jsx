import React from "react";
import useAdmin from "../hooks/useAdmin";

const MyProfile = ({ userData, setModalOpen }) => {
  const [isAdmin] = useAdmin();
  

  return (
    <div className="my-12 flex flex-col items-center w-full space-y-12">
      {/* Profile Section */}
      <div className="bg-primary w-full items-center flex flex-col p-16 space-y-6">
        <div className="avatar mb-4">
          <div className="w-32 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
            <img
              src={userData?.photo || "https://via.placeholder.com/150"}
              alt="Admin Profile"
            />
          </div>
        </div>
        <p className="text-3xl text-light font-semibold">
          {userData?.name || "Admin"}
        </p>
        <p className="text-md md:text-lg text-gray-200">
          {userData?.email || "admin@example.com"}
        </p>
        <div className="badge bg-secondary text-primary p-4 font-semibold">
          Role: {userData?.role || "Admin"}
        </div>
      </div>

      

      {/* Edit Profile Button */}
      <button
        onClick={() => setModalOpen(true)}
        className="btn bg-primary text-light rounded-none w-full mt-4"
      >
        Edit Profile
      </button>
    </div>
  );
};

export default MyProfile;
