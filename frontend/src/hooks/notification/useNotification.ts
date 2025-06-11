import { useState, useEffect } from "react";
import {
  getNotificationById,
  createNotification,
  updateNotification,
} from "../../services/notificationService";
import { Notification } from "../../types/notification";
import { toast } from "react-toastify";

export const useNotification = (id?: string) => {
  const [form, setForm] = useState<Notification>({
    title: "",
    content: "",
    imageUrl: "", 
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isEdit, setIsEdit] = useState(!!id);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      getNotificationById(id)
        .then((data) => {
          setForm(data);
          setIsEdit(true);
        })
        .catch(() => toast.error("Ошибка при загрузке оповещения"))
        .finally(() => setIsLoading(false));
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("content", form.content);
      if (imageFile) {
        formData.append("image", imageFile);
      }

      if (isEdit && id) {
        await updateNotification(id, formData);
        toast.success("Оповещение обновлено");
      } else {
        await createNotification(formData);
        toast.success("Оповещение создано");
      }
    } catch(error) {
      toast.error("Ошибка при сохранении");
    }
  };

  return {
    form,
    isEdit,
    isLoading,
    handleChange,
    handleFileChange,
    handleSubmit,
    imageFile,
  };
};
