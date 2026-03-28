interface CalculadoraProps {
  image: string
  title: string
  subtitle: string
}

export const CalculadoraProps = ({ image, title, subtitle }: CalculadoraProps) => {
  return (
    <div className="flex items-start sm:items-center gap-3">
      <img className="w-7 h-7 sm:size-7 mt-1 sm:mt-0" src={image} alt={title} />

      <div className="text-white">
        <h3 className="font-semibold text-[1rem] sm:text-[1.05rem] md:text-[1rem]">
          {title}
        </h3>
        <p className="font-light text-[0.95rem] sm:text-[1rem] leading-relaxed">
          {subtitle}
        </p>
      </div>
    </div>
  )
}