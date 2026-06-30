import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/api/client";
import { settingsService, reservationsService } from "@/api/services";
import { Calendar, Clock, Users, Utensils, PartyPopper, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function Reserva() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState(null);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [step, setStep] = useState("type");
  const [tipo, setTipo] = useState(null);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    data: "",
    horario: "",
    quantidade_pessoas: 2,
    observacoes: "",
    tipo_evento: "",
    decoracao: "",
  });

  useEffect(() => {
    Promise.all([
      api.get('/auth/me').then(r => r.data).catch(() => null),
      settingsService.get().then(r => r.data).catch(() => null),
    ]).then(([u, s]) => {
      setUser(u);
      setSettings(s);
      setLoading(false);
    });
  }, []);

  const existingReservations = []; // Will be fetched from availability endpoint

  const availableSlots = useMemo(() => {
    if (!settings || !form.data) return [];
    const allSlots = settings.horariosDisponiveis || [];
    // Just show all available slots; real-time availability is checked on submission
    return allSlots;
  }, [settings, form.data]);

  const minDate = new Date().toISOString().split("T")[0];

  const handleSubmit = async () => {
    if (!user) {
      toast({ title: "Faça login para reservar", description: "Você precisa estar logado para fazer uma reserva.", variant: "destructive" });
      return;
    }
    if (!form.data || !form.horario || !form.quantidade_pessoas) {
      toast({ title: "Campos obrigatórios", description: "Preencha data, horário e quantidade de pessoas.", variant: "destructive" });
      return;
    }

    setSubmitting(true);
    const payload = {
      tipo,
      data: form.data,
      horario: form.horario,
      quantidade_pessoas: Number(form.quantidade_pessoas),
      observacoes: form.observacoes,
      clienteNome: user.fullName || "",
      clienteEmail: user.email || "",
      clienteTelefone: user.phone || "",
    };
    if (tipo === "ambiente") {
      payload.tipoEvento = form.tipo_evento;
      payload.decoracao = form.decoracao;
    }

    try {
      await reservationsService.create(payload);
      setSuccess(true);
    } catch (err) {
      toast({ title: err.data?.message || "Erro ao reservar", description: "Tente novamente mais tarde.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner size="lg" className="pt-32 pb-20" />;

  if (success) {
    return (
      <div className="pt-32 pb-24 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg mx-auto text-center"
        >
          <div className="w-20 h-20 rounded-full bg-[#5B6D5B]/10 flex items-center justify-center mx-auto mb-6">
            <PartyPopper className="w-10 h-10 text-[#5B6D5B]" />
          </div>
          <h2 className="font-heading text-3xl font-semibold text-[#290D04] mb-4">Reserva Enviada!</h2>
          <p className="text-[#290D04]/60 mb-8">
            Sua reserva foi registrada com sucesso. Aguarde a confirmação do restaurante.
          </p>
          <button
            onClick={() => { setSuccess(false); setStep("type"); setTipo(null); setForm({ data: "", horario: "", quantidade_pessoas: 2, observacoes: "", tipo_evento: "", decoracao: "" }); }}
            className="px-8 py-3 bg-[#290D04] text-[#FAF3E2] rounded-full font-interactive text-sm font-semibold hover:bg-[#3D1A0C] transition-colors"
          >
            Nova Reserva
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-20 md:pt-24 pb-24 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-interactive text-xs uppercase tracking-[0.3em] text-[#B68D40] mb-4">Reserve Agora</p>
          <h1 className="font-heading text-4xl md:text-6xl font-semibold text-[#290D04]">Reserva</h1>
        </div>

        <AnimatePresence mode="wait">
          {step === "type" && (
            <motion.div key="type" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-4">
              <p className="text-center text-[#290D04]/60 mb-8">Escolha o tipo de reserva</p>
              <button
                onClick={() => { setTipo("mesa"); setStep("form"); }}
                className="w-full p-8 rounded-2xl bg-white/60 border border-[#290D04]/5 hover:shadow-lg transition-all duration-300 text-left group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-[#B68D40]/10 flex items-center justify-center group-hover:bg-[#B68D40]/20 transition-colors">
                    <Utensils className="w-6 h-6 text-[#B68D40]" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-semibold text-[#290D04]">Reserva de Mesa</h3>
                    <p className="text-sm text-[#290D04]/60 mt-1">Reserve uma mesa para sua refeição</p>
                  </div>
                </div>
              </button>
              <button
                onClick={() => { setTipo("ambiente"); setStep("form"); }}
                className="w-full p-8 rounded-2xl bg-white/60 border border-[#290D04]/5 hover:shadow-lg transition-all duration-300 text-left group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-[#B68D40]/10 flex items-center justify-center group-hover:bg-[#B68D40]/20 transition-colors">
                    <PartyPopper className="w-6 h-6 text-[#B68D40]" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-semibold text-[#290D04]">Reserva de Ambiente</h3>
                    <p className="text-sm text-[#290D04]/60 mt-1">Reserve o espaço inteiro para seu evento</p>
                  </div>
                </div>
              </button>
            </motion.div>
          )}

          {step === "form" && (
            <motion.div key="form" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <button onClick={() => setStep("type")} className="flex items-center gap-1 text-sm text-[#290D04]/60 hover:text-[#290D04] mb-6 font-interactive transition-colors">
                <ChevronLeft className="w-4 h-4" /> Voltar
              </button>

              <div className="p-8 rounded-2xl bg-white/60 border border-[#290D04]/5 space-y-6">
                <h2 className="font-heading text-2xl font-semibold text-[#290D04]">
                  {tipo === "mesa" ? "Reserva de Mesa" : "Reserva de Ambiente"}
                </h2>

                <div>
                  <label className="block text-sm font-interactive font-medium text-[#290D04]/80 mb-2">
                    <Calendar className="w-4 h-4 inline mr-2" />Data
                  </label>
                  <input
                    type="date"
                    min={minDate}
                    value={form.data}
                    onChange={(e) => setForm({ ...form, data: e.target.value, horario: "" })}
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF3E2] border border-[#290D04]/10 text-[#290D04] text-sm focus:outline-none focus:ring-2 focus:ring-[#B68D40]/50 transition-all"
                  />
                </div>

                {form.data && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
                    <label className="block text-sm font-interactive font-medium text-[#290D04]/80 mb-2">
                      <Clock className="w-4 h-4 inline mr-2" />Horário
                    </label>
                    {availableSlots.length === 0 ? (
                      <p className="text-sm text-red-600 py-2">Nenhum horário disponível nesta data.</p>
                    ) : (
                      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                        {availableSlots.map((slot) => (
                          <button
                            key={slot}
                            onClick={() => setForm({ ...form, horario: slot })}
                            className={`px-3 py-2.5 rounded-xl text-sm font-interactive font-medium transition-all duration-200 ${
                              form.horario === slot
                                ? "bg-[#B68D40] text-[#FAF3E2] shadow-md"
                                : "bg-[#290D04]/5 text-[#290D04]/70 hover:bg-[#290D04]/10"
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}

                <div>
                  <label className="block text-sm font-interactive font-medium text-[#290D04]/80 mb-2">
                    <Users className="w-4 h-4 inline mr-2" />Quantidade de Pessoas
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={100}
                    value={form.quantidade_pessoas}
                    onChange={(e) => setForm({ ...form, quantidade_pessoas: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF3E2] border border-[#290D04]/10 text-[#290D04] text-sm focus:outline-none focus:ring-2 focus:ring-[#B68D40]/50 transition-all"
                  />
                </div>

                {tipo === "ambiente" && (
                  <>
                    <div>
                      <label className="block text-sm font-interactive font-medium text-[#290D04]/80 mb-2">Tipo do Evento</label>
                      <input
                        type="text"
                        value={form.tipo_evento}
                        onChange={(e) => setForm({ ...form, tipo_evento: e.target.value })}
                        placeholder="Ex: Aniversário, Casamento, Confraternização..."
                        className="w-full px-4 py-3 rounded-xl bg-[#FAF3E2] border border-[#290D04]/10 text-[#290D04] text-sm placeholder:text-[#290D04]/30 focus:outline-none focus:ring-2 focus:ring-[#B68D40]/50 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-interactive font-medium text-[#290D04]/80 mb-2">Decoração</label>
                      <input
                        type="text"
                        value={form.decoracao}
                        onChange={(e) => setForm({ ...form, decoracao: e.target.value })}
                        placeholder="Descreva a decoração desejada..."
                        className="w-full px-4 py-3 rounded-xl bg-[#FAF3E2] border border-[#290D04]/10 text-[#290D04] text-sm placeholder:text-[#290D04]/30 focus:outline-none focus:ring-2 focus:ring-[#B68D40]/50 transition-all"
                      />
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-sm font-interactive font-medium text-[#290D04]/80 mb-2">Observações</label>
                  <textarea
                    value={form.observacoes}
                    onChange={(e) => setForm({ ...form, observacoes: e.target.value })}
                    rows={3}
                    placeholder="Alguma observação especial?"
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF3E2] border border-[#290D04]/10 text-[#290D04] text-sm placeholder:text-[#290D04]/30 focus:outline-none focus:ring-2 focus:ring-[#B68D40]/50 transition-all resize-none"
                  />
                </div>

                {!user && (
                  <p className="text-sm text-[#B68D40] text-center py-2">
                    Faça <a href="/login" className="underline font-medium">login</a> para confirmar sua reserva.
                  </p>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={submitting || !form.data || !form.horario || !user}
                  className="w-full py-3.5 bg-[#B68D40] text-[#FAF3E2] rounded-full font-interactive text-sm font-semibold tracking-wide hover:bg-[#C9A050] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {submitting ? <LoadingSpinner size="sm" /> : "Confirmar Reserva"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
