import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { useVacancies } from "../../../hooks/vacancy/useVacancies";
import LoadingScreen from "../../../components/LoadingScreen";
import VacancyResponseModal from "../../../components/VacancyResponseModal";
import { format } from "date-fns";
import { IoIosSearch } from "react-icons/io";

const VacancyListPage = () => {
  const { role } = useAuth();
  const [search, setSearch] = useState("");
  const [showMyVacancies, setShowMyVacancies] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedVacancyId, setSelectedVacancyId] = useState<string | null>(null);

  const { vacancies, isLoading } = useVacancies(showMyVacancies);

  const filteredVacancies = vacancies.filter((v) => {
    const q = search.toLowerCase();
    return (
      v.title.toLowerCase().includes(q) ||
      v.description.toLowerCase().includes(q)
    );
  });
  
  return (
    <div className="mt-24 max-w-5xl mx-auto px-4 py-6 text-white mb-24">
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold capitalize">
            {(showMyVacancies && role === "company") ? "Мои Вакансии" : "Вакансии"}
          </h1>
          <p className="text-lg sm:text-xl">
            Поиск, отклики и управление вакансиями
          </p>
        </div>

        {role === "company" && (
          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/vacancies/new"
              className="px-5 py-2 rounded-lg bg-red-950/30 backdrop-blur-sm hover:bg-opacity-80 transition duration-300 text-sm sm:text-base"
            >
              Создать вакансию
            </Link>
            <button
              onClick={() => setShowMyVacancies((prev) => !prev)}
              className="px-5 py-2 rounded-lg border border-red-300 bg-red-800/30 hover:bg-opacity-60 transition duration-300 text-sm sm:text-base"
            >
              {showMyVacancies ? "Показать все" : "Показать мои"}
            </button>
          </div>
        )}
      </div>

      <div className="relative mb-8 w-full">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-2xl sm:text-3xl z-10">
          <IoIosSearch />
        </span>
        <input
          type="text"
          placeholder="Поиск по названию или описанию..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 p-4 border-none text-lg sm:text-xl bg-red-900/50 backdrop-blur-sm rounded-lg outline-none focus:ring-1 focus:ring-white placeholder:text-red-100 transition-all duration-300 ease-in-out"
        />
      </div>

      {isLoading ? (
        <LoadingScreen />
      ) : filteredVacancies.length === 0 ? (
        <p className="text-center text-white text-lg sm:text-xl">Вакансии не найдены</p>
      ) : (
        <ul className="space-y-6">
          {filteredVacancies.map((vacancy) => (
            <li
              key={vacancy.id}
              className="px-6 pt-5 pb-6 rounded-2xl bg-red-900/80 backdrop-blur-sm shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <Link
                to={`/vacancies/${vacancy.id}`}
                className="text-2xl sm:text-3xl font-semibold text-white hover:underline"
              >
                {vacancy.title}
              </Link>
              <p className="text-sm sm:text-base text-white">
                {vacancy.location} — {vacancy.salary}
              </p>
              <div className="border-b border-red-800 py-1 my-2" />
              <p className="text-white mt-2 line-clamp-3">
                {vacancy.description}
              </p>
              
              <p className="mt-3">
                <strong className="font-bold">Вакансия от </strong> {vacancy.User?.CompanyProfile?.companyName}
              </p>
              <div className="text-white/70 text-xs sm:text-sm text-end">
                {format(new Date(vacancy.createdAt || ""), "dd.MM.yyyy HH:mm")}
              </div>
              <div className="mt-4 flex flex-wrap justify-end gap-4">
                {role === "company" && (
                  <Link
                    to={`/vacancies/${vacancy.id}/responses`}
                    className="px-5 py-2 rounded-lg bg-red-950/30 backdrop-blur-sm hover:bg-opacity-80 transition duration-300 text-sm sm:text-base"
                  >
                    Посмотреть отклики
                  </Link>
                )}
                {role === "student" && (
                  <button
                    onClick={() => {
                      setSelectedVacancyId(vacancy.id!);
                      setShowModal(true);
                    }}
                    className="px-4 py-2 rounded-lg bg-white/20 border border-white border-opacity-20 hover:bg-opacity-40 transition-all duration-300 text-sm sm:text-base"
                  >
                    Откликнуться
                  </button>
                )}
              </div>
            </li>
          ))}

          {showModal && selectedVacancyId && (
            <VacancyResponseModal
              vacancyId={selectedVacancyId}
              onClose={() => {
                setShowModal(false);
                setSelectedVacancyId(null);
              }}
            />
          )}
        </ul>
      )}
    </div>
  );
};

export default VacancyListPage;
