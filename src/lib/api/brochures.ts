import { axiosInstance, handleError } from "../instance";
import { getToken } from "@/lib/utils"

export const getBrochures = async () => {
  try {
    const token = getToken();
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