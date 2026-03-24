interface autProps {
    icon: string,
    title: string,
    content: string,
}


export const AuditoriaCard = ({ icon, title, content }: autProps) => {
    return (
        <div className="shadow-xl border-gray-400/30 border rounded-md p-6 relative">
            <div className="absolute top-3 left-0 bg-orange-500 w-16 h-8 flex items-center justify-center">
                <img
                    className="w-5 h-5 object-contain"
                    src={icon}
                    alt={title}
                />
            </div>
            <div className="mt-8 px-2 text-justify">
                <p className="text-blue-200 font-medium text-[1.3rem]">{title}</p>
                <p className="font-light text-blue-200/90 mt-1">{content}</p>
            </div>

        </div>
    )
}
