import { PortafolioContainer } from '../Portafolio/PortafolioContainer'
import { ScrollReveal } from '../ScrollReveal'

interface servicioAuditoria {
    titulo: string,
    listaServicios: string[]
}



const servicioAuditoria: servicioAuditoria[] = [
    {
        titulo: 'Entre nuestros productos tenemos:',
        listaServicios: [
            "Asesoría y servicios de auditoría y revisiones especiales",
            "Evaluación de control interno",
            "Auditoría de estados financieros",
            "Auditoría operativa",
            "Revisiones especiales de acuerdo con procedimientos previamente acordados",
            "Due diligence",
            "Revisión de controles de inventarios y activos fijos"
        ]
    }
]

export const PortafolioAuditoria = () => {
    return (
        <ScrollReveal>
            <div className="py-24 bg-gray-50 border-b border-gray-200">
                {
                    servicioAuditoria.map((servicio, index) => (
                        <PortafolioContainer key={index} titulo={servicio.titulo} listaServicios={servicio.listaServicios} />
                    ))
                }
            </div>
        </ScrollReveal>

    )
}
