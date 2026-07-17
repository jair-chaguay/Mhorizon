import { CheckCircle } from '../IconosSVG'
import { ScrollReveal } from '../ScrollReveal'

export const EstrIm = () => {
    return (
        <section className="bg-blue-200 py-20 border-b border-gray-200 overflow-hidden">
            <ScrollReveal as={"div"} className="px-5 sm:px-8 md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16 md:gap-12 lg:gap-16">

                <div className="w-full md:w-[50%] h-87.5 sm:h-100 md:h-120 relative flex flex-col items-center reveal-element">
                    <img className='w-full h-full object-cover relative rounded-2xl shadow-2xl'
                        src="/images/EstrategiaImpuestos.webp" alt="Estrategia de Impuestos"
                    />
                    <div className="absolute inset-0 bg-blue-200/10 rounded-2xl"></div>
                </div>

                <div className="w-full md:w-[50%] mt-8 md:mt-0 reveal-element delay-200">
                    <span className="text-orange-500 font-bold tracking-[0.2em] text-[0.8rem] uppercase mb-2 block">
                        Metodología Financiera
                    </span>
                    <h2 className="text-[2rem] md:text-[2.4rem] font-extrabold text-white leading-tight">
                        ESTRATEGIA, CUMPLIMIENTO <br /> Y DEFENSA
                    </h2>
                    <p className=" mt-6 text-[1.05rem] text-gray-200 text-justify md:text-left leading-relaxed">
                        Nuestra metodología parte de los hechos, la documentación y la normativa aplicable. Presentamos conclusiones claras, riesgos identificados y recomendaciones prácticas para la empresa.  
                    </p>

                    <ul className="flex flex-col gap-6 mt-10">
                        <li className="flex items-start gap-4 group">
                            <div className="bg-orange-500 p-2 rounded-lg mt-1  group-hover:bg-white transition-colors duration-300">
                                <CheckCircle className='w-6 h-6 text-white group-hover:text-orange-600'/>
                            </div>
                            <div>
                                <p className="text-[1.05rem] font-bold text-orange-500">Estudios de Precios de Transferencia</p>
                                <p className="text-[0.98rem]  text-gray-200 mt-1">Preparación del informe integral y del anexo de operaciones con partes relacionadas, según corresponda, así como soporte técnico para grupos empresariales</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-4 group">
                            <div className="bg-orange-500 p-2 rounded-lg mt-1 group-hover:bg-white transition-colors duration-300">
                                <CheckCircle className='w-6 h-6 text-white group-hover:text-orange-600'/>
                            </div>
                            <div>
                                <p className="text-[1.05rem] font-bold text-orange-500">Reclamaciones y Devoluciones</p>
                                <p className="text-[0.98rem] text-gray-200 mt-1">Gestión de solicitudes de devolución y reclamos por pago en exceso o indebido.</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-4 group">
                            <div className="bg-orange-500 p-2 rounded-lg mt-1 group-hover:bg-white transition-colors duration-300">
                                <CheckCircle className='w-6 h-6 text-white group-hover:text-orange-600'/>
                            </div>
                            <div>
                                <p className="text-[1.05rem] font-bold text-orange-500">Patrocinio en Determinaciones</p>
                                <p className="text-[0.98rem] text-gray-200 mt-1">Defensa técnica y acompañamiento en procesos de determinación y control del SRI.</p>
                            </div>
                        </li>
                    </ul>
                </div>

            </ScrollReveal>
        </section>
    )
}