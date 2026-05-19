import { PortafolioContainer } from '../Portafolio/PortafolioContainer'
import { ScrollReveal } from '../ScrollReveal'

interface servicioEstrategia {
    titulo: string,
    listaServicios: string[]
}



const serviciosEstrategia: servicioEstrategia[] = [
    {
        titulo: 'Estrategia y defensa fiscal',
        listaServicios: [
            "Asesoría y Servicios Tributarios",
            "Consultoría Tributaria Permanente",

            "Planificación Tributaria",
            "Auditoría Tributaria",
            "Elaboración y/o Revisión de declaraciones fiscales",

            "Conciliación Tributaria de impuesto a la renta",

            "Seminarios y Talleres de actualización tributaria",

            "Cumplimiento de obligaciones tributarias",

            "Reclamos administrativo de Pago en Exceso o Indebido",

            "Solicitud de Devolución IVA - Exportadores",

            "Devolución Condicionada de Tributos (Drawback)",

            "Preparación de anexos tributarios",
            "Peticiones, Autorizaciones y Consultas al SRI",
            "Atención a Requerimientos del SRI",

            "Obtención y actualización del RUC"
        ]
    }
]

export const PortafolioEstr = () => {
    return (
        <ScrollReveal>
            <div className="py-24 bg-gray-50 border-b border-gray-200">
                {
                    serviciosEstrategia.map((servicio, index) => (
                        <PortafolioContainer key={index} titulo={servicio.titulo} listaServicios={servicio.listaServicios} />
                    ))
                }
            </div>
        </ScrollReveal>

    )
}
