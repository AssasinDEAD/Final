import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { useNotifications } from "../../../hooks/notification/useNotifications";
import LoadingScreen from "../../../components/LoadingScreen";
import { FiArrowRightCircle } from "react-icons/fi";
import { AiFillPlusCircle } from "react-icons/ai";

const NotificationListPage = () => {
  const { user } = useAuth();
  const { notifications, loading } = useNotifications();
  const BASE_URL = "http://localhost:3000";

  if (loading) return <LoadingScreen />;

  return (
    <div className="px-4 py-4 sm:px-6 sm:py-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
          Оповещения
        </h1>
        {user?.role === "career_center" && (
          <Link
            to="/notifications/new"
            className="flex flex-row gap-2 items-center px-3 py-2 sm:px-4 sm:py-2 bg-red-950/50 text-white rounded-lg hover:bg-red-950/70 transition-transform duration-300 text-sm sm:text-base"
          >
            <AiFillPlusCircle size={18} className="sm:hidden" />
            <AiFillPlusCircle size={24} className="hidden sm:block" />
            <p className="hidden sm:block">Создать оповещение</p>
          </Link>
        )}
      </div>

      <div className="columns-1 sm:columns-2 gap-4 sm:gap-6 space-y-4 sm:space-y-6">
        {notifications.map((n) => (
          <div
            key={n.id}
            className="break-inside-avoid overflow-hidden rounded-xl group shadow-md flex flex-col"
          >
            {n.imageUrl ? (
              <div className="relative w-full h-56 sm:h-80">
                <img
                  src={`${BASE_URL}${n.imageUrl}`}
                  alt="notification"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5 bg-linear-to-t from-black via-black/70 to-transparent text-white z-10 text-xs sm:text-sm">
                  <h2 className="text-base sm:text-xl font-semibold">
                    {n.title}
                  </h2>
                  <p className="text-xs sm:text-sm">
                    {new Date(n.createdAt || "").toLocaleString()}
                  </p>
                </div>
                <div className="absolute inset-0 bg-black/50 backdrop-blur-xs opacity-0 group-hover:opacity-100 text-white p-3 sm:p-4 transition-opacity duration-300 flex flex-col justify-center items-center text-center space-y-3 z-20">
                  <p className="text-xs sm:text-sm">
                    {n.content.slice(0, 200)}...
                  </p>
                  <Link
                    to={`/notifications/${n.id}`}
                    className="flex items-center gap-2 text-white hover:text-red-200 transition text-xs sm:text-sm"
                  >
                    Подробнее{" "}
                    <FiArrowRightCircle size={20} className="sm:hidden" />
                    <FiArrowRightCircle size={24} className="hidden sm:block" />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex flex-col bg-red-950/60 backdrop-blur-md text-white p-3 sm:p-6 min-h-56 rounded-xl">
                <h2 className="text-base sm:text-xl font-semibold break-words">
                  {n.title}
                </h2>
                <p className="text-xs sm:text-sm mb-2">
                  {new Date(n.createdAt || "").toLocaleString()}
                </p>
                <p className="text-sm sm:text-base line-clamp-3">
                  {n.content}
                </p>
                <Link
                  to={`/notifications/${n.id}`}
                  className="mt-3 self-end text-white hover:text-red-300 transition text-xs sm:text-sm"
                >
                  <FiArrowRightCircle size={20} className="sm:hidden" />
                  <FiArrowRightCircle size={30} className="hidden sm:block" />
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationListPage;
