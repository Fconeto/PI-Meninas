import React, { useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Eye, EyeOff } from "lucide-react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function Register() {
  const [step, setStep] = useState("register");
  const [form, setForm] = useState({ full_name: "", email: "", phone: "", password: "", confirmPassword: "" });
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!form.full_name || !form.email || !form.phone || !form.password || !form.confirmPassword) {
      setError("Preencha todos os campos.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }
    if (form.password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await base44.auth.register({ email: form.email, password: form.password, full_name: form.full_name, phone: form.phone });
      setStep("otp");
    } catch (err) {
      setError("Erro ao criar conta. Verifique se o email já está cadastrado.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) { setError("Digite o código de verificação."); return; }
    setError("");
    setLoading(true);
    try {
      const result = await base44.auth.verifyOtp({ email: form.email, otpCode: otp });
      base44.auth.setToken(result.access_token);
      window.location.href = "/";
    } catch {
      setError("Código inválido. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await base44.auth.resendOtp(form.email);
    } catch {}
  };

  const handleGoogle = () => {
    base44.auth.loginWithProvider("google", "/");
  };

  if (step === "otp") {
    return (
      <div className="min-h-screen bg-[#FAF3E2] flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h1 className="font-heading text-3xl font-semibold text-[#290D04]">Verificação</h1>
            <p className="text-sm text-[#290D04]/50 mt-2">Enviamos um código para {form.email}</p>
          </div>
          <div className="p-8 rounded-2xl bg-white/60 border border-[#290D04]/5">
            <form onSubmit={handleVerifyOtp} className="space-y-5">
              <div>
                <label className="block text-sm font-interactive font-medium text-[#290D04]/80 mb-1">Código de Verificação</label>
                <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-[#FAF3E2] border border-[#290D04]/10 text-sm text-[#290D04] text-center tracking-[0.5em] focus:outline-none focus:ring-2 focus:ring-[#B68D40]/50" placeholder="000000" maxLength={6} />
              </div>
              {error && <p className="text-sm text-red-600 text-center">{error}</p>}
              <button type="submit" disabled={loading} className="w-full py-3.5 bg-[#290D04] text-[#FAF3E2] rounded-full font-interactive text-sm font-semibold hover:bg-[#3D1A0C] disabled:opacity-50 transition-all flex items-center justify-center gap-2">
                {loading ? <LoadingSpinner size="sm" /> : "Verificar"}
              </button>
            </form>
            <button onClick={handleResend} className="w-full text-center text-sm text-[#B68D40] mt-4 hover:text-[#290D04] font-interactive transition-colors">
              Reenviar código
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF3E2] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link to="/" className="inline-block">
            <h1 className="font-heading text-3xl font-semibold text-[#290D04]">Gran Forno <span className="font-light italic">&</span> Cozinha</h1>
          </Link>
          <p className="text-sm text-[#290D04]/50 mt-2">Criar nova conta</p>
        </div>

        <div className="p-8 rounded-2xl bg-white/60 border border-[#290D04]/5">
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-interactive font-medium text-[#290D04]/80 mb-1">Nome *</label>
              <input type="text" value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-[#FAF3E2] border border-[#290D04]/10 text-sm text-[#290D04] focus:outline-none focus:ring-2 focus:ring-[#B68D40]/50" placeholder="Seu nome completo" />
            </div>
            <div>
              <label className="block text-sm font-interactive font-medium text-[#290D04]/80 mb-1">Email *</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-[#FAF3E2] border border-[#290D04]/10 text-sm text-[#290D04] focus:outline-none focus:ring-2 focus:ring-[#B68D40]/50" placeholder="seu@email.com" />
            </div>
            <div>
              <label className="block text-sm font-interactive font-medium text-[#290D04]/80 mb-1">Telefone *</label>
              <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-[#FAF3E2] border border-[#290D04]/10 text-sm text-[#290D04] focus:outline-none focus:ring-2 focus:ring-[#B68D40]/50" placeholder="(11) 99999-9999" />
            </div>
            <div>
              <label className="block text-sm font-interactive font-medium text-[#290D04]/80 mb-1">Senha *</label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-[#FAF3E2] border border-[#290D04]/10 text-sm text-[#290D04] focus:outline-none focus:ring-2 focus:ring-[#B68D40]/50 pr-10" placeholder="Mínimo 6 caracteres" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#290D04]/30 hover:text-[#290D04]/60">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-interactive font-medium text-[#290D04]/80 mb-1">Confirmar Senha *</label>
              <input type="password" value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-[#FAF3E2] border border-[#290D04]/10 text-sm text-[#290D04] focus:outline-none focus:ring-2 focus:ring-[#B68D40]/50" placeholder="Repita a senha" />
            </div>

            {error && <p className="text-sm text-red-600 text-center">{error}</p>}

            <button type="submit" disabled={loading} className="w-full py-3.5 bg-[#290D04] text-[#FAF3E2] rounded-full font-interactive text-sm font-semibold tracking-wide hover:bg-[#3D1A0C] disabled:opacity-50 transition-all flex items-center justify-center gap-2">
              {loading ? <LoadingSpinner size="sm" /> : "Criar Conta"}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#290D04]/10" /></div>
            <div className="relative flex justify-center text-xs"><span className="bg-white/60 px-3 text-[#290D04]/40 font-interactive">ou</span></div>
          </div>

          <button onClick={handleGoogle} className="w-full py-3 border border-[#290D04]/10 rounded-full font-interactive text-sm font-medium text-[#290D04] hover:bg-[#290D04]/5 transition-colors flex items-center justify-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Cadastrar com Google
          </button>

          <p className="text-center text-sm text-[#290D04]/50 mt-6">
            Já tem conta?{" "}
            <Link to="/login" className="text-[#B68D40] font-medium hover:text-[#290D04] transition-colors">Entrar</Link>
          </p>
        </div>
      </div>
    </div>
  );
}