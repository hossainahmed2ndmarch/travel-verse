import useAuth from "../../../hooks/useAuth";
import MyProfile from "../../../components/MyProfile";
import useUser from "../../../hooks/useUser";
import EditModal from "../../../components/EditModal";
import { useState } from "react";

const TouristProfile = () => {
  const { user } = useAuth();
  const [userData, refetch] = useUser();
  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <div>
      <h2 className="text-3xl text-center font-bold">
        {" "}
        Hi! Welcome
        <span className="text-primary">
          {" "}
          {userData?.name ? userData.name : "Back"}
        </span>
      </h2>
      {userData && <MyProfile userData={userData} setModalOpen={setModalOpen} isModalOpen={isModalOpen}></MyProfile>}
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

export default TouristProfile;
