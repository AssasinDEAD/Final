import { useEffect, useMemo, useState } from "react";
import { createContract, getAvailableCompanies } from "../../services/contractService";
import { toast } from "react-toastify";
import { CompanyProfile } from "../../types/companyProfile";

export const useContractForm = () => {
  const [form, setForm] = useState<any>({
    date: "",

    student_fullname: "",
    enrolled_year: "",
    education_degree: "",
    edu_program: "",
    edu_form: "",
    practice_period: "",
    birthday: "",
    iin: "",
    id_number: "",
    issued_by_whom_and_when: "",
    st_address: "",
    st_phone_number: "",

    company_name: "",
    representedBy: "",
    basis: "",
    company_address: "",
    BIN_BIK_KBE_BANK: "",
    com_phone_number: "",
    Com_director_fullname: "",
  });

  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState<CompanyProfile[]>([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>("");

  const selectedCompany = useMemo(
    () => companies.find((c) => c.id === selectedCompanyId) || null,
    [selectedCompanyId, companies]
  );

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data = await getAvailableCompanies();
        setCompanies(data);
      } catch (error) {
        toast.error("Ошибка при загрузке компаний");
      }
    };

    fetchCompanies();
  }, []);

  useEffect(() => {
    if (!selectedCompanyId || !selectedCompany) return;

    setForm((prev: any) => ({
      ...prev,
      company_name: selectedCompany.companyName || "",
      Com_director_fullname: selectedCompany.directorFullName || "",
      representedBy: selectedCompany.representedBy || "",
      basis: selectedCompany.basis || "",
      company_address: selectedCompany.address || "",
      BIN_BIK_KBE_BANK: `БИН: ${selectedCompany.BIN || ""} \n БИК: ${selectedCompany.BIK || ""} \n КБЕ: ${selectedCompany.KBE || ""} \n БАНК: ${selectedCompany.BANK || ""}`,
      com_phone_number: selectedCompany.phone || "",
    }));
  }, [selectedCompanyId, selectedCompany]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!selectedCompanyId) {
      toast.error("Выберите компанию");
      return;
    }

    if (!selectedCompany) {
      toast.error("Компания не найдена");
      return;
    }

    try {
      setLoading(true);
      await createContract(form, selectedCompany.userId);
      toast.success("Договор создан");

      setForm((prev: any) => ({
        ...prev,
        company_name: "",
        company_address: "",
        BIN_BIK_KBE_BANK: "",
        com_phone_number: "",
        Com_director_fullname: "",
      }));
    } catch (error) {
      toast.error(
        (error as any)?.response?.data?.error ||
        "Ошибка при создании договора"
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    companies,
    loading,
    handleChange,
    handleSubmit,
    selectedCompanyId,
    setSelectedCompanyId,
  };
};
