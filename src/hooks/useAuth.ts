import { useMutation } from "@tanstack/react-query";
import { login } from "@/lib/api/auth";

const LoginAdmin = ({ callBack }: { callBack: () => void }) => {
  return useMutation({
    mutationFn: async (payload: { email: string; password: string }) => {
      const data = await login(payload);
      return data;
    },
    onSuccess: (res) => {
      if (res) {
        callBack();
      }
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