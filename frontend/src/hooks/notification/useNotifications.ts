import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getNotifications } from "../../services/notificationService";
import { Notification } from "../../types/notification";

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNotifications()
      .then((data) => setNotifications(data))
      .catch(() => toast.error("Не удалось загрузить оповещения"))
      .finally(() => setLoading(false));
  }, []);

  return { notifications, loading };
};
