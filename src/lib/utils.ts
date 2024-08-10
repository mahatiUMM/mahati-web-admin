import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import Cookies from "js-cookie"
import { decrypt } from "./crypto"
import { format } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getToken() {
  const encryptedToken = Cookies.get("mahatiToken");
  if (encryptedToken) {
    return decrypt(encryptedToken);
  }
  return null;
}

export function setToken(token: string) {
  return Cookies.set("mahatiToken", token)
}

export function removeCookies(token: string) {
  Cookies.remove(token);
}

export function formatDate(date: string) {
  return format(new Date(date), 'dd/MM/yyyy')
}