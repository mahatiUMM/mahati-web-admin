import { useEffect, useState } from "react";
import {
  getVideos,
  getVideoById,
  postVideo,
  putVideo,
  deleteVideo,
} from "../api/videos";
import { toast } from "sonner";

export function useGetVideos() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const refetch = async () => {
    setLoading(true);
    try {
      const response = await getVideos();
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

export function useGetVideoById() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async (id: number) => {
    setLoading(true);
    try {
      const response = await getVideoById(id);
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

export function usePostVideo() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (payload: any) => {
    setLoading(true);
    try {
      const response = await postVideo(payload);
      setData(response?.data);
      if (response?.status === 201) {
        toast.success("Video added successfully.");
      }
    } catch (err) {
      setError(err as Error);
      toast.error("Failed to add video. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return { data, loading, error, mutate };
}

export function usePutVideo() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const putData = async (id: number, payload: any) => {
    setLoading(true);
    try {
      const response = await putVideo(id, payload);
      setData(response?.data);
      if (response?.status === 200) {
        toast.success("Video updated successfully.");
      }
    } catch (err) {
      setError(err as Error);
      toast.error("Failed to update video. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return { data, loading, error, putData };
}

export function useDeleteVideo() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const deleteData = async (id: number) => {
    setLoading(true);
    try {
      const response = await deleteVideo(id);
      setData(response?.data);
      if (response?.status === 200) {
        toast.success("Video deleted successfully.");
      }
    } catch (err) {
      setError(err as Error);
      toast.error("Failed to delete video. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return { data, loading, error, deleteData };
}