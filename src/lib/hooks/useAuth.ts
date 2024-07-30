"use client";

import { useState, useEffect } from "react";
import { login } from "../api/auth";
import { toast } from "sonner";
import { encrypt } from "@/lib/crypto";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export function useLogin() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const mutate = async (payload: { email: string; password: string }) => {
    setLoading(true);
    try {
      const response = await login(payload);
      if (response?.data?.status === 200) {
        const token = response?.data?.access_token;
        const encryptedToken = encrypt(token);
        router.push("/admin/dashboard");
        Cookies.set("mahatiToken", encryptedToken, { path: "/" });
        toast.message("Success to Login", {
          description: "Welcome to Mahati Admin",
        });
      } else {
        setError(response?.message);
        toast.error(response?.message);
      }
    } catch (err) {
      setError("Login failed. Please check your credentials.");
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const token = Cookies.get("mahatiToken");
    if (token) {
      toast.message("You are already logged in");
      router.push("/admin/dashboard")
    }
  }, [router]);

  return { loading, error, mutate };
}