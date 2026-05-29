import { ScrollReveal } from "../ScrollReveal"

export const MatrizOblig = () => {
    const tdClasses = "py-3 md:py-[0.85rem] px-3 md:px-4 border border-[#e2e8f0] text-sm md:text-[0.95rem] text-[#4a5568] align-top";
    const trClasses = "even:bg-[#f8fafc]";
    const thClasses = "bg-blue-200 text-white font-semibold uppercase text-xs md:text-[0.85rem] tracking-[0.05em] p-3 md:p-4 border border-[#2d3748] text-left";

    return (
        <ScrollReveal as={"section"} className="py-16 md:py-24 bg-white border-b border-gray-200 overflow-hidden">
            <ScrollReveal className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12">
                <div className="max-w-3xl border-l-orange-500 border-l-[6px] pl-4 mb-8 md:mb-10">
                    <h2 className="text-blue-200 font-bold text-2xl sm:text-[2.1rem] md:text-[2.5rem] uppercase tracking-tight leading-tight">
                        MATRIZ DE OBLIGACIONES LEGALES
                    </h2>
                </div>

                <div className="w-full overflow-x-auto shadow-sm rounded-sm mb-8">
                    <div className="bg-gray-100 p-4 md:p-5 rounded-sm border border-gray-200 mb-6 flex flex-col md:flex-row gap-4 md:gap-6 items-start md:items-center min-w-75">
                        <div className="w-full md:w-3/5">
                            <h3 className="font-bold text-[#151E28] mb-1">Fechas de Vencimiento</h3>
                            <p className="text-sm text-gray-600">Las obligaciones que incluyan la frase <strong>"Según 9no dígito"</strong> se rigen por la siguiente tabla de acuerdo con el noveno dígito del RUC:</p>
                            <p className= "text-sm text-gray-600"><strong>Contribuyentes especiales:</strong> Su fecha maxima de presentacion “DIA 11” de cada mes.</p>
                        </div>
                        <div className="w-full md:w-3/7 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1 text-sm border border-gray-300 p-2">
                            <div className="flex justify-between border-b border-gray-300 py-1"><span><strong>Dígito 1</strong>:</span> <span className=" text-gray-600">Día 10</span></div>
                            <div className="flex justify-between border-b border-gray-300 py-1"><span><strong>Dígito 6</strong>:</span> <span className=" text-gray-600">Día 20</span></div>
                            <div className="flex justify-between border-b border-gray-300 py-1"><span><strong>Dígito 2</strong>:</span> <span className="text-gray-600">Día 12</span></div>
                            <div className="flex justify-between border-b border-gray-300 py-1"><span><strong>Dígito 7</strong>:</span> <span className="text-gray-600">Día 22</span></div>
                            <div className="flex justify-between border-b border-gray-300 py-1"><span><strong>Dígito 3</strong>:</span> <span className="text-gray-600">Día 14</span></div>
                            <div className="flex justify-between border-b border-gray-300 py-1"><span><strong>Dígito 8</strong>:</span> <span className="text-gray-600">Día 24</span></div>
                            <div className="flex justify-between border-b border-gray-300 py-1"><span><strong>Dígito 4</strong>:</span> <span className="text-gray-600">Día 16</span></div>
                            <div className="flex justify-between border-b border-gray-300 py-1"><span><strong>Dígito 9</strong>:</span> <span className="text-gray-600">Día 26</span></div>
                            <div className="flex justify-between  py-1"><span><strong>Dígito 5</strong>:</span> <span className="text-gray-600">Día 18</span></div>
                            <div className="flex justify-between  py-1"><span><strong>Dígito 0</strong>:</span> <span className="text-gray-600">Día 28</span></div>
                        </div>
                    </div>

                    <table className="w-full min-w-225 border-collapse bg-white">
                        <thead>
                            <tr>
                                <th className={`${thClasses} w-1/6`}>Periodicidad</th>
                                <th className={`${thClasses} w-2/6`}>Obligación</th>
                                <th className={`${thClasses} w-1/6`}>Institución Reguladora</th>
                                <th className={`${thClasses} w-2/6`}>Plazo / Vencimiento</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className={trClasses}>
                                <td rowSpan={12} className={`${tdClasses} font-bold text-center align-middle bg-gray-100`}>MENSUAL</td>
                                <td className={tdClasses}>Declaración del IVA</td>
                                <td className={tdClasses}>SRI</td>
                                <td className={`${tdClasses} text-sm`}>Mes siguiente (Según 9no dígito)</td>
                            </tr>
                            <tr className={trClasses}><td className={tdClasses}>Declaración de retenciones en la fuente del IR</td><td className={tdClasses}>SRI</td><td className={`${tdClasses} text-sm`}>Mes siguiente (Según 9no dígito)</td></tr>
                            <tr className={trClasses}><td className={tdClasses}>Declaración de retenciones del IVA</td><td className={tdClasses}>SRI</td><td className={`${tdClasses} text-sm`}>Mes siguiente (Según 9no dígito)</td></tr>
                            <tr className={trClasses}><td className={tdClasses}>Declaración del Impuesto Redimible a las Botellas Plásticas</td><td className={tdClasses}>SRI</td><td className={`${tdClasses} text-sm`}>Hasta el 5to día hábil</td></tr>
                            <tr className={trClasses}><td className={tdClasses}>Anexo Transaccional Simplificado (ATS)</td><td className={tdClasses}>SRI</td><td className={`${tdClasses} text-sm`}>Mes subsiguiente (Según 9no dígito)</td></tr>
                            <tr className={trClasses}><td className={tdClasses}>Anexo Impuesto Consumos Especiales</td><td className={tdClasses}>SRI</td><td className={`${tdClasses} text-sm`}>Mes siguiente (Según 9no dígito)</td></tr>
                            <tr className={trClasses}><td className={tdClasses}>Anexo Impuesto Redimible a las Botellas Plásticas</td><td className={tdClasses}>SRI</td><td className={`${tdClasses} text-sm`}>Mes siguiente (Según 9no dígito)</td></tr>
                            <tr className={trClasses}><td className={tdClasses}>Pago de aportes al IESS</td><td className={tdClasses}>IESS</td><td className={`${tdClasses} text-sm`}>Hasta el día 15 del mes siguiente</td></tr>
                            <tr className={trClasses}><td className={tdClasses}>Fondos de reserva</td><td className={tdClasses}>IESS</td><td className={`${tdClasses} text-sm`}>Hasta el día 15 del mes siguiente</td></tr>
                            <tr className={trClasses}><td className={tdClasses}>Anexo REOC (operaciones con el exterior)</td><td className={tdClasses}>SRI</td><td className={`${tdClasses} text-sm`}>Mes siguiente (Según 9no dígito)</td></tr>
                            <tr className={trClasses}><td className={tdClasses}>ICE (Impuesto a los Consumos Especiales)</td><td className={tdClasses}>SRI</td><td className={`${tdClasses} text-sm`}>Mes siguiente (Según 9no dígito)</td></tr>
                            <tr className={trClasses}><td className={tdClasses}>ISD (Impuesto a la Salida de Divisas)</td><td className={tdClasses}>SRI</td><td className={`${tdClasses} text-sm`}>Mes siguiente (Según 9no dígito)</td></tr>
                            
                            <tr className={trClasses}>
                                <td rowSpan={5} className={`${tdClasses} font-bold text-center align-middle bg-gray-100`}>SEMESTRAL</td>
                                <td className={tdClasses}>Declaración del IVA (RIMPE)</td>
                                <td className={tdClasses}>SRI</td>
                                <td className={`${tdClasses} text-sm`}>Enero y Julio (Según 9no dígito)</td>
                            </tr>
                            <tr className={trClasses}><td className={tdClasses}>Declaración de Impuesto a la Renta (RIMPE)</td><td className={tdClasses}>SRI</td><td className={`${tdClasses} text-sm`}>Enero y Julio (Según 9no dígito)</td></tr>
                            <tr className={trClasses}><td className={tdClasses}>Declaración de retenciones en la fuente del IR (RIMPE)</td><td className={tdClasses}>SRI</td><td className={`${tdClasses} text-sm`}>Enero y Julio (Según 9no dígito)</td></tr>
                            <tr className={trClasses}><td className={tdClasses}>Anexo Transaccional Simplificado - ATS (RIMPE)</td><td className={tdClasses}>SRI</td><td className={`${tdClasses} text-sm`}>Enero y Julio (Según 9no dígito)</td></tr>
                            <tr className={trClasses}><td className={tdClasses}>Impuesto a los Consumos Especiales - ICE</td><td className={tdClasses}>SRI</td><td className={`${tdClasses} text-sm`}>Enero y Julio (Según 9no dígito)</td></tr>

                            <tr className={trClasses}>
                                <td rowSpan={12} className={`${tdClasses} font-bold text-center align-middle bg-gray-100`}>
                                    ANUAL<br /><span className="font-normal text-xs">(SRI)</span>
                                </td>
                                <td className={tdClasses}>Declaración de IR personas naturales</td><td className={tdClasses}>SRI</td><td className={`${tdClasses} text-sm`}>Marzo (Según 9no dígito)</td>
                            </tr>
                            <tr className={trClasses}><td className={tdClasses}>Declaración de IR sociedades</td><td className={tdClasses}>SRI</td><td className={`${tdClasses} text-sm`}>Abril (Según 9no dígito)</td></tr>
                            <tr className={trClasses}><td className={tdClasses}>Declaración de IR personas naturales Régimen RIMPE</td><td className={tdClasses}>SRI</td><td className={`${tdClasses} text-sm`}>Mayo (Según 9no dígito)</td></tr>
                            <tr className={trClasses}><td className={tdClasses}>Anexo de gastos personales</td><td className={tdClasses}>SRI</td><td className={`${tdClasses} text-sm`}>Febrero (Según 9no dígito)</td></tr>
                            <tr className={trClasses}><td className={tdClasses}>Anexo de accionistas (APS)</td><td className={tdClasses}>SRI</td><td className={`${tdClasses} text-sm`}>Febrero (Según 9no dígito)</td></tr>
                            <tr className={trClasses}><td className={tdClasses}>Anexo RDEP (relación de dependencia)</td><td className={tdClasses}>SRI</td><td className={`${tdClasses} text-sm`}>Febrero (Según 9no dígito)</td></tr>
                            <tr className={trClasses}><td className={tdClasses}>Anexo de Dividendos (ADI)</td><td className={tdClasses}>SRI</td><td className={`${tdClasses} text-sm`}>Mayo (Según 9no dígito)</td></tr>
                            <tr className={trClasses}><td className={tdClasses}>Anexo de Operaciones con partes relacionadas</td><td className={tdClasses}>SRI</td><td className={`${tdClasses} text-sm`}>Junio (Según 9no dígito)</td></tr>
                            <tr className={trClasses}><td className={tdClasses}>Informe de Precios de Transferencia</td><td className={tdClasses}>SRI</td><td className={`${tdClasses} text-sm`}>Junio (Según 9no dígito)</td></tr>
                            <tr className={trClasses}><td className={tdClasses}>Declaración Patrimonial Personas Naturales</td><td className={tdClasses}>SRI</td><td className={`${tdClasses} text-sm`}>Mayo (Según 9no dígito)</td></tr>
                            <tr className={trClasses}><td className={tdClasses}>Declaración del Pago a cuenta sobre utilidades no distribuidas</td><td className={tdClasses}>SRI</td><td className={`${tdClasses} text-sm`}>Agosto (Según 9no dígito)</td></tr>
                            <tr className={trClasses}><td className={tdClasses}>ISD (Impuesto a la Salida de Divisas)</td><td className={tdClasses}>SRI</td><td className={`${tdClasses} text-sm`}>Abril (Junto a declaración de Renta)</td></tr>

                            <tr className={trClasses}>
                                <td rowSpan={2} className={`${tdClasses} font-bold text-center align-middle bg-gray-100`}>
                                    ANUAL<br /><span className="font-normal text-xs">(Supercias)</span>
                                </td>
                                <td className={tdClasses}>Presentación de estados financieros</td><td className={tdClasses}>Supercias</td><td className={`${tdClasses} text-sm`}>Hasta el 30 de Abril</td>
                            </tr>
                            <tr className={trClasses}><td className={tdClasses}>Contribución societaria</td><td className={tdClasses}>Supercias</td><td className={`${tdClasses} text-sm`}>Septiembre (1ra cuota) / Diciembre (2da cuota)</td></tr>

                            <tr className={trClasses}>
                                <td rowSpan={8} className={`${tdClasses} font-bold text-center align-middle bg-gray-100`}>
                                    ANUAL<br /><span className="font-normal text-xs">(Municipales)</span>
                                </td>
                                <td className={tdClasses}>Patente municipal</td><td className={tdClasses}>Municipio</td><td className={`${tdClasses} text-sm`}>Mayo</td>
                            </tr>
                            <tr className={trClasses}><td className={tdClasses}>Impuesto 1.5 por mil sobre activos</td><td className={tdClasses}>Municipio</td><td className={`${tdClasses} text-sm`}>Mayo</td></tr>
                            <tr className={trClasses}><td className={tdClasses}>Impuesto predial urbano</td><td className={tdClasses}>Municipio</td><td className={`${tdClasses} text-sm`}>Hasta Junio (Con descuentos iniciales)</td></tr>
                            <tr className={trClasses}><td className={tdClasses}>Impuesto predial rural</td><td className={tdClasses}>Municipio</td><td className={`${tdClasses} text-sm`}>Junio</td></tr>
                            <tr className={trClasses}><td className={tdClasses}>Tasa de habilitación / LUAE</td><td className={tdClasses}>Municipio</td><td className={`${tdClasses} text-sm`}>Mayo</td></tr>
                            <tr className={trClasses}><td className={tdClasses}>Permiso de funcionamiento</td><td className={tdClasses}>Municipio</td><td className={`${tdClasses} text-sm`}>Mayo</td></tr>
                            <tr className={trClasses}><td className={tdClasses}>Tasa de bomberos</td><td className={tdClasses}>Municipio</td><td className={`${tdClasses} text-sm`}>Mayo</td></tr>
                            <tr className={trClasses}><td className={tdClasses}>Impuesto a la publicidad exterior</td><td className={tdClasses}>Municipio</td><td className={`${tdClasses} text-sm`}>Octubre</td></tr>

                            <tr className={trClasses}>
                                <td rowSpan={3} className={`${tdClasses} font-bold text-center align-middle bg-gray-100`}>
                                    ANUAL<br /><span className="font-normal text-xs">(Laborales)</span>
                                </td>
                                <td className={tdClasses}>Décimo tercer sueldo</td><td className={tdClasses}>MDT</td><td className={`${tdClasses} text-sm`}>Hasta el 24 de Diciembre</td>
                            </tr>
                            <tr className={trClasses}><td className={tdClasses}>Décimo cuarto sueldo</td><td className={tdClasses}>MDT</td><td className={`${tdClasses} text-sm`}>15 de Marzo (Costa) / 15 de Agosto (Sierra)</td></tr>
                            <tr className={trClasses}><td className={tdClasses}>Participación de utilidades (15%)</td><td className={tdClasses}>MDT</td><td className={`${tdClasses} text-sm`}>Hasta el 15 de Abril (Pago)</td></tr>
                        </tbody>
                    </table>
                </div>

                <h2 className="text-[#D98005] font-bold uppercase text-lg md:text-xl mb-4 mt-12 border-b-2 border-[#D98005] pb-2 inline-block">
                    Obligaciones Formales Tributarias Adicionales
                </h2>
                <div className="bg-white border border-gray-200 p-4 md:p-6 rounded-sm shadow-sm">
                    <ul className="list-disc ml-5 md:ml-6 space-y-2 text-gray-700 text-sm md:text-[0.95rem]">
                        <li>Inscripción y actualización del Registro Único de Contribuyentes (RUC).</li>
                        <li>Emisión de comprobantes de venta, retención y documentos complementarios autorizados.</li>
                        <li>Presentación periódica de declaraciones tributarias.</li>
                        <li>Conservación de documentación contable y soporte tributario.</li>
                        <li>Presentación de anexos transaccionales e informativos.</li>
                        <li>Llevar contabilidad cuando la normativa lo exija.</li>
                        <li>Atender requerimientos y procesos de control de la Administración Tributaria.</li>
                    </ul>
                </div>
            </ScrollReveal>
        </ScrollReveal>
    )
}