import { axiosInstance, handleError } from "../instance";

export const getSchedules = async (token: string) => {
  try {
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