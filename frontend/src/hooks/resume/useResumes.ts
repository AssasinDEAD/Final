import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { ResumeWithUser } from "../../types/resume";
import { fetchResumes } from "../../services/resumeService";

export const useResumes = () => {
  const [resumes, setResumes] = useState<ResumeWithUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadResumes = async () => {
      try {
        const data = await fetchResumes(); 
        setResumes(data);
      } catch (e) {
        toast.error("Ошибка при загрузке резюме");
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    loadResumes();
  }, []);

  return { resumes, loading };
};
