import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { galleryService } from "@/api/services";
import { formatImageUrl } from "@/api/client";
import { motion } from "framer-motion";
import SkeletonCard from "@/components/ui/SkeletonCard";

export default function FeaturedGallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    galleryService.getAll({ limit: 8 })
      .then((res) => setImages(res.data || []))
      .catch(() => setImages([]))
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
                  src={formatImageUrl(img.imagem)}
                  alt={img.titulo}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => { e.target.style.display = 'none' }}
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