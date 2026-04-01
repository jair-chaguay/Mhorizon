interface TeamProp {
    image: string,
    rol: string,
    nombre: string,
    frase: string
}


export const TeamCard = ({ image, rol, nombre, frase }: TeamProp) => {
    return (
        <div className="group bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-500 flex flex-col md:flex-row reveal-element delay-100">
            <div className="relative md:w-2/5 h-87.5 md:h-auto overflow-hidden bg-blue-200">
                <img className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform opacity-90
                    duration-700 group-hover:opacity-100"
                    alt={nombre} src={`/images/${image}`} />
                <div className="absolute inset-0 bg-linear-to-t from-blue-200 via-blue-200/20 to-transparent opacity-60"></div>
            </div>

            <div className="p-8 md:p-10 md:w-3/5 flex flex-col justify-center bg-white relative">
                <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-orange-500/20 rounded-tr-2xl m-4"></div>
                <p className="text-orange-500 font-bold text-[0.75rem] uppercase tracking-widest mb-2">
                    {rol}
                </p>
                <h4 className="font-extrabold text-[1.6rem] text-blue-200 tracking-tight mb-4">
                    {nombre}
                </h4>
                <div className="h-px w-12 bg-gray-200 mb-6"></div>

                <p className="text-gray-600 italic font-light leading-relaxed text-[0.95rem] mb-6">
                    "{frase}"
                </p>

                <div className="mt-auto flex items-center gap-3">
                    <a href="mailto:mmontece@mhorizon.com.ec" className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 text-gray-500 hover:bg-orange-500 hover:text-white transition-colors" aria-label="Email">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 text-gray-500 hover:bg-blue-200 hover:text-white transition-colors" aria-label="LinkedIn">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                    </a>
                </div>
            </div>
        </div>
    )
}
