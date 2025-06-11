import { useEffect, useState } from "react";
import { Vacancy } from "../../types/vacancy";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";
import { getAllVacancies, getMyVacancies } from "../../services/vacancyService";

export const useVacancies = (showMy: boolean) => {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetch = async () => {
      if (!user) return;
      setIsLoading(true);

      try {
        const data =
          user.role === "company" && showMy
            ? await getMyVacancies()
            : await getAllVacancies();

        setVacancies(data);
      } catch (err) {
        toast.error("Не удалось загрузить вакансии");
      } finally {
        setIsLoading(false);
      }
    };

    fetch();
  }, [user, showMy]);

  return { vacancies, isLoading };
};
