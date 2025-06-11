import RoleSelect from "./RoleSelect";
import { useCreateUserForm } from "../hooks/admin/useCreateUserForm";
import { IoClose } from "react-icons/io5";
import ModalPortal from "../components/ModalPortal";

interface CreateUserModalProps {
  onClose: () => void;
  onCreated?: () => void;
}

const CreateUserModal: React.FC<CreateUserModalProps> = ({ onClose, onCreated }) => {
  const { formData, setFormData, handleChange, handleSubmit: submit } = useCreateUserForm();

  const handleSubmit = async (e: React.FormEvent) => {
    await submit(e);
    onCreated?.();
    onClose();
  };

  return (
    <ModalPortal>
      <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center px-4">
        <div className="bg-red-950/40 backdrop-blur-xs text-white p-8 rounded-3xl shadow-2xl w-full max-w-xl relative">

          {/* Кнопка закрытия */}
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-200 text-2xl font-bold"
            onClick={onClose}
          >
            <IoClose />
          </button>

          {/* Заголовок */}
          <h2 className="text-2xl font-bold mb-6 text-center">Добавить нового пользователя</h2>

          {/* Форма */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Имя */}
            <div>
              <label className="block mb-1 text-sm">Имя пользователя *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-xl bg-white text-black focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 text-sm">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-xl bg-white text-black focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            {/* Пароль */}
            <div>
              <label className="block mb-1 text-sm">Пароль *</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-xl bg-white text-black focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            {/* Роль */}
            <div>
              <label className="block mb-1 text-sm">Роль *</label>
              <RoleSelect
                value={formData.role}
                onChange={(newValue) =>
                  setFormData((prev) => ({ ...prev, role: newValue }))
                }
              />
            </div>

            {/* Уведомление */}
            <div className="flex items-center gap-3 mt-2">
              <input
                type="checkbox"
                name="notifyUser"
                checked={formData.notifyUser}
                onChange={handleChange}
                className="accent-red-700 w-5 h-5"
              />
              <label htmlFor="notifyUser" className="text-sm">Уведомить пользователя по email</label>
            </div>

            {/* Кнопки */}
            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-white text-red-900 font-semibold hover:bg-red-400 hover:text-black transition-all duration-300"
              >
                Отмена
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-white text-green-700 font-semibold hover:bg-green-400 hover:text-black transition-all duration-300"
              >
                Добавить
              </button>
            </div>
          </form>
        </div>
      </div>
    </ModalPortal>
  );
};

export default CreateUserModal;
