import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./components/pages/Home";
import { SolucionesPage } from "./components/pages/SolucionesPage";
import { SectoresPage } from "./components/pages/SectoresPage";
import { NovedadesPage } from "./components/pages/NovedadesPage";
import { NosotrosPage } from "./components/pages/NosotrosPage";
import { ContactanosPage } from "./components/pages/ContactanosPage";
import { ConsultoriaEmpresarial } from "./components/pages/ConsultoriaEmpresarial";
import { AuditoriaPage, Crud, FinanzasPage, GestionPage, Login, OutsourcingPage, SuministroPage } from "./components";
import { ScrollToTop } from "./components/ScrollTop";
import { MercadoPage } from "./components/pages/MercadoPage";
import { NovedadeSubPage } from "./components/pages/NovedadeSubPage";

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
        <Route path="/nosotros" element={<NosotrosPage />} />
        <Route path="/contactanos" element={<ContactanosPage />} />
        <Route path="/crud" element={<Crud />} />
        <Route path="/sectores/cadena-suminsitros" element={<SuministroPage />} />
        <Route path="/sectores/cadena-finanzas" element={<FinanzasPage />} />
        <Route path="/sectores/mercado-financiero" element={<MercadoPage />} />
        <Route path="/novedades-sub" element={<NovedadeSubPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;