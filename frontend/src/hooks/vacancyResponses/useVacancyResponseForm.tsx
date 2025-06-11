import { FormEvent, useState } from "react";
import { createVacancyResponse } from "../../services/vacancyResponseService";
import { toast } from "react-toastify";

export const useVacancyResponseForm = (
  vacancyId: string,
  onClose: () => void
) => {
  const [coverLetter, setCoverLetter] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createVacancyResponse(vacancyId, coverLetter);
      toast.success("Отклик отправлен");
      onClose();
    } catch {
      toast.error("Ошибка при отправке отклика");
    } finally {
      setLoading(false);
    }
  };

  return {
    coverLetter,
    setCoverLetter,
    loading,
    handleSubmit,
  };
};
