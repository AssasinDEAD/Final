import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { ResumeWithUser } from "../../types/resume";
import { fetchResumeById } from "../../services/resumeService";

export const useResumeDetails = (id: string) => {
  const [resume, setResume] = useState<ResumeWithUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadResume = async () => {
      try {
        const data = await fetchResumeById(id); 
        setResume(data);
      } catch (e) {
        toast.error("Ошибка при загрузке резюме");
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    loadResume();
  }, [id]);

  return { resume, loading };
};
