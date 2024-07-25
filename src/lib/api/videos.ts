import { axiosInstance, handleError } from "../instance";

export const getVideos = async (token: string) => {
  try {
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