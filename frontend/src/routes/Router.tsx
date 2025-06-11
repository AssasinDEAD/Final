import { Routes, Route, Navigate } from "react-router-dom";
import AccessGuard from "./AccessGuard";

import Home from "../pages/home/home";
import Login from "../pages/auth/login/login";
import Personal from "../pages/home/personal";
import NewsPage from "../pages/home/newsPage";

import UserTablePage from "../pages/admin/userTable/UserTablePage";
import StatsPage from "../pages/stats/StatsPage";

import ResumePage from "../pages/resume/view-form/resumePage";               
import ResumeListPage from "../pages/resume/list/ResumeListPage";       
import ResumeDetailsPage from "../pages/resume/details/ResumeDetailsPage"; 

import VacancyFormPage from "../pages/vacancy/form/VacancyFormPage"; 
import VacancyDetailsPage from "../pages/vacancy/details/VacancyDetailsPage"; 
import VacancyListPage from "../pages/vacancy/list/VacancyListPage"; 

import NotificationListPage from "../pages/notification/list/NotificationListPage";
import NotificationFormPage from "../pages/notification/form/NotificationFormPage";
import NotificationDetailsPage from "../pages/notification/details/NotificationDetailsPage";

import MyResponsesPage from "../pages/response/MyResponsesPage";
import VacancyResponsesPage from "../pages/response/VacancyResponsesPage";

import ContractsPage from "../pages/contract/ContractsPage";
import ContractCreatePage from "../pages/contract/ContractCreatePage";

import CompanyProfileDetailPage from "../pages/com-profile/details/CompanyProfileDetailPage";
import CompanyProfileFormPage from "../pages/com-profile/form/CompanyProfileFormPage";
import CompanyProfilesListPage from "../pages/com-profile/list/CompanyProfilesListPage";

import Layout from "../components/layouts/Layout";

const AccessAll = <AccessGuard />;
const AccessStudent = <AccessGuard roles={["student"]} />;
const AccessAdmin = <AccessGuard roles={["admin"]} />;
const AccessAdminOrCenter = <AccessGuard roles={["admin", "career_center"]} />;
const AccessCareerCenter = <AccessGuard roles={["career_center"]} />;
const AccessStudentOrCenter = <AccessGuard roles={["student", "career_center"]} />;
const AccessCompanyOrCenter = <AccessGuard roles={["company", "career_center"]} />;
const AccessCompany = <AccessGuard roles={["company"]} />;

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />

    <Route element={<Layout />}>

        <Route element={AccessAll}>
            <Route path="/news" element={<NewsPage />} />
            <Route path="/personal" element={<Personal />} />
            <Route path="/vacancies" element={<VacancyListPage />} />
            <Route path="/vacancies/:id" element={<VacancyDetailsPage />} />
            <Route path="/contracts" element={<ContractsPage />} />
            <Route path="/company/:id?" element={<CompanyProfileDetailPage />} />
        </Route>

        <Route element={AccessStudentOrCenter}>
            <Route path="/notifications" element={<NotificationListPage />} />
            <Route path="/notifications/:id" element={<NotificationDetailsPage />} />
        </Route>

        <Route element={AccessAdmin}>
            <Route path="/users" element={<UserTablePage />} />
        </Route>

        <Route element={AccessAdminOrCenter}>
            <Route path="/stats" element={<StatsPage />} />
        </Route>

        <Route element={AccessStudent}>
            <Route path="/myResume" element={<ResumePage />} />
            <Route path="/myResponses" element={<MyResponsesPage />} />
            
            <Route path="/contracts/create" element={<ContractCreatePage />} />
        </Route>

        <Route element={AccessCompanyOrCenter}>
        <Route path="/resumes" element={<ResumeListPage />} />
        <Route path="/resumes/:id" element={<ResumeDetailsPage />} />
        </Route>
        <Route element={AccessCompany}>
            <Route path="/vacancies/new" element={<VacancyFormPage />} />
            <Route path="/vacancies/:id/edit" element={<VacancyFormPage />} />
            <Route path="/vacancies/:vacancyId/responses" element={<VacancyResponsesPage />} />

            <Route path="/company-profile/edit" element={<CompanyProfileFormPage />} />
        </Route>

        <Route element={AccessCareerCenter}>
            <Route path="/notifications/new" element={<NotificationFormPage />} />
            <Route path="/notifications/:id/edit" element={<NotificationFormPage />} />
            <Route path="/companies" element={<CompanyProfilesListPage />} />

        </Route>

    </Route>

    <Route path="*" element={<Navigate to="/" />} />
  </Routes>

);

export default AppRouter;