import { axiosInstance, handleError } from "../instance";
import { getToken } from "../utils";

const token = getToken();

export const getQuestionnaireQuestions = async () => {
  try {
    const response = await axiosInstance.get("/questionnaire_question", {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response;
  } catch (error) {
    handleError(error);
  }
};

export const getQuestionnaireQuestionById = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/questionnaire_question/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response;
  } catch (error) {
    handleError(error);
  }
};

export const postQuestionnaireQuestion = async (
  payload: {
    questionnaire_id: number,
    question: string,
    available_answer: {
      answer_text: string,
    }[]
  }) => {
  try {
    const response = await axiosInstance.post("/questionnaire_question", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response;
  } catch (error) {
    handleError(error);
  }
};

export const putQuestionnaireQuestion = async (id: number, payload: {
  questionnaire_id: number,
  question: string,
  available_answer: {
    answer_text: string,
  }[]
}) => {
  try {
    const response = await axiosInstance.put(`/questionnaire_question/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response;
  } catch (error) {
    handleError(error);
  }
};

export const deleteQuestionnaireQuestion = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/questionnaire_question/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response;
  } catch (error) {
    handleError(error);
  }
}