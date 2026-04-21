interface estructuraProps {
    icon: React.ElementType,
    title: string,
    content: string
}


export const EstrctrCard = ({ icon: Icon, title, content }: estructuraProps) => {
    return (
        <div className="bg-blue-200/98 border border-white/10 rounded-2xl p-8 md:p-10 reveal-element delay-100 hover:bg-blue-200/90 transition-colors group">
            <div className="flex items-start gap-6">
                <div className="shrink-0 w-16 h-16 rounded-xl border border-white/20 bg-white/5 flex items-center justify-center text-orange-500 group-hover:border-orange-500 group-hover:bg-orange-500/10 transition-all duration-300">
                    <Icon className="w-8 h-8" />
                </div>
                <div>
                    <h3 className="text-white font-bold text-[1.3rem] mb-3">
                        {title}
                    </h3>
                    <p className="text-gray-400 text-[0.95rem] leading-relaxed">
                        {content}
                    </p>
                </div>
            </div>
        </div>
    )
}
