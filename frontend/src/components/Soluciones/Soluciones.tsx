import { SolucionesCard } from "./SolucionesCard"
import { motion } from "framer-motion";

interface SolucionesProp {
  urlImg: string
  title: string
  paragraph: string
  ruta: string
}

const solucionProp: SolucionesProp[] = [
  {
    urlImg: "images/ICONO1.png",
    title: "CONSULTORÍA EMPRESARIAL",
    paragraph:
      "Transformamos los desafíos de su industria en ventajas competitivas. Evaluamos la estructura de su organización para diseñar estrategias de mejora continua.",
    ruta: "/soluciones/consultoria-empresarial"
  },
  {
    urlImg: "images/ICONO2.png",
    title: "GESTIÓN TRIBUTARIA",
    paragraph:
      "Convertimos su carga fiscal en eficiencia operativa. Le guiamos para cumplir estrictamente con las normativas del SRI, previniendo contingencias legales.",
    ruta: "/soluciones/gestion-tributaria"
  },
  {
    urlImg: "images/ICONO3.png",
    title: "OUTSOURCING",
    paragraph:
      "Enfoque toda su energía en el núcleo de su negocio mientras nosotros gestionamos su back-office.",
    ruta: "/soluciones/outsourcing"
  },
  {
    urlImg: "images/ICONO4.png",
    title: "AUDITORÍA FINANCIERA",
    paragraph:
      "Datos claros, transparentes y confiables. Evaluamos la salud financiera de su empresa con rigurosidad internacional, detectando oportunidades de mejora.",
    ruta: "/soluciones/auditoria"
  },
]

export const Soluciones = () => {
  return (
    <div className="mt-14 md:mt-20">
      <motion.h1
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8 }}
        className="text-[1.8rem] sm:text-[2rem] md:text-[1.563rem] text-blue-200 font-bold text-center px-4"
      >
        SOLUCION
        <span className="underline underline-offset-10 decoration-3 decoration-orange-500">
          ES IN
        </span>
        TEGRALES
      </motion.h1>

      <div className="mt-10 sm:mt-12 md:mt-15 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-5 sm:px-8 md:px-23">
        {solucionProp.map((solucion) => (
          <SolucionesCard
            key={solucion.title}
            {...solucion}
          />
        ))}
      </div>
    </div>
  )
}