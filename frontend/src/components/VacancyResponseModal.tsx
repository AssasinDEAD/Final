import { useVacancyResponseForm } from "../hooks/vacancyResponses/useVacancyResponseForm";
import ModalPortal from "../components/ModalPortal"; 

interface Props {
  vacancyId: string;
  onClose: () => void;
}

const VacancyResponseModal = ({ vacancyId, onClose }: Props) => {
  const { coverLetter, setCoverLetter, loading, handleSubmit } =
    useVacancyResponseForm(vacancyId, onClose);

  return (
    <ModalPortal>
      <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center px-4">
        <div className="bg-red-900/30 backdrop-blur-md text-white p-8 rounded-3xl shadow-2xl w-full max-w-xl relative">
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-200 text-2xl font-bold"
            onClick={onClose}
          >
            ×
          </button>

          <h2 className="text-2xl font-bold mb-6 text-center">Отклик на вакансию</h2>

          <form onSubmit={handleSubmit}>
            <textarea
              className="w-full h-32 p-4 rounded-xl bg-white text-black resize-none focus:outline-hidden focus:ring-2 focus:ring-red-500 mb-6"
              placeholder="Сопроводительное письмо"
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              required
            />

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="px-4 py-2 rounded-xl bg-white text-red-900 font-semibold hover:bg-red-400 hover:text-black transition-all duration-300"
              >
                Отмена
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 rounded-xl bg-white text-green-700 font-semibold hover:bg-green-400 hover:text-black transition-all duration-300"
              >
                {loading ? "Отправка..." : "Отправить"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </ModalPortal>
  );
};

export default VacancyResponseModal;
