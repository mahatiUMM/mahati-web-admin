import { axiosInstance, setAuthToken } from "../instance";
import axios from "axios";
import { getToken } from "../utils";

export const login = async (payload: { email: string; password: string}) => {
  try {
    const response = await axiosInstance.post("/admin/signin", payload);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error;
    }
    throw error;
  }
}