import { useEffect, useState } from "react";
import {
  getSchedules,
  getScheduleById,
  postSchedule,
  putSchedule,
  deleteSchedule,
} from "../api/schedules";
import { toast } from "sonner";

export function useGetSchedules() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const refetch = async () => {
    setLoading(true)
    try {
      const response = await getSchedules();
      setData(response?.data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refetch();
  }, [])

  return { data, loading, error, refetch };
}

export function useGetScheduleById() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async (id: number) => {
    setLoading(true);
    try {
      const response = await getScheduleById(id);
      setData(response?.data);
    } catch (err) {
      setError(err as Error);
      toast.error("Failed to fetch. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return { data, loading, error, fetchData };
}

export function usePostSchedule() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (payload: any) => {
    setLoading(true);
    try {
      const response = await postSchedule(payload);
      setData(response?.data);
      if (response?.status === 201) {
        toast.success("Schedule created successfully.");
      }
    } catch (err) {
      setError(err as Error);
      toast.error("Failed to post. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return { data, loading, error, mutate };
}

export function usePutSchedule() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const putData = async (id: number, payload: any) => {
    setLoading(true);
    try {
      const response = await putSchedule(id, payload);
      setData(response?.data);
      if (response?.status === 200) {
        toast.success("Schedule updated successfully.");
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

export function useDeleteSchedule() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const deleteData = async (id: number) => {
    setLoading(true);
    try {
      const response = await deleteSchedule(id);
      setData(response?.data);
      if (response?.status === 200) {
        toast.success("Schedule deleted successfully.");
      }
    } catch (err) {
      setError(err as Error);
      toast.error("Failed to delete. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return { data, loading, error, deleteData };
}