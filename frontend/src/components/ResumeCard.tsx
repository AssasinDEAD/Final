import { Resume } from "../types/resume";
import { useNavigate } from "react-router-dom";

interface ResumeCardProps {
    resume: Resume;
}

const ResumeCard: React.FC<ResumeCardProps> = ({ resume }) => {
    const navigate = useNavigate();

    return (
        <div className="border p-4 shadow-md rounded-lg cursor-pointer" onClick={() => navigate(`/resumes/${resume.additionalInfo}`)}>
            <h3 className="text-xl font-bold">{resume.additionalInfo || "Без названия"}</h3>
            <p>Навыки: {resume.skills.length}</p>
            <p>Опыт: {resume.experience.length}</p>
        </div>
    );
};

export default ResumeCard;
