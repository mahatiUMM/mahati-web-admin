import { useEffect, useState } from "react";
import {
  getBrochures,
  getBrochureById,
  postBrochure,
  putBrochure,
  deleteBrochure,
} from "@/lib/api/brochure";
import { toast } from "sonner";

export function useGetBrochures() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const refetch = async () => {
    setLoading(true);
    try {
      const response = await getBrochures();
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

export function useGetBrochureById() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async (id: number) => {
    setLoading(true);
    try {
      const response = await getBrochureById(id);
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

export function usePostBrochure() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (payload: any) => {
    setLoading(true);
    try {
      const response = await postBrochure(payload);
      setData(response?.data);
      if (response?.status === 201) {
        toast.success("Successfully added a new brochure.");
      }
    } catch (err) {
      setError(err as Error);
      toast.error("Failed to add a new brochure. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return { data, loading, error, mutate };
}

export function usePutBrochure() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const putData = async (id: number, payload: any) => {
    setLoading(true);
    try {
      const response = await putBrochure(id, payload);
      setData(response?.data);
      if (response?.status === 200) {
        toast.success("Successfully updated the brochure.");
      }
    } catch (err) {
      setError(err as Error);
      toast.error("Failed to update the brochure. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return { data, loading, error, putData };
}

export function useDeleteBrochure() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const deleteData = async (id: number) => {
    setLoading(true);
    try {
      const response = await deleteBrochure(id);
      setData(response?.data);
      if (response?.status === 200) {
        toast.success("Successfully deleted the brochure.");
      }
    } catch (err) {
      setError(err as Error);
      toast.error("Failed to delete the brochure. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return { data, loading, error, deleteData };
}