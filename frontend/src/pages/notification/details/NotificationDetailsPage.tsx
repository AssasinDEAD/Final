import { useNotificationDetails } from "../../../hooks/notification/useNotificationDetails";

const NotificationDetailsPage = () => {
  const { notification, role, handleDelete, handleEdit } = useNotificationDetails();
  const BASE_URL = "http://localhost:3000";

  if (!notification) {
    return (
      <div className="p-4 sm:p-6 text-white text-center text-base sm:text-xl">
        Оповещение не найдено
      </div>
    );
  }

  return (
    <div className="text-white">
      <div className="max-w-4xl mx-auto my-8 sm:my-16 p-6 sm:p-8 bg-red-800/70 backdrop-blur-md shadow-xl rounded-2xl">
        <div className="mb-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-wide">
            {notification.title}
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-red-300">
            Создано: {new Date(notification.createdAt || "").toLocaleString()}
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6">
          {notification.imageUrl && (
            <div className="w-full sm:w-1/3">
              <img
                src={`${BASE_URL}${notification.imageUrl}`}
                alt="Изображение оповещения"
                className="w-full h-auto rounded-lg object-cover"
              />
            </div>
          )}
          <div className={notification.imageUrl ? "w-full sm:w-2/3" : "w-full"}>
            <p className="text-base sm:text-lg leading-relaxed whitespace-pre-line">
              {notification.content}
            </p>
          </div>
        </div>

        {role === "career_center" && (
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={handleEdit}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 transition rounded-lg text-xs sm:text-sm font-medium"
            >
              Редактировать
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 transition rounded-lg text-xs sm:text-sm font-medium"
            >
              Удалить
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationDetailsPage;
