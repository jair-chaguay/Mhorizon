/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Mail, Loader2 } from 'lucide-react'
import { useState } from 'react';
import api from '../../api/axios';

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
    const [tipoRimpe, setTipoRimpe] = useState('popular'); // Nuevo estado
    const [correo, setCorreo] = useState('');
    const [ingresos, setIngresos] = useState('');
    const [deducibles, setDeducibles] = useState('');
    const [creditosTributarios, setCreditosTributarios] = useState(''); // Nuevo estado

    // Estados Persona Natural
    const [discapacidad, setDiscapacidad] = useState('no');
    const [cargas, setCargas] = useState('0');
    const [gastosProyectados, setGastosProyectados] = useState('');

    // Estados Persona Jurídica
    const [ingresosExentos, setIngresosExentos] = useState('');
    const [gastosNoDeducibles, setGastosNoDeducibles] = useState('');
    const [deduccionesAdicionales, setDeduccionesAdicionales] = useState('');
    const [loading, setLoading] = useState(false);

    const handleCalcular = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!correo) {
            alert("Por favor ingrese un correo");
            return;
        }

        const ing = parseFloat(ingresos) || 0;
        const ded = parseFloat(deducibles) || 0;
        let cred = parseFloat(creditosTributarios) || 0;

        if (tipoPersona === 'natural' && isRimpe && tipoRimpe === 'popular') {
            cred = 0;
            if (ing > 20000) {
                alert(`Alerta: Si ingresa un valor mayor a $20,000 no puede calcular como Negocio Popular. Debe calcular como Emprendedor.`);
                return;
            }
        }

        if (isRimpe && ing > 300000) {
            alert(`Alerta: Sus ingresos superan los $300,000. Debe calcular como persona ${tipoPersona === 'natural' ? 'natural' : 'jurídica'} NO RIMPE. Por favor, seleccione 'GENERAL' en la pregunta de régimen.`);
            return;
        }

        let baseImponible = 0;
        let impuestoCausado = 0;
        let rebaja = 0;
        let impuestoAPagar = 0;

        if (isRimpe) {
            const rango = tablaRimpe.find(r => ing > r.fb && ing <= r.hasta) || tablaRimpe.find(_r => ing === 0) || tablaRimpe[0];

            let impuestoAPagarBruto = 0;
            if (rango.exc === 0) {
                impuestoAPagarBruto = rango.ib;
            } else {
                const valorExcedente = (ing - rango.fb) * rango.exc;
                impuestoAPagarBruto = valorExcedente + rango.ib;
            }

            baseImponible = ing;
            impuestoCausado = impuestoAPagarBruto;
            impuestoAPagar = impuestoCausado - cred; // Restar créditos
        } else {
            if (tipoPersona === 'juridica') {
                const exentos = parseFloat(ingresosExentos) || 0;
                const noDeducibles = parseFloat(gastosNoDeducibles) || 0;
                const adicionales = parseFloat(deduccionesAdicionales) || 0;

                baseImponible = Math.max(0, ing - ded - exentos + noDeducibles - adicionales);
                impuestoCausado = baseImponible * 0.25;
                impuestoAPagar = impuestoCausado - cred; // Restar créditos
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
                impuestoAPagar = Math.max(0, impuestoCausado - rebaja) - cred; // Restar créditos al final
            }
        }

        onResultadosUpdate({
            base: baseImponible,
            causado: impuestoCausado,
            rebaja: rebaja,
            creditos: cred,
            pagar: impuestoAPagar, // Puede ser negativo (Saldo a favor)
        });

        setLoading(true);
        const payload = {
            correo: correo,
            tipo_contribuyente: tipoPersona === 'natural' ? 'Natural' : 'Jurídica',
            regimen: isRimpe,
            resultados: {
                base: baseImponible,
                causado: impuestoCausado,
                rebaja: rebaja,
                creditos: cred,
                pagar: impuestoAPagar
            }
        };

        try {
            await api.post('/correoC', payload);
        } catch (error) {
            console.error("Error al guardar el correo", error);
        } finally {
            setLoading(false);
        }
    };

    const inputCreditosRender = (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <label className="md:w-1/2 text-xs font-bold text-gray-500 uppercase">Créditos Tributarios</label>
            <div className="md:w-1/2">
                <input type="number" value={creditosTributarios} onChange={(e) => setCreditosTributarios(e.target.value)} className="w-full p-3 bg-gray-800 border border-slate-200 rounded-md focus:ring-1 focus:ring-orange-500 outline-none" placeholder="0.00" step="0.01" />
            </div>
        </div>
    );
    const showCreditosInValores = !(tipoPersona === 'juridica' && !isRimpe) && !(tipoPersona === 'natural' && isRimpe && tipoRimpe === 'popular');

    return (
        <div className="p-8 md:p-12 md:py-20">
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

                <div className="space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gray-800 p-4 rounded-lg border border-slate-200">
                        <label className="md:w-1/2 text-[0.70rem] font-black text-gray-500 uppercase tracking-widest">Tipo de Contribuyente</label>
                        <div className="md:w-1/2 flex gap-3">
                            <label className="flex-1 cursor-pointer">
                                <input type="radio" name="tipo_contribuyente" value="natural" checked={tipoPersona === 'natural'} onChange={() => setTipoPersona('natural')} className="hidden peer" />
                                <div className="text-center py-2 rounded border-2 border-slate-200 peer-checked:border-blue-200 peer-checked:bg-blue-200 peer-checked:text-white transition-all font-bold text-xs uppercase">Natural</div>
                            </label>
                            <label className="flex-1 cursor-pointer">
                                <input type="radio" name="tipo_contribuyente" value="juridica" checked={tipoPersona === 'juridica'} onChange={() => setTipoPersona('juridica')} className="hidden peer" />
                                <div className="text-center py-2 rounded border-2 border-slate-200 peer-checked:border-blue-200 peer-checked:bg-blue-200 peer-checked:text-white transition-all font-bold text-xs uppercase">Jurídica</div>
                            </label>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gray-800 p-4 rounded-lg border border-slate-200">
                        <label className="md:w-1/2 text-[0.70rem] font-black text-gray-500 uppercase tracking-widest">Tipo de Régimen</label>
                        <div className="md:w-1/2 flex gap-3">
                            <label className="flex-1 cursor-pointer">
                                <input type="radio" name="regimen" value="general" checked={!isRimpe} onChange={() => setIsRimpe(false)} className="hidden peer" />
                                <div className="text-center py-2 rounded border-2 border-slate-200 peer-checked:border-orange-500 peer-checked:bg-orange-500/10 peer-checked:text-orange-500 transition-all font-bold text-xs uppercase">General</div>
                            </label>
                            <label className="flex-1 cursor-pointer">
                                <input type="radio" name="regimen" value="rimpe" checked={isRimpe} onChange={() => setIsRimpe(true)} className="hidden peer" />
                                <div className="text-center py-2 rounded border-2 border-slate-200 peer-checked:border-orange-500 peer-checked:bg-orange-500/10 peer-checked:text-orange-500 transition-all font-bold text-xs uppercase">RIMPE</div>
                            </label>
                        </div>
                    </div>

                    {tipoPersona === 'natural' && isRimpe && (
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gray-800 p-4 rounded-lg border border-slate-200">
                            <label className="md:w-1/2 text-[0.70rem] font-black text-gray-500 uppercase tracking-widest">Categoría RIMPE</label>
                            <div className="md:w-1/2 flex gap-3">
                                <label className="flex-1 cursor-pointer">
                                    <input type="radio" name="tipo_rimpe" value="popular" checked={tipoRimpe === 'popular'} onChange={() => setTipoRimpe('popular')} className="hidden peer" />
                                    <div className="text-center py-2 rounded border-2 border-slate-200 peer-checked:border-blue-200 peer-checked:bg-blue-200 peer-checked:text-white transition-all font-bold text-[0.65rem] uppercase">Negocio Popular</div>
                                </label>
                                <label className="flex-1 cursor-pointer">
                                    <input type="radio" name="tipo_rimpe" value="emprendedor" checked={tipoRimpe === 'emprendedor'} onChange={() => setTipoRimpe('emprendedor')} className="hidden peer" />
                                    <div className="text-center py-2 rounded border-2 border-slate-200 peer-checked:border-blue-200 peer-checked:bg-blue-200 peer-checked:text-white transition-all font-bold text-[0.65rem] uppercase">Emprendedor</div>
                                </label>
                            </div>
                        </div>
                    )}
                </div>




                {tipoPersona === 'natural' && !isRimpe && (
                    <div className="space-y-4 pt-6 border-t border-slate-100">
                        <h4 className="text-blue-200 font-bold uppercase tracking-widest text-xs mb-4">Datos Personales</h4>
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <label className="md:w-1/2 text-xs font-bold text-gray-500 uppercase">¿Discapacidad o Enf. Crónica?</label>
                            <div className="md:w-1/2">
                                <select value={discapacidad} onChange={(e) => setDiscapacidad(e.target.value)} className="w-full p-3 bg-gray-800 border border-slate-200 rounded-md outline-none">
                                    <option value="no">No</option>
                                    <option value="si">Sí (Personal o carga)</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <label className="md:w-1/2 text-xs font-bold text-gray-500 uppercase">Número de Cargas Familiares</label>
                            <div className="md:w-1/2">
                                <select value={cargas} onChange={(e) => setCargas(e.target.value)} className="w-full p-3 bg-gray-800 border border-slate-200 rounded-md outline-none">
                                    <option value="0">0</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5 o más</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <label className="md:w-1/2 text-xs font-bold text-gray-500 uppercase">Gastos Personales Proyectados</label>
                            <div className="md:w-1/2">
                                <input type="number" value={gastosProyectados} onChange={(e) => setGastosProyectados(e.target.value)} className="w-full p-3 bg-gray-800 border border-slate-200 rounded-md outline-none" placeholder="0.00" step="0.01" />
                            </div>
                        </div>
                    </div>
                )}

                {/* --- SECCIÓN: Valores de Cálculo --- */}
                <div className="space-y-4 pt-6 border-t border-slate-100">
                    <h4 className="text-blue-200 font-bold uppercase tracking-widest text-xs mb-4">Valores de Cálculo</h4>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <label className="md:w-1/2 text-xs font-bold text-gray-500 uppercase">Ingresos Gravados / Brutos</label>
                        <div className="md:w-1/2">
                            <input type="number" value={ingresos} onChange={(e) => setIngresos(e.target.value)} className="w-full p-3 bg-gray-800 border border-slate-200 rounded-md focus:ring-1 focus:ring-orange-500 outline-none" placeholder="0.00" step="0.01" required />
                        </div>
                    </div>
                    
                    {!isRimpe && (
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <label className="md:w-1/2 text-xs font-bold text-gray-500 uppercase">Costos y Gastos Deducibles</label>
                            <div className="md:w-1/2">
                                <input type="number" value={deducibles} onChange={(e) => setDeducibles(e.target.value)} className="w-full p-3 bg-gray-800 border border-slate-200 rounded-md focus:ring-1 focus:ring-orange-500 outline-none" placeholder="0.00" step="0.01" />
                            </div>
                        </div>
                    )}

                    {showCreditosInValores && inputCreditosRender}
                </div>

                {/* --- SECCIÓN: Conciliación Tributaria (Juridica - General) --- */}
                {tipoPersona === 'juridica' && !isRimpe && (
                    <div className="space-y-4 pt-6 border-t border-slate-100">
                        <h4 className="text-blue-200 font-bold uppercase tracking-widest text-xs mb-4">Conciliación Tributaria</h4>
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <label className="md:w-1/2 text-xs font-bold text-gray-500 uppercase">Ingresos Exentos</label>
                            <div className="md:w-1/2">
                                <input type="number" value={ingresosExentos} onChange={(e) => setIngresosExentos(e.target.value)} className="w-full p-3 bg-gray-800 border border-slate-200 rounded-md outline-none" placeholder="0.00" step="0.01" />
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <label className="md:w-1/2 text-xs font-bold text-gray-500 uppercase">Gastos No Deducibles</label>
                            <div className="md:w-1/2">
                                <input type="number" value={gastosNoDeducibles} onChange={(e) => setGastosNoDeducibles(e.target.value)} className="w-full p-3 bg-gray-800 border border-slate-200 rounded-md outline-none" placeholder="0.00" step="0.01" />
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <label className="md:w-1/2 text-xs font-bold text-gray-500 uppercase">Deducciones Adicionales</label>
                            <div className="md:w-1/2">
                                <input type="number" value={deduccionesAdicionales} onChange={(e) => setDeduccionesAdicionales(e.target.value)} className="w-full p-3 bg-gray-800 border border-slate-200 rounded-md outline-none" placeholder="0.00" step="0.01" />
                            </div>
                        </div>
                        
                        {inputCreditosRender}
                    </div>
                )}

                <div className="pt-4 border-t border-gray-100">
                    <button disabled={loading} className="cursor-pointer w-full bg-orange-500 text-white py-5 rounded-xl font-bold tracking-widest text-[0.95rem] shadow-lg shadow-orange-500/30 hover:bg-blue-200 transition-all duration-300 uppercase transform hover:-translate-y-1 flex items-center justify-center gap-2" type="submit">
                        {loading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Procesando...
                            </>
                        ) : (
                            'Calcular Impuestos y Generar Reporte'
                        )}
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