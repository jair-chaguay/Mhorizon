interface methodPorp {
    fase: string
    title: string
    content: string
}

export const MethodCard = ({ fase, title, content }: methodPorp) => {
    return (
        <div className="flex flex-col bg-gray-50 p-8 shadow-md hover:shadow-xl transition-shadow rounded-xl border-t-4 border-t-orange-500 reveal-element delay-100">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
                <span className="text-orange-500 font-bold text-xl">{fase}</span>
            </div>
            <h4 className="font-bold text-blue-200 text-[1.15rem] mb-3 uppercase tracking-wide">
                {title}
            </h4>
            <p className="text-gray-500 leading-relaxed text-[0.95rem]">
                {content}
            </p>
        </div>
    )
}