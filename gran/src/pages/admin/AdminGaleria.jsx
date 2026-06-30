import React, { useState, useEffect } from "react";
import { galleryService, uploadService } from "@/api/services";
import { Plus, Edit2, Trash2, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const CATEGORIES = ["Ambiente", "Pratos", "Eventos", "Equipe", "Detalhes"];
const EMPTY = { titulo: "", descricao: "", categoria: "Pratos", imagem: "" };

export default function AdminGaleria() {
  const { toast } = useToast();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [uploading, setUploading] = useState(false);

  const load = () => {
    setLoading(true);
    galleryService.getAll()
      .then((res) => setImages(res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const openCreate = () => { setForm(EMPTY); setModal("create"); };
  const openEdit = (img) => { setForm({ ...img }); setModal("edit"); };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setUploading(true);
    try {
      if (modal === "create" && files.length > 1) {
        const urls = [];
        for (const file of files) {
          const response = await uploadService.upload(file);
          urls.push(response.data.fileUrl);
        }
        for (const url of urls) {
          await galleryService.create({ titulo: "Nova Imagem", categoria: form.categoria, imagem: url });
        }
        toast({ title: `${urls.length} imagens adicionadas!` });
        setModal(null);
        load();
      } else {
        const response = await uploadService.upload(files[0]);
        setForm({ ...form, imagem: response.data.fileUrl });
      }
    } catch {
      toast({ title: "Erro ao enviar imagem.", variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!form.titulo || !form.imagem) {
      toast({ title: "Preencha título e imagem.", variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      if (modal === "create") {
        await galleryService.create(form);
        toast({ title: "Imagem adicionada!" });
      } else {
        await galleryService.update(form.id, form);
        toast({ title: "Imagem atualizada!" });
      }
      setModal(null);
      load();
    } catch {
      toast({ title: "Erro ao salvar.", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir esta imagem?")) return;
    try {
      await galleryService.delete(id);
      toast({ title: "Imagem excluída." });
      load();
    } catch {
      toast({ title: "Erro ao excluir.", variant: "destructive" });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading text-3xl font-semibold text-[#290D04]">Galeria</h1>
        <button onClick={openCreate} className="flex items-center gap-2 px-5 py-2.5 bg-[#B68D40] text-[#FAF3E2] rounded-full font-interactive text-sm font-semibold hover:bg-[#C9A050] transition-colors">
          <Plus className="w-4 h-4" /> Adicionar
        </button>
      </div>

      {loading ? (
        <LoadingSpinner size="lg" className="py-20" />
      ) : images.length === 0 ? (
        <div className="text-center py-20 rounded-2xl bg-white/60 border border-[#290D04]/5">
          <p className="text-[#290D04]/50">Nenhuma imagem cadastrada.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img) => (
            <div key={img.id} className="relative group rounded-2xl overflow-hidden">
              <img src={img.imagem} alt={img.titulo} className="w-full h-48 object-cover" />
              <div className="absolute inset-0 bg-[#290D04]/0 group-hover:bg-[#290D04]/60 transition-colors duration-300 flex items-center justify-center gap-3">
                <button onClick={() => openEdit(img)} className="opacity-0 group-hover:opacity-100 w-10 h-10 rounded-full bg-white/20 text-white hover:bg-white/30 flex items-center justify-center transition-all">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(img.id)} className="opacity-0 group-hover:opacity-100 w-10 h-10 rounded-full bg-red-500/50 text-white hover:bg-red-500/70 flex items-center justify-center transition-all">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-[#290D04]/80">
                <p className="text-white text-xs font-interactive truncate">{img.titulo}</p>
                {img.categoria && <span className="text-white/60 text-xs">{img.categoria}</span>}
              </div>
            </div>
          ))}
        </div>
      )}

      {modal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setModal(null)}>
          <div className="bg-[#FAF3E2] rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-2xl font-semibold text-[#290D04]">{modal === "create" ? "Adicionar Imagem" : "Editar Imagem"}</h2>
              <button onClick={() => setModal(null)} className="text-[#290D04]/40 hover:text-[#290D04]"><X className="w-5 h-5" /></button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-interactive font-medium text-[#290D04]/80 mb-1">Título *</label>
                <input type="text" value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-white/80 border border-[#290D04]/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#B68D40]/50" />
              </div>
              <div>
                <label className="block text-sm font-interactive font-medium text-[#290D04]/80 mb-1">Categoria</label>
                <select value={form.categoria} onChange={(e) => setForm({ ...form, categoria: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-white/80 border border-[#290D04]/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#B68D40]/50">
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-interactive font-medium text-[#290D04]/80 mb-1">Descrição</label>
                <textarea value={form.descricao} onChange={(e) => setForm({ ...form, descricao: e.target.value })} rows={2} className="w-full px-4 py-2.5 rounded-xl bg-white/80 border border-[#290D04]/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#B68D40]/50 resize-none" />
              </div>
              <div>
                <label className="block text-sm font-interactive font-medium text-[#290D04]/80 mb-1">
                  {modal === "create" ? "Imagens * (upload múltiplo)" : "Imagem *"}
                </label>
                {form.imagem && <img src={form.imagem} alt="Preview" className="w-full h-40 object-cover rounded-xl mb-2" />}
                <input type="file" accept="image/*" multiple={modal === "create"} onChange={handleImageUpload} className="text-sm text-[#290D04]/60" />
                {uploading && <LoadingSpinner size="sm" className="mt-2" />}
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
