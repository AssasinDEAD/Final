import { useParams, Link } from "react-router-dom";
import { useCompanyProfileById } from "../../../hooks/com-profile/useCompanyProfiles";
import LoadingScreen from "../../../components/LoadingScreen";
import { useAuth } from "../../../contexts/AuthContext";

const CompanyProfileDetailPage = () => {
  const { role } = useAuth();
  const { id } = useParams();
  const { profile, loading } = useCompanyProfileById(id);

  if (loading) return <LoadingScreen />;

  return (
    <div className="mt-24 max-w-4xl mx-auto p-8 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg">
      {role === "company" && (
        <div className="text-end mb-6">
          <Link
            to="/company-profile/edit"
            className="bg-blue-500/70 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition"
          >
            Изменить профиль
          </Link>
        </div>
      )}
      {profile ? (
        <>
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            {profile.companyName}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <p className="text-lg text-gray-700">
              <strong className="text-blue-600">Адрес:</strong> {profile.address}
            </p>
            <p className="text-lg text-gray-700">
              <strong className="text-blue-600">Телефон:</strong> {profile.phone}
            </p>
            <p className="text-lg text-gray-700">
              <strong className="text-blue-600">ФИО директора:</strong> {profile.directorFullName}
            </p>
            <p className="text-lg text-gray-700">
              <strong className="text-blue-600">Может проводить практику:</strong>{" "}
              {profile.canProvideInternship ? "✅ Да" : "❌ Нет"}
            </p>
          </div>
          {profile.canProvideInternship && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <p className="text-lg text-gray-700">
                  <strong className="text-blue-600">В лице:</strong> {profile.representedBy}
                </p>
                <p className="text-lg text-gray-700">
                  <strong className="text-blue-600">На основании:</strong> {profile.basis}
                </p>
              </div>
              <div className="mt-6 p-6 bg-red-900/10 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Банковская информация</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <p className="text-lg text-gray-700">
                    <strong className="text-blue-600">БИН:</strong> {profile.BIN}
                  </p>
                  <p className="text-lg text-gray-700">
                    <strong className="text-blue-600">БИК:</strong> {profile.BIK}
                  </p>
                  <p className="text-lg text-gray-700">
                    <strong className="text-blue-600">КБЕ:</strong> {profile.KBE}
                  </p>
                  <p className="text-lg text-gray-700">
                    <strong className="text-blue-600">Банк:</strong> {profile.BANK}
                  </p>
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <p className="text-center text-lg text-gray-700">Профиль не найден</p>
      )}
    </div>
  );
};

export default CompanyProfileDetailPage;
