import useAuth from "../../../hooks/useAuth";
import MyProfile from "../../../components/MyProfile";
import useUser from "../../../hooks/useUser";

const GuideProfileDashboard = () => {
  const { user } = useAuth();
  const [userData] = useUser();
  return (
    <div>
      <h2 className="text-3xl text-center font-bold">
        {" "}
        Hi! Welcome
        <span className="text-primary">
          {" "}
          {user?.displayName ? user.displayName : "Back"}
        </span>
      </h2>
      {userData && <MyProfile userData={userData}></MyProfile>}
    </div>
  );
};

export default GuideProfileDashboard;
