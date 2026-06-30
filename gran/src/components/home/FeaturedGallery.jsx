import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { motion } from "framer-motion";
import SkeletonCard from "@/components/ui/SkeletonCard";

const FALLBACK_IMAGES = [
  { id: 1, imagem: "https://media.base44.com/images/public/6a432e114bb86f415a640016/bbb0c4a93_generated_23d13209.png", titulo: "Pasta Artesanal" },
  { id: 2, imagem: "https://media.base44.com/images/public/6a432e114bb86f415a640016/9488d29d2_generated_1e103989.png", titulo: "Tiramisù" },
  { id: 3, imagem: "https://media.base44.com/images/public/6a432e114bb86f415a640016/09ca9fdae_generated_bab7d7bf.png", titulo: "Tagliata" },
  { id: 4, imagem: "https://media.base44.com/images/public/6a432e114bb86f415a640016/10dc5caeb_generated_86b8b615.png", titulo: "Bruschetta" },
  { id: 5, imagem: "https://media.base44.com/images/public/6a432e114bb86f415a640016/0930cbaa2_generated_5381308e.png", titulo: "Vinho" },
  { id: 6, imagem: "https://media.base44.com/images/public/6a432e114bb86f415a640016/1ec08be24_generated_526d99c6.png", titulo: "Massa Fresca" },
  { id: 7, imagem: "https://media.base44.com/images/public/6a432e114bb86f415a640016/aae2ae6f0_generated_c634d1d0.png", titulo: "Forno a Lenha" },
  { id: 8, imagem: "https://media.base44.com/images/public/6a432e114bb86f415a640016/59551f141_generated_5da9cc9d.png", titulo: "Ambiente" },
];

export default function FeaturedGallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.GalleryImage.list("-created_date", 8)
      .then((data) => setImages(data.length > 0 ? data : FALLBACK_IMAGES))
      .catch(() => setImages(FALLBACK_IMAGES))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-24 md:py-32 px-4 bg-[#290D04]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-interactive text-xs uppercase tracking-[0.3em] text-[#B68D40] mb-4">Galeria</p>
          <h2 className="font-heading text-4xl md:text-5xl font-semibold text-[#FAF3E2]">
            Momentos em destaque
          </h2>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} className="h-64" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {images.slice(0, 8).map((img, i) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className={`relative rounded-2xl overflow-hidden group cursor-pointer ${
                  i === 0 || i === 5 ? "md:row-span-2 md:h-full" : "h-48 md:h-56"
                }`}
              >
                <img
                  src={img.imagem}
                  alt={img.titulo}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[#290D04]/0 group-hover:bg-[#290D04]/30 transition-colors duration-500 flex items-end p-4">
                  <span className="text-[#FAF3E2] font-interactive text-sm font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    {img.titulo}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            to="/galeria"
            className="inline-block px-8 py-3.5 border border-[#B68D40] text-[#B68D40] rounded-full font-interactive text-sm font-semibold tracking-wide hover:bg-[#B68D40] hover:text-[#FAF3E2] transition-all duration-300"
          >
            Ver Galeria Completa
          </Link>
        </motion.div>
      </div>
    </section>
  );
}