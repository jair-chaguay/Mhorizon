import { PortafolioContainer } from '../Portafolio/PortafolioContainer'
import { ScrollReveal } from '../ScrollReveal'

interface servicioConsultoria {
    titulo: string,
    listaServicios: string[]
}



const serviciosConsultoria: servicioConsultoria[] = [
    {
        titulo: 'Entre nuestros productos tenemos:',
        listaServicios: [
            "Valoración de compañías",
            "Evaluación de proyectos",
            "Diseño de manuales de funciones y procedimientos",
            "Diseños de procesos administrativos, operativos y financieros",
            "Manejo contable y financiero de compañías",
            "Manejo de nóminas"
        ]
    }
]

export const PortafoliaEmpresarial = () => {
    return (
        <ScrollReveal>
            <div className="py-24 bg-gray-50 border-b border-gray-200">
                {
                    serviciosConsultoria.map((servicio, index) => (
                        <PortafolioContainer key={index} titulo={servicio.titulo} listaServicios={servicio.listaServicios} />
                    ))
                }
            </div>
        </ScrollReveal>

    )
}
