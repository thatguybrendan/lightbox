import { useMutation, useQueryClient } from "@tanstack/react-query";
import { post } from "../utils/post";
const postData = async (data: {
  email: string;
  password: string;
}): Promise<{ id: number; email: string }> => {
  const { email, password } = data;
  const response = await post("user/login", { email, password });
  return response.json();
};

export const useSignIn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postData,
    onSuccess(data, variables, context) {
      console.log("onSuccess", data, variables, context);
      queryClient.setQueryData(["user"], data);
    },
  });
};
