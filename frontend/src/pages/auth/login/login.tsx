import { useLoginForm } from "../../../hooks/auth/useLoginForm";

const Login = () => {
  const { email, password, setEmail, setPassword, handleLogin } = useLoginForm();

  return (
    <>
      {/* MOBILE VERSION: видна по умолчанию, скрыта на md и выше */}
      <div
        className="block md:hidden min-h-screen relative flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/images/signin.png')" }}
      >
        {/* Затемнённый оверлей */}
        <div className="absolute inset-0 bg-black opacity-60"></div>

        {/* Централизованный контейнер для формы */}
        <div className="relative z-10 w-full mx-4 max-w-md p-6 bg-white bg-opacity-95 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-red-700 mb-6 text-center">
            Sign in
          </h2>
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div className="relative">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email"
                className="peer block w-full px-4 py-3 border-b-2 border-gray-300 focus:outline-none bg-transparent focus:border-red-600 transition-colors duration-300"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
                className="peer block w-full px-4 py-3 border-b-2 border-gray-300 focus:outline-none bg-transparent focus:border-red-600 transition-colors duration-300"
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-red-700 text-white px-6 py-2 rounded-sm shadow-md hover:bg-red-800 transition duration-300"
              >
                Sign in
              </button>
            </div>
            <div className="text-center text-gray-600">
              Если вы забыли пароль, обратитесь к администратору{" "}
              <a
                href="mailto:leg4cy1nk@gmail.com"
                className="text-red-700 underline hover:text-red-900"
              >
                leg4cy1nk
              </a>
            </div>
          </form>
        </div>
      </div>

      {/* DESKTOP VERSION: скрыта на мобильных, видна на md и выше */}
      <div className="hidden md:flex min-h-screen relative overflow-hidden">
        {/* Центрированный вертикальный текст */}
        <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 z-10 pointer-events-none">
          <span className="text-[140px] font-bold font-bubble uppercase text-transparent bg-clip-text bg-linear-to-b from-white from-50% to-red-800 to-50% drop-shadow-lg/50 leading-none">
            SIGN IN
          </span>
        </h1>
        {/* Левая колонка – изображение */}
        <div className="w-1/2 relative z-0">
          <img
            src="/images/signin.png"
            alt="students"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Правая колонка – форма входа */}
        <div className="w-1/2 bg-gray-300 flex flex-col items-center justify-center p-12 z-0">
          <h2 className="text-7xl font-bold text-red-700 mb-12 drop-shadow-sm/50">
            Sign in
          </h2>
          <form onSubmit={handleLogin} className="w-full max-w-sm space-y-6">
            {/* Email */}
            <div className="relative w-full">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder=" "
                className="peer w-full px-4 pt-6 pb-2 border-b-2 border-gray-300 focus:outline-none bg-white/30 focus:border-red-600 transition-colors duration-300"
              />
              <label
                htmlFor="email"
                className="absolute left-4 top-1 px-1 text-gray-500 text-sm transition-all duration-200
                          peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                          peer-focus:top-1 peer-focus:text-sm peer-focus:text-red-600"
              >
                Email
              </label>
            </div>
            {/* Password */}
            <div className="relative w-full">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder=" "
                className="peer w-full px-4 pt-6 pb-2 border-b-2 border-gray-300 focus:outline-none bg-white/30 focus:border-red-600 transition-colors duration-300"
              />
              <label
                htmlFor="password"
                className="absolute left-4 top-1 px-1 text-gray-500 text-sm transition-all duration-200
                          peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                          peer-focus:top-1 peer-focus:text-sm peer-focus:text-red-600"
              >
                Password
              </label>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-red-700 text-white px-6 py-2 rounded-sm shadow-md hover:bg-red-800 transition-all"
              >
                Sign in
              </button>
            </div>
            <div className="text-center text-gray-600 px-6 py-2">
              Если вы забыли пароль, обратитесь к администратору{" "}
              <a
                href="mailto:leg4cy1nk@gmail.com"
                className="text-red-700 underline hover:text-red-900"
              >
                leg4cy1nk
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
