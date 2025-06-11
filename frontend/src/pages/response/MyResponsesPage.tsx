import { useMyResponses } from "../../hooks/vacancyResponses/useMyResponses";
import LoadingScreen from "../../components/LoadingScreen";
import { FaEye, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MyResponsesPage = () => {
  const {
    responses,
    rawResponses,
    isLoading,
    stats,
    filterStatus,
    setFilterStatus,
    handleDelete,
  } = useMyResponses();

  const navigate = useNavigate();

  return (
    <div className="mt-24 max-w-4xl mx-auto p-6 bg-gradient-to-r from-red-800 to-red-900 text-white rounded-3xl shadow-2xl mb-20">
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-6 text-center">
        Мои отклики
      </h1>

      {isLoading ? (
        <LoadingScreen />
      ) : rawResponses.length === 0 ? (
        <p className="text-center text-lg">
          Вы ещё не откликались на вакансии.
        </p>
      ) : (
        <>
          {/* Статистика */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center mb-6">
            {/* Исправленная ячейка "Всего" */}
            <div className="bg-blue-600/30 p-4 rounded-xl border border-white border-opacity-30">
              <p className="text-2xl font-bold">{stats.total}</p>
              <p className="text-sm">Всего</p>
            </div>
            <div className="bg-yellow-500/30 p-4 rounded-xl border border-white border-opacity-30">
              <p className="text-2xl font-bold">{stats.pending}</p>
              <p className="text-sm">Ожидают</p>
            </div>
            <div className="bg-green-600/30 p-4 rounded-xl border border-white border-opacity-30">
              <p className="text-2xl font-bold">{stats.accepted}</p>
              <p className="text-sm">Приняты</p>
            </div>
            <div className="bg-red-600/30 p-4 rounded-xl border border-white border-opacity-30">
              <p className="text-2xl font-bold">{stats.rejected}</p>
              <p className="text-sm">Отклонены</p>
            </div>
          </div>

          {/* Фильтры */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {["all", "pending", "accepted", "rejected"].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status as any)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  filterStatus === status
                    ? "bg-white text-red-900 shadow-md"
                    : "bg-white/10 hover:bg-white/20"
                }`}
              >
                {{
                  all: "Все",
                  pending: "Ожидают",
                  accepted: "Приняты",
                  rejected: "Отклонены",
                }[status]}
              </button>
            ))}
          </div>

          {responses.length === 0 ? (
            <p className="text-center mt-4">Нет откликов.</p>
          ) : (
            <>
              {/* Список откликов */}
              <ul className="space-y-6">
                {responses.map((response) => (
                  <li
                    key={response.id}
                    className="bg-white/10 p-6 rounded-2xl shadow-lg border border-white border-opacity-20 transition hover:shadow-xl"
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                      <h2 className="text-2xl font-semibold">
                        {response.Vacancy?.title || "Без названия"}
                      </h2>
                      <div className="flex gap-4 mt-3 sm:mt-0">
                        <button
                          className="text-green-200 hover:text-green-400 transition"
                          onClick={() =>
                            navigate(`/vacancies/${response.Vacancy?.id}`)
                          }
                          title="Просмотр вакансии"
                        >
                          <FaEye size={24} />
                        </button>
                        <button
                          className="text-red-200 hover:text-red-400 transition"
                          onClick={() => handleDelete(response.id)}
                          title="Удалить отклик"
                        >
                          <FaTrashAlt size={24} />
                        </button>
                      </div>
                    </div>

                    <p className="text-sm opacity-75">
                      <strong>Отправлено:</strong>{" "}
                      {new Date(response.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-lg mt-2">
                      <strong>Статус:</strong>{" "}
                      <span className="capitalize font-medium">
                        {response.status}
                      </span>
                    </p>
                    <p className="text-xl opacity-80 mt-2">
                      <strong>Письмо:</strong> {response.coverLetter || "Нет письма"}
                    </p>
                  </li>
                ))}
              </ul>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default MyResponsesPage;
