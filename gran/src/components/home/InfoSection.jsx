import React from "react";
import { Clock, MapPin, Phone, MessageCircle, Truck } from "lucide-react";
import { motion } from "framer-motion";

export default function InfoSection() {
  const infoCards = [
    {
      icon: Clock,
      title: "Horário",
      lines: ["Terça a Sexta: 11h30 - 15h00 | 18h00 - 23h00", "Sábado e Domingo: 11h30 - 23h00", "Segunda: Fechado"],
    },
    {
      icon: MapPin,
      title: "Endereço",
      lines: ["Rua das Oliveiras, 250", "Vila Madalena", "São Paulo - SP, 05434-000"],
    },
    {
      icon: Phone,
      title: "Telefone",
      lines: ["(11) 3456-7890"],
    },
  ];

  return (
    <section className="py-24 md:py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-interactive text-xs uppercase tracking-[0.3em] text-[#B68D40] mb-4">Informações</p>
          <h2 className="font-heading text-4xl md:text-5xl font-semibold text-[#290D04]">
            Venha nos visitar
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {infoCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center p-8 rounded-2xl bg-white/50 border border-[#290D04]/5 hover:shadow-md transition-shadow duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-[#B68D40]/10 flex items-center justify-center mx-auto mb-5">
                <card.icon className="w-5 h-5 text-[#B68D40]" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-[#290D04] mb-3">{card.title}</h3>
              {card.lines.map((line, j) => (
                <p key={j} className="text-sm text-[#290D04]/60 leading-relaxed">{line}</p>
              ))}
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://wa.me/5511934567890"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-8 py-3.5 bg-[#25D366] text-white rounded-full font-interactive text-sm font-semibold hover:bg-[#20BD5A] transition-colors shadow-md"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </a>
          <a
            href="https://delivery.granforno.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-8 py-3.5 bg-[#290D04] text-[#FAF3E2] rounded-full font-interactive text-sm font-semibold hover:bg-[#3D1A0C] transition-colors shadow-md"
          >
            <Truck className="w-4 h-4" />
            Delivery
          </a>
        </div>
      </div>
    </section>
  );
}