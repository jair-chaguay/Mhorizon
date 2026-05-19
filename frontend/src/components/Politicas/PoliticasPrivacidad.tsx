
export const PoliticasPrivacidad = () => {
    return (
        <section className="bg-white py-16 md:py-24 ">
            <div className="max-w-4xl mx-auto px-5 sm:px-8 md:px-12">
                <div className="mb-14">
                    <h1 className="text-[2rem] border-l-6 border-l-orange-500 pl-10  md:text-[2.5rem] font-bold text-gray-900 mb-6">
                        POLÍTICAS DE PRIVACIDAD Y SEGURIDAD DE LA INFORMACIÓN
                    </h1>
                </div>

                <div className="space-y-10 text-[1.05rem] md:text-[1.1rem] text-gray-600 font-light leading-relaxed">
                    
                    <div>
                        <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">
                            1. Responsable del Tratamiento de Datos
                        </h2>
                        <p>
                            MHORIZON, con domicilio en Guayaquil, Ecuador, es responsable del tratamiento de los datos personales recopilados a través de este sitio web. Nuestro compromiso es salvaguardar la confidencialidad y seguridad de la información corporativa y personal de nuestros usuarios.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">
                            2. Información que Recopilamos
                        </h2>
                        <p>
                            A través de nuestros formularios de contacto, podemos recopilar: nombre, correo electrónico corporativo, número de teléfono, nombre de la empresa y detalles de la consulta relacionada con nuestros servicios de auditoría, tributación o BPO.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">
                            3. Finalidad del Tratamiento
                        </h2>
                        <p className="mb-3">
                            La información recopilada se utiliza exclusivamente para:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 marker:text-blue-200">
                            <li>Atender requerimientos y consultas técnicas.</li>
                            <li>Enviar propuestas comerciales o cotizaciones solicitadas.</li>
                            <li>Compartir boletines o actualizaciones sobre normativas fiscales y corporativas relevantes para su sector.</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">
                            4. Seguridad de la Información
                        </h2>
                        <p>
                            Implementamos rigurosos protocolos técnicos y organizativos para proteger los datos contra el acceso no autorizado, alteración, divulgación o destrucción, alineados con nuestros propios estándares de auditoría y control de riesgos.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">
                            5. Derechos del Titular (LOPDP)
                        </h2>
                        <p>
                            De conformidad con la Ley Orgánica de Protección de Datos Personales de Ecuador, los usuarios tienen derecho a acceder, rectificar, actualizar, oponerse al tratamiento o solicitar la eliminación de sus datos en cualquier momento. Para ejercer estos derechos, puede comunicarse a:{' '}
                            <a 
                                href="mailto:news@mhorizon.com.ec" 
                                className="font-medium text-blue-600 hover:text-orange-500 underline decoration-blue-600/30 hover:decoration-orange-500 transition-colors duration-300"
                            >
                                news@mhorizon.com.ec
                            </a>.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
};