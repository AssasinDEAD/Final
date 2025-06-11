import { useState, useEffect, ChangeEvent } from "react";
import { toast } from "react-toastify";
import { Resume } from "../../types/resume";
import { getResume, updateResume } from "../../services/resumeService";

export const useResume = () => {
  const [resume, setResume] = useState<Resume | null>(null);
  const [formData, setFormData] = useState<Resume | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const userResume = await getResume(); 
        setResume(userResume);
        setFormData(userResume);
      } catch (error) {
        toast.error("Ошибка загрузки резюме");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof Resume,
    index?: number
  ) => {
    if (!formData) return;

    setFormData((prev) => {
      if (!prev) return prev;
      if (Array.isArray(prev[field])) {
        return {
          ...prev,
          [field]: (prev[field] as any[]).map((item, i) =>
            i === index ? { ...item, [e.target.name]: e.target.value } : item
          ),
        };
      } else {
        return {
          ...prev,
          [field]: e.target.value,
        };
      }
    });
  };

  const addItem = (field: keyof Resume, newItem: any) => {
    if (!formData) return;
    setFormData((prev) => ({
      ...prev!,
      [field]: [...(prev![field] as any[]), newItem],
    }));
  };

  const removeItem = (field: keyof Resume, index: number) => {
    if (!formData) return;
    setFormData((prev) => ({
      ...prev!,
      [field]: (prev![field] as any[]).filter((_, i) => i !== index),
    }));
  };

  const saveResume = async () => {
    if (!formData) return;

    try {
      await updateResume(formData);
      toast.success("Резюме обновлено");
      setResume(formData);
      setIsEditing(false);
    } catch (error) {
      toast.error("Ошибка при обновлении резюме");
      console.error(error);
    }
  };

  return {
    resume,
    formData,
    isEditing,
    setIsEditing,
    handleChange,
    addItem,
    removeItem,
    saveResume,
    loading,
  };
};
