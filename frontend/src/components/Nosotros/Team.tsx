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
    compact?: boolean,
    email?: string
}

const teams: TeamProp[] = [
    {
        image: "Milton_Montece.webp",
        rol: "PARTNER MANAGER",
        nombre: "MILTON MONTECÉ Q.",
        linkedin: "https://ec.linkedin.com/in/milton-montec%C3%A9-94283029",
        instagram: "https://www.instagram.com/milton.montece/", 
        tiktok: "https://www.tiktok.com/@milton_montece", 
        email: "mmontece@mhhorizon.com.ec",
        frase: "Nuestra misión es ayudar a las empresas a tomar decisiones tributarias y financieras sustentadas, con una visión de estabilidad y crecimiento sostenible"
    },
    {
        image: "Violeta_Rodriguez.webp",
        rol: "TAX PARTNER",
        nombre: "VIOLETA RODRIGUEZ",
        email:"vrodriguez@mhorizon.com.ec",
        linkedin: "https://ec.linkedin.com/in/violeta-rodriguez-35a658a1",
        frase: "Nuestro compromiso es emitir criterios claros y técnicamente sustentados, aplicables a la realidad de cada cliente"
    },
    {
        image: "Gary.webp",
        rol: "SENIOR OUTSOURCING",
        nombre: "GARY SANCHEZ",
        email:"gsanchez@mhorizon.com.ec",
        frase: "Gestionamos procesos contables y administrativos con controles, seguimiento y comunicación para apoyar la operación de nuestros clientes.  "
    },
    {
        image: "Marcos_Nunez.webp",
        rol: "TAX SENIOR",
        nombre: "MARCOS NUÑEZ",
        email:"mnunez@mhorizon.com.ec",
        linkedin: "https://www.linkedin.com/in/marco-núñez-zambrano-808621124/",
        frase: "Convertimos la normativa tributaria en recomendaciones claras, identificando riesgos y alternativas aplicables a cada operación"
    },
    {
        image: "Sandra_Sarmiento.webp",
        rol: "RRHH",
        nombre: "SANDRA SARMIENTO",
        email:"ssarmiento@mhorizon.com.ec",
        linkedin: "https://www.linkedin.com/in/sandra-sarmiento-755306172/",
        frase: "Promovemos una cultura de responsabilidad, aprendizaje y compromiso con el servicio profesional."
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
                    <h2 className="font-bold text-[2.2rem] sm:text-[2.6rem] md:text-[3rem] text-blue-200 uppercase tracking-tight leading-tight">
                        EXPERIENCIA TÉCNICA Y VISIÓN GERENCIAL
                    </h2>
                    <p className="text-gray-600 text-[1.1rem] mt-6 max-w-3xl mx-auto leading-relaxed">
                        Nuestro equipo combina experiencia técnica y conocimiento del negocio para atender consultas, proyectos y servicios recurrentes con participación de profesionales responsables.  
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