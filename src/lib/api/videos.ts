import { axiosInstance, handleError } from "../instance";
import { getToken } from "../utils";

const token = getToken();

export const getVideos = async () => {
  try {
    const response = await axiosInstance.get("/videos", {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response;
  } catch (error) {
    handleError(error);
  }
}

export const getVideoById = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/videos/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    handleError(error);
  }
}

export const postVideo = async (payload: {
  link: string,
  user_id: number,
}) => {
  try {
    const response = await axiosInstance.post("/videos", payload);
    return response;
  } catch (error) {
    handleError(error);
  }
}

export const putVideo = async (id: number, payload: {
  link: string,
  user_id: number,
}) => {
  try {
    const response = await axiosInstance.put(`/videos/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response;
  } catch (error) {
    handleError(error);
  }
}

export const deleteVideo = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/videos/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response;
  } catch (error) {
    handleError(error)
  }
}