import { SolucionesCard } from "./SolucionesCard"
import { motion} from "framer-motion";

interface SolucionesProp {
  urlImg: string
  title: string
  paragraph: string
}

const solucionProp: SolucionesProp[] = [
  {
    urlImg: "images/ICONO1.png",
    title: "CONSULTORÍA EMPRESARIAL",
    paragraph:
      "Transformamos los desafíos de su industria en ventajas competitivas. Evaluamos la estructura de su organización para diseñar estrategias de mejora continua, optimización de procesos corporativos y gestión de riesgos, asegurando decisiones gerenciales precisas.",
  },
  {
    urlImg: "images/ICONO2.png",
    title: "GESTIÓN Y OPTIMIZACIÓN TRIBUTARIA",
    paragraph:
      "Convertimos su carga fiscal en eficiencia operativa. Le guiamos para cumplir estrictamente con las normativas del SRI, previniendo contingencias legales y maximizando la rentabilidad de su negocio dentro del marco regulatorio vigente.",
  },
  {
    urlImg: "images/ICONO3.png",
    title: "OUTSOURCING",
    paragraph:
      "Enfoque toda su energía en el núcleo de su negocio mientras nosotros gestionamos su back-office. Asumimos el control integral de su contabilidad, nómina y procesos administrativos con tecnología de punta y absoluta confidencialidad.",
  },
  {
    urlImg: "images/ICONO4.png",
    title: "AUDITORÍA FINANCIERA INTEGRAL",
    paragraph:
      "Datos claros, transparentes y confiables. Evaluamos la salud financiera de su empresa con rigurosidad internacional, detectando oportunidades de mejora y brindando la certeza que sus accionistas, inversores y reguladores exigen.",
  },
]

export const Soluciones = () => {
  return (
    <div className="mt-20">
      <motion.h1 initial={{opacity: 0}} whileInView={{opacity:1}} viewport={{once:false}} transition={{duration:0.8}}
      className="text-[1.563rem] text-blue-200 font-bold text-center underline underline-offset-10 decoration-3 decoration-orange-500">
        SOLUCIONES INTEGRALES
      </motion.h1>
    
      <div className="mt-15 flex flex-col gap-3">
        {solucionProp.map((solucion, index) => (
          <SolucionesCard
            key={solucion.title}
            {...solucion}
            reverse={index % 2 !== 0}
          />
        ))}
      </div>
    </div>
  )
}