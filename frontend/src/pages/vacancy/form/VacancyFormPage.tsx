import { useNavigate, useParams } from "react-router-dom";
import { useVacancy } from "../../../hooks/vacancy/useVacancy";
import LoadingScreen from "../../../components/LoadingScreen";

const VacancyFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    form,
    handleChange,
    handleRequirementsChange,
    requirementsInput,
    handleSubmit,
    isEdit,
    isLoading,
  } = useVacancy(id);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSubmit();
    navigate("/vacancies");
  };

  return (
    <>
      <div className="ml-4 sm:ml-10 text-white mt-10">
        <p className="text-2xl sm:text-3xl font-bold capitalize">
          {isEdit ? "Редактировать вакансию" : "Новая вакансия"}
        </p>
        <p className="text-lg sm:text-xl font-light">
          {isEdit
            ? "Измените информацию о вакансии"
            : "Создание новой вакансии для студентов"}
        </p>
      </div>

      <div className="max-w-3xl mx-auto my-16 p-6 sm:p-10 bg-red-900/60 backdrop-blur-md shadow-2xl rounded-[50px] text-white space-y-8">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center capitalize">
          {isEdit ? "Обновление вакансии" : "Создание вакансии"}
        </h2>

        {isLoading ? (
          <LoadingScreen />
        ) : (
          <form 
            onSubmit={onSubmit} 
            className="space-y-4 flex flex-col items-center"
          >
            {/* Title */}
            <div className="w-full sm:w-4/5 space-y-2">
              <label htmlFor="title" className="text-sm sm:text-base font-semibold">
                Название вакансии: *
              </label>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="Введите название"
                value={form.title}
                onChange={handleChange}
                className="w-full p-3 sm:p-4 border-none text-base sm:text-lg bg-red-900/20 backdrop-blur-sm rounded-lg focus:ring-1 focus:ring-white placeholder:text-red-200 transition-all duration-300 ease-in-out"
                required
              />
            </div>

            {/* Description */}
            <div className="w-full sm:w-4/5 space-y-2">
              <label htmlFor="description" className="text-sm sm:text-base font-semibold">
                Описание:
              </label>
              <textarea
                name="description"
                id="description"
                placeholder="Описание вакансии"
                value={form.description}
                onChange={handleChange}
                className="w-full p-3 sm:p-4 h-32 border-none text-base sm:text-lg bg-red-900/20 backdrop-blur-sm rounded-lg focus:ring-1 focus:ring-white placeholder:text-red-200 transition-all duration-300 ease-in-out resize-none"
              />
            </div>

            {/* Requirements */}
            <div className="w-full sm:w-4/5 space-y-2">
              <label htmlFor="requirements" className="text-sm sm:text-base font-semibold">
                Требования:
              </label>
              <input
                type="text"
                name="requirements"
                id="requirements"
                placeholder="Например: React, Python, Figma"
                value={requirementsInput}
                onChange={handleRequirementsChange}
                className="w-full p-3 sm:p-4 border-none text-base sm:text-lg bg-red-900/20 backdrop-blur-sm rounded-lg focus:ring-1 focus:ring-white placeholder:text-red-200 transition-all duration-300 ease-in-out"
              />
            </div>

            {/* Location */}
            <div className="w-full sm:w-4/5 space-y-2">
              <label htmlFor="location" className="text-sm sm:text-base font-semibold">
                Локация:
              </label>
              <input
                type="text"
                name="location"
                id="location"
                placeholder="Город или онлайн"
                value={form.location}
                onChange={handleChange}
                className="w-full p-3 sm:p-4 border-none text-base sm:text-lg bg-red-900/20 backdrop-blur-sm rounded-lg focus:ring-1 focus:ring-white placeholder:text-red-200 transition-all duration-300 ease-in-out"
              />
            </div>

            {/* Salary */}
            <div className="w-full sm:w-4/5 space-y-2">
              <label htmlFor="salary" className="text-sm sm:text-base font-semibold">
                Зарплата:
              </label>
              <input
                type="text"
                name="salary"
                id="salary"
                placeholder="Укажите диапазон"
                value={form.salary}
                onChange={handleChange}
                className="w-full p-3 sm:p-4 border-none text-base sm:text-lg bg-red-900/20 backdrop-blur-sm rounded-lg focus:ring-1 focus:ring-white placeholder:text-red-200 transition-all duration-300 ease-in-out"
              />
            </div>

            <div className="w-1/2 sm:w-1/3 space-y-2">
              <button
                type="submit"
                className="w-full p-3 mt-6 border-none text-base sm:text-lg bg-red-950/30 backdrop-blur-sm rounded-lg hover:bg-opacity-70 hover:scale-105 transform transition-all duration-300 ease-in-out"
              >
                {isEdit ? "Сохранить изменения" : "Создать вакансию"}
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default VacancyFormPage;
