import React from "react";
import useGuide from "../hooks/useGuide";
import useAdmin from "../hooks/useAdmin";

const MyProfile = ({ userData, setModalOpen, isModalOpen }) => {
  const [isGuide] = useGuide();
  const [isAdmin] = useAdmin();
  
  return (
    <div className="my-12 flex flex-col md:flex-row items-center w-full gap-8 px-6">
      {/* Profile Section */}
      <div className="bg-primary w-full md:w-1/2 flex flex-col items-center p-10 md:p-16 space-y-6 rounded-lg shadow-md">
        <div className="avatar mb-4">
          <div className="w-24 md:w-32 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
            <img
              src={userData?.photo || "https://via.placeholder.com/150"}
              alt="User Profile"
            />
          </div>
        </div>
        <p className="text-2xl md:text-3xl text-light font-semibold">
          {userData?.name || "N/A"}
        </p>
      </div>

      {/* User Information */}
      <div className="bg-white w-full md:w-1/2 p-6 md:p-16 space-y-6 rounded-lg shadow-md">
        <p className="text-lg md:text-xl text-primary font-semibold">
          <strong>Email:</strong> {userData?.email || "N/A"}
        </p>
        <div className="badge p-2 md:p-4 font-semibold border-primary text-primary">
          {userData?.role || "Tourist"}
        </div>

        {/* Edit Button */}
        <button
          onClick={() => setModalOpen(true)}
          className="btn bg-primary text-light rounded-lg w-full mt-4 py-2 md:py-3"
        >
          Edit Profile
        </button>

        {/* Apply as Tour Guide */}
        {!isAdmin && !isGuide && (
          <button
            className="btn bg-transparent border-primary rounded-lg text-primary w-full mt-2 py-2 md:py-3"
          >
            Apply For Tour Guide
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
