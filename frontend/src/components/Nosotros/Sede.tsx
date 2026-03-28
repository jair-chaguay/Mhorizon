import { Locate, LocateIcon, LocationEdit } from 'lucide-react'
import React from 'react'
import { Call, Location } from '../IconosSVG'

export const Sede = () => {
    return (
        <section className="py-32 bg-white border-t border-slate-100">
            <div className="max-w-7xl mx-auto px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                    <div className="lg:col-span-5">
                        <h2 className="font-bold text-4xl md:text-4xl text-blue-200 mb-10 leading-none uppercase 
                            tracking-tighter">Sede <br />
                            <span className="text-orange-500">
                                Central
                            </span>
                        </h2>

                        <div className="space-y-10 mb-12">
                            <div className="flex items-center group">
                                <div className="w-14 h-14 shrink-0 bg-gray-800 rounded-xl flex items-center 
                                    justify-center border border-slate-200 group-hover:bg-blue-200 
                                    transition-colors duration-300">
                                    <Location className=" text-orange-500 group-hover:text-white w-8" />
                                </div>
                                <div className="ml-6">
                                    <h6 className="font-bold text-blue-200 uppercase text-[12px] tracking-[0.2em] 
                                        mb-2">
                                        Dirección
                                    </h6>
                                    <p className="text-gray-500 text-2sm leading-relaxed">
                                        Carchi 601 y Quisquís,<br />Edificio Quil 1, Piso 12.<br />
                                        Guayaquil, Ecuador.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center group">
                                <div className="w-14 h-14 shrink-0 bg-gray-800 rounded-xl flex items-center 
                                    group-hover:bg-blue-200 justify-center border border-slate-200 
                                    transition-colors duration-300">
                                    <Call className="text-orange-500 group-hover:text-white w-8" />
                                </div>
                                <div className="ml-6">
                                    <h6 className="font-bold text-blue-200 uppercase text-[12px] tracking-[0.2em] mb-2">
                                        Contacto Directo
                                    </h6>
                                    <p className="text-gray-500 text-2sm mb-1">Telf: 04 269 1453</p>
                                    <a className="text-gray-500 text-2sm"
                                        href="mailto:news@mhorizon.com.ec">Email: news@mhorizon.com.ec</a>
                                </div>
                            </div>
                        </div>

                        <button className="w-full md:w-auto px-10 py-4 bg-orange-500 text-white font-bold 
                        uppercase tracking-[0.2em] text-[12px] rounded-sm hover:bg-blue-200 
                        transition-all duration-300 shadow-xl shadow-orange-500/20 cursor-pointer">
                            Agendar Reunión Consultiva
                        </button>
                    </div>

                    <div className="lg:col-span-7 h-[500px] relative rounded-2xl overflow-hidden border border-slate-200 shadow-2xl">
                        <iframe
                            src="https://www.google.com/maps/d/embed?mid=1tE26BQ-aupkJfKKzeQhxBH0pfNs&ehbc=2E312F"
                            className="w-full h-full"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
