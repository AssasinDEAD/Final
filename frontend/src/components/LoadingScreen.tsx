const LoadingScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center h-1/2 backdrop-blur-sm bg-red-900/20 rounded-3xl">
      <div className="animate-spin text-white" >
        <img src="/images/ll.svg" alt="ll" className="h-10" />
      </div>

      <p className="mt-4 text-2xl font-semibold text-white animate-pulse">Загрузка...</p>
    </div>
  );
};

export default LoadingScreen;