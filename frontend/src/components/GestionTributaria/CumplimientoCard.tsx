// CumplimientoCard.tsx
interface cumplimientoProp {
    title: string,
    content: string
}

export const CumplimientoCard = ({ title, content }: cumplimientoProp) => {
    return (
        // Añadí una ligera sombra y ajusté un poco el padding vertical para móviles
        <div className="border-l-4 border-l-orange-500 py-3 md:py-2 px-5 md:px-6 bg-gray-800 shadow-md md:shadow-none">
            <h3 className="text-blue-200 font-medium text-[1.05rem] md:text-[1.1rem]">
                {title}
            </h3>
            <p className="text-blue-200 font-light mt-1 text-[0.9rem] md:text-[0.94rem] leading-snug">
                {content}
            </p>
        </div>
    )
}