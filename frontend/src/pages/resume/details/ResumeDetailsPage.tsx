import { useParams } from "react-router-dom";
import { useResumeDetails } from "../../../hooks/resume/useResumeDetails";
import LoadingScreen from "../../../components/LoadingScreen";
import {
  FaUser,
  FaTools,
  FaBriefcase,
  FaGlobe,
  FaInfoCircle,
} from "react-icons/fa";

const ResumeDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { resume, loading } = useResumeDetails(id!);

  if (loading) return <LoadingScreen />;
  if (!resume)
    return (
      <p className="p-6 text-red-600 text-lg text-center">
        Резюме не найдено.
      </p>
    );

  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-8 bg-gradient-to-r from-red-800 to-red-900 backdrop-blur-sm text-white rounded-2xl shadow-2xl mt-10 mb-20">
      <header className="mb-6 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold flex items-center justify-center gap-2">
          <FaUser className="text-white" />
          {resume.User?.name ?? "Нет имени"}
        </h1>
        <p className="mt-2 text-base sm:text-lg">
          {resume.User?.email ?? "Нет email"}
        </p>
      </header>

      {/* Навыки */}
      <section className="mb-6">
        <h2 className="flex items-center gap-2 text-xl sm:text-2xl font-semibold mb-3">
          <FaTools /> Навыки
        </h2>
        {resume.skills?.length ? (
          <div className="flex flex-wrap gap-3">
            {resume.skills.map((s, i) => (
              <span
                key={i}
                className="bg-red-800 px-4 py-1 text-sm sm:text-base rounded-full border border-red-700/30"
              >
                {s.name} ({s.level})
              </span>
            ))}
          </div>
        ) : (
          <p className="text-sm sm:text-base italic">Нет данных</p>
        )}
      </section>

      {/* Опыт работы */}
      <section className="mb-6">
        <h2 className="flex items-center gap-2 text-xl sm:text-2xl font-semibold mb-3">
          <FaBriefcase /> Опыт работы
        </h2>
        {resume.experience?.length ? (
          <div className="flex flex-col gap-4">
            {resume.experience.map((e, i) => (
              <div
                key={i}
                className="bg-red-800 rounded-lg p-4 shadow-sm border border-red-700/30"
              >
                <p className="text-base sm:text-lg">
                  <strong>{e.position}</strong> в {e.company}
                </p>
                <p className="mt-1 text-sm sm:text-base opacity-90">
                  {e.duration}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm sm:text-base italic">Нет опыта</p>
        )}
      </section>

      {/* Языки */}
      <section className="mb-6">
        <h2 className="flex items-center gap-2 text-xl sm:text-2xl font-semibold mb-3">
          <FaGlobe /> Языки
        </h2>
        {resume.languages?.length ? (
          <div className="flex flex-wrap gap-3">
            {resume.languages.map((l, i) => (
              <span
                key={i}
                className="bg-red-800 px-4 py-1 text-sm sm:text-base rounded-full border border-red-700/30"
              >
                {l.name} ({l.proficiency})
              </span>
            ))}
          </div>
        ) : (
          <p className="text-sm sm:text-base italic">Нет данных</p>
        )}
      </section>

      {/* Дополнительная информация */}
      {resume.additionalInfo && (
        <section>
          <h2 className="flex items-center gap-2 text-xl sm:text-2xl font-semibold mb-3">
            <FaInfoCircle /> Дополнительная информация
          </h2>
          <p className="text-base sm:text-lg leading-relaxed">
            {resume.additionalInfo}
          </p>
        </section>
      )}
    </div>
  );
};

export default ResumeDetailsPage;
