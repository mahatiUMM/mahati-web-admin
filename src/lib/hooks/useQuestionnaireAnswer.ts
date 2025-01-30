import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  getQuestionnaireAnswer,
  putQuestionnaireAnswer,
  deleteQuestionnaireAnswer
} from "../api/questionnaire-answer";

export function useGetQuestionnaireAnswer() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const refetch = async () => {
    setLoading(true);
    try {
      const response = await getQuestionnaireAnswer();
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

export function usePutQuestionnaireAnswer() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const putAnswer = async (id: number, payload: {
    answer_text: string
  }) => {
    setLoading(true);
    try {
      const response = await putQuestionnaireAnswer(id, payload);
      setData(response?.data);
    } catch (err) {
      setError(err as Error);
      toast.error("Failed to put. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return { data, loading, error, putAnswer };
}

export function useDeleteQuestionnaireAnswer() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const deleteAnswer = async (id: number) => {
    setLoading(true);
    try {
      const response = await deleteQuestionnaireAnswer(id);
      setData(response?.data);
    } catch (err) {
      setError(err as Error);
      toast.error("Failed to delete. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return { data, loading, error, deleteAnswer };
}