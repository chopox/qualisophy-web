// src/components/react/shared/ChatBox.tsx

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
  sender: "user" | "bot";
  text: string;
};

export const ChatBox = () => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Estados
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showRobot, setShowRobot] = useState(false);

  // Estado para controlar montaje y evitar Hydration Mismatch
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // --- ESTADOS DE POSICIÓN Y TAMAÑO ---
  const [bottomOffset, setBottomOffset] = useState(32); // Distancia desde abajo alineada con EnrollButton
  const [chatMaxHeight, setChatMaxHeight] = useState(600); // Altura máxima dinámica
  const [isHidden, setIsHidden] = useState(false);

  // 1. Detección de Cliente y Móvil
  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // 2. CÁLCULO DE FÍSICA (Colisión Footer + Redimensionado Header)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleLayoutCalculations = () => {
      // Usamos querySelector para mayor fiabilidad, igual que en EnrollButton
      const footer =
        document.querySelector("footer") || document.querySelector(".footer");
      const header = document.getElementById("site-header");
      const windowHeight = window.innerHeight;

      // --- A. Lógica de Footer (Rebote) ---
      let newBottom = 32;

      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        const overlap = windowHeight - footerRect.top;
        if (overlap > 0) {
          // Empujamos el botón hacia arriba con el mismo margen
          newBottom = overlap + 32;
        }
      }
      setBottomOffset(newBottom);

      // --- B. Lógica de Header (Redimensionado y Ocultación) ---
      if (header) {
        const headerRect = header.getBoundingClientRect();
        const headerBottom = headerRect.bottom;

        // 1. Ocultar botón si choca
        const buttonTopPosition = windowHeight - newBottom - 60;
        if (buttonTopPosition < headerBottom) {
          setIsHidden(true);
        } else {
          setIsHidden(false);
        }

        // 2. REDIMENSIONAR CHATBOX (Escritorio)
        const spaceFromBottom = newBottom + 80;
        const availableHeight = windowHeight - headerBottom - spaceFromBottom;
        const finalHeight = Math.min(Math.max(availableHeight, 200), 600);

        setChatMaxHeight(finalHeight);
      }
    };

    window.addEventListener("scroll", handleLayoutCalculations, {
      passive: true,
    });
    window.addEventListener("resize", handleLayoutCalculations);

    handleLayoutCalculations();
    setTimeout(handleLayoutCalculations, 500);

    return () => {
      window.removeEventListener("scroll", handleLayoutCalculations);
      window.removeEventListener("resize", handleLayoutCalculations);
    };
  }, [isMobile]);

  // 3. Persistencia
  useEffect(() => {
    if (!isMounted) return;
    const storedOpen = sessionStorage.getItem("qualisophy_chat_open");
    const storedMessages = sessionStorage.getItem("qualisophy_chat_messages");
    if (!isMobile && storedOpen) setIsOpen(storedOpen === "true");
    if (storedMessages) setMessages(JSON.parse(storedMessages));
  }, [isMounted, isMobile]);

  useEffect(() => {
    if (!isMounted) return;
    if (!isMobile)
      sessionStorage.setItem("qualisophy_chat_open", isOpen.toString());
  }, [isOpen, isMobile, isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    sessionStorage.setItem(
      "qualisophy_chat_messages",
      JSON.stringify(messages),
    );
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isMounted]);

  // 4. Robot Animado
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isOpen) {
        setShowRobot(true);
        setTimeout(() => setShowRobot(false), 4000);
      }
    }, 15000);
    const initialTimeout = setTimeout(() => {
      if (!isOpen) setShowRobot(true);
      setTimeout(() => setShowRobot(false), 4000);
    }, 3000);
    return () => {
      clearInterval(interval);
      clearTimeout(initialTimeout);
    };
  }, [isOpen]);

  // 5. Mensaje Inicial
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

  // 6. Bloqueo Scroll (Móvil)
  useEffect(() => {
    if (isMobile && isOpen) {
      document.body.classList.add("chat-open");
    } else {
      document.body.classList.remove("chat-open");
    }
  }, [isOpen, isMobile]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg: Message = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg.text }),
      });
      const data = await response.json();
      const cleanReply = (text: string) =>
        !text || text.trim().length < 5
          ? "Lo siento, no tengo información precisa sobre eso."
          : text.trim();
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

  if (!isMounted) return null;

  return (
    <>
      {/* --- CONTENEDOR DISPARADOR (Trigger) --- */}
      <motion.div
        animate={{
          bottom: bottomOffset,
          opacity: isHidden ? 0 : 1,
          pointerEvents: isHidden ? "none" : "auto",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed z-50 right-0 lg:right-4 flex items-center justify-end"
      >
        {/* MÓVIL: Pestaña Lateral Derecha */}
        {isMobile && !isOpen && (
          <div className="flex items-center">
            <AnimatePresence>
              {showRobot && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: -10 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="mr-2 bg-white px-3 py-2 rounded-xl shadow-lg border border-gray-100 flex items-center gap-2 whitespace-nowrap"
                >
                  <span className="text-2xl robot-wave">🤖</span>
                  <span className="text-xs font-bold text-primary">¡Hola!</span>
                  <div className="absolute top-1/2 right-[-6px] w-3 h-3 bg-white border-t border-r border-gray-100 transform rotate-45 -translate-y-1/2"></div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(true)}
              className="bg-primary text-white h-10 w-[22px] rounded-l-lg shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors border-l border-t border-b border-white/20"
              aria-label="Abrir chat"
            >
              <span className="material-symbols-outlined text-lg animate-pulse">
                chevron_left
              </span>
            </motion.button>
          </div>
        )}

        {/* DESKTOP: Botón Flotante Redondo */}
        {!isMobile && (
          <div className="relative">
            <AnimatePresence>
              {showRobot && !isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute bottom-full mb-4 right-0 bg-white px-4 py-3 rounded-2xl shadow-xl border border-gray-100 w-48 text-center"
                >
                  <div className="text-sm font-bold text-secondary">
                    ¿Te ayudo en algo? <span className="robot-wave">👋</span>
                  </div>
                  <div className="absolute top-full right-6 w-3 h-3 bg-white border-b border-r border-gray-100 transform rotate-45"></div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="w-14 h-14 rounded-full bg-[#16223f] text-white shadow-2xl flex items-center justify-center hover:bg-primary transition-colors"
            >
              {isOpen ? (
                <span className="material-symbols-outlined text-3xl">
                  close
                </span>
              ) : (
                <span className="text-2xl">💬</span>
              )}
            </motion.button>
          </div>
        )}
      </motion.div>

      {/* --- VENTANA DEL CHAT --- */}
      <AnimatePresence>
        {isOpen &&
          (isMobile ? (
            // --- MÓVIL: MODAL FULL SCREEN ---
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-secondary/60 backdrop-blur-sm z-[100] flex items-end"
              onClick={() => setIsOpen(false)}
            >
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(event) => event.stopPropagation()}
                className="w-full h-full bg-white shadow-2xl flex flex-col overflow-hidden"
              >
                <div className="bg-[#1B2341] text-white px-5 py-4 flex justify-between items-center shrink-0 safe-area-top">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-xl">
                      🤖
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Asistente Virtual</h3>
                      <span className="text-blue-200 text-xs flex items-center gap-1">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>{" "}
                        En línea
                      </span>
                    </div>
                  </div>
                  <button onClick={() => setIsOpen(false)} className="p-2">
                    <span className="material-symbols-outlined text-2xl">
                      expand_more
                    </span>
                  </button>
                </div>
                <ChatBody
                  messages={messages}
                  loading={loading}
                  messagesEndRef={messagesEndRef}
                />
                <ChatInput
                  input={input}
                  setInput={setInput}
                  sendMessage={sendMessage}
                  loading={loading}
                />
              </motion.div>
            </motion.div>
          ) : (
            // --- DESKTOP: POPUP FLOTANTE ---
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                bottom: bottomOffset + 70, // Sigue al botón
                height: chatMaxHeight, // ALTURA DINÁMICA
              }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed right-4 w-[380px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden z-[90]"
            >
              <div className="bg-[#1B2341] text-white px-4 py-3 flex justify-between items-center shrink-0">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🤖</span>
                  <span className="font-bold">Asistente Qualisophy</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="hover:text-gray-300"
                >
                  <span className="material-symbols-outlined text-sm">
                    close
                  </span>
                </button>
              </div>
              <ChatBody
                messages={messages}
                loading={loading}
                messagesEndRef={messagesEndRef}
              />
              <ChatInput
                input={input}
                setInput={setInput}
                sendMessage={sendMessage}
                loading={loading}
              />
            </motion.div>
          ))}
      </AnimatePresence>
    </>
  );
};

// Sub-componentes
const ChatBody = ({ messages, loading, messagesEndRef }: any) => (
  <div className="flex-1 p-4 bg-gray-50 overflow-y-auto space-y-4">
    {messages.map((message: Message, index: number) => (
      <div
        key={index}
        className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
      >
        <div
          className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${message.sender === "user" ? "bg-[#2575fc] text-white rounded-tr-none" : "bg-white text-gray-700 border border-gray-100 rounded-tl-none"}`}
        >
          {message.text}
        </div>
      </div>
    ))}
    {loading && (
      <div className="text-xs text-gray-400 pl-2">Escribiendo...</div>
    )}
    <div ref={messagesEndRef} />
  </div>
);

const ChatInput = ({ input, setInput, sendMessage, loading }: any) => (
  <div className="p-3 bg-white border-t border-gray-100 shrink-0 safe-area-bottom">
    <div className="flex gap-2">
      <input
        value={input}
        onChange={(event) => setInput(event.target.value)}
        onKeyDown={(event) => event.key === "Enter" && sendMessage()}
        placeholder="Escribe..."
        className="flex-1 bg-gray-50 border-0 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-primary/50 outline-none"
        disabled={loading}
      />
      <button
        onClick={sendMessage}
        disabled={!input.trim() || loading}
        className="bg-primary text-white p-2 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
      >
        <span className="material-symbols-outlined text-lg">send</span>
      </button>
    </div>
  </div>
);
