import { axiosInstance } from "../instance";
import axios from "axios";

export const getBloodPressure = async () => {
  try {
    const response = await axiosInstance.get("/blood_pressure");
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data || error;
    }
    throw error;
  }
}

export const getBloodPressureById = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/blood_pressure/${id}`);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data || error;
    }
    throw error;
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
    if (axios.isAxiosError(error)) {
      return error.response?.data || error;
    }
    throw error;
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
    if (axios.isAxiosError(error)) {
      return error.response?.data || error;
    }
    throw error;
  }
}

export const deleteBloodPressure = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/blood_pressure/${id}`);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data || error;
    }
    throw error;
  }
}