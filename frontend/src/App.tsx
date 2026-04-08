import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./components/pages/Home";
import { SolucionesPage } from "./components/pages/SolucionesPage";
import { SectoresPage } from "./components/pages/SectoresPage";
import { NovedadesPage } from "./components/pages/NovedadesPage";
import { NosotrosPage } from "./components/pages/NosotrosPage";
import { ConsultoriaEmpresarial } from "./components/pages/ConsultoriaEmpresarial";
import { AuditoriaPage, CalculadoraPage, Crud, IndustrialPage, GestionPage, Login, OutsourcingPage, FinancieroPage, LogisticoPage } from "./components";
import { EmpresarialesPage } from "./components/pages/EmpresarialesPage";
import { NovedadeSubPage } from "./components/pages/NovedadeSubPage";
import { ScrollToTop } from "./components/ScrollTop";
import { LoginPage } from "./components/LoginPage/LoginPage";
import { RecoverCredentials } from "./components/LoginPage/RecoverCredentials";
import ResetPassword from "./components/LoginPage/ResetPassword";
import OTPVerification from "./components/LoginPage/OTPVerification";
import SuccessVerification from "./components/LoginPage/SuccessVerification";
import IntranetLayout from "./components/pages/Intranet/IntranetLayout";
import LayoutCliente from "./components/IntranetClients/LayoutCliente";
import { ProtectedRoute } from "./ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/soluciones" element={<SolucionesPage />} />
        <Route path="/soluciones/consultoria-empresarial" element={<ConsultoriaEmpresarial />} />
        <Route path="/soluciones/gestion-tributaria" element={<GestionPage />} />
        <Route path="/soluciones/outsourcing" element={<OutsourcingPage />} />
        <Route path="/soluciones/auditoria" element={<AuditoriaPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sectores" element={<SectoresPage />} />
        <Route path="/novedades" element={<NovedadesPage />} />
        <Route path="/sectores/financiero" element={<FinancieroPage />} />
        <Route path="/sectores/industrial-comercial" element={<IndustrialPage />} />
        <Route path="/sectores/servicios-empresariales" element={<EmpresarialesPage />} />
        <Route path="/sectores/logistico-portuario" element={<LogisticoPage />} />

        <Route path="/novedades-sub" element={<NovedadeSubPage />} />
        <Route path="/calculadora" element={<CalculadoraPage />} />
        <Route path="/nosotros" element={<NosotrosPage />} />
        <Route path="/crud" element={<Crud />} />
        <Route path="/loginPage" element={<LoginPage />} />
        <Route path="/login/recover-credentials" element={< RecoverCredentials />} />
        <Route path="/login/resetPassword" element={< ResetPassword />} />
        <Route path="/login/OTP" element={< OTPVerification />} />
        <Route path="/login/success" element={< SuccessVerification />} />

        <Route element={<ProtectedRoute allowedRoles={[1]} />}>
          <Route path="/intranet" element={< IntranetLayout />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={[2]} />}>
          <Route path="/intranetClientes" element={< LayoutCliente />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;