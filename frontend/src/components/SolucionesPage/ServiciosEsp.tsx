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
            "Transformamos los desafíos de su industria en ventajas competitivas. Evaluamos la estructura de su organización para diseñar estrategias de mejora continua.",
        ruta: "/soluciones/consultoria-empresarial",
        delay: "delay-100"
    },
    {
        icon: <Gestion className="w-8 h-8" />,
        title: "GESTIÓN TRIBUTARIA",
        paragraph:
            "Convertimos su carga fiscal en eficiencia operativa, gestionamos la devolución de sus impuestos y le guiamos para cumplir estrictamente con las normativas del SRI, previniendo contingencias legales.",
        ruta: "/soluciones/gestion-tributaria",
        delay: "delay-200"

    },
    {

        icon: <Maletin className="w-8 h-8" />,
        title: "OUTSOURCING BPO",
        paragraph:
            "Enfoque toda su energía en el core bussines de su negocio mientras nosotros gestionamos su back-office.",
        ruta: "/soluciones/outsourcing",
        delay: "delay-300"

    },
    {
        icon: <GraficoLupa className="w-8 h-8" />,
        title: "AUDITORÍA FINANCIERA",
        paragraph:
            "Datos claros, transparentes y confiables. Evaluamos la salud financiera acorde con Normas Internacionales de Información Financiera (NIIF), detectando oportunidades de mejora.",
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
                        Respaldamos cada decisión corporativa con un rigor técnico incomparable y metodologías de consultoría de talla mundial.
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