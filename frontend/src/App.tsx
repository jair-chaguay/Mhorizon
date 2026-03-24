import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./components/pages/Home";
import { SolucionesPage } from "./components/pages/SolucionesPage";
import { SectoresPage } from "./components/pages/SectoresPage";
import { NovedadesPage } from "./components/pages/NovedadesPage";
import { NosotrosPage } from "./components/pages/NosotrosPage";
import { ContactanosPage } from "./components/pages/ContactanosPage";
import { ConsultoriaEmpresarial } from "./components/pages/ConsultoriaEmpresarial";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/soluciones" element={<SolucionesPage />} />
        <Route path="/soluciones/consultoria-empresarial" element={<ConsultoriaEmpresarial />} />

        <Route path="/sectores" element={<SectoresPage />} />
        <Route path="/novedades" element={<NovedadesPage />} />
        <Route path="/nosotros" element={<NosotrosPage />} />
        <Route path="/contactanos" element={<ContactanosPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;