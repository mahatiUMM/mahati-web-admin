import { useEffect, useState } from "react";
import {
  getBloodPressure,
  getBloodPressureById,
  postBloodPressure,
  putBloodPressure,
  deleteBloodPressure
} from "../api/blood-pressure";
import { toast } from "sonner";

export function useGetBloodPressures() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const refetch = async () => {
    setLoading(true);
    try {
      const response = await getBloodPressure();
      setData(response);
    } catch (err) {
      setError(err as Error);
      toast.error("Failed to fetch. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  return { data, loading, error, refetch };
}

export function useGetBloodPressureById() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async (id: number) => {
    setLoading(true);
    try {
      const response = await getBloodPressureById(id);
      setData(response?.data);
    } catch (err) {
      setError(err as Error);
      toast.error("Failed to fetch. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
}

export function usePostBloodPressure() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (payload: any) => {
    try {
      setLoading(true);
      const response = await postBloodPressure(payload);
      setData(response?.data);
      if (response?.status === 201) {
        toast.success("Success to add blood pressure");
      }
    } catch (err) {
      setError(err as Error);
      toast.error("Failed to add blood pressure. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, mutate };
}

export function usePutBloodPressure() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const putData = async (id: number, payload: any) => {
    try {
      setLoading(true);
      const response = await putBloodPressure(id, payload);
      setData(response?.data);
      if (response?.status === 200) {
        toast.success("Success to edit blood pressure.");
      }
    } catch (err) {
      setError(err as Error);
      toast.error("Failed to edit blood pressure. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, putData };
}

export function useDeleteBloodPressure() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const deleteData = async (id: number) => {
    try {
      setLoading(true);
      const response = await deleteBloodPressure(id);
      setData(response?.data);
      if (response?.status === 200) {
        toast.success("Success to delete blood pressure.");
      }
    } catch (err) {
      setError(err as Error);
      toast.error("Failed to delete blood pressure. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, deleteData };
}