import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { updateMe } from "../../services/userService";
import { UpdateMePayload } from "../../types/user";

export const useUserProfile = () => {
  const { user, fetchUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<UpdateMePayload>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const saveProfile = async () => {
    setError(null);
    

    const isChangingPassword = formData.currentPassword || formData.newPassword || formData.confirmPassword;
    
    if (!isChangingPassword && !imageFile){
      setError("Пустое поле, заполните прежде чем обновить");
      return;
    }

    if (isChangingPassword && formData.newPassword !== formData.confirmPassword) {
      setError("Новый пароль и подтверждение не совпадают.");
      return;
    }

    const payload = new FormData();
    if (imageFile) payload.append("photo", imageFile);

    if (isChangingPassword) {
      if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
        setError("Пожалуйста, заполните все поля для смены пароля.");
        return;
      }

      payload.append("currentPassword", formData.currentPassword);
      payload.append("newPassword", formData.newPassword);
      payload.append("confirmPassword", formData.confirmPassword);
    }

    try {
      await updateMe(payload);
      fetchUser();
      setIsEditing(false);
      setImageFile(null);
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err: any) {
      console.log("error:", err)
      setError(err.response?.data?.message || "Ошибка при обновлении профиля");
    }
  };

  return {
    user,
    formData,
    isEditing,
    error,
    setIsEditing,
    handleChange,
    handleFileChange,
    saveProfile,
    imageFile
  };
};
