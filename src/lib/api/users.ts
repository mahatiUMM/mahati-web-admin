import { axiosInstance, handleError } from "../instance";
import { getToken } from "../utils";

const token = getToken();

export const getAllUsers = async () => {
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

export const getProfile = async () => {
  try {
    const response = await axiosInstance.get("/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response;
  } catch (error) {
    handleError(error);
  }
}

export const putProfile = async (payload: any) => {
  try {
    const response = await axiosInstance.put("/profile", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      }
    });
    return response;
  } catch (error) {
    handleError(error);
  }
}