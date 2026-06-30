import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Search, Filter } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const STATUS_OPTIONS = ["pendente", "confirmada", "cancelada", "concluida"];
const STATUS_COLORS = {
  pendente: "bg-amber-100 text-amber-800",
  confirmada: "bg-green-100 text-green-800",
  cancelada: "bg-red-100 text-red-800",
  concluida: "bg-blue-100 text-blue-800",
};

export default function AdminReservas() {
  const { toast } = useToast();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterTipo, setFilterTipo] = useState("");
  const [filterDate, setFilterDate] = useState("");

  const load = () => {
    setLoading(true);
    base44.entities.Reservation.list("-created_date")
      .then(setReservations)
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await base44.entities.Reservation.update(id, { status: newStatus });
      setReservations((prev) => prev.map((r) => r.id === id ? { ...r, status: newStatus } : r));
      toast({ title: `Status atualizado para ${newStatus}.` });
    } catch {
      toast({ title: "Erro ao atualizar status.", variant: "destructive" });
    }
  };

  const filtered = reservations.filter((r) => {
    const matchSearch = !search || (r.cliente_nome || "").toLowerCase().includes(search.toLowerCase()) || (r.cliente_email || "").toLowerCase().includes(search.toLowerCase());
    const matchStatus = !filterStatus || r.status === filterStatus;
    const matchTipo = !filterTipo || r.tipo === filterTipo;
    const matchDate = !filterDate || r.data === filterDate;
    return matchSearch && matchStatus && matchTipo && matchDate;
  });

  return (
    <div>
      <h1 className="font-heading text-3xl font-semibold text-[#290D04] mb-8">Reservas</h1>

      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#290D04]/40" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar cliente..." className="w-full pl-11 pr-4 py-2.5 rounded-full bg-white/80 border border-[#290D04]/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#B68D40]/50" />
        </div>
        <input type="date" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} className="px-4 py-2.5 rounded-full bg-white/80 border border-[#290D04]/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#B68D40]/50" />
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-4 py-2.5 rounded-full bg-white/80 border border-[#290D04]/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#B68D40]/50">
          <option value="">Todos os status</option>
          {STATUS_OPTIONS.map((s) => <option key={s} value={s} className="capitalize">{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
        </select>
        <select value={filterTipo} onChange={(e) => setFilterTipo(e.target.value)} className="px-4 py-2.5 rounded-full bg-white/80 border border-[#290D04]/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#B68D40]/50">
          <option value="">Todos os tipos</option>
          <option value="mesa">Mesa</option>
          <option value="ambiente">Ambiente</option>
        </select>
      </div>

      {loading ? (
        <LoadingSpinner size="lg" className="py-20" />
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 rounded-2xl bg-white/60 border border-[#290D04]/5">
          <p className="text-[#290D04]/50">Nenhuma reserva encontrada.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-[#290D04]/5">
          <table className="w-full">
            <thead>
              <tr className="bg-[#290D04]/5">
                <th className="text-left px-4 py-3 text-xs font-interactive font-semibold text-[#290D04]/60 uppercase tracking-wider">Cliente</th>
                <th className="text-left px-4 py-3 text-xs font-interactive font-semibold text-[#290D04]/60 uppercase tracking-wider hidden md:table-cell">Telefone</th>
                <th className="text-left px-4 py-3 text-xs font-interactive font-semibold text-[#290D04]/60 uppercase tracking-wider">Data</th>
                <th className="text-left px-4 py-3 text-xs font-interactive font-semibold text-[#290D04]/60 uppercase tracking-wider hidden sm:table-cell">Horário</th>
                <th className="text-left px-4 py-3 text-xs font-interactive font-semibold text-[#290D04]/60 uppercase tracking-wider hidden lg:table-cell">Tipo</th>
                <th className="text-left px-4 py-3 text-xs font-interactive font-semibold text-[#290D04]/60 uppercase tracking-wider hidden lg:table-cell">Qtd</th>
                <th className="text-left px-4 py-3 text-xs font-interactive font-semibold text-[#290D04]/60 uppercase tracking-wider">Status</th>
                <th className="text-left px-4 py-3 text-xs font-interactive font-semibold text-[#290D04]/60 uppercase tracking-wider hidden xl:table-cell">Observações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#290D04]/5">
              {filtered.map((r) => (
                <tr key={r.id} className="bg-white/40 hover:bg-white/70 transition-colors">
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-[#290D04]">{r.cliente_nome || "—"}</p>
                    <p className="text-xs text-[#290D04]/40 md:hidden">{r.cliente_telefone}</p>
                  </td>
                  <td className="px-4 py-3 text-sm text-[#290D04]/60 hidden md:table-cell">{r.cliente_telefone || "—"}</td>
                  <td className="px-4 py-3 text-sm text-[#290D04]">{r.data ? new Date(r.data + "T00:00:00").toLocaleDateString("pt-BR") : "—"}</td>
                  <td className="px-4 py-3 text-sm text-[#290D04] hidden sm:table-cell">{r.horario}</td>
                  <td className="px-4 py-3 text-sm text-[#290D04] capitalize hidden lg:table-cell">{r.tipo}</td>
                  <td className="px-4 py-3 text-sm text-[#290D04] hidden lg:table-cell">{r.quantidade_pessoas}</td>
                  <td className="px-4 py-3">
                    <select
                      value={r.status}
                      onChange={(e) => handleStatusChange(r.id, e.target.value)}
                      className={`px-2 py-1 rounded-full text-xs font-interactive font-medium border-0 cursor-pointer ${STATUS_COLORS[r.status]} focus:outline-none`}
                    >
                      {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-xs text-[#290D04]/50 max-w-[200px] truncate hidden xl:table-cell">{r.observacoes || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}