import { useEffect, useState } from "react";
import { VacancyResponse } from "../../types/vacancyResponse";
import { toast } from "react-toastify";
import {
  getMyVacancyResponses,
  deleteResponse as deleteResponseService,
} from "../../services/vacancyResponseService";

type StatusFilter = "all" | "pending" | "accepted" | "rejected";

export const useMyResponses = () => {
  const [responses, setResponses] = useState<VacancyResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState<StatusFilter>("all");

  const fetchResponses = async () => {
    setIsLoading(true);
    try {
      const data = await getMyVacancyResponses();
      setResponses(data);
    } catch (err) {
      if ((err as any).response?.status === 404) {
        toast.info("Вы ещё не отправляли отклики");
      } else {
        toast.error("Ошибка при загрузке ваших откликов");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteResponseService(id);
      toast.success("Отклик удалён");
      fetchResponses();
    } catch {
      toast.error("Ошибка при удалении отклика");
    }
  };

  const filteredResponses = responses
    .filter((r) => filterStatus === "all" || r.status === filterStatus)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const stats = {
    total: responses.length,
    pending: responses.filter((r) => r.status === "pending").length,
    accepted: responses.filter((r) => r.status === "accepted").length,
    rejected: responses.filter((r) => r.status === "rejected").length,
  };

  useEffect(() => {
    fetchResponses();
  }, []);

  return {
    isLoading,
    responses: filteredResponses,
    rawResponses: responses,
    filterStatus,
    setFilterStatus,
    stats,
    handleDelete,
  };
};
