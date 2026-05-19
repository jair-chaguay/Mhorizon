import { PortafolioContainer } from '../Portafolio/PortafolioContainer'
import { ScrollReveal } from '../ScrollReveal'

interface servicioOutsourcing {
    titulo: string,
    listaServicios: string[]
}



const serviciosOutsourcing: servicioOutsourcing[] = [
    {
        titulo: 'Estrategia y defensa fiscal',
        listaServicios: [
            "Servicios de Outsourcing Contable y Nómina",
            "Elaboración y análisis de Estados financieros",
            "Preparación de nómina general y confidencial",
            "Implementación de políticas contables",
            "Elaboración de presupuestos y flujos de caja",
            "Diseño y evaluación de controles internos operativos",
            "Capacitación contable y financiera",
            "Toma física de Inventarios y Activos Fijos"
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
