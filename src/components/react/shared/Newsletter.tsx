import React, { useState } from "react";

// NUEVO: Añadida prop 'variant' para controlar el color de fondo dinámicamente
interface NewsletterProps {
  variant?: "white" | "gray";
}

export const Newsletter: React.FC<NewsletterProps> = ({ variant = "gray" }) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(data.message);
        setEmail(""); // Limpiar el input
      } else {
        setStatus("error");
        setMessage(data.message);
      }
    } catch (error) {
      setStatus("error");
      setMessage("Ocurrió un error inesperado. Por favor intenta más tarde.");
    }
  };

  // CAMBIO: Asignamos el fondo basado en la prop 'variant'
  const bgColor = variant === "white" ? "bg-white" : "bg-gray-50";

  return (
    <section className={`${bgColor} py-16 border-t border-gray-200`}>
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-1/2 text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-bold font-heading mb-2 text-secondary">
              Mantente actualizado
            </h3>
            <p className="text-slate-600 font-primary text-lg">
              Recibe noticias sobre tecnología, inclusión y nuevas convocatorias
              de cursos directamente en tu bandeja.
            </p>
          </div>

          <div className="w-full md:w-1/2 max-w-md">
            {status === "success" ? (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative text-center animate-fade-in">
                <span className="block sm:inline font-bold">¡Genial! 🎉</span>
                <span className="block sm:inline"> {message}</span>
              </div>
            ) : (
              <form
                className="flex flex-col sm:flex-row gap-3 sm:gap-0 shadow-none sm:shadow-sm"
                onSubmit={handleSubmit}
              >
                <input
                  type="email"
                  placeholder="Tu correo electrónico"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  disabled={status === "loading"}
                  // CORRECCIÓN INPUT:
                  // 1. Eliminado 'focus:ring-2 focus:ring-primary' para evitar el aumento de altura exterior.
                  // 2. Se mantiene 'focus:border-primary focus:outline-none' para el estilo de foco interno y limpio.
                  className="flex-1 w-full px-4 py-3 rounded-lg sm:rounded-r-none sm:rounded-l-lg border border-gray-300 focus:border-primary focus:outline-none text-gray-800 transition-all disabled:bg-gray-100 disabled:text-gray-400 shadow-sm sm:shadow-none"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  // CORRECCIÓN BOTÓN:
                  // 1. Añadido 'border border-transparent'. Esto asegura que el botón tenga exactamente la misma altura física que el input (que tiene borde).
                  className="bg-secondary hover:bg-primary text-white font-bold px-6 py-3 rounded-lg sm:rounded-l-none sm:rounded-r-lg border border-transparent transition-colors shadow-md sm:shadow-none disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center w-full sm:w-auto sm:min-w-[140px]"
                >
                  {status === "loading" ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Enviando...
                    </span>
                  ) : (
                    "Suscribirse"
                  )}
                </button>
              </form>
            )}

            {/* Mensaje de error debajo del formulario */}
            {status === "error" && (
              <p className="text-red-500 text-sm mt-2 text-center md:text-left font-medium">
                {message}
              </p>
            )}

            {status !== "success" && (
              <p className="text-xs text-gray-400 mt-3 text-center md:text-left">
                Al suscribirte aceptas nuestra política de privacidad. Sin spam,
                prometido. ✌️
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
