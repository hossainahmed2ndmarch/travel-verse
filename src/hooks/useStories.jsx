import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useStories = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { refetch, data: storyData = [] } = useQuery({
    enabled: !!user?.email,
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/stories/${user.email}`);
      console.log(res);
      return res.data;
    },
  });
  return [storyData, refetch];
};

export default useStories;
