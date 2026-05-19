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
            "Asesoría y Servicios de Auditoría y Revisiones Especiales",
            "Evaluación de control interno",
            "Auditoría de Estados Financieros",
            "Auditoria operativa",
            "Revisiones Especiales de Acuerdo con Procedimientos Previamente Acordados",
            "Due Diligence",
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
