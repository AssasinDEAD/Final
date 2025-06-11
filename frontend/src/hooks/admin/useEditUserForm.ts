import { useState } from "react";
import { toast } from "react-toastify";
import { updateUser } from "../../services/userService";
import { User } from "../../types/user";

export const useEditUserForm = (initialUser: User, onSuccess?: () => void) => {
  const [formData, setFormData] = useState({
    name: initialUser.name,
    email: initialUser.email,
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUser(initialUser.id, formData);
      toast.success("Пользователь обновлен");
      onSuccess?.();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Ошибка при обновлении");
    }
  };

  return { formData, handleChange, handleSubmit };
};
