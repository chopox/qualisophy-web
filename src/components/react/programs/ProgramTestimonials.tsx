import React, { useState, useRef, useEffect } from "react";

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  role: string;
  image: string;
}

interface ProgramTestimonialsProps {
  variant?: "white" | "blue";
}

const originalTestimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      "Gracias a la alianza con Qualisophy, hemos logrado que el 80% de nuestros beneficiarios encuentren empleos cualificados en menos de 3 meses.",
    name: "Elena M.",
    role: "Coordinadora de Inclusión - Cruz Roja",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150",
  },
  {
    id: 2,
    quote:
      "El programa puente nos permitió validar las competencias técnicas de ingenieros refugiados y conectarlos con vacantes reales en el sector tech.",
    name: "Carlos R.",
    role: "Director de Responsabilidad Social",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150",
  },
  {
    id: 3,
    quote:
      "La metodología de Qualisophy no solo evalúa código, evalúa potencial humano. Es la pieza que nos faltaba para cerrar el ciclo de integración.",
    name: "Sarah L.",
    role: "Project Manager - NGO Global",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150",
  },
  {
    id: 4,
    quote:
      "Transformar la vida de una familia empieza por un empleo digno. Este programa ha sido un acelerador de oportunidades increíble.",
    name: "David K.",
    role: "Mentor de Talento",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150",
  },
];

// Triplicamos los datos para crear el efecto de carrusel infinito
const testimonials = [
  ...originalTestimonials,
  ...originalTestimonials,
  ...originalTestimonials,
];

export const ProgramTestimonials: React.FC<ProgramTestimonialsProps> = ({
  variant = "white",
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [realIndex, setRealIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isResetting, setIsResetting] = useState(false);

  // En el nuevo sistema, "blue" significa fondo GRIS CLARO
  const isGrayVariant = variant === "blue";

  // --- 1. Inicialización ---
  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const singleSetWidth = container.scrollWidth / 3;
      container.scrollLeft = singleSetWidth;
    }
  }, []);

  // --- 2. Lógica Scroll Infinito ---
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const totalWidth = container.scrollWidth;
    const singleSetWidth = totalWidth / 3;
    const currentScroll = container.scrollLeft;
    const itemWidth = (container.children[0] as HTMLElement).offsetWidth + 24;
    const absoluteIndex = Math.round(currentScroll / itemWidth);
    setRealIndex(absoluteIndex % originalTestimonials.length);

    if (isDragging || isResetting) return;

    const tolerance = 10;
    if (currentScroll >= singleSetWidth * 2 - tolerance) {
      disableSmoothScroll(() => {
        container.scrollLeft = currentScroll - singleSetWidth;
      });
    } else if (currentScroll <= singleSetWidth - tolerance) {
      disableSmoothScroll(() => {
        container.scrollLeft = currentScroll + singleSetWidth;
      });
    }
  };

  const disableSmoothScroll = (callback: () => void) => {
    if (!scrollContainerRef.current) return;
    setIsResetting(true);
    scrollContainerRef.current.style.scrollBehavior = "auto";
    scrollContainerRef.current.style.scrollSnapType = "none";
    callback();
    requestAnimationFrame(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.style.scrollBehavior = "smooth";
        scrollContainerRef.current.style.scrollSnapType = "x mandatory";
        setIsResetting(false);
      }
    });
  };

  // --- 3. Dragging ---
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
    scrollContainerRef.current.style.scrollSnapType = "none";
    scrollContainerRef.current.style.scrollBehavior = "auto";
    scrollContainerRef.current.style.cursor = "grabbing";
  };

  const stopDragging = () => {
    if (!isDragging || !scrollContainerRef.current) return;
    setIsDragging(false);
    scrollContainerRef.current.style.scrollSnapType = "x mandatory";
    scrollContainerRef.current.style.scrollBehavior = "smooth";
    scrollContainerRef.current.style.cursor = "grab";
    const itemWidth =
      (scrollContainerRef.current.children[0] as HTMLElement).offsetWidth + 24;
    const nearestIndex = Math.round(
      scrollContainerRef.current.scrollLeft / itemWidth,
    );
    scrollContainerRef.current.scrollTo({
      left: nearestIndex * itemWidth,
      behavior: "smooth",
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  // --- 4. Navegación ---
  const scrollByAmount = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const itemWidth =
      (scrollContainerRef.current.children[0] as HTMLElement).offsetWidth + 24;
    const scrollAmount = direction === "right" ? itemWidth : -itemWidth;
    scrollContainerRef.current.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section
      className={`py-20 lg:py-28 px-6 lg:px-12 w-full transition-colors duration-300 border-t 
        ${isGrayVariant ? "bg-gray-50 border-gray-200" : "bg-white border-gray-100"}
      `}
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 font-heading text-secondary">
              Impacto Real
            </h2>
            <div className="w-20 h-1.5 bg-primary rounded-full mb-6"></div>
            <p className="text-lg md:text-xl font-primary text-gray-600">
              Lo que dicen las organizaciones y profesionales que colaboran con
              nosotros.
            </p>
          </div>

          <div className="hidden md:flex gap-3">
            <button
              onClick={() => scrollByAmount("left")}
              className="size-12 rounded-full border border-gray-200 text-secondary flex items-center justify-center transition-all active:scale-95 hover:bg-primary hover:text-white hover:border-primary"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <button
              onClick={() => scrollByAmount("right")}
              className="size-12 rounded-full bg-secondary text-white flex items-center justify-center transition-all shadow-lg active:scale-95 hover:bg-primary"
            >
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* --- CARDS --- */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 cursor-grab scroll-smooth no-scrollbar"
          onMouseDown={handleMouseDown}
          onMouseLeave={stopDragging}
          onMouseUp={stopDragging}
          onMouseMove={handleMouseMove}
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            userSelect: isDragging ? "none" : "auto",
          }}
        >
          {testimonials.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className={`min-w-full md:min-w-[calc(33.333%-1rem)] snap-start p-8 rounded-3xl transition-all duration-300 border relative group min-h-[350px] flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1
                ${isGrayVariant ? "bg-white border-gray-200" : "bg-gray-50 border-gray-100"}
              `}
            >
              <div>
                <span className="material-symbols-outlined text-5xl absolute top-6 right-6 text-primary/10 group-hover:text-primary/20 transition-colors">
                  format_quote
                </span>
                <p className="mb-8 relative z-10 italic font-primary leading-relaxed text-lg text-gray-600">
                  "{item.quote}"
                </p>
              </div>

              <div className="flex items-center gap-4 mt-auto">
                <div className="size-14 rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover pointer-events-none"
                  />
                </div>
                <div>
                  <p className="font-bold text-base font-heading text-secondary">
                    {item.name}
                  </p>
                  <p className="text-sm text-primary font-medium">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- INDICADORES --- */}
        <div className="flex justify-center items-center gap-3 mt-4">
          {originalTestimonials.map((_, idx) => (
            <div
              key={idx}
              className={`h-2.5 rounded-full transition-all duration-500 ${
                idx === realIndex ? "w-12 bg-primary" : "w-2.5 bg-gray-300"
              }`}
            />
          ))}
        </div>
        <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
      </div>
    </section>
  );
};
