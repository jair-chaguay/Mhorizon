import { Button } from '../Button'
import { Call, Location } from '../IconosSVG'
import { ScrollReveal } from '../ScrollReveal'

export const Sede = () => {
    return (
        <section className="py-24 bg-gray-800 border-b border-gray-200 overflow-hidden">
            <div className="max-w-350 mx-auto px-5 sm:px-8 md:px-12">
                <ScrollReveal className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

                    <div className="lg:col-span-5 reveal-element">
                        <div className='border-l-6 border-l-orange-500 pl-4'>
                            <span className="text-orange-500 font-bold tracking-[0.2em] text-[0.85rem] uppercase mb-2 block">
                            Nuestra Ubicación
                        </span>
                        <h2 className="font-extrabold text-[2.2rem] sm:text-[2.8rem] text-blue-200 mb-10 leading-none uppercase tracking-tight">
                            SEDE <br />ESTRATÉGICA
                        </h2>
                        </div>


                        <div className="space-y-10 mb-12">
                            <div className="flex items-start group">
                                <div className="w-14 h-14 shrink-0 bg-white shadow-md rounded-xl flex items-center justify-center border border-gray-200 group-hover:bg-blue-200 transition-colors duration-300">
                                    <Location className=" text-orange-500 group-hover:text-white w-8" />
                                </div>
                                <div className="ml-6 mt-1">
                                    <h6 className="font-extrabold text-blue-200 uppercase text-[0.85rem] tracking-widest mb-2">
                                        Dirección Corporativa
                                    </h6>
                                    <p className="text-gray-600 text-[1rem] leading-relaxed">
                                        Carchi 601 y Quisquís,<br />Edificio Quil 1, Piso 12.<br />
                                        Guayaquil, Ecuador.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start group">
                                <div className="w-14 h-14 shrink-0 bg-white shadow-md rounded-xl flex items-center justify-center border border-gray-200 group-hover:bg-blue-200 transition-colors duration-300">
                                    <Call className="text-orange-500 group-hover:text-white w-7 h-7" />
                                </div>
                                <div className="ml-6 mt-1">
                                    <h6 className="font-extrabold text-blue-200 uppercase text-[0.85rem] tracking-widest mb-2">
                                        Contacto Directo
                                    </h6>
                                    <p className="text-gray-600 text-[1rem] mb-1 font-light">Telf: <a href="tel:+59342691453" className="hover:text-orange-500 transition-colors">(04) 269 1453</a></p>
                                    <p className="text-gray-600 text-[1rem] font-light">Email: <a className="hover:text-orange-500 transition-colors" href="mailto:news@mhorizon.com.ec">news@mhorizon.com.ec</a></p>
                                </div>
                            </div>
                        </div>

                        <Button texto='Agendar Reunión' estilosPersonalizados='w-full md:w-auto px-10 py-4 bg-orange-500 text-white font-bold uppercase tracking-wider text-[0.9rem] rounded-sm hover:bg-blue-200 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 cursor-pointer'/>
                    </div>

                    <div className="lg:col-span-7 h-112.5 md:h-137.5 relative rounded-2xl overflow-hidden border border-gray-200 shadow-2xl reveal-element delay-200">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d449.15105009908996!2d-79.89510949343716!3d-2.1863483125435574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x902d6dde48ca34eb%3A0xbc45ee4f04999be1!2sMhorizon-Ecuador%20S.A.!5e0!3m2!1ses!2sec!4v1778606049825!5m2!1ses!2sec" className="w-full h-full border-0 grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-500" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>

                </ScrollReveal>
            </div>
        </section>
    )
}
