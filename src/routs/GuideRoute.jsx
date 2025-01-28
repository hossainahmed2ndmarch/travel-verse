import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../pages/Loading/Loading";
import useGuide from "../hooks/useGuide";

const GuideRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isGuide, isGuideLoading] = useGuide();
  const location = useLocation();
  // console.log(location);
  if (loading || isGuideLoading) {
    return <Loading></Loading>;
  }
  if (user && user?.email && isGuide) {
    return children;
  }
  return <Navigate state={location?.pathname} to={"/login"}></Navigate>;
};

export default GuideRoute;
