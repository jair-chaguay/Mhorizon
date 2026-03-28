import { TeamCard } from "./TeamCard"

interface TeamProp {
    image: string,
    rol: string,
    nombre: string,
    frase: string
}

const teams: TeamProp[] = [
    {
        image:"MILTON.png",
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
        <section className="py-32 bg-gray-800">
            <div className="max-w-7xl mx-auto px-8">
                <div className="mb-20 text-center">
                    <span className="text-orange-500 font-medium text-xs tracking-[0.4em] uppercase 
                        mb-4 block">
                        Nuestro Equipo
                    </span>
                    <h2 className="font-bold text-4xl md:text-4xl text-blue-200 uppercase tracking-tighter">
                        Liderazgo Consultivo
                    </h2>
                    <p className="text-gray-500 font-medium mt-6 max-w-2xl mx-auto">
                        La experiencia técnica combinada con una visión gerencial de alto nivel para blindar 
                        su empresa.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl mx-auto">
                    {
                        teams.map((team: TeamProp) => (
                            <TeamCard key={team.nombre} {...team} />
                        ))
                    }
                </div>
            </div>
        </section>
    )
}
