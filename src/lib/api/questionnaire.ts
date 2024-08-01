import { axiosInstance, handleError } from "../instance";
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
  image: string,
  title: string,
  description: string,
  questionnaire_question: {
    id?: number;
    questionnaire_id?: number;
    question: string;
    created_at?: string;
    updated_at?: string;
    available_answers?: {
      id?: number;
      questionnaireQuestionId?: number;
      answer_text: string;
      created_at: string;
      updated_at: string | null;
    }
  }
}) => {
  try {
    const response = await axiosInstance.post("/questionnaire", payload);
    return response;
  } catch (error) {
    handleError(error);
  }
}

export const putQuestionnaire = async (id: number, payload: {
  type: string,
  image: string,
  title: string,
  description: string,
  questionnaire_question: {
    id?: number;
    questionnaire_id?: number;
    question: string;
    created_at?: string;
    updated_at?: string;
    available_answers?: {
      id?: number;
      questionnaireQuestionId?: number;
      answer_text: string;
      created_at: string;
      updated_at: string | null;
    }
  }
}) => {
  try {
    const response = await axiosInstance.put(`/questionnaire/${id}`, payload, {
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