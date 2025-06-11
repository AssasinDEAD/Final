import { useState, useEffect } from "react";
import {
  getMyCompanyProfile,
  upsertCompanyProfile,
} from "../../services/companyProfileService";
import { CompanyProfile } from "../../types/companyProfile";
import { toast } from "react-toastify";

export const useCompanyProfile = () => {
  const [form, setForm] = useState<Partial<CompanyProfile>>({
    companyName: "",
    address: "",
    phone: "",
    directorFullName: "",
    canProvideInternship: false,
    BIN: "",
    BIK: "",
    KBE: "",
    BANK: "",
    representedBy: "",
    basis: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getMyCompanyProfile()
      .then((data) => {
        setForm(data);
        setIsEdit(true);
      })
      .catch(() => {
        setIsEdit(false);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" && e.target instanceof HTMLInputElement
          ? e.target.checked
          : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await upsertCompanyProfile(form);
      toast.success(isEdit ? "Профиль обновлен" : "Профиль создан");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Ошибка при сохранении профиля");
    }
  };

  return {
    form,
    isLoading,
    isEdit,
    handleChange,
    handleSubmit,
  };
};
