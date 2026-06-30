import React, { useState, useEffect } from "react";
import { galleryService } from "@/api/services";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const CATEGORIES = ["Todos", "Ambiente", "Pratos", "Eventos", "Equipe", "Detalhes"];

export default function Galeria() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    galleryService.getAll()
      .then((res) => setImages(res.data || []))
      .catch(() => setImages([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = activeCategory === "Todos" ? images : images.filter((img) => img.categoria === activeCategory);

  return (
    <div className="pt-20 md:pt-24 pb-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-interactive text-xs uppercase tracking-[0.3em] text-[#B68D40] mb-4">Nossos Momentos</p>
          <h1 className="font-heading text-4xl md:text-6xl font-semibold text-[#290D04]">Galeria</h1>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full font-interactive text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-[#290D04] text-[#FAF3E2]"
                  : "bg-[#290D04]/5 text-[#290D04]/70 hover:bg-[#290D04]/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <LoadingSpinner size="lg" className="py-20" />
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[#290D04]/50 text-lg">Nenhuma imagem encontrada.</p>
          </div>
        ) : (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {filtered.map((img, i) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="break-inside-avoid group cursor-pointer"
                onClick={() => setLightbox(img)}
              >
                <div className="relative rounded-2xl overflow-hidden">
                  <img
                    src={img.imagem}
                    alt={img.titulo}
                    className="w-full h-auto object-contain rounded-2xl transition-transform duration-700 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-[#290D04]/0 group-hover:bg-[#290D04]/20 transition-colors duration-500 rounded-2xl flex items-end p-4">
                    <div className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <p className="text-[#FAF3E2] font-interactive text-sm font-medium">{img.titulo}</p>
                      {img.categoria && <p className="text-[#FAF3E2]/70 text-xs">{img.categoria}</p>}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#290D04]/95 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-6 right-6 text-[#FAF3E2]/70 hover:text-[#FAF3E2] transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-5xl max-h-[85vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightbox.imagem}
                alt={lightbox.titulo}
                className="w-full h-full object-contain rounded-xl"
              />
              <div className="text-center mt-4">
                <p className="text-[#FAF3E2] font-heading text-xl">{lightbox.titulo}</p>
                {lightbox.descricao && <p className="text-[#FAF3E2]/60 text-sm mt-1">{lightbox.descricao}</p>}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
