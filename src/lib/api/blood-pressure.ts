import { axiosInstance, handleError } from "../instance";

export const getBloodPressure = async (token: string) => {
  try {
    const response = await axiosInstance.get("/blood_pressure", {
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
    const response = await axiosInstance.get(`/blood_pressure/${id}`);
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
    const response = await axiosInstance.post("/blood_pressure", payload);
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
    const response = await axiosInstance.put(`/blood_pressure/${id}`);
    return response;
  } catch (error) {
    handleError(error);
  }
}

export const deleteBloodPressure = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/blood_pressure/${id}`);
    return response;
  } catch (error) {
    handleError(error);
  }
}