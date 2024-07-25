import { axiosInstance, handleError } from "../instance";

export const getQuestionnaire = async (token: string) => {
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