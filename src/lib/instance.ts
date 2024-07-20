import axios from "axios";
import { cookies } from 'next/headers'

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
    cookies().set("mahatiToken", token, { path: "/" });
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
    cookies().delete("mahatiToken");
  }
}