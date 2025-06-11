import { useNavigate, useParams } from "react-router-dom";
import { useNotification } from "../../../hooks/notification/useNotification";
import LoadingScreen from "../../../components/LoadingScreen";
import { FaUpload } from "react-icons/fa6";

const NotificationFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const BASE_URL = "http://localhost:3000";

  const {
    form,
    handleChange,
    handleFileChange,
    handleSubmit,
    isEdit,
    isLoading,
    imageFile,
  } = useNotification(id);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSubmit();
    navigate("/notifications");
  };

  const getImagePreview = () => {
    if (imageFile) {
      return URL.createObjectURL(imageFile);
    } else if (form.imageUrl) {
      return `${BASE_URL}${form.imageUrl}`;
    }
    return null;
  };

  return (
    <div className="text-white px-4 sm:px-8">
      <p className="text-xl sm:text-3xl font-bold capitalize">
        {isEdit ? "Редактировать оповещение" : "Создать оповещение"}
      </p>
      <p className="text-sm sm:text-xl font-light mb-4">
        Добавьте текст и изображение к уведомлению
      </p>

      <div className="max-w-5xl mx-auto my-8 sm:my-20 p-4 sm:p-10 bg-red-900/50 backdrop-blur-sm shadow-2xl rounded-2xl space-y-6">
        <h2 className="text-lg sm:text-3xl font-semibold text-center capitalize">
          {isEdit ? "Редактирование" : "Новое оповещение"}
        </h2>

        {isLoading ? (
          <LoadingScreen />
        ) : (
          <form
            onSubmit={onSubmit}
            className="space-y-4 flex flex-col items-center w-full"
          >
            {/* Title */}
            <div className="w-full sm:w-4/5 space-y-1">
              <label
                htmlFor="title"
                className="block text-xs sm:text-sm font-semibold"
              >
                Заголовок: *
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Введите заголовок"
                required
                className="w-full p-2 sm:p-3 border-none text-sm sm:text-lg bg-red-900/20 backdrop-blur-sm rounded-lg focus:ring-1 focus:ring-white transition duration-300 ease-in-out"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row items-start justify-between w-full sm:w-4/5 gap-4">
              {/* Image Upload */}
              <div className="w-full sm:w-2/5 space-y-1">
                {/* Preview */}
                {getImagePreview() && (
                  <>
                    <img
                      src={getImagePreview()!}
                      alt="Preview"
                      className="w-full sm:max-w-full mt-2 rounded-lg"
                    />
                    <p className="text-xs sm:text-sm text-white mt-1">
                      {imageFile ? "Новое изображение:" : "Текущее изображение:"}
                    </p>
                  </>
                )}
                <label className="block text-xs sm:text-sm font-semibold">
                  Изображение:
                </label>
                <label
                  htmlFor="image"
                  className="flex items-center gap-2 px-3 py-2 bg-red-900/20 backdrop-blur-sm rounded-lg cursor-pointer hover:bg-red-900/60 transition text-xs sm:text-sm"
                >
                  <FaUpload size={16} className="sm:hidden" />
                  <FaUpload size={20} className="hidden sm:block" />
                  <span className="truncate">
                    {imageFile?.name ||
                      form.imageUrl?.split("/").pop() ||
                      "Выберите файл (необязательно)"}
                  </span>
                  <input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Content */}
              <div className="w-full sm:w-3/5 space-y-1">
                <label
                  htmlFor="content"
                  className="block text-xs sm:text-sm font-semibold"
                >
                  Сообщение: *
                </label>
                <textarea
                  name="content"
                  id="content"
                  value={form.content}
                  onChange={handleChange}
                  placeholder="Введите сообщение"
                  rows={10}
                  required
                  className="w-full p-2 sm:p-4 border-none text-sm sm:text-lg bg-red-900/20 backdrop-blur-sm rounded-lg focus:ring-1 focus:ring-white transition duration-300 ease-in-out"
                />
              </div>
            </div>
            
            {/* Submit Button */}
            <button
              type="submit"
              className="w-1/2 sm:w-1/3 p-2 sm:p-3 bg-red-950/30 backdrop-blur-sm rounded-lg hover:bg-opacity-70 hover:scale-105 transition-all duration-300 ease-in-out text-xs sm:text-sm"
            >
              {isEdit ? "Сохранить" : "Создать"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default NotificationFormPage;
