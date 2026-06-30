import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useAuth } from "@/lib/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) { setError("Preencha todos os campos."); return; }
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err.data?.message || "Email ou senha incorretos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF3E2] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link to="/" className="inline-block">
            <h1 className="font-heading text-3xl font-semibold text-[#290D04]">Gran Forno <span className="font-light italic">&</span> Cozinha</h1>
          </Link>
          <p className="text-sm text-[#290D04]/50 mt-2">Bem-vindo de volta</p>
        </div>

        <div className="p-8 rounded-2xl bg-white/60 border border-[#290D04]/5">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-interactive font-medium text-[#290D04]/80 mb-1">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-[#FAF3E2] border border-[#290D04]/10 text-sm text-[#290D04] focus:outline-none focus:ring-2 focus:ring-[#B68D40]/50 transition-all" placeholder="seu@email.com" />
            </div>
            <div>
              <label className="block text-sm font-interactive font-medium text-[#290D04]/80 mb-1">Senha</label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-[#FAF3E2] border border-[#290D04]/10 text-sm text-[#290D04] focus:outline-none focus:ring-2 focus:ring-[#B68D40]/50 transition-all pr-10" placeholder="••••••••" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#290D04]/30 hover:text-[#290D04]/60">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && <p className="text-sm text-red-600 text-center">{error}</p>}

            <button type="submit" disabled={loading} className="w-full py-3.5 bg-[#290D04] text-[#FAF3E2] rounded-full font-interactive text-sm font-semibold tracking-wide hover:bg-[#3D1A0C] disabled:opacity-50 transition-all flex items-center justify-center gap-2">
              {loading ? <LoadingSpinner size="sm" /> : "Entrar"}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#290D04]/10" /></div>
            <div className="relative flex justify-center text-xs"><span className="bg-white/60 px-3 text-[#290D04]/40 font-interactive">ou</span></div>
          </div>

          <p className="text-center text-sm text-[#290D04]/50 mt-6">
            Não tem conta?{" "}
            <Link to="/register" className="text-[#B68D40] font-medium hover:text-[#290D04] transition-colors">Criar conta</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
