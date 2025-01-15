import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  getQuestionnaireAnswers,
  postQuestionnaireAnswer
} from "../api/questionnaire-answer";

export function useGetQuestionnaireAnswers() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const refetch = async () => {
    setLoading(true);
    try {
      const response = await getQuestionnaireAnswers();
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

export function usePostQuestionnaireAnswer() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const postAnswer = async (payload: {
    user_id: number,
    answers: Array<{ questionnaireQuestionId: number, answerId: string }>
  }) => {
    setLoading(true);
    try {
      const response = await postQuestionnaireAnswer(payload);
      setData(response?.data);
    } catch (err) {
      setError(err as Error);
      toast.error("Failed to post. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return { data, loading, error, postAnswer };
}
