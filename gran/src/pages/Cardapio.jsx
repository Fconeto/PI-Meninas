import React, { useState, useEffect } from "react";
import { productsService } from "@/api/services";
import { formatImageUrl } from "@/api/client";
import { Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SkeletonCard from "@/components/ui/SkeletonCard";

const CATEGORIES = ["Todos", "Entradas", "Massas", "Carnes", "Sobremesas", "Bebidas"];

export default function Cardapio() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [search, setSearch] = useState("");

  useEffect(() => {
    productsService.getAll({ ativo: true })
      .then((res) => setProducts(res.data || []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = products.filter((p) => {
    const matchCategory = activeCategory === "Todos" || p.categoria === activeCategory;
    const matchSearch = !search || p.nome.toLowerCase().includes(search.toLowerCase()) ||
      (p.descricao || "").toLowerCase().includes(search.toLowerCase()) ||
      (p.ingredientes || "").toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="pt-20 md:pt-24 pb-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-interactive text-xs uppercase tracking-[0.3em] text-[#B68D40] mb-4">Nossos Pratos</p>
          <h1 className="font-heading text-4xl md:text-6xl font-semibold text-[#290D04]">Cardápio</h1>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="flex flex-wrap justify-center gap-2">
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

          <div className="relative w-full md:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#290D04]/40" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar no cardápio..."
              className="w-full pl-11 pr-4 py-2.5 rounded-full bg-white/80 border border-[#290D04]/10 text-sm text-[#290D04] placeholder:text-[#290D04]/40 focus:outline-none focus:ring-2 focus:ring-[#B68D40]/50 transition-all"
            />
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[#290D04]/50 text-lg">Nenhum item encontrado.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filtered.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="group rounded-2xl bg-white/60 border border-[#290D04]/5 overflow-hidden hover:shadow-lg transition-shadow duration-500"
                >
                  {product.imagem && (
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={formatImageUrl(product.imagem)}
                        alt={product.nome}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 rounded-full bg-[#290D04]/80 text-[#FAF3E2] font-interactive text-xs font-medium">
                          {product.categoria}
                        </span>
                      </div>
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-heading text-xl font-semibold text-[#290D04]">{product.nome}</h3>
                      <span className="font-interactive text-lg font-bold text-[#B68D40] whitespace-nowrap ml-3">
                        R$ {Number(product.preco).toFixed(2).replace(".", ",")}
                      </span>
                    </div>
                    {product.descricao && (
                      <p className="text-sm text-[#290D04]/60 leading-relaxed mb-3">{product.descricao}</p>
                    )}
                    {product.ingredientes && (
                      <p className="text-xs text-[#290D04]/50 italic">
                        <span className="font-medium not-italic text-[#290D04]/70">Ingredientes:</span> {product.ingredientes}
                      </p>
                    )}
                    {product.observacoes && (
                      <p className="text-xs text-[#B68D40] mt-2 font-medium">{product.observacoes}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
