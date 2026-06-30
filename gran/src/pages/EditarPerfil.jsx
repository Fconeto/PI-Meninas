import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function EditarPerfil() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ full_name: "", phone: "" });

  useEffect(() => {
    base44.auth.me().then((u) => {
      setForm({ full_name: u.full_name || "", phone: u.phone || "" });
      setLoading(false);
    });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await base44.auth.updateMe({ full_name: form.full_name, phone: form.phone });
      toast({ title: "Perfil atualizado com sucesso!" });
      navigate("/perfil");
    } catch {
      toast({ title: "Erro ao salvar alterações.", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner size="lg" className="pt-32 pb-20" />;

  return (
    <div className="pt-20 md:pt-24 pb-24 px-4">
      <div className="max-w-lg mx-auto">
        <button onClick={() => navigate("/perfil")} className="flex items-center gap-1 text-sm text-[#290D04]/60 hover:text-[#290D04] mb-8 font-interactive transition-colors">
          <ChevronLeft className="w-4 h-4" /> Voltar
        </button>

        <h1 className="font-heading text-3xl font-semibold text-[#290D04] mb-8">Editar Perfil</h1>

        <div className="p-8 rounded-2xl bg-white/60 border border-[#290D04]/5 space-y-6">
          <div>
            <label className="block text-sm font-interactive font-medium text-[#290D04]/80 mb-2">Nome</label>
            <input
              type="text"
              value={form.full_name}
              onChange={(e) => setForm({ ...form, full_name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-[#FAF3E2] border border-[#290D04]/10 text-[#290D04] text-sm focus:outline-none focus:ring-2 focus:ring-[#B68D40]/50 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-interactive font-medium text-[#290D04]/80 mb-2">Telefone</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="(11) 99999-9999"
              className="w-full px-4 py-3 rounded-xl bg-[#FAF3E2] border border-[#290D04]/10 text-[#290D04] text-sm placeholder:text-[#290D04]/30 focus:outline-none focus:ring-2 focus:ring-[#B68D40]/50 transition-all"
            />
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full py-3.5 bg-[#B68D40] text-[#FAF3E2] rounded-full font-interactive text-sm font-semibold tracking-wide hover:bg-[#C9A050] disabled:opacity-50 transition-all duration-300 flex items-center justify-center gap-2"
          >
            {saving ? <LoadingSpinner size="sm" /> : "Salvar Alterações"}
          </button>
        </div>
      </div>
    </div>
  );
}