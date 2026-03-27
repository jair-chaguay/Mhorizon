interface arquitecturaProps{
    numero: string,
    title: string,
    content: string
}


export const ArquitecturaCard = ({numero, title, content}: arquitecturaProps) => {
    return (
        <div className="space-y-12">
            <div className="flex gap-6 items-center group">
                <div className="shrink-0">
                    <div className="w-10 h-10 rounded-md border-2 border-orange-500 flex items-center 
                    justify-center text-orange-500 font-bold group-hover:bg-blue-200 group-hover:text-white
                    transition-colors duration-300 group-hover:border-blue-200">
                        {numero}
                    </div>
                </div>
                <div>
                    <h4 className="text-xl font-bold mb-3 text-blue-200">
                        {title}
                    </h4>
                    <p className="text-blue-200 font-light text-md max-w-100 leading-relaxed text-justify">
                        {content}
                    </p>
                </div>
            </div>
        </div>
    )
}
