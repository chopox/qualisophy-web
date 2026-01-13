import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
  sender: "user" | "bot";
  text: string;
};

export const ChatBox = () => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [bottomOffset, setBottomOffset] = useState<number>(40); // ← dinámico

  // Initialize from sessionStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedOpen = sessionStorage.getItem("qualisophy_chat_open");
    const storedMessages = sessionStorage.getItem("qualisophy_chat_messages");
    if (storedOpen) setIsOpen(storedOpen === "true");
    if (storedMessages) setMessages(JSON.parse(storedMessages));
  }, []);

  // Clear on reload
  useEffect(() => {
    if (typeof window === "undefined") return;
    const navEntries = performance.getEntriesByType("navigation") as any[];
    if (navEntries?.[0]?.type === "reload") {
      sessionStorage.removeItem("qualisophy_chat_messages");
      sessionStorage.removeItem("qualisophy_chat_open");
      setMessages([]);
      setIsOpen(false);
    }
  }, []);

  // Save status
  useEffect(() => {
    if (typeof window === "undefined") return;
    sessionStorage.setItem("qualisophy_chat_open", isOpen.toString());
  }, [isOpen]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    sessionStorage.setItem(
      "qualisophy_chat_messages",
      JSON.stringify(messages)
    );
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Initial message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          sender: "bot",
          text: "¡Hola! Soy el asistente virtual de Qualisophy. ¿Sobre qué te gustaría saber más?",
        },
      ]);
    }
  }, [isOpen, messages.length]);

  // Detect footer position and adjust bottom
  useEffect(() => {
    const handleScroll = () => {
      const footer =
        document.querySelector("footer") || document.querySelector(".footer");
      if (!footer) return;

      const footerRect = footer.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const overlap = windowHeight - footerRect.top;
      const safeBottom = overlap > 0 ? overlap + 40 : 40;

      setBottomOffset(safeBottom);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const cleanReply = (text: string | undefined) => {
    if (!text || text.trim().length < 5) {
      return "Lo siento, no tengo información precisa sobre eso.";
    }
    return text.trim();
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg: Message = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg.text }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: cleanReply(data.reply) },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Error al conectar con el asistente." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* 💬 Float Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        animate={{ bottom: bottomOffset }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="fixed right-6 sm:right-8 bg-[#16223f] hover:bg-primary text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-2xl z-50"
      >
        💬
      </motion.button>

      {/* 💬 Animated chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: 1,
              y: 0,
              bottom: bottomOffset + 60,
            }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.25 }}
            className="fixed right-4 sm:right-8 w-[90%] sm:w-80 bg-white border border-gray-200 rounded-2xl shadow-xl flex flex-col overflow-hidden z-50"
          >
            <div className="bg-[#1B2341] text-white px-4 py-3 flex justify-between items-center">
              <span>Asistente</span>
              <button onClick={() => setIsOpen(false)} className="text-lg">
                ✖
              </button>
            </div>

            <div className="flex-1 p-3 space-y-2 overflow-y-auto max-h-96">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`p-2 rounded-xl text-sm max-w-[80%] ${
                    msg.sender === "user"
                      ? "ml-auto bg-[#79B9FC] text-white"
                      : "mr-auto bg-gray-100 text-gray-800"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              {loading && (
                <p className="text-gray-500 text-sm">Escribiendo...</p>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-3 flex gap-2 border-t">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Escribe un mensaje..."
                className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#79B9FC]/50"
              />
              <button
                onClick={sendMessage}
                className="bg-[#2575fc] hover:bg-[#79B9FC] text-white rounded-lg px-4 py-2 text-sm transition-colors"
              >
                ➤
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
