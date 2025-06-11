import { useState, useEffect } from "react";
import { getContracts, deleteContract } from "../../services/contractService";
import { Contract } from "../../types/contract";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";

export const useContracts = () => {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const role = user?.role;

  const fetchContracts = async () => {
    try {
      setLoading(true);
      const data = await getContracts();
      setContracts(data);
    } catch (err) {
      toast.error("Ошибка при загрузке договоров");
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id: string) => {
    try {
      await deleteContract(id);
      toast.success("Договор удалён");
      await fetchContracts();
    } catch {
      toast.error("Ошибка при удалении договора");
    }
  };

  useEffect(() => {
    fetchContracts();
  }, []);

  return {
    contracts,
    loading,
    remove,
    reload: fetchContracts,
    role,
  };
};
