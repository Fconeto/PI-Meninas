import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import ScrollToTop from './components/ScrollToTop';

import PublicLayout from '@/components/layout/PublicLayout';
import AdminLayout from '@/components/admin/AdminLayout';
import Home from '@/pages/Home';
import Cardapio from '@/pages/Cardapio';
import Galeria from '@/pages/Galeria';
import Contato from '@/pages/Contato';
import Reserva from '@/pages/Reserva';
import Perfil from '@/pages/Perfil';
import EditarPerfil from '@/pages/EditarPerfil';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import DashboardHome from '@/pages/admin/DashboardHome';
import AdminProdutos from '@/pages/admin/AdminProdutos';
import AdminGaleria from '@/pages/admin/AdminGaleria';
import AdminReservas from '@/pages/admin/AdminReservas';
import AdminConfiguracoes from '@/pages/admin/AdminConfiguracoes';

const AuthenticatedApp = () => {
  const { isLoadingAuth } = useAuth();

  if (isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#FAF3E2]">
        <div className="w-8 h-8 border-2 border-[#290D04]/20 border-t-[#B68D40] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/cardapio" element={<Cardapio />} />
        <Route path="/galeria" element={<Galeria />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/reserva" element={<Reserva />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/perfil/editar" element={<EditarPerfil />} />
      </Route>

      <Route element={<AdminLayout />}>
        <Route path="/dashboard" element={<DashboardHome />} />
        <Route path="/dashboard/produtos" element={<AdminProdutos />} />
        <Route path="/dashboard/galeria" element={<AdminGaleria />} />
        <Route path="/dashboard/reservas" element={<AdminReservas />} />
        <Route path="/dashboard/configuracoes" element={<AdminConfiguracoes />} />
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App
