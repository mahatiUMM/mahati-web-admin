import { axiosInstance, handleError } from "../instance";
import { getToken } from "../utils";

export const getAllUsers = async () => {
  try {
    const token = getToken();
    const response = await axiosInstance.get("/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response;
  } catch (error) {
    handleError(error);
  }
}