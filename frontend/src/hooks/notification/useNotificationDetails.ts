import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getNotificationById, deleteNotification } from "../../services/notificationService";
import { Notification } from "../../types/notification";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";

export const useNotificationDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [notification, setNotification] = useState<Notification | null>(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (id) {
      getNotificationById(id)
        .then(setNotification)
        .catch(() => toast.error("Ошибка загрузки оповещения"));
    }
  }, [id]);

  const handleDelete = async () => {
    if (!id) return;
    if (confirm("Удалить это оповещение?")) {
      try {
        await deleteNotification(id);
        toast.success("Оповещение удалено");
        navigate("/notifications");
      } catch {
        toast.error("Ошибка при удалении");
      }
    }
  };

  const handleEdit = () => {
    navigate(`/notifications/${id}/edit`);
  };

  return {
    notification,
    role: user?.role ?? "", 
    handleDelete,
    handleEdit,
  };
};
