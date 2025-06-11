import { useCompanyProfile } from "../../../hooks/com-profile/useCompanyProfile";
import LoadingScreen from "../../../components/LoadingScreen";
import { useState } from "react";

const CompanyProfileFormPage = () => {
  const { form, handleChange, handleSubmit, isLoading, isEdit } = useCompanyProfile();
  const [showInternshipFields, setShowInternshipFields] = useState(form.canProvideInternship || false);

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="mt-24 max-w-3xl mx-auto p-6 sm:px-8 sm:py-8 bg-white/80 backdrop-blur-md rounded-lg shadow-lg">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-6">
        {isEdit ? "Редактировать профиль компании" : "Создать профиль компании"}
      </h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="companyName"
            value={form.companyName || ""}
            onChange={handleChange}
            placeholder="Название компании"
            required
            className="w-full p-3 bg-red-900/20 focus:outline-red-400 rounded-lg text-sm sm:text-base"
          />
          <input
            name="address"
            value={form.address || ""}
            onChange={handleChange}
            placeholder="Адрес"
            className="w-full p-3 bg-red-900/20 focus:outline-red-400 rounded-lg text-sm sm:text-base"
          />
          <input
            name="phone"
            value={form.phone || ""}
            onChange={handleChange}
            placeholder="Телефон"
            className="w-full p-3 bg-red-900/20 focus:outline-red-400 rounded-lg text-sm sm:text-base"
          />
          <input
            name="directorFullName"
            value={form.directorFullName || ""}
            onChange={handleChange}
            placeholder="ФИО директора"
            className="w-full p-3 bg-red-900/20 focus:outline-red-400 rounded-lg text-sm sm:text-base"
          />
        </div>

        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            name="canProvideInternship"
            checked={form.canProvideInternship || false}
            onChange={(e) => {
              handleChange(e);
              setShowInternshipFields(e.target.checked);
            }}
            className="h-5 w-5 text-blue-500"
          />
          <span className="text-gray-700 text-xs sm:text-sm">Может предоставлять практику</span>
        </label>

        {showInternshipFields && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="BIN"
              value={form.BIN || ""}
              onChange={handleChange}
              placeholder="БИН"
              className="w-full p-3 bg-red-900/20 focus:outline-red-400 rounded-lg text-xs sm:text-sm"
            />
            <input
              name="BIK"
              value={form.BIK || ""}
              onChange={handleChange}
              placeholder="БИК"
              className="w-full p-3 bg-red-900/20 focus:outline-red-400 rounded-lg text-xs sm:text-sm"
            />
            <input
              name="KBE"
              value={form.KBE || ""}
              onChange={handleChange}
              placeholder="КБЕ"
              className="w-full p-3 bg-red-900/20 focus:outline-red-400 rounded-lg text-xs sm:text-sm"
            />
            <input
              name="BANK"
              value={form.BANK || ""}
              onChange={handleChange}
              placeholder="Банк"
              className="w-full p-3 bg-red-900/20 focus:outline-red-400 rounded-lg text-xs sm:text-sm"
            />
            <input
              name="representedBy"
              value={form.representedBy || ""}
              onChange={handleChange}
              placeholder="Представляется кем"
              className="w-full p-3 bg-red-900/20 focus:outline-red-400 rounded-lg text-xs sm:text-sm"
            />
            <input
              name="basis"
              value={form.basis || ""}
              onChange={handleChange}
              placeholder="На основании чего"
              className="w-full p-3 bg-red-900/20 focus:outline-red-400 rounded-lg text-xs sm:text-sm"
            />
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold p-3 rounded-lg hover:bg-blue-600 transition text-sm sm:text-base"
        >
          Сохранить
        </button>
      </form>
    </div>
  );
};

export default CompanyProfileFormPage;
