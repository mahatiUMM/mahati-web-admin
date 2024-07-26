import { axiosInstance, handleError } from "../instance";
import { getToken } from "../utils";

export const getSchedules = async () => {
  try {
    const token = getToken();
    const response = await axiosInstance.get("/schedule", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    handleError(error);
  }
}