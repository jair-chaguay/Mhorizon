import { ScrollReveal } from '../ScrollReveal'
import { useFormMembresia } from './useFormMembresia'; 

export const Invitacion = () => {
    const { isLoading, isSuccess, errorMessage, handleSubmit } = useFormMembresia();

    return (
        <ScrollReveal as={"section"} className="bg-gray-100 py-12 lg:py-24 sm:py-20 px-4 lg:px-8 sm:px-6 md:px-12 overflow-hidden border-b border-white/5" id="contacto">
            <div className="max-w-350 mx-auto">
                <div className="bg-[#151E28] border border-white/10 rounded-3xl shadow-2xl p-5 sm:p-10 lg:p-16 flex flex-col xl:flex-row gap-10 items-center reveal-element relative overflow-hidden">
                    
                    <div className="absolute -right-20 -top-20 w-96 h-96 bg-orange-500/10 rounded-full blur-[100px] pointer-events-none"></div>

                    <div className="w-full xl:w-1/2 text-white relative z-10 text-center xl:text-left">
                        <span className="text-orange-500 font-bold tracking-[0.2em] text-[0.85rem] uppercase mb-4 block font-jakarta">Solicite la activación</span>
                        <h2 className="font-extrabold text-[2.5rem] sm:text-[3rem] md:text-[3.5rem] leading-[1.05] mb-6 tracking-tight">
                            Incorpore respaldo tributario a sus decisiones.
                        </h2>
                        <p className="text-gray-300 text-[1.1rem] font-light mb-10 max-w-lg mx-auto xl:mx-0 leading-relaxed">
                            Complete el formulario. Un integrante de la firma se comunicará de inmediato para confirmar el alcance y realizar su proceso de inducción.
                        </p>
                        
                        <div className="bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-5 sm:p-8 backdrop-blur-md w-full sm:w-auto inline-block shadow-lg text-center xl:text-left">
                            <p className="text-white font-extrabold text-3xl mb-2 font-jakarta">110 USD <span className="text-lg text-orange-400 font-bold">+ IVA al mes</span></p>
                            <p className="text-gray-400 text-sm font-light">Membresía anual · Facturación mensual · Atención nacional</p>
                        </div>
                    </div>

                    <div className="w-full xl:w-1/2 relative z-10">
                        <form onSubmit={handleSubmit} className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-8 lg:p-10 shadow-2xl border border-gray-100 flex flex-col gap-4 sm:gap-5">
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                                <div className="flex flex-col gap-1.5 sm:gap-2">
                                    <label className="text-[#151E28] font-semibold text-xs sm:text-sm">Nombre y apellido</label>
                                    <input type="text" name="nombre" required className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 sm:p-3 text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all text-[#151E28]"/>
                                </div>
                                <div className="flex flex-col gap-1.5 sm:gap-2">
                                    <label className="text-[#151E28] font-semibold text-xs sm:text-sm">Empresa</label>
                                    <input type="text" name="empresa" required className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 sm:p-3 text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all text-[#151E28]"/>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                                <div className="flex flex-col gap-1.5 sm:gap-2">
                                    <label className="text-[#151E28] font-semibold text-xs sm:text-sm">Correo corporativo</label>
                                    <input type="email" name="correo" required className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 sm:p-3 text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all text-[#151E28]"/>
                                </div>
                                <div className="flex flex-col gap-1.5 sm:gap-2">
                                    <label className="text-[#151E28] font-semibold text-xs sm:text-sm">WhatsApp / teléfono</label>
                                    <input type="tel" name="telefono" required className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 sm:p-3 text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all text-[#151E28]"/>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                                <div className="flex flex-col gap-1.5 sm:gap-2">
                                    <label className="text-[#151E28] font-semibold text-xs sm:text-sm">Ciudad</label>
                                    <select required name="ciudad" defaultValue="" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 sm:p-3 text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all text-[#151E28]">
                                        <option value="" disabled>Seleccione...</option>
                                        <option value="Guayaquil">Guayaquil</option><option value="Quito">Quito</option><option value="Cuenca">Cuenca</option>
                                        <option value="Manta">Manta / Portoviejo</option><option value="Machala">Machala</option><option value="Ambato">Ambato</option>
                                        <option value="Loja">Loja</option><option value="Santo Domingo">Santo Domingo</option><option value="Otra">Otra ciudad</option>
                                    </select>
                                </div>
                                <div className="flex flex-col gap-1.5 sm:gap-2">
                                    <label className="text-[#151E28] font-semibold text-xs sm:text-sm">Perfil / Cargo</label>
                                    <select required name="perfil" defaultValue="" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 sm:p-3 text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all text-[#151E28]">
                                        <option value="" disabled>Seleccione...</option>
                                        <option value="Gerente">Propietario / Gerente</option><option value="Contador">Contador interno</option>
                                        <option value="Contador Ext">Contador independiente</option><option value="Administrativo">Responsable administrativo</option><option value="Otro">Otro</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex flex-col gap-1.5 sm:gap-2">
                                <label className="text-[#151E28] font-semibold text-xs sm:text-sm">Mensaje (Opcional)</label>
                                <textarea name="mensaje" rows={3} placeholder="Cuéntenos brevemente qué tipo de respaldo tributario necesita" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 sm:p-3 text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all text-[#151E28]"></textarea>
                            </div>

                            {errorMessage && (
                                <div className="bg-red-50 text-red-600 border border-red-200 p-3 rounded-xl text-xs sm:text-sm font-medium text-center">
                                    {errorMessage}
                                </div>
                            )}

                            {isSuccess && (
                                <div className="bg-green-50 text-green-700 border border-green-200 p-3 sm:p-4 rounded-xl text-xs sm:text-sm font-medium text-center">
                                    ✓ Gracias. Su solicitud fue registrada. Un asesor se pondrá en contacto a la brevedad.
                                </div>
                            )}

                            <button 
                                type="submit" 
                                disabled={isLoading || isSuccess}
                                className={`w-full mt-1 text-white font-bold tracking-wider uppercase py-3.5 sm:py-4 rounded-md transition-all duration-300 text-xs sm:text-sm font-jakarta
                                    ${isLoading || isSuccess 
                                        ? 'bg-gray-400 cursor-not-allowed' 
                                        : 'bg-orange-500 hover:bg-[#151E28] shadow-lg hover:shadow-xl'
                                    }`}
                            >
                                {isLoading ? 'ENVIANDO...' : isSuccess ? 'ENVIADO ✓' : 'SOLICITAR ACTIVACIÓN'}
                            </button>
                            
                            <p className="text-center text-gray-500 text-[0.75rem] sm:text-xs mt-1 leading-tight">
                                Al enviar sus datos declara haber leído el aviso de privacidad.
                            </p>
                        </form>
                    </div>

                </div>
            </div>
        </ScrollReveal>
    )
}