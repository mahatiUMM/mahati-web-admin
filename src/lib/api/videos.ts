import { axiosInstance, handleError } from "../instance";
import { getToken } from "../utils";

const token = getToken();

export const getVideos = async () => {
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

export const getVideoById = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/video/${id}`, {
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
    const response = await axiosInstance.post("/video", payload);
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
    const response = await axiosInstance.put(`/video/${id}`, payload, {
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
    const response = await axiosInstance.delete(`/video/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response;
  } catch (error) {
    handleError(error)
  }
}