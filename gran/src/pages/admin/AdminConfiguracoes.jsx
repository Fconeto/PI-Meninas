import React, { useState, useEffect } from "react";
import { settingsService } from "@/api/services";
import { Plus, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function AdminConfiguracoes() {
  const { toast } = useToast();
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newHorario, setNewHorario] = useState("");

  useEffect(() => {
    settingsService.get()
      .then((res) => setSettings(res.data || {}))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const { id, ...data } = settings;
      await settingsService.update(data);
      toast({ title: "Configurações salvas!" });
    } catch {
      toast({ title: "Erro ao salvar.", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const addHorario = () => {
    if (!newHorario) return;
    const current = settings.horariosDisponiveis || [];
    if (current.includes(newHorario)) return;
    setSettings({ ...settings, horariosDisponiveis: [...current, newHorario].sort() });
    setNewHorario("");
  };

  const removeHorario = (h) => {
    setSettings({ ...settings, horariosDisponiveis: (settings.horariosDisponiveis || []).filter((x) => x !== h) });
  };

  if (loading) return <LoadingSpinner size="lg" className="py-20" />;

  const s = settings || {};

  return (
    <div>
      <h1 className="font-heading text-3xl font-semibold text-[#290D04] mb-8">Configurações</h1>

      <div className="max-w-2xl space-y-8">
        <div className="p-8 rounded-2xl bg-white/60 border border-[#290D04]/5 space-y-5">
          <h2 className="font-heading text-xl font-semibold text-[#290D04]">Capacidade</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-interactive font-medium text-[#290D04]/80 mb-1">Total de Mesas</label>
              <input type="number" value={s.totalMesas || ""} onChange={(e) => setSettings({ ...s, totalMesas: Number(e.target.value) })} className="w-full px-4 py-2.5 rounded-xl bg-[#FAF3E2] border border-[#290D04]/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#B68D40]/50" />
            </div>
            <div>
              <label className="block text-sm font-interactive font-medium text-[#290D04]/80 mb-1">Capacidade/Mesa</label>
              <input type="number" value={s.capacidadePorMesa || ""} onChange={(e) => setSettings({ ...s, capacidadePorMesa: Number(e.target.value) })} className="w-full px-4 py-2.5 rounded-xl bg-[#FAF3E2] border border-[#290D04]/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#B68D40]/50" />
            </div>
            <div>
              <label className="block text-sm font-interactive font-medium text-[#290D04]/80 mb-1">Máx. Reservas/Horário</label>
              <input type="number" value={s.maxReservasPorHorario || ""} onChange={(e) => setSettings({ ...s, maxReservasPorHorario: Number(e.target.value) })} className="w-full px-4 py-2.5 rounded-xl bg-[#FAF3E2] border border-[#290D04]/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#B68D40]/50" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-interactive font-medium text-[#290D04]/80 mb-1">Tempo entre Reservas (min)</label>
            <input type="number" value={s.tempoEntreReservas || ""} onChange={(e) => setSettings({ ...s, tempoEntreReservas: Number(e.target.value) })} className="w-full md:w-48 px-4 py-2.5 rounded-xl bg-[#FAF3E2] border border-[#290D04]/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#B68D40]/50" />
          </div>
        </div>

        <div className="p-8 rounded-2xl bg-white/60 border border-[#290D04]/5 space-y-5">
          <h2 className="font-heading text-xl font-semibold text-[#290D04]">Horários Disponíveis</h2>
          <div className="flex flex-wrap gap-2">
            {(s.horariosDisponiveis || []).map((h) => (
              <span key={h} className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#B68D40]/10 text-[#290D04] text-sm font-interactive">
                {h}
                <button onClick={() => removeHorario(h)} className="text-[#290D04]/40 hover:text-red-500 transition-colors">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input type="time" value={newHorario} onChange={(e) => setNewHorario(e.target.value)} className="px-4 py-2.5 rounded-xl bg-[#FAF3E2] border border-[#290D04]/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#B68D40]/50" />
            <button onClick={addHorario} className="px-4 py-2.5 bg-[#290D04] text-[#FAF3E2] rounded-xl font-interactive text-sm hover:bg-[#3D1A0C] transition-colors flex items-center gap-1">
              <Plus className="w-4 h-4" /> Adicionar
            </button>
          </div>
        </div>

        <div className="p-8 rounded-2xl bg-white/60 border border-[#290D04]/5 space-y-5">
          <h2 className="font-heading text-xl font-semibold text-[#290D04]">Informações do Restaurante</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-interactive font-medium text-[#290D04]/80 mb-1">Telefone</label>
              <input type="text" value={s.telefone || ""} onChange={(e) => setSettings({ ...s, telefone: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-[#FAF3E2] border border-[#290D04]/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#B68D40]/50" />
            </div>
            <div>
              <label className="block text-sm font-interactive font-medium text-[#290D04]/80 mb-1">WhatsApp (com DDI)</label>
              <input type="text" value={s.whatsapp || ""} onChange={(e) => setSettings({ ...s, whatsapp: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-[#FAF3E2] border border-[#290D04]/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#B68D40]/50" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-interactive font-medium text-[#290D04]/80 mb-1">URL Delivery</label>
            <input type="url" value={s.deliveryUrl || ""} onChange={(e) => setSettings({ ...s, deliveryUrl: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-[#FAF3E2] border border-[#290D04]/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#B68D40]/50" />
          </div>
          <div>
            <label className="block text-sm font-interactive font-medium text-[#290D04]/80 mb-1">Endereço</label>
            <input type="text" value={s.endereco || ""} onChange={(e) => setSettings({ ...s, endereco: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-[#FAF3E2] border border-[#290D04]/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#B68D40]/50" />
          </div>
          <div>
            <label className="block text-sm font-interactive font-medium text-[#290D04]/80 mb-1">Horário de Funcionamento</label>
            <input type="text" value={s.horarioFuncionamento || ""} onChange={(e) => setSettings({ ...s, horarioFuncionamento: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-[#FAF3E2] border border-[#290D04]/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#B68D40]/50" />
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full py-3.5 bg-[#B68D40] text-[#FAF3E2] rounded-full font-interactive text-sm font-semibold tracking-wide hover:bg-[#C9A050] disabled:opacity-50 transition-all duration-300 flex items-center justify-center gap-2"
        >
          {saving ? <LoadingSpinner size="sm" /> : "Salvar Configurações"}
        </button>
      </div>
    </div>
  );
}
