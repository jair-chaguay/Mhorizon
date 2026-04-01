import { ScrollReveal } from "../ScrollReveal"
import { TeamCard } from "./TeamCard"

interface TeamProp {
    image: string,
    rol: string,
    nombre: string,
    frase: string
}

const teams: TeamProp[] = [
    {
        image: "MILTON.png",
        rol: "Socio Fundador",
        nombre: "Milton Montecé Q.",
        frase: "Nuestra misión es ser el faro que guía a las empresas hacia la estabilidad y el crecimiento sostenible mediante una correcta planificación tributaria."
    },
    {
        image: "VIOLETA.png",
        rol: "Gerente de auditoría",
        nombre: "Violeta Rodriguez",
        frase: "La precisión absoluta no es un objetivo negociable, es el estándar mínimo exigible de nuestra práctica profesional y contable."
    }
]

export const Team = () => {
    return (
        <section className="py-24 bg-white border-b border-gray-200 overflow-hidden">
            <ScrollReveal className="max-w-350 mx-auto px-5 sm:px-8 md:px-12">
                <div className="mb-20 text-center reveal-element">
                    <span className="text-orange-500 font-medium text-[0.85rem] tracking-[0.2em] uppercase mb-3 block">
                        Nuestro Equipo
                    </span>
                    <h2 className="font-bold text-[2.2rem] sm:text-[2.8rem] md:text-[3.2rem] text-blue-200 uppercase tracking-tight leading-tight">
                        AUTORIDAD ESTRATÉGICA
                    </h2>
                    <p className="text-gray-600 text-[1.1rem] mt-6 max-w-3xl mx-auto leading-relaxed">
                        La experiencia técnica combinada con una visión gerencial de alto nivel. Nuestros líderes garantizan soluciones corporativas diseñadas para blindar su empresa.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                    {
                        teams.map((team: TeamProp) => (
                            <TeamCard key={team.nombre} {...team} />
                        ))
                    }
                </div>
            </ScrollReveal>
        </section>
    )
}
