import { useState, useEffect } from "react";
import { getAllCompanyProfiles, getCompanyProfileById, deleteCompanyProfile, getMyCompanyProfile } from "../../services/companyProfileService";
import { User } from "../../types/user";
import { CompanyProfile } from "../../types/companyProfile";
import { toast } from "react-toastify";

export const useCompanyProfiles = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchProfiles = async () => {
    setLoading(true);
    try {
      const data = await getAllCompanyProfiles();
      setUsers(data);
    } catch (error) {
      toast.error("Ошибка при загрузке профилей компаний");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  return {
    users,
    loading,
    refresh: fetchProfiles,
  };
};

export const useCompanyProfileById = (id?: string) => {
  const [profile, setProfile] = useState<CompanyProfile | null>(null);
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id: string) => {
    if (!id) return;
    try {
      await deleteCompanyProfile(id);
      toast.success("Профиль удален");
      
    } catch {
      toast.error("Ошибка при удалении");
    }
  };
  useEffect(() => {
    if (!id) {
    getMyCompanyProfile()
      .then((data) => setProfile(data))
      .catch((err) => err.status==404 ? toast.info("У вас еще нет профиля. Заполните, пожалуйста") : toast.error(err.response?.data?.message || "Ошибка при загрузке профиля компании"))
      .finally(() => setLoading(false));

    }else{
      setLoading(true);
      getCompanyProfileById(id)
      .then((data) => setProfile(data))
      .catch((err) => err.status==404 ? toast.info("В базе нет записей") : toast.error(err.response?.data?.message || "Ошибка при загрузке профиля компании"))
      .finally(() => setLoading(false));
    }}, [id]);

  return {
    profile,
    handleDelete,
    loading,
  };
};
