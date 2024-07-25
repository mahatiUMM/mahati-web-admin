import axios from "axios";
import { removeCookies } from "./utils";

const BASE_API = process.env.NEXT_PUBLIC_API_URL;

if (!BASE_API) {
  throw new Error("API URL is required");
}

export const axiosInstance = axios.create({
  baseURL: BASE_API,
  headers: {
    "Content-Type": "application/json",
  }
})

export const handleError = (error: any) => {
  if (axios.isAxiosError(error) && error.response?.status === 401) {
    window.location.href = "/"; 
    removeCookies("mahatiToken");
  }
  if (axios.isAxiosError(error) && error.response?.status === 403) {
    window.location.href = "/"; 
    removeCookies("mahatiToken");
  }
  if (axios.isAxiosError(error) && error.response?.status === 404) {
    window.location.href = "/404";
  }
  throw error;
};