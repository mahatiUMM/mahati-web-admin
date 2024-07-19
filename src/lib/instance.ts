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

export function setAuthToken(token: string) {
  if (token) {
    localStorage.setItem("token", token);
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    localStorage.removeItem("token");
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
}