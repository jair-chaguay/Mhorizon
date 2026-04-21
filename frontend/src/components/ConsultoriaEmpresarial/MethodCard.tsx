interface methodPorp {
    fase: string
    title: string
    content: string
}

export const MethodCard = ({ fase, title, content }: methodPorp) => {
    return (
        <div className="flex flex-col bg-blue-200 p-8 shadow-md hover:shadow-xl transition-shadow rounded-xl border-t-4 border-t-orange-500 reveal-element delay-100 group ">
            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:bg-white transition-colors duration-300">
                <span className="text-white font-bold text-xl group-hover:text-orange-500 transition-colors duration-300">{fase}</span>
            </div>
            <h4 className="font-bold text-white text-[1.15rem] mb-3 uppercase tracking-wide">
                {title}
            </h4>
            <p className="text-gray-300 leading-relaxed text-[0.95rem]">
                {content}
            </p>
        </div>
    )
}