import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  getQuestionnaireQuestions,
  getQuestionnaireQuestionById,
  postQuestionnaireQuestion,
  putQuestionnaireQuestion,
  deleteQuestionnaireQuestion
} from "../api/questionnaire-question";

export function useGetQuestionnaireQuestions() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const refetch = async () => {
    setLoading(true);
    try {
      const response = await getQuestionnaireQuestions();
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
};

export function useGetQuestionnaireQuestionById() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async (id: number) => {
    setLoading(true);
    try {
      const response = await getQuestionnaireQuestionById(id);
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

export function usePutQuestionnaireQuestion() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (id: number, payload: any) => {
    setLoading(true);
    try {
      const response = await putQuestionnaireQuestion(id, payload);
      setData(response?.data);
      if (response?.status === 200) {
        toast.success("Successfully updated the question.");
      }
    } catch (err) {
      setError(err as Error);
      toast.error("Failed to update the question. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return { data, loading, error, mutate };
}

export function useDeleteQuestionnaireQuestion() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (id: number) => {
    setLoading(true);
    try {
      const response = await deleteQuestionnaireQuestion(id);
      setData(response?.data);
      if (response?.status === 200) {
        toast.success("Successfully deleted the question.");
      }
    } catch (err) {
      setError(err as Error);
      toast.error("Failed to delete the question. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return { data, loading, error, mutate };
}