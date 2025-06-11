import { useStats } from "../../hooks/stats/useStats";
import { Doughnut, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import LoadingScreen from "../../components/LoadingScreen";

ChartJS.register(ArcElement, Tooltip, Legend);

const StatsPage = () => {
  const { data, loading } = useStats();

  if (loading) return <LoadingScreen />;
  if (!data) return <div className="text-white p-5">Ошибка загрузки данных</div>;

  const { users, notifications, vacancies, responses } = data;

  const userChartData = {
    labels: ["Студенты", "Компании", "Карьерные центры", "Админы"],
    datasets: [
      {
        label: "Пользователи",
        data: [
          users.students,
          users.companies,
          users.careerCenters,
          users.admins,
        ],
        backgroundColor: ["#f87171", "#fb923c", "#60a5fa", "#a78bfa"],
        borderColor: "#fff1",
        borderWidth: 1,
      },
    ],
  };

  const responseChartData = {
    labels: ["Ожидают", "Приняты", "Отклонены"],
    datasets: [
      {
        label: "Отклики",
        data: [
          responses.pending,
          responses.accepted,
          responses.rejected,
        ],
        backgroundColor: ["#facc15", "#4ade80", "#f87171"],
        borderColor: "#fff1",
        borderWidth: 1,
        legend: {
          labels: {
            color: "black",
            font: {
              size: 14, 
            },
            padding: 20,
          },  
        },
      },
    ],
  };

  return (
    <div className="max-w-6xl bg-red-900/30 mx-auto p-10 space-y-10 text-black text-center">
      <h1 className="text-3xl font-bold text-white">Статистика</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/80 backdrop-blur-xs rounded-lg p-6 shadow-xl/20">
          <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-red-800/40">Пользователи</h2>
          <Doughnut data={userChartData}/>
          <div className="mt-4 space-y-1">
            <p>Всего: {users.total}</p>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-xs rounded-lg p-6 shadow-xl/20">
          <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-red-800/40">Отклики</h2>
          <Pie data={responseChartData} />
          <div className="mt-4 space-y-1">
            <p>Всего откликов: {responses.total}</p>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-xs rounded-lg p-6 shadow-xl/20">
          <h2 className="text-2xl font-semibold mb-2 pb-2 border-b border-red-800/40">Вакансии</h2>
          <p>Всего: {vacancies}</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-xl/20">
          <h2 className="text-2xl font-semibold mb-2 pb-2 border-b border-red-800/40">Оповещения</h2>
          <p>Всего: {notifications}</p>
        </div>
      </div>
    </div>
  );
};

export default StatsPage;
