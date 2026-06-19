import { PortafolioContainer } from '../Portafolio/PortafolioContainer'
import { ScrollReveal } from '../ScrollReveal'

interface servicioEstrategia {
    titulo: string,
    listaServicios: string[]
}



const serviciosEstrategia: servicioEstrategia[] = [
    {
        titulo: 'Entre nuestros productos tenemos:',
        listaServicios: [
            "Asesoría y servicios tributarios",
            "Consultoría tributaria permanente",

            "Planificación tributaria",
            "Auditoría tributaria",
            "Elaboración y/o revisión de declaraciones fiscales",

            "Conciliación tributaria de impuesto a la renta",

            "Seminarios y talleres de actualización tributaria",

            "Cumplimiento de obligaciones tributarias",

            "Reclamos administrativo de pago en exceso o indebido",

            "Solicitud de devolución IVA - exportadores",

            "Devolución condicionada de tributos (drawback)",

            "Preparación de anexos tributarios",
            "Peticiones, autorizaciones y consultas al SRI",
            "Atención a requerimientos del SRI",

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
