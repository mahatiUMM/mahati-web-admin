import { axiosInstance, handleError } from "../instance";
import { getToken } from "../utils";

const token = getToken();

export const getQuestionnaireQuestionAnswers = async () => {
  try {
    const response = await axiosInstance.get("/questionnaire_question_answer", {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response;
  } catch (error) {
    handleError(error);
  }
}

export const postQuestionnaireQuestionAnswer = async (payload: {
  user_id: number,
  answers: Array<{ questionnaireQuestionId: number, answerId: string }>
}) => {
  try {
    const response = await axiosInstance.post("/questionnaire_question_answer", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    return response;
  } catch (error) {
    handleError(error);
  }
};