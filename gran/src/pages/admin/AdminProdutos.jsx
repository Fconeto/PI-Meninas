import React, { useState, useEffect } from "react";
import { productsService, uploadService } from "@/api/services";
import { Plus, Edit2, Trash2, X, Search } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const CATEGORIES = ["Entradas", "Massas", "Carnes", "Sobremesas", "Bebidas"];
const EMPTY = { nome: "", descricao: "", ingredientes: "", preco: "", observacoes: "", categoria: "Massas", imagem: "", ativo: true };

export default function AdminProdutos() {
  const { toast } = useToast();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [search, setSearch] = useState("");
  const [uploading, setUploading] = useState(false);

  const load = () => {
    setLoading(true);
    productsService.getAll()
      .then((res) => setProducts(res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const openCreate = () => { setForm(EMPTY); setModal("create"); };
  const openEdit = (p) => { setForm({ ...p, preco: String(p.preco) }); setModal("edit"); };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const response = await uploadService.upload(file);
      setForm({ ...form, imagem: response.data.fileUrl });
    } catch {
      toast({ title: "Erro ao enviar imagem.", variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!form.nome || !form.preco || !form.categoria) {
      toast({ title: "Preencha nome, preço e categoria.", variant: "destructive" });
      return;
    }
    setSaving(true);
    const data = { ...form, preco: Number(form.preco) };
    try {
      if (modal === "create") {
        await productsService.create(data);
        toast({ title: "Produto cadastrado!" });
      } else {
        await productsService.update(form.id, data);
        toast({ title: "Produto atualizado!" });
      }
      setModal(null);
      load();
    } catch {
      toast({ title: "Erro ao salvar produto.", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este produto?")) return;
    try {
      await productsService.delete(id);
      toast({ title: "Produto excluído." });
      load();
    } catch {
      toast({ title: "Erro ao excluir.", variant: "destructive" });
    }
  };

  const filtered = products.filter((p) => p.nome.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading text-3xl font-semibold text-[#290D04]">Produtos</h1>
        <button onClick={openCreate} className="flex items-center gap-2 px-5 py-2.5 bg-[#B68D40] text-[#FAF3E2] rounded-full font-interactive text-sm font-semibold hover:bg-[#C9A050] transition-colors">
          <Plus className="w-4 h-4" /> Novo Produto
        </button>
      </div>

      <div className="relative w-full md:w-72 mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#290D04]/40" />
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar produto..." className="w-full pl-11 pr-4 py-2.5 rounded-full bg-white/80 border border-[#290D04]/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#B68D40]/50" />
      </div>

      {loading ? (
        <LoadingSpinner size="lg" className="py-20" />
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 rounded-2xl bg-white/60 border border-[#290D04]/5">
          <p className="text-[#290D04]/50">Nenhum produto cadastrado.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((p) => (
            <div key={p.id} className="rounded-2xl bg-white/60 border border-[#290D04]/5 overflow-hidden">
              {p.imagem && <img src={p.imagem} alt={p.nome} className="w-full h-40 object-cover" />}
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-[#290D04]">{p.nome}</h3>
                    <span className="text-xs text-[#B68D40] font-interactive">{p.categoria}</span>
                  </div>
                  <span className="font-interactive text-lg font-bold text-[#B68D40]">R$ {Number(p.preco).toFixed(2).replace(".", ",")}</span>
                </div>
                {p.descricao && <p className="text-xs text-[#290D04]/60 mt-1 line-clamp-2">{p.descricao}</p>}
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-[#290D04]/5">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-interactive ${p.ativo ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {p.ativo ? "Ativo" : "Inativo"}
                  </span>
                  <div className="ml-auto flex gap-2">
                    <button onClick={() => openEdit(p)} className="p-2 text-[#290D04]/40 hover:text-[#B68D40] transition-colors"><Edit2 className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(p.id)} className="p-2 text-[#290D04]/40 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setModal(null)}>
          <div className="bg-[#FAF3E2] rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-2xl font-semibold text-[#290D04]">{modal === "create" ? "Novo Produto" : "Editar Produto"}</h2>
              <button onClick={() => setModal(null)} className="text-[#290D04]/40 hover:text-[#290D04]"><X className="w-5 h-5" /></button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-interactive font-medium text-[#290D04]/80 mb-1">Nome *</label>
                <input type="text" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-white/80 border border-[#290D04]/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#B68D40]/50" />
              </div>
              <div>
                <label className="block text-sm font-interactive font-medium text-[#290D04]/80 mb-1">Preço *</label>
                <input type="number" step="0.01" value={form.preco} onChange={(e) => setForm({ ...form, preco: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-white/80 border border-[#290D04]/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#B68D40]/50" />
              </div>
              <div>
                <label className="block text-sm font-interactive font-medium text-[#290D04]/80 mb-1">Categoria *</label>
                <select value={form.categoria} onChange={(e) => setForm({ ...form, categoria: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-white/80 border border-[#290D04]/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#B68D40]/50">
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-interactive font-medium text-[#290D04]/80 mb-1">Descrição</label>
                <textarea value={form.descricao} onChange={(e) => setForm({ ...form, descricao: e.target.value })} rows={2} className="w-full px-4 py-2.5 rounded-xl bg-white/80 border border-[#290D04]/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#B68D40]/50 resize-none" />
              </div>
              <div>
                <label className="block text-sm font-interactive font-medium text-[#290D04]/80 mb-1">Ingredientes</label>
                <input type="text" value={form.ingredientes} onChange={(e) => setForm({ ...form, ingredientes: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-white/80 border border-[#290D04]/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#B68D40]/50" />
              </div>
              <div>
                <label className="block text-sm font-interactive font-medium text-[#290D04]/80 mb-1">Observações</label>
                <input type="text" value={form.observacoes} onChange={(e) => setForm({ ...form, observacoes: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-white/80 border border-[#290D04]/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#B68D40]/50" />
              </div>
              <div>
                <label className="block text-sm font-interactive font-medium text-[#290D04]/80 mb-1">Imagem</label>
                {form.imagem && <img src={form.imagem} alt="Preview" className="w-full h-32 object-cover rounded-xl mb-2" />}
                <input type="file" accept="image/*" onChange={handleImageUpload} className="text-sm text-[#290D04]/60" />
                {uploading && <LoadingSpinner size="sm" className="mt-2" />}
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="ativo" checked={form.ativo} onChange={(e) => setForm({ ...form, ativo: e.target.checked })} className="w-4 h-4 rounded accent-[#B68D40]" />
                <label htmlFor="ativo" className="text-sm font-interactive text-[#290D04]/80">Disponível no cardápio</label>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button onClick={() => setModal(null)} className="flex-1 py-2.5 border border-[#290D04]/10 rounded-full font-interactive text-sm font-medium text-[#290D04]/60 hover:text-[#290D04] transition-colors">Cancelar</button>
              <button onClick={handleSave} disabled={saving} className="flex-1 py-2.5 bg-[#B68D40] text-[#FAF3E2] rounded-full font-interactive text-sm font-semibold hover:bg-[#C9A050] disabled:opacity-50 transition-colors flex items-center justify-center gap-2">
                {saving ? <LoadingSpinner size="sm" /> : "Salvar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
