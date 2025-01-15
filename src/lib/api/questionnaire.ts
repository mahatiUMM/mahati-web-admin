import { axiosInstance, axiosInstanceFormData, handleError } from "../instance";
import { getToken } from "../utils";

const token = getToken();

export const getQuestionnaires = async () => {
  try {
    const response = await axiosInstance.get("/questionnaire", {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    return response;
  } catch (error) {
    handleError(error);
  }
}

export const getQuestionnaireById = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/questionnaire/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response;
  } catch (error) {
    handleError(error);
  }
}

export const postQuestionnaire = async (payload: {
  type: string,
  title: string,
  description: string,
}) => {
  try {
    const response = await axiosInstanceFormData.post("/questionnaire", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response;
  } catch (error) {
    handleError(error);
  }
}

export const putQuestionnaire = async (id: number, payload: {
  type: string,
}) => {
  try {
    const response = await axiosInstanceFormData.put(`/questionnaire/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response;
  } catch (error) {
    handleError(error);
  }
}

export const deleteQuestionnaire = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/questionnaire/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response;
  } catch (error) {
    handleError(error);
  }
}