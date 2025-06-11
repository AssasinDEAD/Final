import { useEffect, useState } from "react";
import { getNotifications } from "../services/notificationService";
import { getAllVacancies } from "../services/vacancyService";
import { fetchResumes } from "../services/resumeService";
import { Notification } from "../types/notification";
import { Vacancy } from "../types/vacancy";
import { ResumeWithUser } from "../types/resume";

export const useHomeData = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [resumes, setResumes] = useState<ResumeWithUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getNotifications(5),
      getAllVacancies(5),
      fetchResumes(5)
    ])
      .then(([notifs, vacs, res]) => {
        setNotifications(notifs);
        setVacancies(vacs);
        setResumes(res);
      })
      .catch(() => {
        console.error("Ошибка загрузки данных");
      })
      .finally(() => setLoading(false));
  }, []);

  return { notifications, vacancies, resumes, loading };
};
