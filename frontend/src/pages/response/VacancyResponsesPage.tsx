import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { useResponsesByVacancy } from "../../hooks/vacancyResponses/useResponsesByVacancy";
import LoadingScreen from "../../components/LoadingScreen";
import { updateResponseStatus } from "../../services/vacancyResponseService";
import { toast } from "react-toastify";

const VacancyResponsesPage = () => {
  const { vacancyId } = useParams<{ vacancyId: string }>();
  const { responses, isLoading, refetch } = useResponsesByVacancy(vacancyId ?? "");
  const [selectedStatus, setSelectedStatus] = useState<"pending" | "accepted" | "rejected">("pending");

  const handleStatusChange = async (responseId: string, status: "accepted" | "rejected") => {
    try {
      await updateResponseStatus(responseId, status);
      toast.success("Статус обновлён");
      refetch();
    } catch {
      toast.error("Ошибка обновления статуса");
    }
  };

  const filteredResponses = responses.filter((r) => r.status === selectedStatus);

  const stats = {
    total: responses.length,
    pending: responses.filter((r) => r.status === "pending").length,
    accepted: responses.filter((r) => r.status === "accepted").length,
    rejected: responses.filter((r) => r.status === "rejected").length,
  };

  return (
    <div className="mt-24 max-w-4xl mx-auto my-16 p-8 bg-red-900/80 backdrop-blur-xs text-white rounded-[40px] shadow-xl">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center">Отклики на вакансию</h1>

      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          {/* Статистика */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center mb-6">
            <div className="bg-blue-600/30 p-3 rounded-lg border border-white border-opacity-30">
              <p className="text-xl sm:text-2xl font-bold">{stats.total}</p>
              <p className="text-sm sm:text-base">Всего</p>
            </div>
            <div className="bg-yellow-500/30 p-3 rounded-lg border border-white border-opacity-30">
              <p className="text-xl sm:text-2xl font-bold">{stats.pending}</p>
              <p className="text-sm sm:text-base">Ожидают</p>
            </div>
            <div className="bg-green-600/30 p-3 rounded-lg border border-white border-opacity-30">
              <p className="text-xl sm:text-2xl font-bold">{stats.accepted}</p>
              <p className="text-sm sm:text-base">Приняты</p>
            </div>
            <div className="bg-red-600/30 p-3 rounded-lg border border-white border-opacity-30">
              <p className="text-xl sm:text-2xl font-bold">{stats.rejected}</p>
              <p className="text-sm sm:text-base">Отклонены</p>
            </div>
          </div>

          {/* Кнопки переключения */}
          <div className="flex justify-center gap-4 mb-6">
            {["pending", "accepted", "rejected"].map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status as any)}
                className={`px-4 py-2 rounded-full text-sm sm:text-base font-semibold transition-all duration-300 ${
                  selectedStatus === status
                    ? "bg-white text-red-900 shadow-md"
                    : "bg-white/20 hover:bg-opacity-40"
                }`}
              >
                {status === "pending" && "Ожидают"}
                {status === "accepted" && "Приняты"}
                {status === "rejected" && "Отклонены"}
              </button>
            ))}
          </div>

          {/* Список откликов */}
          {filteredResponses.length === 0 ? (
            <p className="text-center text-lg sm:text-xl">Нет откликов</p>
          ) : (
            <ul className="space-y-6">
              {filteredResponses.map((response) => (
                <li
                  key={response.id}
                  className="bg-white/10 p-5 rounded-xl shadow-md border border-white border-opacity-10 transition hover:shadow-xl"
                >
                  <Link to={`/resumes/${response.User?.Resume?.id}`}>
                    <p className="text-lg sm:text-xl hover:underline">
                      <strong>Соискатель:</strong> {response.User?.name}
                    </p>
                  </Link>
                  <p className="text-lg sm:text-xl">
                    <strong>Email:</strong> {response.User?.email}
                  </p>
                  <p className="mt-2 text-lg sm:text-xl">
                    <strong>Письмо:</strong> {response.coverLetter}
                  </p>
                  <p className="mt-2 text-lg sm:text-xl">
                    <strong>Статус:</strong>{" "}
                    <span className="capitalize font-medium">{response.status}</span>
                  </p>

                  <div className="flex gap-3 mt-4">
                    {["accepted", "rejected"].map((s) => (
                      <button
                        key={s}
                        className={`px-4 py-2 rounded-lg text-sm sm:text-base font-semibold transition-all duration-300 ${
                          response.status === s
                            ? "bg-green-600 text-white"
                            : "bg-white text-black hover:bg-opacity-60"
                        }`}
                        onClick={() => handleStatusChange(response.id, s as any)}
                      >
                        {s === "accepted" ? "Принят" : "Отклонён"}
                      </button>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default VacancyResponsesPage;
