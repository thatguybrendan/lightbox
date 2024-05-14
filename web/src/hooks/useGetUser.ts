import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/userApi";

export const useGetUser = (userId: number) => {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(userId),
  });
};
