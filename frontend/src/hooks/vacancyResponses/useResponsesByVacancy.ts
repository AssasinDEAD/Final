import { useEffect, useState, useCallback } from "react";
import { VacancyResponse } from "../../types/vacancyResponse";
import { toast } from "react-toastify";
import { getResponsesByVacancy } from "../../services/vacancyResponseService";

export const useResponsesByVacancy = (vacancyId: string, enabled = true) => {
  const [responses, setResponses] = useState<VacancyResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async () => {
    if (!enabled) return;

    setIsLoading(true);
    try {
      const data = await getResponsesByVacancy(vacancyId);
      setResponses(data);
    } catch (err) {
      if ((err as any).response?.status === 404) {
        toast.info("К сожалению, нет откликов");
      } else {
        toast.error("Не удалось загрузить отклики");
      }
    } finally {
      setIsLoading(false);
    }
  }, [vacancyId, enabled]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { responses, isLoading, refetch: fetchData };
};
