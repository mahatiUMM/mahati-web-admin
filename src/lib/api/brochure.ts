import { axiosInstance, handleError } from "../instance";
import { getToken } from "@/lib/utils"

const token = getToken();

export const getBrochures = async () => {
  try {
    const response = await axiosInstance.get("/brochure", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    handleError(error);
  }
}

export const getBrochureById = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/brochure/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    });
    return response;
  } catch (error) {
    handleError(error);
  }
}

export const postBrochure = async (payload: {
  image: string,
}) => {
  try {
    const response = await axiosInstance.post("/brochure", payload, {
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

export const putBrochure = async (id: number, payload: {
  image: string,
}) => {
  try {
    const response = await axiosInstance.put(`/brochure/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response;
  } catch (error) {
    handleError(error);
  }
}

export const deleteBrochure = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/brochure/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response;
  } catch (error) {
    handleError(error);
  }
}