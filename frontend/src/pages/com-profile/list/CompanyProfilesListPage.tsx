import { useCompanyProfiles } from "../../../hooks/com-profile/useCompanyProfiles";
import { Link } from "react-router-dom";
import LoadingScreen from "../../../components/LoadingScreen";

const CompanyProfileListPage = () => {
  const { users, loading } = useCompanyProfiles();

  if (loading) return <LoadingScreen />;

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 bg-white/10 backdrop-blur-xl shadow-lg rounded-lg">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white text-center">
        База партнеров
      </h2>
      <div className="overflow-x-auto rounded-2xl">
        <table className="w-full bg-white">
          <thead>
            <tr className="bg-blue-400 text-white">
              <th className="p-2 sm:p-3 border border-gray-300 text-xs sm:text-sm">Почта</th>
              <th className="p-2 sm:p-3 border border-gray-300 text-xs sm:text-sm">Имя</th>
              <th className="p-2 sm:p-3 border border-gray-300 text-xs sm:text-sm">Компания</th>
              <th className="p-2 sm:p-3 border border-gray-300 text-xs sm:text-sm">Телефон</th>
              <th className="p-2 sm:p-3 border border-gray-300 text-xs sm:text-sm">БИН</th>
              <th className="p-2 sm:p-3 border border-gray-300 text-xs sm:text-sm text-center">Практика</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-100 transition">
                <td className="p-2 sm:p-3 border border-gray-300 text-xs sm:text-sm">
                  {user.email ?? "—"}
                </td>
                <td className="p-2 sm:p-3 border border-gray-300 text-xs sm:text-sm">
                  {user.name ?? "—"}
                </td>
                <td className="p-2 sm:p-3 border border-gray-300 text-xs sm:text-sm">
                  {user.CompanyProfile ? (
                    <Link
                      to={`/company/${user.CompanyProfile?.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      {user.CompanyProfile?.companyName}
                    </Link>
                  ) : (
                    "—"
                  )}
                </td>
                <td className="p-2 sm:p-3 border border-gray-300 text-xs sm:text-sm">
                  {user.CompanyProfile?.phone ?? "—"}
                </td>
                <td className="p-2 sm:p-3 border border-gray-300 text-xs sm:text-sm">
                  {user.CompanyProfile?.BIN ?? "—"}
                </td>
                <td className="p-2 sm:p-3 border border-gray-300 text-center text-xs sm:text-lg">
                  {user.CompanyProfile?.canProvideInternship ? "✅" : "❌"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompanyProfileListPage;
