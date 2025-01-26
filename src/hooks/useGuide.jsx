import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useGuide = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: isGuide, isPending: isGuideLoading } = useQuery({
    queryKey: [user?.email, "isGuide"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/guide/${user.email}`);
      return res.data?.guide;
    },
  });
  return [isGuide, isGuideLoading];
};

export default useGuide;
