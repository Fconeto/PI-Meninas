import React, { useState, useEffect } from "react";
import { settingsService } from "@/api/services";
import { Phone, MessageCircle, MapPin, Clock, Mail, Truck } from "lucide-react";
import { motion } from "framer-motion";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function Contato() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    settingsService.get()
      .then((res) => setSettings(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner size="lg" className="pt-32 pb-20" />;

  const s = settings || {};

  return (
    <div className="pt-20 md:pt-24 pb-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-interactive text-xs uppercase tracking-[0.3em] text-[#B68D40] mb-4">Fale Conosco</p>
          <h1 className="font-heading text-4xl md:text-6xl font-semibold text-[#290D04]">Contato</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-8 rounded-2xl bg-white/60 border border-[#290D04]/5 space-y-8"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#B68D40]/10 flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4 text-[#B68D40]" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-semibold text-[#290D04] mb-1">Telefone</h3>
                <a href={`tel:${s.telefone || "(11) 3456-7890"}`} className="text-sm text-[#290D04]/70 hover:text-[#B68D40] transition-colors">
                  {s.telefone || "(11) 3456-7890"}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#25D366]/10 flex items-center justify-center shrink-0">
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-semibold text-[#290D04] mb-1">WhatsApp</h3>
                <a
                  href={`https://wa.me/${s.whatsapp || "5511934567890"}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#290D04]/70 hover:text-[#25D366] transition-colors"
                >
                  Enviar mensagem →
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#B68D40]/10 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-[#B68D40]" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-semibold text-[#290D04] mb-1">Endereço</h3>
                <p className="text-sm text-[#290D04]/70">{s.endereco || "Rua das Oliveiras, 250 - Vila Madalena, São Paulo - SP"}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#B68D40]/10 flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4 text-[#B68D40]" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-semibold text-[#290D04] mb-1">Horário</h3>
                <p className="text-sm text-[#290D04]/70">{s.horarioFuncionamento || "Terça a Domingo: 11h30 - 15h00 | 18h00 - 23h00"}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#290D04]/10 flex items-center justify-center shrink-0">
                <Truck className="w-4 h-4 text-[#290D04]" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-semibold text-[#290D04] mb-1">Delivery</h3>
                <a
                  href={s.deliveryUrl || "https://delivery.granforno.com.br"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#290D04]/70 hover:text-[#B68D40] transition-colors"
                >
                  Peça pelo delivery →
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl overflow-hidden h-[400px] md:h-full min-h-[400px] border border-[#290D04]/5"
          >
            <iframe
              src="https://www.openstreetmap.org/export/embed.html?bbox=-46.6980%2C-23.5580%2C-46.6850%2C-23.5480&layer=mapnik&marker=-23.5530%2C-46.6915"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Localização do Gran Forno e Cozinha"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
