import React from "react";
import { motion } from "framer-motion";

const ABOUT_IMG = "https://media.base44.com/images/public/6a432e114bb86f415a640016/59551f141_generated_5da9cc9d.png";

export default function AboutSection() {
  return (
    <section className="py-24 md:py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative rounded-2xl overflow-hidden">
              <img src={ABOUT_IMG} alt="Interior do restaurante Gran Forno e Cozinha" className="w-full h-[400px] md:h-[500px] object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#290D04]/20 to-transparent" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="font-interactive text-xs uppercase tracking-[0.3em] text-[#B68D40] mb-4">Nossa História</p>
            <h2 className="font-heading text-4xl md:text-5xl font-semibold text-[#290D04] mb-8 leading-tight">
              Uma tradição<br />que nasce do fogo
            </h2>
            <div className="space-y-5 text-[#290D04]/70 leading-relaxed">
              <p>
                O Gran Forno e Cozinha nasceu de um sonho simples: trazer para cada mesa o sabor autêntico da Itália, preparado com técnicas artesanais herdadas de gerações de cozinheiros apaixonados.
              </p>
              <p>
                Nosso forno a lenha é o coração da casa. É nele que as massas ganham a textura perfeita, as pizzas recebem aquela crocância inconfundível e os aromas se espalham por todo o ambiente, convidando cada visitante a uma experiência gastronômica única.
              </p>
              <p>
                Cada ingrediente é selecionado com cuidado, desde os tomates San Marzano importados até o azeite de oliva extra virgem prensado a frio. Acreditamos que a verdadeira culinária italiana não se resume a receitas — é sobre respeito à tradição, amor pelo ofício e a alegria de compartilhar uma boa mesa.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}