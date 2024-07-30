import { useEffect, useState } from "react";
import {
  getBookmark,
  getBookmarkById,
  postBookmark,
  putBookmark,
  deleteBookmark,
} from "../api/bookmark";
import { toast } from "sonner";

export function useGetBookmark() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const refetch = async () => {
    setLoading(true);
    try {
      const response = await getBookmark();
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

export function useGetBookmarkById() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async (id: number) => {
    setLoading(true);
    try {
      const response = await getBookmarkById(id);
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

export function usePostBookmark() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (payload: any) => {
    try {
      setLoading(true);
      const response = await postBookmark(payload);
      setData(response?.data);
      if (response?.status === 201) {
        toast.message("Success to add bookmark", {
          description: "Bookmark has been added successfully.",
        });
      }
    } catch (err) {
      setError(err as Error);
      toast.error("Failed to add bookmark. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, mutate };
}

export function usePutBookmark() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const putData = async (id: number, payload: any) => {
    setLoading(true);
    try {
      const response = await putBookmark(id, payload);
      setData(response?.data);
      if (response?.status === 200) {
        toast.message("Success to edit bookmark", {
          description: "Bookmark has been edit successfully.",
        });
      }
    } catch (err) {
      setError(err as Error);
      toast.error("Failed to add bookmark. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, putData };
}

export function useDeleteBookmark() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const deleteData = async (id: number) => {
    setLoading(true);
    try {
      const response = await deleteBookmark(id);
      setData(response?.data);
      if (response?.status === 200) {
        toast.message("Success to delete bookmark", {
          description: "Bookmark has been deleted successfully.",
        });
      }
    } catch (err) {
      setError(err as Error);
      toast.error("Failed to delete bookmark. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, deleteData };
}