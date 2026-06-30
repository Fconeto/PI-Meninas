import React from "react";
import { Link } from "react-router-dom";
import { Phone, MapPin, Clock, Instagram, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#290D04] text-[#FAF3E2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <h3 className="font-heading text-2xl font-semibold mb-4">
              Gran Forno <span className="font-light">&</span> Cozinha
            </h3>
            <p className="text-[#FAF3E2]/70 text-sm leading-relaxed">
              Tradição italiana com alma brasileira. Cada prato carrega o calor do nosso forno a lenha e o carinho da nossa cozinha artesanal.
            </p>
          </div>

          <div>
            <h4 className="font-interactive text-sm font-semibold uppercase tracking-wider text-[#B68D40] mb-4">Navegação</h4>
            <div className="space-y-3">
              <Link to="/" className="block text-sm text-[#FAF3E2]/70 hover:text-[#B68D40] transition-colors">Home</Link>
              <Link to="/cardapio" className="block text-sm text-[#FAF3E2]/70 hover:text-[#B68D40] transition-colors">Cardápio</Link>
              <Link to="/reserva" className="block text-sm text-[#FAF3E2]/70 hover:text-[#B68D40] transition-colors">Reserva</Link>
              <Link to="/galeria" className="block text-sm text-[#FAF3E2]/70 hover:text-[#B68D40] transition-colors">Galeria</Link>
              <Link to="/contato" className="block text-sm text-[#FAF3E2]/70 hover:text-[#B68D40] transition-colors">Contato</Link>
            </div>
          </div>

          <div>
            <h4 className="font-interactive text-sm font-semibold uppercase tracking-wider text-[#B68D40] mb-4">Contato</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-0.5 text-[#B68D40]" />
                <span className="text-sm text-[#FAF3E2]/70">(11) 3456-7890</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-[#B68D40]" />
                <span className="text-sm text-[#FAF3E2]/70">Rua das Oliveiras, 250<br />Vila Madalena, São Paulo - SP</span>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 mt-0.5 text-[#B68D40]" />
                <span className="text-sm text-[#FAF3E2]/70">Terça a Domingo<br />11h30 - 15h00 | 18h00 - 23h00</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-interactive text-sm font-semibold uppercase tracking-wider text-[#B68D40] mb-4">Redes Sociais</h4>
            <div className="flex gap-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#FAF3E2]/10 flex items-center justify-center hover:bg-[#B68D40] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#FAF3E2]/10 flex items-center justify-center hover:bg-[#B68D40] transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
            <div className="mt-6 space-y-2">
              <a href="https://wa.me/5511934567890" target="_blank" rel="noopener noreferrer" className="block text-sm font-interactive font-medium text-[#B68D40] hover:text-[#FAF3E2] transition-colors">
                WhatsApp →
              </a>
              <a href="https://delivery.granforno.com.br" target="_blank" rel="noopener noreferrer" className="block text-sm font-interactive font-medium text-[#B68D40] hover:text-[#FAF3E2] transition-colors">
                Delivery →
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-[#FAF3E2]/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#FAF3E2]/50">
            © {new Date().getFullYear()} Gran Forno e Cozinha. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            <Link to="/contato" className="text-xs text-[#FAF3E2]/50 hover:text-[#B68D40] transition-colors">Política de Privacidade</Link>
            <Link to="/contato" className="text-xs text-[#FAF3E2]/50 hover:text-[#B68D40] transition-colors">Termos de Uso</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}