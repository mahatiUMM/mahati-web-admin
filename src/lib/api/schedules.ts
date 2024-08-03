import { axiosInstance, handleError } from "../instance";
import { getToken } from "../utils";

const token = getToken();

export const getSchedules = async () => {
  try {
    const response = await axiosInstance.get("/schedule", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    handleError(error);
  }
}

export const getScheduleById = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/schedule/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    handleError(error);
  }
}

export const postSchedule = async (payload: {
  id: number,
  reminder_id: number,
  time: string,
  status: number,
  created_at: string,
  updated_at: string,
  reminder: {
    id: number,
    user_id: number,
    medicine_name: string,
    medicine_taken: number,
    medicine_total: number,
    amount: number,
    cause: string,
    cap_size: number,
    expired_at: string,
    created_at: string,
    updated_at: string,
  }
}) => {
  try {
    const response = await axiosInstance.post("/schedule", payload);
    return response;
  } catch (error) {
    handleError(error);
  }
}

export const putSchedule = async (id: number, payload: {
  id: number,
  reminder_id: number,
  time: string,
  status: number,
  created_at: string,
  updated_at: string,
  reminder: {
    id: number,
    user_id: number,
    medicine_name: string,
    medicine_taken: number,
    medicine_total: number,
    amount: number,
    cause: string,
    cap_size: number,
    expired_at: string,
    created_at: string,
    updated_at: string,
  }
}) => {
  try {
    const response = await axiosInstance.put(`/schedule/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response;
  } catch (error) {
    handleError(error);
  }
}

export const deleteSchedule = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/schedule/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    return response;
  } catch (error) {
    handleError(error);
  }
}