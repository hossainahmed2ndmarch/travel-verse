import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useAssigned = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { refetch, data: assigned = [] } = useQuery({
    queryKey: ["assigned", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/assigned?email=${user?.email}`);
      return res.data;
    },
  });
  return [assigned, refetch];
};

export default useAssigned;
