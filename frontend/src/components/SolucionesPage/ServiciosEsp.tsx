import { SolucionesCard } from "../Soluciones/SolucionesCard"
import { motion } from "framer-motion";

interface SolucionesProp {
    urlImg: string
    title: string
    paragraph: string,
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
        ruta: "/soluciones/consultoria-empresarial"
    },
    {
        urlImg: "images/ICONO3.png",
        title: "OUTSOURCING",
        paragraph:
            "Enfoque toda su energía en el núcleo de su negocio mientras nosotros gestionamos su back-office.",
        ruta: "/soluciones/consultoria-empresarial"
    },
    {
        urlImg: "images/ICONO4.png",
        title: "AUDITORÍA FINANCIERA",
        paragraph:
            "Datos claros, transparentes y confiables. Evaluamos la salud financiera de su empresa con rigurosidad internacional, detectando oportunidades de mejora.",
        ruta: "/soluciones/consultoria-empresarial"
    },
]

export const ServiciosEsp = () => {
    return (
        <div className="mt-20">
            <h2 className='ml-23 font-bold text-[1.63rem] text-blue-200'>SERVICIOS ESPECIALIZADOS</h2>
            <div className="mt-13 grid grid-cols-4 gap-6 px-23">
                {solucionProp.map((solucion) => (
                    <SolucionesCard
                        key={solucion.title}
                        {...solucion} />
                ))}
            </div>
        </div>

    )
}
