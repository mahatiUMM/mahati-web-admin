import { useState, useEffect } from "react";
import {
  getQuestionnaires,
  getQuestionnaireById,
  postQuestionnaire,
  postQuestionnaireQuestion,
  putQuestionnaire,
  deleteQuestionnaire,
} from "../api/questionnaire";
import { toast } from "sonner";

export function useGetQuestionnaires() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const refetch = async () => {
    setLoading(true);
    try {
      const response = await getQuestionnaires();
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

export function useGetQuestionnaireById() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async (id: number) => {
    setLoading(true);
    try {
      const response = await getQuestionnaireById(id);
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

export function usePostQuestionnaire() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (payload: any) => {
    setLoading(true);
    try {
      const response = await postQuestionnaire(payload);
      setData(response?.data);
      if (response?.status === 201) {
        toast.success("Successfully added a new questionnaire.");
      }
    } catch (err) {
      setError(err as Error);
      toast.error("Failed to add a new questionnaire. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return { data, loading, error, mutate };
}

export function usePostQuestionnaireQuestion() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (payload: any) => {
    setLoading(true);
    try {
      const response = await postQuestionnaireQuestion(payload);
      setData(response?.data);
      if (response?.status === 201) {
        toast.success("Successfully added a new question.");
      }
    } catch (err) {
      setError(err as Error);
      toast.error("Failed to add a new question. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return { data, loading, error, mutate };
}

export function usePutQuestionnaire() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const putData = async (id: number, payload: any) => {
    setLoading(true);
    try {
      const response = await putQuestionnaire(id, payload);
      setData(response?.data);
      if (response?.status === 200) {
        toast.success("Successfully updated the questionnaire.");
      }
    } catch (err) {
      setError(err as Error);
      toast.error("Failed to update the questionnaire. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return { data, loading, error, putData };
}

export function useDeleteQuestionnaire() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const deleteData = async (id: number) => {
    setLoading(true);
    try {
      const response = await deleteQuestionnaire(id);
      setData(response?.data);
      if (response?.status === 200) {
        toast.success("Successfully deleted the questionnaire.");
      }
    } catch (err) {
      setError(err as Error);
      toast.error("Failed to delete the questionnaire. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return { data, loading, error, deleteData };
}