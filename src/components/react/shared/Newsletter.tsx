import React from "react";

export const Newsletter = () => {
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
            <form
              className="flex gap-2 shadow-sm"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="flex-1 px-4 py-3 rounded-l-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary text-gray-800 outline-none transition-all"
              />
              <button
                type="submit"
                className="bg-secondary hover:bg-primary text-white font-bold px-6 py-3 rounded-r-lg transition-colors shadow-md"
              >
                Suscribirse
              </button>
            </form>
            <p className="text-xs text-gray-400 mt-3 text-center md:text-left">
              Al suscribirte aceptas nuestra política de privacidad. Sin spam,
              prometido. ✌️
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
