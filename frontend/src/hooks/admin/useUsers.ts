import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { fetchUsers } from "../../services/userService";
import { User } from "../../types/user";

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Ошибка при загрузке пользователей");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return { users, loading, reload: loadUsers };
};
