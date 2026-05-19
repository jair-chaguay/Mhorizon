import { ScrollReveal } from "../ScrollReveal"
import { TeamCard } from "./TeamCard"

interface TeamProp {
    image: string,
    rol: string,
    nombre: string,
    frase: string,
    linkedin?: string,
    instagram?: string,
    tiktok?: string,
    compact?: boolean
}

const teams: TeamProp[] = [
    {
        image: "Milton_Montece.png",
        rol: "PARTNER MANAGER",
        nombre: "MILTON MONTECÉ Q.",
        linkedin: "https://ec.linkedin.com/in/milton-montec%C3%A9-94283029",
        instagram: "https://www.instagram.com/milton.montece/", 
        tiktok: "https://www.tiktok.com/@milton_montece", 
        frase: "Nuestra misión es ser el faro que guía a las empresas hacia la estabilidad y el crecimiento sostenible mediante una correcta planificación tributaria."
    },
    {
        image: "Violeta_Rodriguez.png",
        rol: "TAX PARTNER",
        nombre: "VIOLETA RODRIGUEZ",
        linkedin: "https://ec.linkedin.com/in/violeta-rodriguez-35a658a1",
        frase: "La precisión absoluta no es un objetivo negociable, es el estándar mínimo exigible de nuestra práctica profesional y contable."
    },
    {
        image: "Gary_Sanchez.png",
        rol: "SENIOR OUTSOURCING",
        nombre: "GARY SANCHEZ",
        frase: "Asumimos el control de su back-office con absoluto rigor técnico, permitiendo que su corporación escale operaciones sin fricciones administrativas."
    },
    {
        image: "Marcos_Nuñez.png",
        rol: "TAX SENIOR",
        nombre: "MARCOS NUÑEZ",
        linkedin: "https://www.linkedin.com/in/marco-núñez-zambrano-808621124/",
        frase: "Transformamos la complejidad normativa en estrategias claras. Nuestra prioridad es blindar el patrimonio corporativo mediante una eficiencia fiscal impecable."
    },
    {
        image: "Sandra_Sarmiento.png",
        rol: "RRHH",
        nombre: "SANDRA SARMIENTO",
        linkedin: "https://www.linkedin.com/in/sandra-sarmiento-755306172/",
        frase: "El activo más valioso de toda gran estructura es su talento. Impulsamos una cultura de excelencia organizacional orientada al alto rendimiento y compromiso."
    }
]

const firstRow = teams.slice(0, 2);
const rest = teams.slice(2);

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

                <div className="space-y-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                        {
                            firstRow.map((team: TeamProp) => (
                                <TeamCard key={team.nombre} {...team} />
                            ))
                        }
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-11">
                        {rest.map((team) => (
                            <TeamCard key={team.nombre} {...team} compact={true}/>
                        ))}
                    </div>
                </div>
            </ScrollReveal>
        </section>
    )
}