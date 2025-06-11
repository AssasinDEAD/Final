import { toast } from "react-toastify";
import { deleteUser } from "../../services/userService";

export const useDeleteUser = () => {
  const removeUser = async (userId: string, onSuccess?: () => void) => {
    try {
      await deleteUser(userId);
      toast.success("Пользователь удален");
      onSuccess?.();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Ошибка при удалении");
    }
  };

  return { removeUser };
};
