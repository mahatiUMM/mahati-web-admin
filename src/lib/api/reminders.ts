import { axiosInstance, handleError } from "../instance";

export const getReminders = async (token: string) => {
  try {
    const response = await axiosInstance.get("/reminder", {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    return response;
  } catch (error) {
    handleError(error);
  }
}