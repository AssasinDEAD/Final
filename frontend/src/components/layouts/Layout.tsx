import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";

const Layout = () => {
  return (
    <div className="relative flex h-screen overflow-hidden bg-gray-100">
      {/* Верхнее изображение - на маленьких экранах уменьшаем высоту, на sm и выше – 50% */}
      <div className="absolute top-0 left-0 w-full h-1/3 sm:h-1/2 z-0">
        <img
          src="/images/image-bg.png"
          alt="top decoration"
          className="w-full h-full object-cover object-bottom"
        />
      </div>

      {/* Нижняя волна - аналогично, меняем высоту для мобильных */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden z-0 h-1/3 sm:h-1/2 pointer-events-none">
        <div className="flex animate-wave w-[300%]">
          <img
            src="/images/wave.png"
            alt="wave"
            className="h-full w-full"
          />
          <img
            src="/images/wave.png"
            alt="wave"
            className="h-full w-full"
          />
          <img
            src="/images/wave.png"
            alt="wave"
            className="h-full w-full"
          />
          <img
            src="/images/wave.png"
            alt="wave"
            className="h-full w-full"
          />
        </div>
      </div>

      {/* Сайдбар - в компоненте Sidebar уже реализована логика бургер-меню для мобильных */}
      <Sidebar />

      {/* Основной контент с адаптивными отступами */}
      <main className="flex-1 overflow-y-auto relative z-10 p-4 sm:p-6 lg:p-10">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
