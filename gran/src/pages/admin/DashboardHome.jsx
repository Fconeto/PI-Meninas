import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { CalendarCheck, UtensilsCrossed, Image, Clock, Users, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function DashboardHome() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      base44.entities.Reservation.list("-created_date"),
      base44.entities.Product.list(),
      base44.entities.GalleryImage.list(),
    ]).then(([reservations, products, gallery]) => {
      const today = new Date().toISOString().split("T")[0];
      const todayReservations = reservations.filter((r) => r.data === today && r.status !== "cancelada");
      const upcoming = reservations
        .filter((r) => r.data >= today && r.status !== "cancelada" && r.status !== "concluida")
        .sort((a, b) => (a.data + a.horario).localeCompare(b.data + b.horario))
        .slice(0, 5);

      const statusCounts = { pendente: 0, confirmada: 0, cancelada: 0, concluida: 0 };
      reservations.forEach((r) => { if (statusCounts[r.status] !== undefined) statusCounts[r.status]++; });

      const last7days = [];
      for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const dateStr = d.toISOString().split("T")[0];
        const dayLabel = d.toLocaleDateString("pt-BR", { weekday: "short" });
        const count = reservations.filter((r) => r.data === dateStr && r.status !== "cancelada").length;
        last7days.push({ day: dayLabel, reservas: count });
      }

      setStats({
        totalReservations: reservations.length,
        todayReservations,
        totalProducts: products.length,
        totalGallery: gallery.length,
        upcoming,
        statusCounts,
        last7days,
      });
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner size="lg" className="py-20" />;
  if (!stats) return null;

  const kpis = [
    { label: "Total de Reservas", value: stats.totalReservations, icon: CalendarCheck, color: "bg-[#B68D40]/10 text-[#B68D40]" },
    { label: "Reservas Hoje", value: stats.todayReservations.length, icon: Clock, color: "bg-[#5B6D5B]/10 text-[#5B6D5B]" },
    { label: "Produtos", value: stats.totalProducts, icon: UtensilsCrossed, color: "bg-[#290D04]/10 text-[#290D04]" },
    { label: "Fotos", value: stats.totalGallery, icon: Image, color: "bg-purple-100 text-purple-700" },
  ];

  const pieData = [
    { name: "Pendente", value: stats.statusCounts.pendente, color: "#F59E0B" },
    { name: "Confirmada", value: stats.statusCounts.confirmada, color: "#10B981" },
    { name: "Cancelada", value: stats.statusCounts.cancelada, color: "#EF4444" },
    { name: "Concluída", value: stats.statusCounts.concluida, color: "#3B82F6" },
  ].filter((d) => d.value > 0);

  return (
    <div>
      <h1 className="font-heading text-3xl font-semibold text-[#290D04] mb-8">Dashboard</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {kpis.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="p-6 rounded-2xl bg-white/60 border border-[#290D04]/5"
          >
            <div className={`w-10 h-10 rounded-xl ${kpi.color} flex items-center justify-center mb-3`}>
              <kpi.icon className="w-5 h-5" />
            </div>
            <p className="font-heading text-3xl font-bold text-[#290D04]">{kpi.value}</p>
            <p className="text-xs text-[#290D04]/50 font-interactive mt-1">{kpi.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="p-6 rounded-2xl bg-white/60 border border-[#290D04]/5">
          <h3 className="font-heading text-lg font-semibold text-[#290D04] mb-4">Reservas (Últimos 7 dias)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.last7days}>
                <CartesianGrid strokeDasharray="3 3" stroke="#290D0410" />
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#290D04" }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: "#290D04" }} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #290D0410", fontSize: 12 }} />
                <Bar dataKey="reservas" fill="#B68D40" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white/60 border border-[#290D04]/5">
          <h3 className="font-heading text-lg font-semibold text-[#290D04] mb-4">Status das Reservas</h3>
          {pieData.length === 0 ? (
            <p className="text-sm text-[#290D04]/50 py-10 text-center">Nenhuma reserva ainda.</p>
          ) : (
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false}>
                    {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-white/60 border border-[#290D04]/5">
        <h3 className="font-heading text-lg font-semibold text-[#290D04] mb-4">Próximas Reservas</h3>
        {stats.upcoming.length === 0 ? (
          <p className="text-sm text-[#290D04]/50 text-center py-8">Nenhuma reserva futura.</p>
        ) : (
          <div className="space-y-3">
            {stats.upcoming.map((r) => (
              <div key={r.id} className="flex items-center justify-between p-4 rounded-xl bg-[#FAF3E2] hover:bg-[#290D04]/5 transition-colors">
                <div>
                  <p className="text-sm font-medium text-[#290D04]">{r.cliente_nome || "Cliente"}</p>
                  <p className="text-xs text-[#290D04]/50">
                    {new Date(r.data + "T00:00:00").toLocaleDateString("pt-BR")} • {r.horario} • {r.quantidade_pessoas} pessoa{r.quantidade_pessoas > 1 ? "s" : ""}
                  </p>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-interactive font-medium capitalize ${r.status === "pendente" ? "bg-amber-100 text-amber-800" : "bg-green-100 text-green-800"}`}>
                  {r.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}