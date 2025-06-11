import { useEffect, useState } from "react";
import { Vacancy } from "../../types/vacancy";
import { getVacancyById, createVacancy, updateVacancy } from "../../services/vacancyService";
import { toast } from "react-toastify";

export const useVacancy = (id?: string) => {
  const [form, setForm] = useState<Vacancy>({
    title: "",
    description: "",
    requirements: [],
    location: "",
    salary: "",
  });
  const [requirementsInput, setRequirementsInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isEdit = Boolean(id);

  useEffect(() => {
    if (isEdit && id) {
      setIsLoading(true);
      getVacancyById(id)
        .then((data) => {
          setForm(data);
          setRequirementsInput(data.requirements.join(", "));
        })
        .catch(() => toast.error("Ошибка загрузки вакансии"))
        .finally(() => setIsLoading(false));
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRequirementsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRequirementsInput(e.target.value);
  };

  const handleSubmit = async () => {
    const requirementsArray = requirementsInput
      .split(",")
      .map((r) => r.trim())
      .filter((r) => r.length > 0);

    const vacancyToSend = {
      ...form,
      requirements: requirementsArray,
    };

    try {
      if (isEdit && id) {
        await updateVacancy(id, vacancyToSend);
        toast.success("Вакансия обновлена");
      } else {
        await createVacancy(vacancyToSend);
        toast.success("Вакансия создана");
      }
    } catch (error) {
      toast.error("Ошибка при сохранении вакансии");
      console.error(error);
    }
  };

  return {
    form,
    setForm,
    handleChange,
    handleRequirementsChange,
    requirementsInput,
    handleSubmit,
    isLoading,
    isEdit,
  };
};
