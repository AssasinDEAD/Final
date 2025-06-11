import { useState } from "react";
import { useUserProfile } from "../../hooks/user/useUpdateMe";
import { FaEdit, FaSave, FaEye, FaUpload } from "react-icons/fa";

const UserProfilePage = () => {
  const {
    user,
    formData,
    isEditing,
    error,
    setIsEditing,
    handleChange,
    saveProfile,
    imageFile,
    handleFileChange,
  } = useUserProfile();
  const BASE_URL = "http://localhost:3000";
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  return (
    <div className="w-full max-w-3xl mx-auto mt-8 mb-12 px-4 sm:px-6 py-6 bg-red-900/60 backdrop-blur-sm text-white rounded-2xl shadow-2xl">
      {/* Заголовок и кнопка редактирования */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Профиль</h1>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center gap-2 bg-white/80 hover:bg-red-500/60 hover:text-white px-4 py-2 rounded text-xs sm:text-sm transition duration-300"
        >
          {isEditing ? (
            <>
              <FaEye /> Просмотр
            </>
          ) : (
            <>
              <FaEdit /> Редактировать
            </>
          )}
        </button>
      </div>

      {isEditing ? (
        <>
          {/* Режим редактирования: для мобильных используем вертикальное расположение */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center space-y-4 sm:space-y-0">
            {/* Блок с фото */}
            <div className="w-full sm:w-2/5 flex justify-center">
              <img
                src={
                  imageFile
                    ? URL.createObjectURL(imageFile)
                    : `${BASE_URL}${user?.photo}`
                }
                alt="Preview"
                className="w-40 sm:w-64 h-auto mt-2 rounded-lg"
              />
              <p className="text-xs sm:text-sm mt-2">
                {imageFile ? "Новое изображение:" : "Текущее изображение:"}
              </p>
            </div>

            {/* Форма изменения данных */}
            <div className="w-full sm:w-3/5 space-y-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm sm:text-base font-semibold text-white">
                  Пароль
                </label>
                <button
                  type="button"
                  onClick={() => setShowPasswordFields(!showPasswordFields)}
                  className="text-xs sm:text-sm text-red-300 underline"
                >
                  {showPasswordFields ? "Скрыть" : "Изменить пароль"}
                </button>
              </div>

              <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  showPasswordFields ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="space-y-3 my-2">
                  <input
                    type="password"
                    name="currentPassword"
                    placeholder="Текущий пароль"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-red-900 text-white focus:outline-white focus:outline-1 text-xs sm:text-sm"
                  />
                  <input
                    type="password"
                    name="newPassword"
                    placeholder="Новый пароль"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-red-900 text-white focus:outline-white focus:outline-1 text-xs sm:text-sm"
                  />
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Подтвердите пароль"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-red-900 text-white focus:outline-white focus:outline-1 text-xs sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-xs sm:text-sm">Изображение:</label>
                <label
                  htmlFor="image"
                  className="flex items-center gap-3 px-4 py-3 mt-2 bg-red-900 backdrop-blur-xs rounded-lg cursor-pointer hover:bg-red-900/70 transition text-xs sm:text-sm"
                >
                  <FaUpload size={20} />
                  <span className="truncate">
                    {imageFile?.name ||
                      user?.photo?.split("/").pop() ||
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
            </div>
          </div>

          <div className="flex justify-center items-center mt-5">
            <button
              onClick={saveProfile}
              className="bg-green-700/50 hover:bg-green-700/90 border-2 border-green-700 hover:border-green-400/30 px-4 py-2 rounded text-xs sm:text-sm flex items-center gap-2 transition-all duration-300"
            >
              <FaSave /> Сохранить изменения
            </button>
          </div>

          {error && (
            <div className="mt-5 p-2 rounded-2xl bg-white text-red-700 text-center text-xs sm:text-sm tracking-wide shadow-sm">
              {error}
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col sm:flex-row gap-4">
          {user?.photo && (
            <div className="w-full sm:w-2/5 flex justify-center">
              <img
                src={`${BASE_URL}${user.photo}`}
                alt="Фото пользователя"
                className="w-40 sm:w-64 h-auto mt-2 rounded-sm border"
              />
            </div>
          )}
          <div className="w-full sm:w-3/5 space-y-2">
            <div className="text-sm sm:text-xl">
              <strong>Имя:</strong> {user?.name}
            </div>
            <div className="text-sm sm:text-xl">
              <strong>Email:</strong> {user?.email}
            </div>
            <div className="text-sm sm:text-xl">
              <strong>Role:</strong> {user?.role}
            </div>
            {user?.CompanyProfile && (
              <div className="text-sm sm:text-xl">
                <strong>Email:</strong> {user?.email}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfilePage;
