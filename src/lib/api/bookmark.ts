import { axiosInstance, handleError } from "../instance";
import { getToken } from "../utils";

export const getBookmark = async () => {
  try {
    const token = getToken();
    const response = await axiosInstance.get("/bookmark",{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    handleError(error);
  }
}