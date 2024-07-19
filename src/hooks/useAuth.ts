import { useMutation } from "@tanstack/react-query";
import { login } from "@/lib/api/auth";

const LoginAdmin = (payload: { email: string; password: string}) => {
  return useMutation({
    mutationFn: async () => {
      const data = await login(payload);
      return data;
    },
    onSuccess: (res) => {
      console.log(res);
    },
    onError: (error) => {
      console.log(error);
    }
  })
}

const useAuth = {
  LoginAdmin
}

export default useAuth;