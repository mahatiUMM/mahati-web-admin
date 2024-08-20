import { useEffect, useState } from "react";
import {
  getAllUsers,
  getProfile,
  putProfile,
} from "../api/users";
import { toast } from "sonner";

export function useGetAllUsers() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const refetch = async () => {
    setLoading(true);
    try {
      const response = await getAllUsers();
      setData(response?.data);
    } catch (err) {
      setError(err as Error);
      toast.error("Failed to fetch. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refetch();
  }, [])

  return { data, loading, error, refetch };
}

export function useGetProfile() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const refetch = async () => {
    setLoading(true);
    try {
      const response = await getProfile();
      setData(response?.data);
    } catch (err) {
      setError(err as Error);
      toast.error("Failed to fetch. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refetch();
  }, []);

  return { data, loading, error, refetch };
}

export function usePutProfile() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const putData = async (payload: any) => {
    setLoading(true);
    try {
      const response = await putProfile(payload);
      setData(response?.data);
      if (response?.status === 200) {
        toast.success("Successfully updated profile.");
      }
    } catch (err) {
      setError(err as Error);
      toast.error("Failed to update. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return { data, loading, error, putData };
}