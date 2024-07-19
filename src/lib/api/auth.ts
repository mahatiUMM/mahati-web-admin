import { axiosInstance } from "../instance";
import axios from "axios";

export const login = async (payload: { email: string; password: string}) => {
  try {
    const response = await axiosInstance.post("/admin/signin", payload);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data || error;
    }
    throw error;
  }
}