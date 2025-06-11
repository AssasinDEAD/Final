import { useHomeData } from "../../hooks/useHomeData";
import LoadingScreen from "../../components/LoadingScreen";
import MainDashboard from "../../components/MainDashboard";
import AlumniSection from "../../components/AlumniSection";

const NewsPage: React.FC = () => {
  const { notifications, vacancies, resumes, loading } = useHomeData();

  if (loading) return <LoadingScreen />;

  return (
    <div className="flex flex-col gap-8 p-4 sm:p-8">
      {/* Основной блок с новостной панелью */}
      <div className="bg-white/70 rounded-2xl p-4 sm:p-7 shadow-lg">
        <MainDashboard 
          notifications={notifications} 
          vacancies={vacancies} 
          resumes={resumes} 
        />
      </div>

      {/* Секция выпускников */}
      <div className="px-2 sm:px-0">
        <AlumniSection />
      </div>
    </div>
  );
};

export default NewsPage;
