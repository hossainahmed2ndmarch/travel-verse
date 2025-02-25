import React from "react";
import useGuide from "../hooks/useGuide";
import useAdmin from "../hooks/useAdmin";
import { Link } from "react-router-dom";

const MyProfile = ({ userData, setModalOpen, isModalOpen }) => {
  const [isGuide] = useGuide();
  const [isAdmin] = useAdmin();
  
  return (
    <div className="my-12 flex flex-col md:flex-row items-center w-full gap-8 px-6">
      {/* Profile Section */}
      <div className="bg-secondaryBg w-full md:w-1/2 flex flex-col items-center p-10 md:p-16 space-y-6 rounded-lg">
        <div className="avatar mb-4">
          <div className="w-24 md:w-32 rounded-full ring ring-primaryText ring-offset-base-100 ring-offset-2">
            <img
              src={userData?.photo || "https://via.placeholder.com/150"}
              alt="User Profile"
            />
          </div>
        </div>
        <p className="text-2xl md:text-3xl text-primaryText font-semibold">
          {userData?.name || "N/A"}
        </p>
      </div>

      {/* User Information */}
      <div className="bg-secondaryBg w-full md:w-1/2 p-6 md:p-16 space-y-6 rounded-lg">
        <p className="text-lg md:text-xl text-secondaryText font-semibold">
          <strong>Email:</strong> {userData?.email || "N/A"}
        </p>
        <div className="badge p-2 md:p-4 font-semibold border-primaryText bg-primaryBg text-primaryText">
          {userData?.role || "Tourist"}
        </div>

        {/* Edit Button */}
        <button
          onClick={() => setModalOpen(true)}
          className="btn bg-primaryBg hover:bg-primaryBg border-primaryText text-primaryText rounded-none hover:text-primaryText  w-full"
        >
          Edit Profile
        </button>

        {/* Apply as Tour Guide */}
        {!isAdmin && !isGuide && (
          <Link to='/dashBoard/application'
            className="btn bg-primaryBg hover:bg-primaryBg border-primaryText text-primaryText rounded-none hover:text-primaryText  w-full"
          >
            Apply For Tour Guide
          </Link>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
