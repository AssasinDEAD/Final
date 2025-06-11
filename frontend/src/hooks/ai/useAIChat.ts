import { useState } from "react";
import { sendMessageToAI } from "../../services/aiChatService";

export const useAIChat = () => {
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (text: string) => {
    setMessages((prev) => [...prev, { role: "user", text }]);
    setLoading(true);
    try {
      const response = await sendMessageToAI(text);
      setMessages((prev) => [...prev, { role: "assistant", text: response.text }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", text: "Произошла ошибка, попробуйте позже." }]);
    } finally {
      setLoading(false);
    }
  };

  return { messages, sendMessage, loading };
};
