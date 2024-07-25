import { axiosInstance, handleError } from "../instance";

export const getBrochures = async (token: string) => {
  try {
    const response = await axiosInstance.get("/brochure", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    handleError(error);
  }
}