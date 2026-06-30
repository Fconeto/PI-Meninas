import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, User, LogIn } from "lucide-react";
import { api } from "@/api/client";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "Cardápio", path: "/cardapio" },
  { label: "Reserva", path: "/reserva" },
  { label: "Galeria", path: "/galeria" },
  { label: "Contato", path: "/contato" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = api.getToken();
    if (token) {
      api.get('/auth/me').then(r => setUser(r.data)).catch(() => setUser(null));
    } else {
      setUser(null);
    }
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const isAdmin = user?.role === "Admin";
  const allLinks = isAdmin ? [...NAV_LINKS, { label: "Dashboard", path: "/dashboard" }] : NAV_LINKS;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-[#FAF3E2]/95 backdrop-blur-md shadow-sm" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-heading text-xl md:text-2xl font-semibold text-[#290D04] tracking-wide">
              Gran Forno <span className="font-light">&</span> Cozinha
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {allLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-interactive text-sm font-medium tracking-wide transition-colors duration-300 hover:text-[#B68D40] ${
                  location.pathname === link.path ? "text-[#B68D40]" : "text-[#290D04]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <Link to="/perfil" className="flex items-center gap-2 text-[#290D04] hover:text-[#B68D40] transition-colors">
                <User className="w-5 h-5" />
                <span className="font-interactive text-sm font-medium">{user.fullName || user.email}</span>
              </Link>
            ) : (
              <Link to="/login" className="flex items-center gap-2 bg-[#290D04] text-[#FAF3E2] px-5 py-2 rounded-full font-interactive text-sm font-medium hover:bg-[#3D1A0C] transition-colors">
                <LogIn className="w-4 h-4" />
                Login
              </Link>
            )}
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-[#290D04] p-2">
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#FAF3E2]/98 backdrop-blur-md border-t border-[#290D04]/10 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {allLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block font-interactive text-base font-medium py-2 transition-colors ${
                    location.pathname === link.path ? "text-[#B68D40]" : "text-[#290D04]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-[#290D04]/10">
                {user ? (
                  <Link to="/perfil" className="flex items-center gap-2 text-[#290D04] py-2">
                    <User className="w-5 h-5" />
                    <span className="font-interactive text-sm font-medium">{user.fullName || user.email}</span>
                  </Link>
                ) : (
                  <Link to="/login" className="flex items-center gap-2 text-[#290D04] py-2 font-interactive text-sm font-medium">
                    <LogIn className="w-4 h-4" />
                    Login
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
