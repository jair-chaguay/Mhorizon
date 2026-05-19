
interface TeamProp {
    image: string,
    rol: string,
    nombre: string,
    frase: string,
    linkedin?: string,
    instagram?: string,
    tiktok?: string,
    compact?: boolean
}

export const TeamCard = ({ image, rol, nombre, frase, linkedin, instagram, tiktok, compact = false }: TeamProp) => {
    return (
        <div className={`
            group bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-200 
            hover:shadow-2xl transition-all duration-500 flex flex-col md:flex-row
        `}>

            <div className={`
                relative md:w-2/5 overflow-hidden bg-blue-200
                ${compact
                    ? "h-66 md:h-66 lg:h-66"  
                    : "h-80 md:h-auto"
                }
            `}>
                <img className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform opacity-90
                    duration-700 group-hover:opacity-100"
                    alt={nombre} src={`/images/${image}`} />
                <div className="absolute inset-0 bg-linear-to-t from-blue-200 via-blue-200/20 to-transparent opacity-60"></div>
            </div>

            <div className={`
                md:w-3/5 flex flex-col justify-center bg-white relative
                ${compact ? "p-5 md:p-5" : "p-8 md:p-10"}
            `}>
            
                <p className={`
                text-orange-500 font-bold  uppercase tracking-widest 
                ${compact ? "text-[0.65rem] mb-1":"text-[0.75rem] mb-2"}`}  
                >
                    {rol}
                </p>
                
                <h4 className={`
                    font-extrabold text-blue-200 tracking-tight 
                    ${compact ? "text-[1rem] mb-2" : "text-[1.6rem] mb-4"}
                `}>

                    {nombre}
                </h4>

                <p className={`
                    text-gray-600 italic font-light leading-relaxed 
                    ${compact ? "text-[0.80rem] mb-2" : "text-[0.95rem] mb-6"}
                `}>
                
                    "{frase}"
                </p>

                <div className="mt-auto flex items-center gap-3">
                    {linkedin && (
                        <a href={linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 text-gray-500 hover:bg-blue-200 hover:text-white transition-colors" aria-label="LinkedIn">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                        </a>
                    )}
                    {instagram && (
                        <a href={instagram} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 text-gray-500 hover:bg-blue-200 hover:text-white transition-colors" aria-label="Instagram">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                        </a>
                    )}
                    {tiktok && (
                        <a href={tiktok} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 text-gray-500 hover:bg-blue-200 hover:text-white transition-colors" aria-label="TikTok">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.78-1.15 5.54-3.33 7.31-1.92 1.57-4.58 2.22-7.03 1.53-2.5-.69-4.56-2.5-5.46-4.93-.92-2.45-.6-5.32.88-7.51 1.53-2.27 4.14-3.62 6.84-3.72 1.25-.05 2.51.13 3.7.53v4.11c-1.3-.49-2.76-.56-4.11-.14-1.29.39-2.39 1.34-2.9 2.59-.51 1.25-.43 2.72.2 3.89.63 1.15 1.83 1.95 3.12 2.11 1.36.17 2.8-.18 3.85-1.01 1.04-.81 1.63-2.09 1.65-3.4.04-4.58.02-9.17.02-13.76z"/></svg>
                        </a>
                    )}
                </div>
            </div>
        </div>
    )
}