import axios from "axios";

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