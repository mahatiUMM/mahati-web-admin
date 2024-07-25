import { axiosInstance, handleError } from "../instance";

export const getBookmark = async (token: string) => {
  try {
    const response = await axiosInstance.get("/bookmark",{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    );
    return response;
  } catch (error) {
    handleError(error);
  }
}