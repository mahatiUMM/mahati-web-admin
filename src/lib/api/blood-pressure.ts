import { axiosInstance, handleError } from "../instance";
import { getToken } from "@/lib/utils"

const token = getToken();

export const getBloodPressure = async () => {
  try {
    const response = await axiosInstance.get("/admin/blood_pressure", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    handleError(error);
  }
}

export const getBloodPressureById = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/admin/blood_pressure/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    handleError(error);
  }
}

export const postBloodPressure = async (payload: {
  user_id: number,
  image: string,
  sistol: string,
  diastole: string,
  heartbeat: string,
}) => {
  try {
    const response = await axiosInstance.post("/admin/blood_pressure", payload, {
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

export const putBloodPressure = async (id: number, payload: {
  user_id: number,
  image: string,
  sistol: string,
  diastole: string,
  heartbeat: string,
}) => {
  try {
    const response = await axiosInstance.put(`/admin/blood_pressure/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    handleError(error);
  }
}

export const deleteBloodPressure = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/admin/blood_pressure/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    handleError(error);
  }
}