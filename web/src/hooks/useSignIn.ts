import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signIn } from "../api/userApi";

export const useSignIn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signIn,
    onSuccess(data) {
      queryClient.setQueryData(["user"], data);
    },
  });
};
