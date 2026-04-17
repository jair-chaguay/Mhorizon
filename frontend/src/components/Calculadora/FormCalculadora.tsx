/* eslint-disable @typescript-eslint/no-explicit-any */
import { Mail } from 'lucide-react'
import { useState } from 'react';

interface FormCalculadoraProps {
    onResultadosUpdate: (data: any) => void;
}

export const FormCalculadora = ({ onResultadosUpdate }: FormCalculadoraProps) => {

    const tablaGeneral = [
        { fb: 0, hasta: 12208, ib: 0, exc: 0 },
        { fb: 12208, hasta: 15549, ib: 0, exc: 0.05 },
        { fb: 15549, hasta: 20188, ib: 167, exc: 0.10 },
        { fb: 20188, hasta: 26700, ib: 631, exc: 0.12 },
        { fb: 26700, hasta: 35136, ib: 1412, exc: 0.15 },
        { fb: 35136, hasta: 46575, ib: 2678, exc: 0.20 },
        { fb: 46575, hasta: 62005, ib: 4965, exc: 0.25 },
        { fb: 62005, hasta: 82679, ib: 8823, exc: 0.30 },
        { fb: 82679, hasta: 109956, ib: 15025, exc: 0.35 },
        { fb: 109956, hasta: Infinity, ib: 24572, exc: 0.37 }
    ];

    const tablaRimpe = [
        { fb: 0, hasta: 2500, ib: 0, exc: 0 },
        { fb: 2500, hasta: 5000, ib: 5, exc: 0 },
        { fb: 5000, hasta: 10000, ib: 15, exc: 0 },
        { fb: 10000, hasta: 15000, ib: 35, exc: 0 },
        { fb: 15000, hasta: 20000, ib: 60, exc: 0 },
        { fb: 20000, hasta: 50000, ib: 60, exc: 0.01 },
        { fb: 50000, hasta: 75000, ib: 360, exc: 0.0125 },
        { fb: 75000, hasta: 100000, ib: 672.50, exc: 0.015 },
        { fb: 100000, hasta: 200000, ib: 1047.50, exc: 0.0175 },
        { fb: 200000, hasta: 300000, ib: 2797.52, exc: 0.02 }
    ];

    const maxGastos = [5752.60, 7396.20, 9039.80, 11505.20, 13970.60, 16436.00];

    // Estados principales
    const [tipoPersona, setTipoPersona] = useState('natural');
    const [isRimpe, setIsRimpe] = useState(false);
    const [correo, setCorreo] = useState('');
    const [ingresos, setIngresos] = useState('');
    const [deducibles, setDeducibles] = useState('');

    // Estados Persona Natural
    const [discapacidad, setDiscapacidad] = useState('no');
    const [cargas, setCargas] = useState('0');
    const [gastosProyectados, setGastosProyectados] = useState('');

    // Estados Persona Jurídica
    const [ingresosExentos, setIngresosExentos] = useState('');
    const [gastosNoDeducibles, setGastosNoDeducibles] = useState('');
    const [deduccionesAdicionales, setDeduccionesAdicionales] = useState('');

    const handleCalcular = (e: any) => {
        e.preventDefault();

        const ing = parseFloat(ingresos) || 0;
        const ded = parseFloat(deducibles) || 0;

        let baseImponible = 0;
        let impuestoCausado = 0;
        let rebaja = 0;
        let impuestoAPagar = 0;

        if (isRimpe) {
            if (ing > 300000) {
                alert(`Alerta: Sus ingresos superan los $300,000. Debe calcular como persona ${tipoPersona === 'natural' ? 'natural' : 'jurídica'} NO RIMPE. Por favor, seleccione 'NO' en la pregunta de régimen RIMPE.`);
                return;
            }
            const rango = tablaRimpe.find(r => ing > r.fb && ing <= r.hasta) || tablaRimpe[0];

            if (rango.exc === 0) {
                impuestoAPagar = rango.ib;
            } else {
                const valorExcedente = (ing - rango.fb) * rango.exc;
                impuestoAPagar = valorExcedente + rango.ib;
            }

            baseImponible = ing;
            impuestoCausado = impuestoAPagar;

        } else {
            if (tipoPersona === 'juridica') {
                const exentos = parseFloat(ingresosExentos) || 0;
                const noDeducibles = parseFloat(gastosNoDeducibles) || 0;
                const adicionales = parseFloat(deduccionesAdicionales) || 0;

                baseImponible = Math.max(0, ing - ded - exentos + noDeducibles - adicionales);
                impuestoCausado = baseImponible * 0.25;
                impuestoAPagar = impuestoCausado;

            } else {
                // Persona Natural NO Rimpe
                baseImponible = Math.max(0, ing - ded);
                const rango = tablaGeneral.find(r => baseImponible >= r.fb && baseImponible <= r.hasta) || tablaGeneral[tablaGeneral.length - 1];

                const valorExcedente = (baseImponible - rango.fb) * rango.exc;
                impuestoCausado = valorExcedente + rango.ib;

                const hasDisc = discapacidad === 'si';
                const numCargas = parseInt(cargas) || 0;
                const proy = parseFloat(gastosProyectados) || 0;

                const montoMax = hasDisc ? 82180.00 : maxGastos[Math.min(numCargas, 5)];
                rebaja = Math.min(proy, montoMax) * 0.18;
                impuestoAPagar = Math.max(0, impuestoCausado - rebaja);
            }
        }

        const tasa = baseImponible > 0 ? ((impuestoAPagar / baseImponible) * 100).toFixed(1) : 0;

        onResultadosUpdate({
            base: baseImponible,
            causado: impuestoCausado,
            rebaja: rebaja,
            pagar: impuestoAPagar,
            tasa: tasa
        });
    };

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
            <form onSubmit={handleCalcular} className="space-y-12">

                <section>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-1.5 h-6 bg-orange-500 rounded-full"></div>
                        <h3 className="text-[1.1rem] font-bold text-blue-200 uppercase tracking-wide">
                            Información de Contacto
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
                                    value={correo} onChange={(e) => setCorreo(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <hr className="border-slate-100" />

                <section>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-1.5 h-6 bg-orange-500 rounded-full"></div>
                        <h3 className="text-[1.1rem] font-bold text-blue-200 uppercase tracking-wide">
                            Perfil Tributario
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-gray-50 p-6 rounded-xl border border-slate-100">
                            <label className="block text-[0.70rem] font-black text-gray-500 uppercase tracking-widest mb-4">Tipo de Contribuyente</label>
                            <div className="flex bg-white rounded-lg p-1 border border-slate-200 shadow-sm">
                                <label className="flex-1 cursor-pointer">
                                    <input type="radio" name="tipo_persona" value="natural" checked={tipoPersona === 'natural'} onChange={() => setTipoPersona('natural')} className="hidden peer" />
                                    <div className="text-center py-2.5 rounded-md peer-checked:bg-blue-200 peer-checked:text-white peer-checked:shadow text-gray-500 transition-all font-bold text-xs uppercase">Natural</div>
                                </label>
                                <label className="flex-1 cursor-pointer">
                                    <input type="radio" name="tipo_persona" value="juridica" checked={tipoPersona === 'juridica'} onChange={() => setTipoPersona('juridica')} className="hidden peer" />
                                    <div className="text-center py-2.5 rounded-md peer-checked:bg-blue-200 peer-checked:text-white peer-checked:shadow text-gray-500 transition-all font-bold text-xs uppercase">Jurídica</div>
                                </label>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-xl border border-slate-100">
                            <label className="block text-[0.70rem] font-black text-gray-500 uppercase tracking-widest mb-4">¿Sujeto a Régimen RIMPE?</label>
                            <div className="flex bg-white rounded-lg p-1 border border-slate-200 shadow-sm">
                                <label className="flex-1 cursor-pointer">
                                    <input type="radio" name="rimpe" checked={isRimpe === false} onChange={() => setIsRimpe(false)} className="hidden peer" />
                                    <div className="text-center py-2.5 rounded-md peer-checked:bg-orange-500 peer-checked:text-white peer-checked:shadow text-gray-500 transition-all font-bold text-xs uppercase">NO</div>
                                </label>
                                <label className="flex-1 cursor-pointer">
                                    <input type="radio" name="rimpe" checked={isRimpe === true} onChange={() => setIsRimpe(true)} className="hidden peer" />
                                    <div className="text-center py-2.5 rounded-md peer-checked:bg-orange-500 peer-checked:text-white peer-checked:shadow text-gray-500 transition-all font-bold text-xs uppercase">SÍ</div>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Ingresos Gravados / Brutos <span className="text-orange-500">*</span></label>
                            <div className='relative'>
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                                <input type="number" className="border-slate-200 w-full p-3.5 pl-8 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none text-blue-200 font-bold transition-all" placeholder="0.00" step="0.01" required
                                    value={ingresos} onChange={(e) => setIngresos(e.target.value)} />
                            </div>
                        </div>

                        {!isRimpe && (
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Costos y Gastos Deducibles</label>
                                <div className='relative'>
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                                    <input type="number" className="border-slate-200 w-full pl-8 p-3.5 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none text-blue-200 font-bold transition-all" placeholder="0.00" step="0.01"
                                        value={deducibles} onChange={(e) => setDeducibles(e.target.value)} />
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                {!isRimpe && tipoPersona === 'natural' && (
                    <section className="space-y-6 pt-6 border-t border-slate-100">
                        <h4 className="text-blue-200 font-extrabold uppercase tracking-widest text-xs">Datos Personales y Cargas</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">¿Discapacidad o Enf. Crónica?</label>
                                <select value={discapacidad} onChange={(e) => setDiscapacidad(e.target.value)} className="border-slate-200 w-full p-3.5 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none text-blue-200 font-medium cursor-pointer transition-all">
                                    <option value="no">No</option>
                                    <option value="si">Sí (Personal o carga)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Número de Cargas Familiares</label>
                                <select value={cargas} onChange={(e) => setCargas(e.target.value)} className="border-slate-200 w-full p-3.5 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none text-blue-200 font-medium cursor-pointer transition-all">
                                    <option value="0">0</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5 o más</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Gastos Personales Proyectados</label>
                            <div className='relative'>
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                                <input value={gastosProyectados} onChange={(e) => setGastosProyectados(e.target.value)} type="number" className="pl-8 border-slate-200 w-full p-3.5 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none text-blue-200 font-bold transition-all" placeholder="0.00" step="0.01" />
                            </div>
                        </div>
                    </section>
                )}

                {!isRimpe && tipoPersona === 'juridica' && (
                    <section className="space-y-6 pt-6 border-t border-slate-100">
                        <h4 className="text-blue-200 font-extrabold uppercase tracking-widest text-xs">Conciliación Tributaria</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-[0.65rem] font-bold text-gray-500 uppercase tracking-widest mb-2">Ingresos Exentos</label>
                                <div className='relative'>
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                                    <input type="number" value={ingresosExentos} onChange={(e) => setIngresosExentos(e.target.value)} className="border-slate-200 pl-8 w-full p-3 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none text-blue-200 font-bold transition-all" placeholder="0.00" step="0.01" />

                                </div>
                            </div>
                            <div>
                                <label className="block text-[0.65rem] font-bold text-gray-500 uppercase tracking-widest mb-2">Gastos No Deducibles</label>
                                <div className='relative'>
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                                    <input type="number" value={gastosNoDeducibles} onChange={(e) => setGastosNoDeducibles(e.target.value)} className="pl-8 border-slate-200 w-full p-3 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none text-blue-200 font-bold transition-all" placeholder="0.00" step="0.01" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-[0.65rem] font-bold text-gray-500 uppercase tracking-widest mb-2">Deducc. Adicionales</label>
                                <div className='relative'>
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                                    <input type="number" value={deduccionesAdicionales} onChange={(e) => setDeduccionesAdicionales(e.target.value)} className="border-slate-200 w-full pl-8 p-3 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none text-blue-200 font-bold transition-all" placeholder="0.00" step="0.01" />
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 bg-gray-50 p-4 rounded-lg border border-slate-200">
                            <p className="text-[0.65rem] text-gray-500 leading-relaxed text-center">
                                * Cálculo referencial aplicando la tarifa del 25% (Art. 37 LRTI). Consulte con su asesor para una conciliación exacta.
                            </p>
                        </div>
                    </section>
                )}

                <div className="pt-4 border-t border-gray-100">
                    <button className="cursor-pointer w-full bg-orange-500 text-white py-5 rounded-xl font-bold tracking-widest text-[0.95rem] shadow-lg shadow-orange-500/30 hover:bg-blue-200 transition-all duration-300 uppercase transform hover:-translate-y-1" type="submit">
                        Calcular Impuestos y Generar Reporte
                    </button>
                    <div className="flex items-center justify-center gap-2 mt-5">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                        <p className="text-center text-gray-500 text-[0.75rem] uppercase tracking-widest font-semibold">
                            Datos protegidos por cifrado corporativo.
                        </p>
                    </div>
                </div>
            </form>
        </div>
    );
}