import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { Notification } from "../types/notification";
import { Vacancy } from "../types/vacancy";
import { ResumeWithUser } from "../types/resume";
import { useAuth } from "../contexts/AuthContext";

interface MainDashboardProps {
  notifications: Notification[];
  vacancies: Vacancy[];
  resumes: ResumeWithUser[];
}

export default function MainDashboard({ notifications, vacancies, resumes }: MainDashboardProps) {
  const { role } = useAuth(); 

  return (
    <div className="p-4 sm:p-6 space-y-8 max-w-7xl mx-auto">
      {(["student", "career_center"]).includes(role || "") && (
        <Section title="Последние оповещения" link="/notifications">
          <HorizontalScroll>
            {notifications.map((n) => (
              <NotificationCard key={n.id} data={n} />
            ))}
          </HorizontalScroll>
        </Section>
      )}

      <Section title="Свежие вакансии" link="/vacancies">
        <HorizontalScroll>
          {vacancies.map((v) => (
            <VacancyCard key={v.id} data={v} />
          ))}
        </HorizontalScroll>
      </Section>
      
      {(["company", "career_center"]).includes(role || "") && (
        <Section title="Резюме" link="/resumes">
          <HorizontalScroll>
            {resumes.map((r) => (
              <ResumeCard key={r.id} data={r} />
            ))}
          </HorizontalScroll>
        </Section>
      )}
    </div>
  );
}

import React from "react";

interface SectionProps {
  title: string;
  link: string;
  children: React.ReactNode;
}

function Section({ title, link, children }: SectionProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center mb-2">
        <h2 className="text-xl sm:text-2xl font-bold text-black">{title}</h2>
      </div>
      {children}
      <Link
        to={link}
        className="flex items-center justify-end mt-2 gap-1 text-sm sm:text-base text-black underline hover:text-black/70 transition"
      >
        Подробнее <FiArrowRight />
      </Link>
    </div>
  );
}

function HorizontalScroll({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex space-x-4 sm:space-x-6 overflow-x-auto p-2 sm:p-3 snap-x snap-mandatory scrollbar-hide">
      {children}
    </div>
  );
}

function NotificationCard({ data }: { data: Notification }) {
  return (
    <Link to={`/notifications/${data.id}`} 
      className="snap-center snap-always w-11/12 sm:w-[300px] rounded-xl bg-red-900/80 text-white shadow-lg overflow-hidden hover:scale-105 transition duration-300 ease-in-out">
      {data.imageUrl && (
        <img
          src={`http://localhost:3000${data.imageUrl}`}
          alt={data.title}
          className="w-full h-32 sm:h-40 object-cover"
        />
      )}
      <div className="p-3 sm:p-4">
        <h3 className="text-base sm:text-lg font-bold">{data.title}</h3>
        <p className="text-xs sm:text-sm mb-1 text-gray-300">{new Date(data.createdAt!).toLocaleString()}</p>
        <p className="line-clamp-3 text-xs sm:text-sm">{data.content}</p>
      </div>
    </Link>
  );
}

function VacancyCard({ data }: { data: Vacancy }) {
  return (
    <Link to={`/vacancies/${data.id}`} 
      className="w-11/12 sm:w-[300px] rounded-xl bg-red-950/80 text-white shadow-lg p-3 sm:p-4 hover:scale-105 transition duration-300 ease-in-out">
      <h3 className="text-base sm:text-lg font-bold mb-1">{data.title}</h3>
      <p className="text-xs sm:text-sm mb-1 text-gray-300">{data.location} • {data.salary}</p>
      <p className="line-clamp-3 text-xs sm:text-sm">{data.description}</p>
    </Link>
  );
}

function ResumeCard({ data }: { data: ResumeWithUser }) {
  return (
    <Link to={`/resumes/${data.id}`} 
      className="w-11/12 sm:w-[300px] rounded-xl bg-red-950/70 text-white shadow-lg p-3 sm:p-4 hover:scale-105 transition duration-300 ease-in-out">
      <h3 className="text-base sm:text-lg font-bold flex items-center gap-2">
        👤 {data.User?.name ?? "Без имени"}
      </h3>
      <p className="text-xs sm:text-sm mb-1 text-gray-300">{data.User?.email ?? "Без email"}</p>
      {data.skills?.length > 0 && (
        <div className="mb-1">
          <p className="text-xs sm:text-sm font-semibold">Навыки:</p>
          <div className="flex flex-wrap gap-1 mt-1">
            {data.skills.slice(0, 3).map((s, idx) => (
              <span key={idx} className="px-2 py-1 text-xs sm:text-[0.8rem] bg-red-300/20 rounded-full border border-white/10">
                {s.name}
              </span>
            ))}
          </div>
        </div>
      )}
      {data.experience?.length > 0 && (
        <p className="text-[0.65rem] sm:text-xs text-gray-400 mt-1">
          Опыт: {data.experience[0].position} в {data.experience[0].company}
        </p>
      )}
    </Link>
  );
}

export { Section, HorizontalScroll, NotificationCard, VacancyCard, ResumeCard };
