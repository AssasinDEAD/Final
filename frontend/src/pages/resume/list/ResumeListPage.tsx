import { useState } from "react";
import { Link } from "react-router-dom";
import { useResumes } from "../../../hooks/resume/useResumes";
import LoadingScreen from "../../../components/LoadingScreen";

import {
  FaUser,
  FaBriefcase,
  FaTools,
  FaGlobe,
  FaInfoCircle,
} from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";

const ResumeListPage = () => {
  const { resumes, loading } = useResumes();
  const [search, setSearch] = useState("");

  const filteredResumes = resumes.filter((resume) => {
    const fullName = resume.User?.name?.toLowerCase() || "";
    const skills =
      resume.skills?.map((s) => s.name.toLowerCase()).join(" ") || "";
    return (
      fullName.includes(search.toLowerCase()) ||
      skills.includes(search.toLowerCase())
    );
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 text-white mb-24">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold capitalize">
          Резюме студентов
        </h1>
        <p className="text-lg sm:text-xl text-white">
          Просмотр, поиск и отбор кандидатов
        </p>
      </div>

      <div className="flex items-center gap-3 mb-8 bg-red-900/80 p-4 rounded-xl">
        <IoIosSearch className="text-white text-2xl" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Поиск по имени или навыкам..."
          className="w-full bg-transparent focus:outline-none text-white placeholder-red-200 text-lg sm:text-xl"
        />
      </div>

      {loading ? (
        <LoadingScreen />
      ) : filteredResumes.length === 0 ? (
        <p className="text-center text-white text-lg">Резюме не найдены</p>
      ) : (
        <ul className="space-y-6">
          {filteredResumes.map((resume) => (
            <li
              key={resume.id}
              className="p-6 rounded-2xl bg-red-950/70 backdrop-blur-lg shadow-2xl"
            >
              <Link
                to={`/resumes/${resume.id}`}
                className="flex items-center gap-2 mb-1 text-2xl sm:text-3xl font-semibold text-white hover:underline"
              >
                <FaUser className="text-white" />{" "}
                {resume.User?.name ?? "Без имени"}
              </Link>

              <p className="mb-3 text-base sm:text-xl text-white">
                {resume.User?.email ?? "Без email"}
              </p>

              {resume.experience?.length > 0 && (
                <div className="mb-3">
                  <h3 className="flex items-center gap-2 mb-1 text-lg sm:text-xl font-semibold text-white">
                    <FaBriefcase /> Опыт
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {resume.experience.map((exp, idx) => (
                      <span
                        key={idx}
                        className="text-sm sm:text-base px-3 py-1 rounded-full border border-black/30 bg-red-300/20 text-white"
                      >
                        {exp.position} в {exp.company} ({exp.duration})
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {resume.skills?.length > 0 && (
                <div className="mb-3">
                  <h3 className="flex items-center gap-2 mb-1 text-lg sm:text-xl font-semibold text-white">
                    <FaTools /> Навыки
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {resume.skills.map((s, idx) => (
                      <span
                        key={idx}
                        className="text-sm sm:text-base px-3 py-1 rounded-full border border-black/30 bg-red-300/20 text-white"
                      >
                        {s.name} ({s.level})
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {resume.languages?.length > 0 && (
                <div className="mb-3">
                  <h3 className="flex items-center gap-2 mb-1 text-lg sm:text-xl font-semibold text-white">
                    <FaGlobe /> Языки
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {resume.languages.map((l, idx) => (
                      <span
                        key={idx}
                        className="text-sm sm:text-base px-3 py-1 rounded-full border border-black/30 bg-red-300/20 text-white"
                      >
                        {l.name} ({l.proficiency})
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {resume.additionalInfo && (
                <div>
                  <h3 className="flex items-center gap-2 mb-1 text-lg sm:text-xl font-semibold text-white">
                    <FaInfoCircle /> Дополнительно
                  </h3>
                  <p className="line-clamp-3 text-base sm:text-xl text-white">
                    {resume.additionalInfo}
                  </p>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ResumeListPage;
