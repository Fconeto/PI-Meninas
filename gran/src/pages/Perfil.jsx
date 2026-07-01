import React, { useState, useEffect } from "react";
import { api } from "@/api/client";
import { reservationsService } from "@/api/services";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Phone, Edit2, Calendar, X, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useAuth } from "@/lib/AuthContext";
import { use } from "react";

const STATUS_MAP = {
  pendente: { label: "Pendente", color: "bg-amber-100 text-amber-800" },
  confirmada: { label: "Confirmada", color: "bg-green-100 text-green-800" },
  cancelada: { label: "Cancelada", color: "bg-red-100 text-red-800" },
  concluida: { label: "Concluída", color: "bg-blue-100 text-blue-800" },
};

export default function Perfil() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { logout } = useAuth();
  const [user, setUser] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/auth/me').then((r) => {
      setUser(r.data);
      return reservationsService.getMy();
    }).then((r) => setReservations(r.data || [])).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const canCancel = (reservation) => {
    if (reservation.status === "cancelada" || reservation.status === "concluida") return false;
    const reservationDate = new Date(`${reservation.data.split('T')[0]}T${reservation.horario}`);
    const now = new Date();
    const diff = reservationDate - now;
    return diff > 24 * 60 * 60 * 1000;
  };

  const handleCancel = async (id) => {
    if (!window.confirm("Tem certeza que deseja cancelar esta reserva?")) return;
    try {
      await reservationsService.updateStatus(id, "cancelada");
      setReservations((prev) => prev.map((r) => r.id === id ? { ...r, status: "cancelada" } : r));
      toast({ title: "Reserva cancelada com sucesso." });
    } catch {
      toast({ title: "Erro ao cancelar reserva.", variant: "destructive" });
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  if (loading) return <LoadingSpinner size="lg" className="pt-32 pb-20" />;
  if (!user) return null;

  return (
    <div className="pt-20 md:pt-24 pb-24 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-interactive text-xs uppercase tracking-[0.3em] text-[#B68D40] mb-4">Minha Conta</p>
          <h1 className="font-heading text-4xl md:text-5xl font-semibold text-[#290D04]">Perfil</h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 rounded-2xl bg-white/60 border border-[#290D04]/5 mb-8"
        >
          <div className="flex items-start justify-between mb-6">
            <h2 className="font-heading text-2xl font-semibold text-[#290D04]">Informações Pessoais</h2>
            <Link to="/perfil/editar" className="flex items-center gap-1 text-sm font-interactive text-[#B68D40] hover:text-[#290D04] transition-colors">
              <Edit2 className="w-4 h-4" /> Editar
            </Link>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <User className="w-4 h-4 text-[#B68D40]" />
              <span className="text-sm text-[#290D04]/70">{user.fullName || "Não informado"}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-[#B68D40]" />
              <span className="text-sm text-[#290D04]/50">{user.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-[#B68D40]" />
              <span className="text-sm text-[#290D04]/70">{user.phone || "Não informado"}</span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="mt-6 flex items-center gap-2 text-sm text-red-600 hover:text-red-700 font-interactive transition-colors"
          >
            <LogOut className="w-4 h-4" /> Sair da conta
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="font-heading text-2xl font-semibold text-[#290D04] mb-6">Minhas Reservas</h2>

          {reservations.length === 0 ? (
            <div className="text-center py-12 rounded-2xl bg-white/60 border border-[#290D04]/5">
              <Calendar className="w-10 h-10 text-[#290D04]/20 mx-auto mb-3" />
              <p className="text-[#290D04]/50">Nenhuma reserva encontrada.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {reservations.map((r) => {
                // toLowerCase
                const status = STATUS_MAP[r.status?.toLowerCase()] || STATUS_MAP.pendente;
                return (
                  <div key={r.id} className="p-6 rounded-2xl bg-white/60 border border-[#290D04]/5 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-heading text-lg font-semibold text-[#290D04] capitalize">{r.tipo === "mesa" ? "Mesa" : "Ambiente"}</span>
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-interactive font-medium ${status.color}`}>{status.label}</span>
                        </div>
                        <p className="text-sm text-[#290D04]/60">
                          {new Date(r.data).toLocaleDateString("pt-BR")} às {r.horario} • {r.quantidadePessoas} pessoa{r.quantidadePessoas > 1 ? "s" : ""}
                        </p>
                        {r.observacoes && <p className="text-xs text-[#290D04]/40 mt-1">{r.observacoes}</p>}
                      </div>
                      {canCancel(r) && (
                        <button onClick={() => handleCancel(r.id)} className="text-red-500 hover:text-red-700 p-2 transition-colors" title="Cancelar reserva">
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
