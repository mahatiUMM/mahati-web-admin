import { axiosInstance, handleError } from "../instance";
import { getToken } from "../utils";

const token = getToken();

export const getReminders = async () => {
  try {
    const response = await axiosInstance.get("/admin/reminders", {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    return response;
  } catch (error) {
    handleError(error);
  }
}

export const getReminderById = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/reminder/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response;
  } catch (error) {
    handleError(error);
  }
}

export const postReminder = async (payload: {
  user_id: number,
  medicine_name: string,
  medicine_taken: number,
  medicine_total: number,
  amount: number,
  cause: string,
  cap_size: number,
  medicine_time: string,
  expired_at: Date,
}) => {
  try {
    const response = await axiosInstance.post("/reminder", payload);
    return response;
  } catch (error) {
    handleError(error);
  }
}

export const putReminder = async (id: number, payload: {
  user_id: number,
  medicine_name: string,
  medicine_taken: number,
  medicine_total: number,
  amount: number,
  cause: string,
  cap_size: number,
  medicine_time: string,
  expired_at: Date,
}) => {
  try {
    const response = await axiosInstance.put(`/reminder/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response;
  } catch (error) {
    handleError(error);
  }
}

export const deleteReminder = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/reminder/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response;
  } catch (error) {
    handleError(error);
  }
}