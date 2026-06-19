import { PortafolioContainer } from '../Portafolio/PortafolioContainer'
import { ScrollReveal } from '../ScrollReveal'

interface servicioOutsourcing {
    titulo: string,
    listaServicios: string[]
}



const serviciosOutsourcing: servicioOutsourcing[] = [
    {
        titulo: 'Entre nuestros productos tenemos:',
        listaServicios: [
            "Servicios de outsourcing contable y nómina",
            "Elaboración y análisis de estados financieros",
            "Preparación de nómina general y confidencial",
            "Implementación de políticas contables",
            "Elaboración de presupuestos y flujos de caja",
            "Diseño y evaluación de controles internos operativos",
            "Capacitación contable y financiera",
            "Toma física de inventarios y activos fijos"
        ]
    }
]

export const PortafolioOutso = () => {
    return (
        <ScrollReveal>
            <div className="py-24 bg-gray-50 border-b border-gray-200">
                {
                    serviciosOutsourcing.map((servicio, index) => (
                        <PortafolioContainer key={index} titulo={servicio.titulo} listaServicios={servicio.listaServicios} />
                    ))
                }
            </div>
        </ScrollReveal>

    )
}
