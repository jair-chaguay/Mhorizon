import { Suspense, lazy } from "react"; // 1. Importamos Suspense y lazy
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollTop";
import { ProtectedRoute } from "./ProtectedRoute";
import { AnalyticsTracker, CookieBanner } from "./components/Analytics";
import { PageSkeleton } from "./components/PageSkeleton";

const Home = lazy(() => import("./components/pages/Home").then(m => ({ default: m.Home })));
const MembresiaPage = lazy(() => import("./components/pages/MembresiaPage").then(m=> ({default: m.MembresiaPage})))
const SolucionesPage = lazy(() => import("./components/pages/SolucionesPage").then(m => ({ default: m.SolucionesPage })));
const SectoresPage = lazy(() => import("./components/pages/SectoresPage").then(m => ({ default: m.SectoresPage })));
const NovedadesPage = lazy(() => import("./components/pages/NovedadesPage").then(m => ({ default: m.NovedadesPage })));
const NosotrosPage = lazy(() => import("./components/pages/NosotrosPage").then(m => ({ default: m.NosotrosPage })));
const ConsultoriaEmpresarial = lazy(() => import("./components/pages/ConsultoriaEmpresarial").then(m => ({ default: m.ConsultoriaEmpresarial })));

const AuditoriaPage = lazy(() => import("./components").then(m => ({ default: m.AuditoriaPage })));
const CalculadoraPage = lazy(() => import("./components").then(m => ({ default: m.CalculadoraPage })));
const IndustrialPage = lazy(() => import("./components").then(m => ({ default: m.IndustrialPage })));
const GestionPage = lazy(() => import("./components").then(m => ({ default: m.GestionPage })));
const OutsourcingPage = lazy(() => import("./components").then(m => ({ default: m.OutsourcingPage })));
const FinancieroPage = lazy(() => import("./components").then(m => ({ default: m.FinancieroPage })));
const LogisticoPage = lazy(() => import("./components").then(m => ({ default: m.LogisticoPage })));

const EmpresarialesPage = lazy(() => import("./components/pages/EmpresarialesPage").then(m => ({ default: m.EmpresarialesPage })));
const NovedadeSubPage = lazy(() => import("./components/pages/NovedadeSubPage").then(m => ({ default: m.NovedadeSubPage })));
const LoginPage = lazy(() => import("./components/LoginPage/LoginPage").then(m => ({ default: m.LoginPage })));
const RecoverCredentials = lazy(() => import("./components/LoginPage/RecoverCredentials").then(m => ({ default: m.RecoverCredentials })));
const ResetPassword = lazy(() => import("./components/LoginPage/ResetPassword")); // Asumo que este ya era default
const OTPVerification = lazy(() => import("./components/LoginPage/OTPVerification")); // Asumo default
const SuccessVerification = lazy(() => import("./components/LoginPage/SuccessVerification")); // Asumo default
const IntranetLayout = lazy(() => import("./components/pages/Intranet/IntranetLayout")); // Asumo default
const LayoutCliente = lazy(() => import("./components/IntranetClients/LayoutCliente")); // Asumo default
const SistemaPage = lazy(() => import("./components/pages/SistemaPage").then(m => ({ default: m.SistemaPage })));
const PoliticasPage = lazy(() => import("./components/pages/PoliticasPage").then(m => ({ default: m.PoliticasPage })));
const TerminosPage = lazy(() => import("./components/pages/TerminosPage").then(m => ({ default: m.TerminosPage })));

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AnalyticsTracker />
      
      <Suspense fallback={
        <PageSkeleton />
      }>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/soluciones/membresia" element={<MembresiaPage/>}/>
          <Route path="/soluciones" element={<SolucionesPage />} />
          <Route path="/soluciones/consultoria-empresarial" element={<ConsultoriaEmpresarial />} />
          <Route path="/soluciones/gestion-tributaria" element={<GestionPage />} />
          <Route path="/soluciones/outsourcing" element={<OutsourcingPage />} />
          <Route path="/soluciones/auditoria" element={<AuditoriaPage />} />
          <Route path="/sectores" element={<SectoresPage />} />
          <Route path="/soluciones/sistema-normativo" element={<SistemaPage />} />
          <Route path="/novedades" element={<NovedadesPage />} />
          <Route path="/sectores/financiero" element={<FinancieroPage />} />
          <Route path="/sectores/industrial-comercial" element={<IndustrialPage />} />
          <Route path="/sectores/servicios-empresariales" element={<EmpresarialesPage />} />
          <Route path="/sectores/logistico-portuario" element={<LogisticoPage />} />
          <Route path="/politicas-de-privacidad" element={<PoliticasPage />} />
          <Route path="/terminos-de-uso" element={<TerminosPage />} />

          <Route path="/novedades-sub/:id" element={<NovedadeSubPage />} />
          <Route path="/calculadora" element={<CalculadoraPage />} />
          <Route path="/nosotros" element={<NosotrosPage />} />
          <Route path="/loginPage" element={<LoginPage />} />
          <Route path="/login/recover-credentials" element={<RecoverCredentials />} />
          <Route path="/login/resetPassword" element={<ResetPassword />} />
          <Route path="/login/OTP" element={<OTPVerification />} />
          <Route path="/login/success" element={<SuccessVerification />} />

          <Route element={<ProtectedRoute allowedRoles={[1, 3]} />}>
            <Route path="/intranet" element={<IntranetLayout />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={[2]} />}>
            <Route path="/intranetClientes" element={<LayoutCliente />} />
          </Route>
        </Routes>
      </Suspense>

      <CookieBanner />
    </BrowserRouter>
  );
}

export default App;