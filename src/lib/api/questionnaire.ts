import { axiosInstance, handleError } from "../instance";
import { getToken } from "../utils";

export const getQuestionnaire = async () => {
  try {
    const token = getToken();
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