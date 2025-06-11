import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useAIChat } from "../hooks/ai/useAIChat";
import { sampleQuestions } from "../constants/sampleQuestions";
import { IoMdChatbubbles, IoMdClose } from "react-icons/io";
import MarkdownMessage from "./MarkdownMessage";
import { useAuth } from "../contexts/AuthContext";

const ChatWidget: React.FC = () => {
  const location = useLocation();
  const { role } = useAuth();

  // Отображаем виджет только для студентов
  if (role !== "student") return null;

  // Если текущий путь "/" или "/login", не отображаем виджет
  if (location.pathname === "/" || location.pathname === "/login") {
    return null;
  }

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const { messages, sendMessage, loading } = useAIChat();

  const handleSend = async (): Promise<void> => {
    if (!input.trim()) return;
    await sendMessage(input);
    setInput("");
  };

  const handleSampleClick = async (text: string): Promise<void> => {
    await sendMessage(text);
    setIsOpen(true);
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-red-700 text-white p-3 sm:p-4 rounded-full shadow-lg hover:bg-red-800 transition z-50"
        >
          <IoMdChatbubbles size={20} className="sm:hidden" />
          <IoMdChatbubbles size={24} className="hidden sm:block" />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-80 sm:w-96 max-h-[85vh] bg-white/70 text-black backdrop-blur-sm shadow-2xl rounded-2xl flex flex-col overflow-hidden z-50 border border-white/20">
          {/* Заголовок */}
          <div className="p-3 sm:p-4 flex justify-between items-center border-b border-white/20 bg-white/90">
            <span className="text-sm sm:text-lg font-semibold">Карьерный AI-чат</span>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:text-red-300 transition"
            >
              <IoMdClose size={18} className="sm:hidden" />
              <IoMdClose size={20} className="hidden sm:block" />
            </button>
          </div>

          {/* Сообщения */}
          <div className="flex-1 px-3 py-3 sm:px-4 sm:py-3 overflow-y-auto text-xs sm:text-sm space-y-2">
            {messages.length === 0 ? (
              <div className="space-y-1">
                <p className="text-red-950 text-xs sm:text-sm">
                  Попробуйте один из вопросов:
                </p>
                {sampleQuestions.map((q: string) => (
                  <button
                    key={q}
                    onClick={() => handleSampleClick(q)}
                    className="block w-full text-left bg-red-800/20 hover:bg-red-900/10 rounded px-2 py-1 transition text-xs sm:text-sm"
                  >
                    {q}
                  </button>
                ))}
              </div>
            ) : (
              messages.map((msg, i) => (
                <div
                  key={i}
                  className={`p-1 sm:p-2 rounded text-xs sm:text-sm ${
                    msg.role === "user"
                      ? "max-w-fit bg-red-900/80 text-right self-end ml-auto text-white"
                      : "max-w-[85%] bg-white/80 self-start mr-auto"
                  }`}
                >
                  {msg.role === "user" ? msg.text : <MarkdownMessage content={msg.text} />}
                </div>
              ))
            )}

            {loading && (
              <div className="text-red-950 italic text-xs sm:text-sm">
                AI печатает...
              </div>
            )}
          </div>

          {/* Поле ввода */}
          <div className="p-2 sm:p-3 border-t border-white/20 flex gap-2 bg-white/90">
            <input
              type="text"
              placeholder="Введите сообщение..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 bg-red-900/10 text-black border border-red-900/70 rounded px-2 py-1 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-white placeholder:text-red-950"
              disabled={loading}
            />
            <button
              onClick={handleSend}
              className="px-3 py-1 bg-red-800 hover:bg-red-900 text-white text-xs sm:text-sm rounded transition disabled:opacity-50"
              disabled={loading}
            >
              Отправить
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
