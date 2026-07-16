import { useEffect, useRef } from 'react';
import { SolucionesCard } from "../Soluciones/SolucionesCard"
import { Consultoria, Gestion, Maletin, GraficoLupa } from "../IconosSVG"
import { ScrollReveal } from '../ScrollReveal';

interface SolucionesProp {
    icon: React.ReactNode
    title: string
    paragraph: string
    ruta: string
    delay: string
}

const solucionProp: SolucionesProp[] = [
    {
        icon: <Consultoria className="w-8 h-8" />,
        title: "CONSULTORÍA EMPRESARIAL",
        paragraph:
            "Analizamos la información financiera, los procesos y los controles de su empresa para identificar riesgos, mejorar la gestión de caja y respaldar decisiones de crecimiento.",
        ruta: "/soluciones/consultoria-empresarial",
        delay: "delay-100"
    },
    {
        icon: <Gestion className="w-8 h-8" />,
        title: "ESTRATEGIA Y DEFENSA TRIBUTARIA",
        paragraph:
            "Prevenimos contingencias, resolvemos consultas, gestionamos devoluciones de impuestos y acompañamos a su empresa en procesos administrativos y controversias tributarias",
        ruta: "/soluciones/gestion-tributaria",
        delay: "delay-200"

    },
    {

        icon: <Maletin className="w-8 h-8" />,
        title: "OUTSOURCING BPO",
        paragraph:
            "Permita que su equipo se concentre en el negocio mientras MHORIZON gestiona sus procesos contables, tributarios y de nómina con controles, supervisión y reportes oportunos.",
        ruta: "/soluciones/outsourcing",
        delay: "delay-300"

    },
    {
        icon: <GraficoLupa className="w-8 h-8" />,
        title: "AUDITORÍA FINANCIERA",
        paragraph:
            "Auditamos estados financieros bajo Normas Internacionales de Auditoría y evaluamos su presentación conforme a NIIF, fortaleciendo la confianza en la información de la empresa.",
        ruta: "/soluciones/auditoria",
        delay: "delay-400"

    },
]

export const ServiciosEsp = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const revealElements = sectionRef.current.querySelectorAll('.reveal-element');

        const revealOptions = {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        };

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    obs.unobserve(entry.target);
                }
            });
        }, revealOptions);

        revealElements.forEach(el => observer.observe(el));

        const timeoutId = setTimeout(() => {
            revealElements.forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight) {
                    el.classList.add('active');
                }
            });
        }, 100);

        return () => {
            observer.disconnect();
            clearTimeout(timeoutId);
        };
    }, []);

    return (
        <section ref={sectionRef} className="py-20 md:py-28 bg-gray-800 border-b border-gray-100 overflow-hidden">
            <ScrollReveal className="max-w-350 mx-auto px-5 sm:px-8 md:px-12">

                <div className="text-center mb-16 px-5 reveal-element">
                    <span className="text-orange-500 font-bold tracking-[0.2em] text-[0.85rem] uppercase mb-2 block text-center reveal-element">
                        GESTIÓN INTEGRAL
                    </span>
                    <h2 className="relative inline-block text-blue-200 font-extrabold text-[2.1rem] sm:text-[2.6rem] md:text-[3rem] tracking-tight leading-tight pb-4 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-24 after:h-1 after:bg-orange-500 after:rounded-full">
                        SERVICIOS ESPECIALIZADOS
                    </h2>
                    <p className="mt-5 text-gray-500 font-light max-w-2xl mx-auto text-[1.05rem]">
                        Comprendemos la operación, definimos el alcance y ejecutamos cada trabajo con supervisión profesional, comunicación oportuna y entregables claros.  
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
                    {solucionProp.map((solucion, index) => (
                        <SolucionesCard
                            key={solucion.title}
                            {...solucion}
                            index={index}
                        />
                    ))}
                </div>
            </ScrollReveal>
        </section>
    )
}