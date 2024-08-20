import { useEffect, useState } from "react";
import {
  getReminders,
  getReminderById,
  postReminder,
  putReminder,
  deleteReminder,
} from "../api/reminders";
import { toast } from "sonner";

export function useGetReminders() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const refetch = async () => {
    setLoading(true);
    try {
      const response = await getReminders();
      setData(response?.data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refetch();
  }, []);

  return { data, loading, error, refetch };
}

export function useGetRemiderById() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async (id: number) => {
    setLoading(true);
    try {
      const response = await getReminderById(id);
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

export function usePostReminder() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (payload: {
    user_id: number,
    medicine_name: string,
    medicine_taken: number,
    medicine_total: number,
    amount: number,
    cause: string,
    cap_size: number,
    medicine_time: string,
    expired_at: any,
  }) => {
    setLoading(true);
    try {
      const response = await postReminder(payload);
      setData(response?.data);
      if (response?.status === 201) {
        toast.success("Successfully added a new reminder.");
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

export function usePutReminder() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const putData = async (id: number, payload: {
    user_id: number,
    medicine_name: string,
    medicine_taken: number,
    medicine_total: number,
    amount: number,
    cause: string,
    cap_size: number,
    medicine_time: string,
    expired_at: any,
  }) => {
    setLoading(true);
    try {
      const response = await putReminder(id, payload);
      setData(response?.data);
      if (response?.status === 200) {
        toast.success("Successfully updated reminder.");
      }
    } catch (err) {
      setError(err as Error);
      toast.error("Failed to put. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return { data, loading, error, putData };
}

export function useDeleteReminder() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const deleteData = async (id: number) => {
    setLoading(true);
    try {
      const response = await deleteReminder(id);
      setData(response?.data);
      if (response?.status === 200) {
        toast.success("Successfully deleted.");
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