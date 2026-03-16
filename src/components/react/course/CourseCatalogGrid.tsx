import React, { useState, useMemo } from "react";
import { courseCategories, allCoursesList } from "@/data/courseCatalog";
import { CourseGridCard } from "./CourseGridCard";

export const CourseCatalogGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");

  const categoryNames = ["Todos", ...courseCategories.map((cat) => cat.title)];

  const filteredCourses = useMemo(() => {
    return allCoursesList.filter((course) => {
      const parentCategory = courseCategories.find((c) =>
        c.courses.some((cc) => cc.id === course.id),
      );
      const matchesCategory =
        selectedCategory === "Todos" ||
        parentCategory?.title === selectedCategory;

      const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section className="py-12 min-h-screen bg-gray-50/30">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* --- BARRA DE CONTROL --- */}
        <div className="mb-8 bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col lg:flex-row gap-6 items-start justify-between">
          {/* Contenedor de Botones (Flex Wrap) */}
          <div className="flex flex-wrap gap-2 flex-1">
            {categoryNames.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                  selectedCategory === cat
                    ? "bg-primary text-white shadow-md"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-100 hover:border-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Buscador redondeado a la derecha */}
          <div className="relative w-full lg:w-80 shrink-0">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              search
            </span>
            <input
              type="text"
              placeholder="Buscar curso..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-2.5 rounded-full border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-gray-50/50 hover:bg-white text-sm"
            />
          </div>
        </div>

        {/* --- CABECERA DE RESULTADOS (Mostrando X cursos) --- */}
        <div className="flex justify-between items-end mb-6 px-2">
          <h2 className="text-2xl font-bold font-heading text-secondary">
            {selectedCategory === "Todos"
              ? "Todos los cursos"
              : selectedCategory}
          </h2>
          <div className="text-sm text-gray-500 font-medium">
            Mostrando {filteredCourses.length}{" "}
            {filteredCourses.length === 1 ? "curso" : "cursos"}
          </div>
        </div>

        {/* --- GRID DE RESULTADOS --- */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <CourseGridCard
                key={course.id}
                title={course.title}
                description={course.description}
                imageSrc={course.image}
                href={course.href}
                level={course.level as any}
                duration={course.duration}
                modality={course.modality as any}
                category={course.categoryName}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-4xl text-gray-400">
                sentiment_dissatisfied
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-600 mb-2">
              No se encontraron cursos
            </h3>
            <p className="text-gray-500">
              Intenta con otra búsqueda o categoría.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("Todos");
              }}
              className="mt-4 text-primary font-bold hover:underline px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
