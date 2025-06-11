import { useResume } from "../../../hooks/resume/useResume";
import LoadingScreen from "../../../components/LoadingScreen";
import {
  FaBriefcase,
  FaTools,
  FaGlobe,
  FaInfoCircle,
  FaEdit,
  FaSave,
  FaPlus,
  FaTrash,
  FaEye
} from "react-icons/fa";

const ResumePage = () => {
  const {
    resume,
    formData,
    isEditing,
    setIsEditing,
    handleChange,
    addItem,
    removeItem,
    saveResume,
    loading,
  } = useResume();

  if (loading) return <LoadingScreen />;

  return (
    <div className="max-w-4xl mx-auto mt-10 mb-20 bg-gradient-to-r from-red-800 to-red-900 text-white p-6 sm:p-8 rounded-2xl shadow-2xl">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl sm:text-4xl font-bold">Моё резюме</h1>
        <button
          className="flex items-center gap-2 bg-red-500/50 hover:bg-red-600 transition px-4 py-2 rounded text-sm sm:text-base"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? (
            <>
              <FaEye className="sm:text-xl" />
              Просмотр
            </>
          ) : (
            <>
              <FaEdit className="sm:text-xl" />
              Редактировать
            </>
          )}
        </button>
      </div>

      {isEditing ? (
        <div className="space-y-6">
          {/* Опыт работы */}
          <section>
            <h2 className="text-xl sm:text-2xl flex items-center gap-2 mb-2">
              <FaBriefcase /> Опыт работы
            </h2>
            {formData?.experience.map((exp, index) => (
              <div
                key={index}
                className="bg-white/40 backdrop-blur-sm border border-black/20 p-4 rounded-md mb-2 space-y-2"
              >
                <input
                  className="w-full p-2 sm:p-3 rounded bg-red-900 text-white placeholder-red-200 focus:outline-none focus:ring-1 focus:ring-white text-sm sm:text-base"
                  type="text"
                  name="company"
                  value={exp.company}
                  onChange={(e) => handleChange(e, "experience", index)}
                  placeholder="Компания"
                />
                <input
                  className="w-full p-2 sm:p-3 rounded bg-red-900 text-white placeholder-red-200 focus:outline-none focus:ring-1 focus:ring-white text-sm sm:text-base"
                  type="text"
                  name="position"
                  value={exp.position}
                  onChange={(e) => handleChange(e, "experience", index)}
                  placeholder="Должность"
                />
                <input
                  className="w-full p-2 sm:p-3 rounded bg-red-900 text-white placeholder-red-200 focus:outline-none focus:ring-1 focus:ring-white text-sm sm:text-base"
                  type="text"
                  name="duration"
                  value={exp.duration}
                  onChange={(e) => handleChange(e, "experience", index)}
                  placeholder="Длительность"
                />
                <button
                  className="text-sm sm:text-base text-white hover:text-red-100 transition"
                  onClick={() => removeItem("experience", index)}
                >
                  <FaTrash className="inline mr-1" /> Удалить
                </button>
              </div>
            ))}
            <button
              className="flex items-center gap-2 text-sm sm:text-base text-white hover:text-white transition"
              onClick={() =>
                addItem("experience", {
                  company: "",
                  position: "",
                  duration: "",
                })
              }
            >
              <FaPlus /> Добавить опыт
            </button>
          </section>

          {/* Навыки */}
          <section>
            <h2 className="text-xl sm:text-2xl flex items-center gap-2 mb-2">
              <FaTools /> Навыки
            </h2>
            {formData?.skills.map((skill, index) => (
              <div
                key={index}
                className="bg-white/40 backdrop-blur-sm border border-black/20 p-4 rounded-md mb-2 space-y-2"
              >
                <input
                  className="w-full p-2 sm:p-3 rounded bg-red-900 text-white placeholder-red-200 focus:outline-none focus:ring-1 focus:ring-white text-sm sm:text-base"
                  type="text"
                  name="name"
                  value={skill.name}
                  onChange={(e) => handleChange(e, "skills", index)}
                  placeholder="Название"
                />
                <input
                  className="w-full p-2 sm:p-3 rounded bg-red-900 text-white placeholder-red-200 focus:outline-none focus:ring-1 focus:ring-white text-sm sm:text-base"
                  type="text"
                  name="level"
                  value={skill.level}
                  onChange={(e) => handleChange(e, "skills", index)}
                  placeholder="Уровень"
                />
                <button
                  className="text-sm sm:text-base text-white hover:text-red-100 transition"
                  onClick={() => removeItem("skills", index)}
                >
                  <FaTrash className="inline mr-1" /> Удалить
                </button>
              </div>
            ))}
            <button
              className="flex items-center gap-2 text-sm sm:text-base text-white hover:text-white transition"
              onClick={() => addItem("skills", { name: "", level: "" })}
            >
              <FaPlus /> Добавить навык
            </button>
          </section>

          {/* Языки */}
          <section>
            <h2 className="text-xl sm:text-2xl flex items-center gap-2 mb-2">
              <FaGlobe /> Языки
            </h2>
            {formData?.languages.map((lang, index) => (
              <div
                key={index}
                className="bg-white/40 backdrop-blur-sm border border-black/20 p-4 rounded-md mb-2 space-y-2"
              >
                <input
                  className="w-full p-2 sm:p-3 rounded bg-red-900 text-white placeholder-red-200 focus:outline-none focus:ring-1 focus:ring-white text-sm sm:text-base"
                  type="text"
                  name="name"
                  value={lang.name}
                  onChange={(e) => handleChange(e, "languages", index)}
                  placeholder="Язык"
                />
                <input
                  className="w-full p-2 sm:p-3 rounded bg-red-900 text-white placeholder-red-200 focus:outline-none focus:ring-1 focus:ring-white text-sm sm:text-base"
                  type="text"
                  name="proficiency"
                  value={lang.proficiency}
                  onChange={(e) => handleChange(e, "languages", index)}
                  placeholder="Уровень"
                />
                <button
                  className="text-sm sm:text-base text-white hover:text-red-100 transition"
                  onClick={() => removeItem("languages", index)}
                >
                  <FaTrash className="inline mr-1" /> Удалить
                </button>
              </div>
            ))}
            <button
              className="flex items-center gap-2 text-sm sm:text-base text-white hover:text-white transition"
              onClick={() =>
                addItem("languages", { name: "", proficiency: "" })
              }
            >
              <FaPlus /> Добавить язык
            </button>
          </section>

          {/* Дополнительная информация */}
          <section>
            <h2 className="text-xl sm:text-2xl flex items-center gap-2 mb-2">
              <FaInfoCircle /> Дополнительная информация
            </h2>
            <textarea
              className="w-full p-2 sm:p-3 rounded bg-red-900 text-white placeholder-red-200 focus:outline-none focus:ring-1 focus:ring-white h-24 text-sm sm:text-base"
              name="additionalInfo"
              value={formData?.additionalInfo}
              onChange={(e) => handleChange(e, "additionalInfo")}
              placeholder="Введите текст..."
            />
          </section>

          <button
            className="mt-4 bg-green-600 hover:bg-green-500 transition px-4 py-2 rounded text-white flex items-center gap-2 text-sm sm:text-base"
            onClick={saveResume}
          >
            <FaSave /> Сохранить
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Просмотр */}
          <section>
            <h2 className="text-xl sm:text-2xl flex items-center gap-2 mb-2">
              <FaBriefcase /> Опыт работы
            </h2>
            {resume?.experience?.length ? (
              resume.experience.map((exp, index) => (
                <div
                  key={index}
                  className="bg-red-900/60 backdrop-blur-sm border border-black/10 p-4 rounded-md mb-2"
                >
                  <p>
                    <strong>Компания:</strong> {exp.company}
                  </p>
                  <p>
                    <strong>Должность:</strong> {exp.position}
                  </p>
                  <p>
                    <strong>Длительность:</strong> {exp.duration}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-white">Нет данных</p>
            )}
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl flex items-center gap-2 mb-2">
              <FaTools /> Навыки
            </h2>
            {resume?.skills?.length ? (
              <div className="flex flex-wrap gap-3">
                {resume.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-red-900/60 backdrop-blur-sm px-4 py-1 rounded-full border border-black/10 text-sm"
                  >
                    {skill.name} ({skill.level})
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-white">Нет данных</p>
            )}
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl flex items-center gap-2 mb-2">
              <FaGlobe /> Языки
            </h2>
            {resume?.languages?.length ? (
              <div className="flex flex-wrap gap-3">
                {resume.languages.map((lang, index) => (
                  <span
                    key={index}
                    className="bg-red-900/60 px-4 py-1 rounded-full border border-black/10 text-sm"
                  >
                    {lang.name} ({lang.proficiency})
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-white">Нет данных</p>
            )}
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl flex items-center gap-2 mb-2">
              <FaInfoCircle /> Дополнительная информация
            </h2>
            <div className="text-white leading-relaxed bg-red-900/60 backdrop-blur-sm p-4 rounded-md">
              {resume?.additionalInfo?.trim()
                ? resume.additionalInfo
                : "Нет данных"}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default ResumePage;
