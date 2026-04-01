import { Mail } from 'lucide-react'

export const FormCalculadora = () => {
    return (
        <div className="p-8 md:p-12">

            <div className="mb-10">
                <h2 className="text-blue-200 font-bold text-[1.8rem] md:text-[2rem] tracking-tight leading-tight">
                    Ingrese sus Parámetros
                </h2>
                <p className="mt-2 text-gray-500 text-[1rem]">
                    Complete los campos a continuación para generar una proyección estimada de su carga tributaria anual.
                </p>
            </div>
            <form action="#" method="POST" className="space-y-12">

                <section>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-1.5 h-6 bg-orange-500 rounded-full"></div>
                        <h3 className="text-[1.1rem] font-bold text-blue-200 uppercase tracking-wide">
                            Información de Reporte
                        </h3>
                    </div>
                    <div className="grid grid-cols-1 gap-6">
                        <div>
                            <label className="block text-[0.85rem] font-bold text-gray-600 uppercase tracking-widest mb-2">
                                Correo Institucional
                                <span className="text-orange-500">*</span>
                            </label>

                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors w-5 h-5" />
                                <input className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 focus:border-orange-500 focus:bg-white focus:ring-1 focus:ring-orange-500 rounded-lg text-blue-200 font-medium transition-all outline-none"
                                    placeholder="ejemplo@empresa.com" required type="email"
                                />
                            </div>
                            <p className="mt-2 text-[0.80rem] text-gray-500">
                                Utilizaremos este medio para enviarle el informe técnico detallado en PDF.
                            </p>
                        </div>
                    </div>
                </section>

                <section>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-1.5 h-6 bg-orange-500 rounded-full"></div>
                        <h3 className="text-[1.1rem] font-bold text-blue-200 uppercase tracking-wide">
                            Declaración Financiera Anual
                        </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label className="block text-[0.85rem] font-medium text-gray-600 uppercase tracking-widest mb-2">
                                Ingresos Brutos
                            </label>

                            <div className="relative group">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 font-bold transition-colors">
                                    $
                                </span>
                                <input className="w-full pl-10 pr-4 py-4 bg-gray-50 border border-gray-200 focus:border-orange-500 focus:bg-white focus:ring-1 focus:ring-orange-500 rounded-lg text-blue-200 font-medium transition-all outline-none" placeholder="0.00" type="number" step="0.01" min="0"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[0.85rem] font-bold text-gray-600 uppercase tracking-widest mb-2">
                                Bonificaciones y Otros
                            </label>
                            <div className="relative group">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 font-bold transition-colors">
                                    $
                                </span>
                                <input className="w-full pl-10 pr-4 py-4 bg-gray-50 border border-gray-200 focus:border-orange-500 focus:bg-white focus:ring-1 focus:ring-orange-500 rounded-lg text-blue-200 font-medium transition-all outline-none" placeholder="0.00" type="number" />
                            </div>
                        </div>
                    </div>
                </section>

                <div className="pt-4 border-t border-gray-100">
                    <button className=" cursor-pointer w-full bg-orange-500 text-white py-5 rounded-lg font-bold tracking-widest text-[0.95rem] shadow-lg shadow-orange-500/20 hover:bg-blue-200 hover:shadow-xl transition-all duration-300 uppercase transform hover:-translate-y-1" type="submit">
                        Calcular Impuestos y Generar Reporte
                    </button>
                    <div className="flex items-center justify-center gap-2 mt-5">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                        <p className="text-center text-gray-500 text-[0.75rem] uppercase tracking-widest font-semibold">
                            Datos protegidos por cifrado corporativo.
                        </p>
                    </div>
                </div>
            </form>

        </div>
    )
}
