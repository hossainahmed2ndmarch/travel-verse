import useAuth from "../../../hooks/useAuth";
import MyProfile from "../../../components/MyProfile";
import Admin from "../../../components/Admin";
import useUser from "../../../hooks/useUser";
import { useState } from "react";
import EditModal from "../../../components/EditModal";

const AdminProfile = () => {
  const { user } = useAuth();
  const [userData, refetch] = useUser();
  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <div className="mt-24">
      <h2 className="text-3xl text-center font-bold">
        {" "}
        Hi! Welcome
        <span className="text-primary">
          {" "}
          {userData?.name ? userData.name : "Back"}
        </span>
      </h2>
      {userData && (
        // <Admin
        //   userData={userData}
        //   setModalOpen={setModalOpen}
        //   isModalOpen={isModalOpen}
        // ></Admin>
        <MyProfile
          userData={userData}
          setModalOpen={setModalOpen}
          isModalOpen={isModalOpen}
        ></MyProfile>
      )}
      {isModalOpen && (
        <EditModal
          setModalOpen={setModalOpen}
          isModalOpen={isModalOpen}
          userData={userData}
          refetch={refetch}
        ></EditModal>
      )}
    </div>
  );
};

export default AdminProfile;
