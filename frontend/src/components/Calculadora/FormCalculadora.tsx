import { Mail } from 'lucide-react'
import React from 'react'

export const FormCalculadora = () => {
    return (
        <div className="p-8 md:p-12">
            <form className="space-y-12">
                <section>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-1.5 h-8 bg-orange-500 rounded-full"></div>
                        <h3 className="text-xl font-medium text-blue-200 uppercase tracking-tight">
                            Información de Reporte
                        </h3>
                    </div>
                    <div className="grid grid-cols-1 gap-8">
                        <div>
                            <label className="block text-[0.80rem] font-black text-gray-500 uppercase 
                                tracking-widest mb-3">
                                Correo Institucional
                                <span className="text-orange-500">*</span>
                            </label>

                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                <input className="w-full pl-12 pr-4 py-4 bg-gray-800 border-gray-500 border
                                 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 
                                     rounded-lg text-blue-200 font-semibold transition-all"
                                    placeholder="ejemplo@empresa.com" required type="email"
                                />
                            </div>
                            <p className="mt-3 text-[0.80rem] text-gray-500">
                                Utilizaremos este medio para enviarle el informe técnico detallado en PDF.
                            </p>
                        </div>
                    </div>
                </section>

                <section>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-1.5 h-8 bg-orange-500 rounded-full"></div>
                        <h3 className="text-xl font-medium text-blue-200 uppercase tracking-tight">
                            Declaración de Ingresos
                        </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label className="block text-[0.8rem] font-bold text-gray-500 uppercase 
                                tracking-widest mb-3">
                                Ingresos Brutos Anuales
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                                    $
                                </span>
                                <input className="w-full pl-10 pr-4 py-4 bg-gray-800 
                                    border-slate-200 focus:border-orange-500 focus:ring-1 
                                    focus:ring-orange-500 rounded-lg text-blue-200 font-medium 
                                    transition-all" placeholder="0.00" type="number"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[0.8rem] font-bold text-gray-500 uppercase 
                                tracking-widest mb-3">
                                Bonificaciones y Otros
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                                    $
                                </span>
                                <input className="w-full pl-10 pr-4 py-4 bg-gray-800 border-slate-200 
                                    focus:border-orange-500 focus:ring-1 focus:ring-orange-500 rounded-lg 
                                    text-blue-200 font-semibold transition-all" placeholder="0.00" type="number" />
                            </div>
                        </div>
                    </div>
                </section>

                <div className="pt-6">
                    <button className="w-full bg-orange-500 text-white py-5 rounded-lg font-extrabold 
                        tracking-widest text-sm shadow-xl shadow-orange-500/20 hover:bg-blue-200 transition-all 
                        duration-300 cursor-pointer uppercase transform hover:-translate-y-1" type="submit">
                        Calcular Impuestos y Generar Reporte
                    </button>
                    <p className="text-center text-gray-500 text-[0.76rem] mt-6 uppercase tracking-widest font-bold">
                        Datos protegidos por nuestra política de privacidad corporativa.
                    </p>
                </div>
            </form>
            
        </div>
    )
}
