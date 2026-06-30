import React, { useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Eye, EyeOff } from "lucide-react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function Login() {
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
      await base44.auth.loginViaEmailPassword(email, password);
      window.location.href = "/";
    } catch (err) {
      setError("Email ou senha incorretos.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = () => {
    base44.auth.loginWithProvider("google", "/");
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

          <button onClick={handleGoogle} className="w-full py-3 border border-[#290D04]/10 rounded-full font-interactive text-sm font-medium text-[#290D04] hover:bg-[#290D04]/5 transition-colors flex items-center justify-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Entrar com Google
          </button>

          <p className="text-center text-sm text-[#290D04]/50 mt-6">
            Não tem conta?{" "}
            <Link to="/register" className="text-[#B68D40] font-medium hover:text-[#290D04] transition-colors">Criar conta</Link>
          </p>
        </div>
      </div>
    </div>
  );
}