import { useEditUserForm } from "../hooks/admin/useEditUserForm";
import { User } from "../types/user";
import ModalPortal from "../components/ModalPortal";

interface Props {
  user: User;
  onClose: () => void;
  onUpdated: () => void;
}

const EditUserModal = ({ user, onClose, onUpdated }: Props) => {
  const { formData, handleChange, handleSubmit } = useEditUserForm(user, () => {
    onUpdated();
    onClose();
  });

  return (
    <ModalPortal>
      <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center px-4">
        <div className="bg-red-950/40 backdrop-blur-sm text-white p-8 rounded-3xl shadow-2xl w-full max-w-xl relative">
          <button
            className="absolute top-4 right-4 text-black hover:text-gray-700 text-2xl font-bold"
            onClick={onClose}
          >
            ×
          </button>

          <h2 className="text-2xl font-bold mb-6 text-center">Редактировать пользователя</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block mb-1 text-sm">Имя: </label>
              <input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-xl bg-white border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-1 text-sm">Email: </label>
              <input
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-xl bg-white border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block mb-1 text-sm">Новый пароль (необязательно):</label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-xl bg-white border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-gray-200 text-red-800 font-semibold hover:bg-red-400 hover:text-black transition-all duration-300"
              >
                Отмена
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-green-100 text-green-800 font-semibold hover:bg-green-400 hover:text-black transition-all duration-300"
              >
                Сохранить
              </button>
            </div>
          </form>
        </div>
      </div>
    </ModalPortal>
  );
};

export default EditUserModal;
