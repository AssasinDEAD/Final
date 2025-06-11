import { useState } from "react";
import { alumniData } from "../types/alumniData";

export default function AlumniSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="mt-8 px-4 py-4 sm:mt-10 sm:px-6 sm:py-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 text-center mb-4">
        Наши Выпускники
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
        {alumniData.map((alumnus, index) => (
          <div
            key={index}
            onClick={() => toggleExpand(index)}
            className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 cursor-pointer border border-gray-200 hover:shadow-xl"
          >
            <img
              src={alumnus.imgURL}
              alt={alumnus.name}
              className="w-full h-48 sm:h-56 object-cover"
            />
            <div className="p-3 sm:p-4">
              <h3 className="text-base sm:text-lg font-semibold text-blue-600">
                {alumnus.name}
              </h3>
              <p className="text-xs sm:text-sm text-gray-700">{alumnus.title}</p>
              <div
                className={`transition-all duration-300 mt-2 overflow-hidden text-gray-600 text-xs sm:text-sm ${
                  expandedIndex === index ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="mt-2 whitespace-pre-line">{alumnus.desc}</p>
              </div>
              <p className="text-xs sm:text-sm text-blue-500 mt-2">
                {expandedIndex === index ? "Скрыть" : "Подробнее..."}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
   