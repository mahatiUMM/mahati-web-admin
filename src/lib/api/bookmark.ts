import { axiosInstance, handleError } from "../instance";
import { getToken } from "../utils";

const token = getToken();

export const getBookmark = async () => {
  try {
    const response = await axiosInstance.get("/bookmark", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    handleError(error);
  }
}

export const getBookmarkById = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/bookmark/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    handleError(error);
  }
}

export const postBookmark = async (payload: {
  user_id: number,
  video_id: number,
  is_bookmark: boolean,
}) => {
  try {
    const response = await axiosInstance.post("/bookmark", payload);
    return response;
  } catch (error) {
    handleError(error);
  }
}

export const putBookmark = async (id: number, payload: {
  user_id: number,
  video_id: number,
  is_bookmark: boolean,
}) => {
  try {
    const response = await axiosInstance.put(`/bookmark/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    handleError(error);
  }
}

export const deleteBookmark = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/bookmark/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    handleError(error);
  }
}