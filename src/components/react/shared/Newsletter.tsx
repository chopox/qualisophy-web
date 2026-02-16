import React, { useState } from "react";

export const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
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

  return (
    <section className="bg-gray-50 py-16 border-t border-gray-200">
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
              <form className="flex gap-2 shadow-sm" onSubmit={handleSubmit}>
                <input
                  type="email"
                  placeholder="Tu correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={status === "loading"}
                  className="flex-1 px-4 py-3 rounded-l-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary text-gray-800 outline-none transition-all disabled:bg-gray-100 disabled:text-gray-400"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="bg-secondary hover:bg-primary text-white font-bold px-6 py-3 rounded-r-lg transition-colors shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center min-w-[140px]"
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
