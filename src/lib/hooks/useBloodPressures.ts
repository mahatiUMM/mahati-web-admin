import { useEffect, useState } from "react";
import { 
  getBloodPressure, 
  getBloodPressureById, 
  postBloodPressure, 
  putBloodPressure, 
  deleteBloodPressure 
} from "../api/blood-pressure";

export function useGetBloodPressures() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getBloodPressure();
        setData(response?.data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, loading, error };
}

export function useGetBloodPressureById(id: number) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getBloodPressureById(id);
        setData(response?.data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  return { data, loading, error };
}