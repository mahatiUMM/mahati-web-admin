import { axiosInstance, handleError } from "../instance";
import { getToken } from "../utils";

const token = getToken();

export const getQuestionnaireAnswer = async () => {
  try {
    const response = await axiosInstance.get("/questionnaire_answer", {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response;
  } catch (error) {
    handleError(error);
  }
};

export const putQuestionnaireAnswer = async (id: number, payload: {
  answer_text: string
}) => {
  try {
    const response = await axiosInstance.put(`/questionnaire_answer/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    return response;
  } catch (error) {
    handleError(error);
  }
};

export const deleteQuestionnaireAnswer = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/questionnaire_answer/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    return response;
  } catch (error) {
    handleError(error);
  }
}