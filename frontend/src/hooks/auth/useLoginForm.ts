import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../../services/authService";
import { useAuth } from "../.././contexts/AuthContext";

export const useLoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();
  const { fetchUser } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await login(email, password); 
      await fetchUser(); 

      toast.success(data.message || "Успешно!");
      navigate("/news");
    } catch (err) {
      const errorMessage = (err as any)?.response?.data?.message || "Ошибка входа";
      toast.error(errorMessage);
    }
  };

  return {
    email,
    password,
    setEmail,
    setPassword,
    handleLogin,
  };
};
