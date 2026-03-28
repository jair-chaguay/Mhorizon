interface TeamProp {
    image: string,
    rol: string,
    nombre: string,
    frase: string
}


export const TeamCard = ({image, rol, nombre, frase}: TeamProp) => {
    return (
        <div className="group bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 
            hover:shadow-2xl transition-all duration-500">
            <div className="relative h-122 overflow-hidden">
                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform 
                    duration-700 " 
                    alt={nombre} src={`/images/${image}`} />
                <div className="absolute inset-0 bg-linear-to-t from-blue-200/90 
                    via-blue-200/20 to-transparent">
                </div>
                <div className="absolute bottom-6 left-8">
                    <p className="text-orange-500 font-headline font-bold text-[10px] uppercase 
                        tracking-widest mb-1">
                        {rol}
                    </p>
                    <h4 className="font-bold text-2xl text-white tracking-tight">
                        {nombre}
                    </h4>
                </div>
            </div>
            <div className="p-8">
                <p className="text-gray-700 italic leading-relaxed text-2sm">
                    "{frase}"
                </p>
            </div>
        </div>
    )
}
