import { useQuery } from "@tanstack/react-query";
import { getSelf } from "../api/userApi";

export const useGetSelf = () => {
  return useQuery({
    queryKey: ["self"],
    queryFn: getSelf,
    retry: false,
  });
};
