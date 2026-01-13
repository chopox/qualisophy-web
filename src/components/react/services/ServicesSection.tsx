import { Button } from "@/components/react/shared/Button";

interface Service {
  id: string;
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  imageUrl: string;
}

export const ServicesSection = () => {
  const services: Service[] = [
    {
      id: "cursos",
      title: "Cursos",
      description: "Formaciones prácticas y actualizadas.",
      buttonText: "VER INFORMACIÓN",
      buttonHref: "/learning",
      imageUrl:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1471&q=80",
    },
    {
      id: "formacion-empresas",
      title: "Formación Empresas",
      description: "Capacitación adaptada a tu equipo.",
      buttonText: "SOLICITA INFO",
      buttonHref: "/corporate-training",
      imageUrl:
        "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1471&q=80",
    },
    {
      id: "partnership",
      title: "Partnership",
      description: "Conecta con nuestro talento.",
      buttonText: "COLABORA",
      buttonHref: "/partnership",
      imageUrl:
        "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1471&q=80",
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 text-center mb-10">
          Nuestros Servicios
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service) => (
            <div
              key={service.id}
              className="group relative flex flex-col overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              `{/* Image zoom synchronized with card hover */}`
              <div className="h-40 overflow-hidden rounded-t-xl">
                <img
                  src={service.imageUrl}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              {/* Content */}
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-slate-800">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">
                    {service.description}
                  </p>
                </div>

                {/* Button */}
                <a href={service.buttonHref} className="block">
                  <Button variant="primary" size="sm" fullWidth>
                    {service.buttonText}
                  </Button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
