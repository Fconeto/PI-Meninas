import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HERO_IMG = "https://media.base44.com/images/public/6a432e114bb86f415a640016/10ae4bd08_generated_a0665fa6.png";

export default function HeroSection() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={HERO_IMG} alt="Forno a lenha do Gran Forno e Cozinha" className="w-full h-full object-cover" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#290D04]/60 via-[#290D04]/40 to-[#290D04]/70" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <p className="font-interactive text-xs md:text-sm uppercase tracking-[0.3em] text-[#B68D40] mb-6">
            Tradição Italiana • Alma Brasileira
          </p>
          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-semibold text-[#FAF3E2] leading-tight mb-6">
            Gran Forno<br />
            <span className="font-light italic">&</span> Cozinha
          </h1>
          <p className="text-[#FAF3E2]/80 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Do forno a lenha à sua mesa, cada prato é uma celebração da culinária artesanal italiana com ingredientes selecionados e o carinho de quem ama cozinhar.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/reserva"
            className="px-8 py-3.5 bg-[#B68D40] text-[#FAF3E2] rounded-full font-interactive text-sm font-semibold tracking-wide hover:bg-[#C9A050] transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Reservar Mesa
          </Link>
          <Link
            to="/cardapio"
            className="px-8 py-3.5 border border-[#FAF3E2]/40 text-[#FAF3E2] rounded-full font-interactive text-sm font-semibold tracking-wide hover:bg-[#FAF3E2]/10 transition-all duration-300"
          >
            Ver Cardápio
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-5 h-8 border-2 border-[#FAF3E2]/40 rounded-full flex justify-center">
          <div className="w-1 h-2 bg-[#FAF3E2]/60 rounded-full mt-1.5 animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
}