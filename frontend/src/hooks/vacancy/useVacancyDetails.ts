import { useEffect, useState } from "react";
import { getVacancyById } from "../../services/vacancyService";
import { Vacancy } from "../../types/vacancy";
import { toast } from "react-toastify";

export const useVacancyDetails = (id?: string) => {
  const [vacancy, setVacancy] = useState<Vacancy | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    getVacancyById(id)
      .then(setVacancy)
      .catch(() => toast.error("Ошибка загрузки вакансии"))
      .finally(() => setIsLoading(false));
  }, [id]);

  return { vacancy, isLoading };
};
