import { axiosInstance, handleError } from "../instance";
import { getToken } from "../utils";

export const getVideos = async () => {
  try {
    const token = getToken();
    const response = await axiosInstance.get("/video", {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response;
  } catch (error) {
    handleError(error);
  }
}