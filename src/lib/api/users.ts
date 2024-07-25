import { axiosInstance, handleError } from "../instance";

export const getAllUsers = async (token: string) => {
  try {
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