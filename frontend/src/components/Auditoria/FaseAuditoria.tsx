

export const FaseAuditoria = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 reveal-element delay-100">

            <div className="relative bg-blue-200/94 border border-white/10 rounded-xl p-8 hover:bg-blue-200/90 transition-colors group overflow-hidden">
                <div className="absolute right-0 -top-1 text-[100px] font-extrabold text-white/5 group-hover:text-orange-500/10 transition-colors select-none leading-none z-0">
                    01
                </div>
                <div className="relative z-10">
                    <h4 className="text-orange-500 font-bold mb-1 uppercase tracking-wider text-sm">Fase 01</h4>
                    <h3 className="text-white text-[1.2rem] font-bold mb-4">Diagnóstico Profundo</h3>
                    <p className="text-gray-300 text-[0.95rem] leading-relaxed">
                        Utilizamos algoritmos y sistemas tecnológicos para procesar y categorizar patrones de datos históricos en todas sus entidades financieras de forma simultánea, detectando anomalías tempranas.
                    </p>
                </div>
            </div>

            <div className="relative bg-blue-200/94 border border-white/10 rounded-xl p-8 hover:bg-blue-200/90 transition-colors group overflow-hidden">
                <div className="absolute right-0 -top-1 text-[100px] font-extrabold text-white/5 group-hover:text-orange-500/10 transition-colors select-none leading-none z-0">
                    02
                </div>
                <div className="relative z-10">
                    <h4 className="text-orange-500 font-bold mb-1 uppercase tracking-wider text-sm">Fase 02</h4>
                    <h3 className="text-white text-[1.2rem] font-bold mb-4">Cumplimiento Estructural</h3>
                    <p className="text-gray-300 text-[0.95rem] leading-relaxed mb-4">
                        Mapeamos sus controles internos frente a marcos internacionales (NIIF/GAAP) para asegurar una solidez legal total.
                    </p>
                    <ul className="space-y-2 text-[0.9rem] text-gray-300">
                        <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span> Mapeo Regulatorio</li>
                        <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span> Verificación Forense</li>
                        <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span> Pruebas de Control</li>
                    </ul>
                </div>
            </div>

            <div className="relative bg-blue-200/94 border border-white/10 rounded-xl p-8 hover:bg-blue-200/90 transition-colors group overflow-hidden">
                <div className="absolute right-0 -top-1 text-[100px] font-extrabold text-white/5 group-hover:text-orange-500/10 transition-colors select-none leading-none z-0">
                    03
                </div>
                <div className="relative z-10">
                    <h4 className="text-orange-500 font-bold mb-1 uppercase tracking-wider text-sm">Fase 03</h4>
                    <h3 className="text-white text-[1.2rem] font-bold mb-4">Perspectivas de Rendimiento</h3>
                    <p className="text-gray-300 text-[0.95rem] leading-relaxed">
                        Transformamos los hallazgos de la auditoría en oportunidades estratégicas ejecutables. Entregamos reportes enfocados en la optimización del capital, eficiencia fiscal y la reducción general de costos.
                    </p>
                </div>
            </div>

        </div>
    )
}