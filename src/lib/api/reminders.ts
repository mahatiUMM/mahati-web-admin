import { axiosInstance, handleError } from "../instance";
import { getToken } from "../utils";

export const getReminders = async () => {
  try {
    const token = getToken();
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