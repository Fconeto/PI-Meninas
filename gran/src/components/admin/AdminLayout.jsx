import React, { useState, useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { LayoutDashboard, UtensilsCrossed, Image, CalendarCheck, Settings, Menu, X, ChevronLeft } from "lucide-react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const ADMIN_LINKS = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "Produtos", path: "/dashboard/produtos", icon: UtensilsCrossed },
  { label: "Galeria", path: "/dashboard/galeria", icon: Image },
  { label: "Reservas", path: "/dashboard/reservas", icon: CalendarCheck },
  { label: "Configurações", path: "/dashboard/configuracoes", icon: Settings },
];

export default function AdminLayout() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    base44.auth.me().then((u) => {
      if (u.role !== "admin") {
        navigate("/");
        return;
      }
      setUser(u);
      setLoading(false);
    }).catch(() => navigate("/login"));
  }, [navigate]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  if (loading) return <LoadingSpinner size="lg" className="fixed inset-0" />;

  return (
    <div className="min-h-screen bg-[#FAF3E2] flex">
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#290D04] transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-10">
            <Link to="/" className="font-heading text-lg font-semibold text-[#FAF3E2]">
              Gran Forno
            </Link>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-[#FAF3E2]/60">
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="space-y-1">
            {ADMIN_LINKS.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-interactive text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-[#B68D40] text-[#FAF3E2]"
                      : "text-[#FAF3E2]/60 hover:text-[#FAF3E2] hover:bg-[#FAF3E2]/5"
                  }`}
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="absolute bottom-6 left-6 right-6">
          <Link to="/" className="flex items-center gap-2 text-sm text-[#FAF3E2]/40 hover:text-[#FAF3E2]/70 font-interactive transition-colors">
            <ChevronLeft className="w-4 h-4" /> Voltar ao site
          </Link>
        </div>
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <div className="flex-1 lg:ml-64">
        <header className="sticky top-0 z-30 bg-[#FAF3E2]/95 backdrop-blur-md border-b border-[#290D04]/5 px-4 md:px-8 py-4">
          <div className="flex items-center justify-between">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-[#290D04] p-2">
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden lg:block" />
            <div className="flex items-center gap-3">
              <span className="text-sm text-[#290D04]/60 font-interactive">{user?.full_name || user?.email}</span>
              <div className="w-8 h-8 rounded-full bg-[#B68D40]/20 flex items-center justify-center text-[#B68D40] font-interactive text-xs font-bold">
                {(user?.full_name || user?.email || "A").charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}