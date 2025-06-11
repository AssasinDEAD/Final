import { useContracts } from "../../hooks/contract/useContracts";
import { format } from "date-fns";
import { downloadContract } from "../../services/contractService";
import { Link } from "react-router-dom";
import { useSignContract } from "../../hooks/contract/useSignContract";
import LoadingScreen from "../../components/LoadingScreen";
import { FaTrash, FaFileDownload, FaFileSignature } from "react-icons/fa";
import { TiDocumentAdd } from "react-icons/ti";

const ContractsPage = () => {
  const { contracts, loading, remove, role } = useContracts();
  const { sign, signing } = useSignContract();
  
  const canDelete = () => role === "student";
  
  const canSign = (contract: any) => {
    if (contract.status === "completed") return false;
    if (role === "student") return contract.status === "draft";
    if (role === "company") return contract.status === "signedByUser";
    if (role === "career_center") return contract.status === "signedByEmployer";
    return false;
  };

  return (
    <div className="mt-16 max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-8 text-white">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 mb-6 gap-3">
        <h1 className="text-xl sm:text-2xl font-bold">Договоры</h1>
        {role === "student" && (
          <Link 
            to="/contracts/create"
            className="flex gap-2 items-center bg-red-900 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg hover:bg-red-800 transition text-xs sm:text-base"
          >
            <TiDocumentAdd size={20} className="sm:hidden" />
            <TiDocumentAdd size={24} className="hidden sm:block" />
            Создать договор
          </Link>
        )}
      </div>

      <div className="bg-white/90 backdrop-blur-md text-black rounded-xl p-3 sm:p-6 shadow-lg overflow-x-auto">
        {loading ? (
          <LoadingScreen />
        ) : contracts.length === 0 ? (
          <p className="text-center text-xs sm:text-sm">Договоров нет.</p>
        ) : (
          <table className="w-full text-xs sm:text-sm text-left">
            <thead>
              <tr className="text-red-900 border-b">
                <th className="py-1 px-2 sm:py-2 sm:px-3">#</th>
                <th className="py-1 px-2 sm:py-2 sm:px-3">Статус</th>
                <th className="py-1 px-2 sm:py-2 sm:px-3">Создан</th>
                <th className="py-1 px-2 sm:py-2 sm:px-3">Обновлён</th>
                <th className="py-1 px-2 sm:py-2 sm:px-3">Действия</th>
              </tr>
            </thead>
            <tbody>
              {contracts.map((contract, index) => (
                <tr key={contract.id} className="border-b hover:bg-gray-100 transition">
                  <td className="py-1 px-2 sm:py-2 sm:px-3">{index + 1}</td>
                  <td className="py-1 px-2 sm:py-2 sm:px-3 capitalize">{contract.status}</td>
                  <td className="py-1 px-2 sm:py-2 sm:px-3">
                    {format(new Date(contract.createdAt || ""), "dd.MM.yyyy HH:mm")}
                  </td>
                  <td className="py-1 px-2 sm:py-2 sm:px-3">
                    {format(new Date(contract.updatedAt || ""), "dd.MM.yyyy HH:mm")}
                  </td>
                  <td className="py-1 px-2 sm:py-2 sm:px-3 flex gap-1 sm:gap-2">
                    <button
                      onClick={() =>
                        downloadContract(contract.id ? contract.id : "")
                      }
                      className="text-blue-600 hover:text-blue-800"
                      title="Скачать"
                    >
                      <FaFileDownload size={18} className="sm:hidden" />
                      <FaFileDownload size={22} className="hidden sm:block" />
                    </button>
                    {canSign(contract) && (
                      <button
                        onClick={() =>
                          contract.id &&
                          sign(
                            contract.id,
                            `http://localhost:3000${contract.filePath}`
                          )
                        }
                        className="text-purple-600 hover:text-purple-800"
                        title="Подписать"
                        disabled={signing}
                      >
                        <FaFileSignature size={18} className="sm:hidden" />
                        <FaFileSignature size={22} className="hidden sm:block" />
                      </button>
                    )}
                    {canDelete() && (
                      <button
                        onClick={() => contract.id && remove(contract.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Удалить"
                      >
                        <FaTrash size={18} className="sm:hidden" />
                        <FaTrash size={22} className="hidden sm:block" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ContractsPage;
