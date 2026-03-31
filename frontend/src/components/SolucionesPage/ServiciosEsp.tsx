import { useEffect, useRef } from 'react';
import { SolucionesCard } from "../Soluciones/SolucionesCard"

interface SolucionesProp {
    urlImg: string
    title: string
    paragraph: string
    ruta: string
}

const solucionProp: SolucionesProp[] = [
    {
        urlImg: "images/ICONO1.png",
        title: "CONSULTORÍA EMPRESARIAL",
        paragraph:
            "Transformamos los desafíos de su industria en ventajas competitivas. Evaluamos la estructura de su organización para diseñar estrategias de mejora continua.",
        ruta: "/soluciones/consultoria-empresarial"
    },
    {
        urlImg: "images/ICONO2.png",
        title: "GESTIÓN TRIBUTARIA",
        paragraph:
            "Convertimos su carga fiscal en eficiencia operativa. Le guiamos para cumplir estrictamente con las normativas del SRI, previniendo contingencias legales.",
        ruta: "/soluciones/gestion-tributaria"
    },
    {
        urlImg: "images/ICONO3.png",
        title: "OUTSOURCING",
        paragraph:
            "Enfoque toda su energía en el núcleo de su negocio mientras nosotros gestionamos su back-office.",
        ruta: "/soluciones/outsourcing"
    },
    {
        urlImg: "images/ICONO4.png",
        title: "AUDITORÍA FINANCIERA",
        paragraph:
            "Datos claros, transparentes y confiables. Evaluamos la salud financiera de su empresa con rigurosidad internacional, detectando oportunidades de mejora.",
        ruta: "/soluciones/auditoria"
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
            <div className="text-center mb-16 px-5 reveal-element">
                <h2 className="font-bold text-[1.8rem] sm:text-[2rem] md:text-[2.2rem] text-blue-200 uppercase tracking-wide">
                    SERVICIOS <span className="text-orange-500 border-b-4 border-orange-500 pb-1">ESPECIALIZADOS</span>
                </h2>
                <p className="mt-5 text-gray-500 font-light max-w-2xl mx-auto text-[1.05rem]">
                    Respaldamos cada decisión corporativa con un rigor técnico incomparable y metodologías de consultoría de talla mundial.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto">
                {solucionProp.map((solucion, index) => (
                    <SolucionesCard
                        key={solucion.title}
                        {...solucion}
                        index={index} 
                    />
                ))}
            </div>
        </section>
    )
}