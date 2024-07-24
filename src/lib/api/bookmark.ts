import { axiosInstance } from "../instance";
import axios from "axios";

export const getBookmark = async (token: string) => {
  try {
    const response = await axiosInstance.get("/bookmark",{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    );
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data || error;
    }
    throw error;
  }
}