import React from "react";
import useGuide from "../hooks/useGuide";

const MyProfile = ({ userData }) => {
  const [isGuide] = useGuide();
  return (
    <div className="my-12 flex items-center justify-between  w-full">
      <div className="bg-primary w-full items-center flex flex-col p-32 space-y-6">
        <div className="avatar mb-4">
          <div className="w-32 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
            <img
              src={userData?.photo || "https://via.placeholder.com/150"}
              alt="User Profile"
            />
          </div>
        </div>
        <p className="text-3xl text-light font-semibold">
          {" "}
          {userData?.name || "N/A"}
        </p>
      </div>

      {/* User Information */}
      <div className="bg-white p-32 w-full space-y-6">
        <p className="text-xl text-primary font-semibold">
          <strong>Email:</strong> {userData?.email || "N/A"}
        </p>
        <div className="badge p-4 font-semibold border-primary text-primary">
          {userData?.role || "Tourist"}
        </div>

        {/* Edit Button */}
        <button
          // onClick={() => setModalOpen(true)}
          className="btn bg-primary text-light rounded-none  w-full mt-4"
        >
          Edit Profile
        </button>

        {/* Apply as Tour Guide */}
        {!isGuide && (
          <button
            // onClick={() => navigate("/join-as-tour-guide")}
            className="btn bg-transparent border-primary rounded-none text-primary w-full mt-2"
          >
            Apply For Tour Guide
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
