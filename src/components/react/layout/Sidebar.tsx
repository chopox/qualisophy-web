import { useEffect, useState } from "react";
import { X, Home, Contact, BookOpen, Handshake } from "lucide-react";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState("/");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== "undefined") {
      setCurrentPath(window.location.pathname);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleSidebarToggle = () => {
      setIsOpen(true);
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    const toggleBtn = document.querySelector("[data-sidebar-toggle]");
    if (toggleBtn) {
      toggleBtn.addEventListener("click", handleSidebarToggle);
    }

    document.addEventListener("keydown", handleEscape);

    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      if (toggleBtn) {
        toggleBtn.removeEventListener("click", handleSidebarToggle);
      }
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const closeSidebar = () => setIsOpen(false);

  const isHome = currentPath === "/";
  const isContact = currentPath === "/contact";
  const isLearning = currentPath.includes("/learning");
  const isPartnership = currentPath === "/partnership";

  if (!isClient) {
    return null;
  }

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 transform transition-all duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          {/* Close Button */}
          <button
            onClick={closeSidebar}
            className="text-white hover:text-teal-400 transition-colors"
            aria-label="Close sidebar"
            type="button"
          >
            <X aria-hidden="true" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="p-6">
          <div className="space-y-4">
            <a
              href="/"
              className={`block py-3 px-4 rounded-lg transition-colors ${
                isHome
                  ? "bg-teal-500 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
              onClick={() => setTimeout(closeSidebar, 100)}
            >
              <div className="flex items-center space-x-3">
                <Home />
                <span>Inicio</span>
              </div>
            </a>

            <a
              href="/learning"
              className={`block py-3 px-4 rounded-lg transition-colors ${
                isLearning
                  ? "bg-teal-500 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
              onClick={() => setTimeout(closeSidebar, 100)}
            >
              <div className="flex items-center space-x-3">
                <BookOpen />
                <span>Cursos</span>
              </div>
            </a>

            <a
              href="/partnership"
              className={`block py-3 px-4 rounded-lg transition-colors ${
                isPartnership
                  ? "bg-teal-500 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
              onClick={() => setTimeout(closeSidebar, 100)}
            >
              <div className="flex items-center space-x-3">
                <Handshake />
                <span>Partnership</span>
              </div>
            </a>

            <a
              href="/contact"
              className={`block py-3 px-4 rounded-lg transition-colors ${
                isContact
                  ? "bg-teal-500 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
              onClick={() => setTimeout(closeSidebar, 100)}
            >
              <div className="flex items-center space-x-3">
                <Contact />
                <span>Contacto</span>
              </div>
            </a>
          </div>
        </nav>
      </div>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${
          isOpen ? "bg-opacity-50" : "bg-opacity-0 pointer-events-none"
        }`}
        onClick={closeSidebar}
      />
    </>
  );
};
