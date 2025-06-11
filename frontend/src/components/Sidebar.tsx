import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

import { AiOutlineHome, AiOutlineUser, AiOutlineSetting, AiOutlineIdcard } from "react-icons/ai";
import { FaUsersCog, FaRegHandshake } from "react-icons/fa";
import { FiMenu, FiLogOut } from "react-icons/fi";
import { MdOutlineWorkOutline, MdOutlineNewspaper } from "react-icons/md";
import { BsFilePost } from "react-icons/bs";
import { TbMessageSearch } from "react-icons/tb";
import { ImStatsBars } from "react-icons/im";
import { IoDocumentTextOutline } from "react-icons/io5";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, role, logout } = useAuth();
  const BASE_URL = "http://localhost:3000";

  return (
    <>
      {/* Кнопка открытия только на мобильных */}
      <button 
        type="button"
        className="md:hidden fixed top-4 left-4 z-50 text-3xl text-white bg-red-700 p-2 rounded-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FiMenu size={20}/>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`shadow-2xl fixed top-0 left-0 w-80 bg-red-900/60 rounded-r-3xl backdrop-blur-xs text-white z-40 transform transition-transform duration-300 ease-in-out 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:block`}>
        <div className="h-full flex flex-col overflow-y-auto">
          
          {/* Логотип – добавлен отступ слева на мобильных, чтобы не перекрывался бургером */}
          <div className="p-5 pl-20 md:pl-5 text-2xl font-bold border-b border-red-300 shrink-0">
            <Link to="/" className="flex flex-row items-center">
              <svg width="40px" height="40px" viewBox="-12 -15 24 30">
                <path d="M 6 -15 Q -1 -5 -12 1 Q -11 2 -12 3 Q -2 1 2 2 Q 2 1 5 1 Q -4 -1 -9 1 Q 1 -4 6 -12 Q 5 -13 6 -15 M -4 -1 Q 2 -3 9 -1 Q 1 4 -6 12 Q -6 13.5 -6 15 Q 1 6 12 -1 Q 11 -2 12 -3 Q 5 -4 -1 -3 Q -1 -2 -4 -1" fill="#fff"></path>
              </svg>
              <svg width="150px" height="60px" viewBox="0 0 47 19">
                <path d="M 5 5 L 5 15 L 28 15 L 27 14 L 6 14 L 6 6 L 5 5 M 7 8 L 7 13 L 11 13 L 10 12 L 8 12 L 8 11 L 10 11 L 10 10 L 8 10 L 8 9 L 10 9 L 11 8 L 7 8 M 12 8 L 15 8 L 15 13 L 12 13 L 13 12 L 13 12 L 14 12 L 14 11 L 12 11 L 12 8 M 14 9 L 13 9 L 13 10 L 13 10 L 14 10 Z M 16 8 L 16 13 L 17 13 L 17 11 L 18 11 L 18 13 L 19 13 L 19 8 L 16 8 M 17 9 L 18 9 L 18 10 L 17 10 L 17 9 M 20 8 L 20 13 L 23 13 L 22 12 L 21 12 L 21 9 L 22 9 L 23 8 L 20 8 M 25 10 L 24 9 L 25 8 L 26 10 L 27 8 L 28 8 L 27 11 L 26 13 L 24 13 L 24 11.5 L 25 12 L 26 11 Z M 30 5 L 30 15 L 43 15 L 42 14 L 31 14 L 31 6 L 30 5 M 32 8 L 32 9 L 33 9 L 33 8 L 32 8 M 32 10 L 33 10 L 33 13 L 32 13 L 32 10 M 34 8 L 35 8 L 36 11 L 36 8 L 37 8 L 37 13 L 36 13 L 35 10 L 35 13 L 34 13 L 34 8 M 38 8 L 39 8 L 39 10 L 40 8 L 41 9 L 39 11 L 42 13 L 40 13 L 39 12 L 39 13 L 38 13 L 38 8" fill="#fff"></path>
              </svg>
            </Link>
          </div>
          
          <ul className="mt-8 space-y-8 px-8 grow text-lg">
            {/* Home */}
            <li className="flex items-center gap-3 hover:text-red-300 transition-colors">
              <AiOutlineHome size={20}/>
              <Link to="/news">Главная</Link>
            </li>
            {/* Profile */}
            {role === "company" && (
              <li className="flex items-center gap-3 hover:text-red-300 transition-colors">
                <AiOutlineUser size={20}/>
                <Link to={`/company/`}>Профиль</Link>
              </li>
            )}
            {/* Vacancies */}
            <li className="flex items-center gap-3 hover:text-red-300 transition-colors">
              <MdOutlineWorkOutline size={20}/>
              <Link to="/vacancies">Вакансии</Link>
            </li>
            {/* Статистика */}
            {(["admin", "career_center"]).includes(role || "") && (
              <li className="flex items-center gap-3 hover:text-red-300 transition-colors">
                <ImStatsBars size={20}/>
                <Link to="/stats">Статистика</Link>
              </li>
            )}
            {/* Оповещении */}
            {(["student", "career_center"]).includes(role || "") && (
              <li className="flex items-center gap-3 hover:text-red-300 transition-colors">
                <MdOutlineNewspaper size={20}/>
                <Link to="/notifications">Оповещении</Link>
              </li>
            )}
            {/* Резюме отклики – для студента */}
            {role === "student" && (
              <>
                <li className="flex items-center gap-3 hover:text-red-300 transition-colors">
                  <BsFilePost size={20}/>
                  <Link to="/myResume">Мое резюме</Link>
                </li>
                <li className="flex items-center gap-3 hover:text-red-300 transition-colors">
                  <TbMessageSearch size={20}/>
                  <Link to="/myResponses">Мои отклики</Link>
                </li>
              </>
            )}
            {/* Пользователи – для администратора */}
            {role === "admin" && (
              <li className="flex items-center gap-3 hover:text-red-300 transition-colors">
                <FaUsersCog size={20}/>
                <Link to="/users">Пользователи</Link>
              </li>
            )}
            {/* База партнеров – для карьерного центра */}
            {role === "career_center" && (
              <li className="flex items-center gap-3 hover:text-red-300 transition-colors">
                <FaRegHandshake size={20}/>
                <Link to="/companies">База партнеров</Link>
              </li>
            )}
            {/* Договоры */}
            <li className="flex items-center gap-3 hover:text-red-300 transition-colors">
              <IoDocumentTextOutline size={20}/>
              <Link to="/contracts">Договоры</Link>
            </li>
            {/* Резюме студентов */}
            {(["career_center", "company"]).includes(role || "") && (
              <li className="flex items-center gap-3 hover:text-red-300 transition-colors">
                <AiOutlineIdcard size={20}/>
                <Link to="/resumes">Резюме студентов</Link>
              </li>
            )}
            {/* Настройки */}
            <li className="flex items-center gap-3 hover:text-red-300 transition-colors">
              <AiOutlineSetting size={20}/>
              <Link to="/personal">Настройки</Link>
            </li>
          </ul>

          <div className="mt-auto px-4 py-6 border-t border-red-300 text-lg flex items-center justify-between gap-3">
            <img
              src={`${BASE_URL}${user?.photo}`}
              alt=""
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <div className="font-semibold">{user?.name}</div>
              <div className="text-base text-red-200">{user?.email}</div>
            </div>
            <button
              onClick={logout}
              className="text-white hover:text-red-200 transition-colors"
              title="Выйти"
            >
              <FiLogOut size={30} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
