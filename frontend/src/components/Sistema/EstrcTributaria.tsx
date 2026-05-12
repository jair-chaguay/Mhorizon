import { ScrollReveal } from "../ScrollReveal";

export const EstrcTributaria = () => {
    const tdClasses = "py-3 md:py-[0.85rem] px-3 md:px-4 border border-[#e2e8f0] text-sm md:text-[0.95rem] text-[#4a5568] align-top";
    const trClasses = "even:bg-[#f8fafc]";
    
    const thClasses = "bg-blue-200 text-white font-semibold uppercase text-xs md:text-[0.85rem] tracking-[0.05em] p-3 md:p-4 border border-[#2d3748] text-left";

    return (
        <ScrollReveal as={"section"} className="py-16 md:py-24 bg-white border-b border-gray-200 overflow-hidden">
            <ScrollReveal className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12">
                <div className="max-w-2xl border-l-orange-500 border-l-[6px] pl-4 mb-8 md:mb-10">
                    <h2 className="text-blue-200 font-bold text-2xl sm:text-[2.1rem] md:text-[2.5rem] uppercase tracking-tight leading-tight">
                        ESTRUCTURA TRIBUTARIA VIGENTE
                    </h2>
                </div>

                <div className="w-full overflow-x-auto shadow-sm rounded-sm mb-8">
                    <table className="w-full min-w-200 border-collapse bg-white">
                        <thead>
                            <tr>
                                <th className={`${thClasses} w-1/4`}>Impuesto</th>
                                <th className={`${thClasses} w-1/4`}>Tarifa</th>
                                <th className={`${thClasses} w-1/2`}>Aplicación y Observaciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className={trClasses}>
                                <td className={`${tdClasses} font-bold text-blue-200`}>Impuesto al Valor Agregado (IVA)</td>
                                <td className={tdClasses}>15% (General)<br />5% (Especial)<br />0% (Exentos)</td>
                                <td className={tdClasses}>Aplica sobre transferencia local e importación de bienes y servicios. 5% para determinados materiales de construcción. 0% para bienes/servicios de primera necesidad.</td>
                            </tr>
                            <tr className={trClasses}>
                                <td className={`${tdClasses} font-bold text-blue-200`}>Impuesto a la Renta (IR) - Sociedades</td>
                                <td className={tdClasses}>25% (General)<br />28% (Condicionado)</td>
                                <td className={tdClasses}>Se incrementa al 28% con participación de beneficiarios en paraísos fiscales o incumplimientos en la composición societaria.</td>
                            </tr>
                            <tr className={trClasses}>
                                <td className={`${tdClasses} font-bold text-[#151E28]`}>Impuesto a la Renta (IR) - Personas Naturales</td>
                                <td className={tdClasses}>Tabla Progresiva</td>
                                <td className={tdClasses}>El impuesto se determina conforme a la tabla progresiva anual establecida por el SRI.</td>
                            </tr>
                            <tr className={trClasses}>
                                <td className={`${tdClasses} font-bold text-[#151E28]`}>Retenciones en la Fuente (IR)</td>
                                <td className={tdClasses}>0% al 37%</td>
                                <td className={tdClasses}>Mecanismo de recaudo anticipado. El porcentaje varía según la naturaleza de la operación (adquisición de bienes, servicios, pagos al exterior).</td>
                            </tr>
                            <tr className={trClasses}>
                                <td className={`${tdClasses} font-bold text-[#151E28]`}>Retenciones de IVA</td>
                                <td className={tdClasses}>10%, 20%, 30%, 50%, 70%, 100%</td>
                                <td className={tdClasses}>Efectuadas por agentes de retención en adquisiciones. Constituyen crédito tributario para el proveedor.</td>
                            </tr>
                            <tr className={trClasses}>
                                <td className={`${tdClasses} font-bold text-[#151E28]`}>Impuesto a la Salida de Divisas (ISD)</td>
                                <td className={tdClasses}>5% (General)<br />0% - 2.5% (Diferenciada)</td>
                                <td className={tdClasses}>Grava envíos o traslados de divisas al exterior. Tarifas reducidas aplican a importación de bienes del sector productivo y farmacéutico.</td>
                            </tr>
                            <tr className={trClasses}>
                                <td className={`${tdClasses} font-bold text-[#151E28]`}>Impuesto a los Consumos Especiales (ICE)</td>
                                <td className={tdClasses}>Específica / Ad Valorem / Mixta</td>
                                <td className={tdClasses}>Grava consumo selectivo: bebidas alcohólicas, cigarrillos, armas, vehículos de alta gama, telefonía, etc.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </ScrollReveal>
        </ScrollReveal>
    );
};