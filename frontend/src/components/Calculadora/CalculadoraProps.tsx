interface CalculadoraProps {
  image: string
  title: string
  subtitle: string
}

export const CalculadoraProps = ({ image, title, subtitle }: CalculadoraProps) => {
  return (
    <div className="flex items-start gap-5">
      <div className="bg-white/6 hover:bg-orange-500 transition-colors duration-300  p-3 rounded-md shrink-0">
        <img className="w-6 h-6 object-contain invert brightness-0" src={image} alt={title} />
      </div>

      <div className="text-white">
        <h3 className="font-bold text-[1.1rem] md:text-[1.2rem] text-orange-500">
          {title}
        </h3>
        <p className="font-light text-gray-300 text-[0.95rem] mt-2 leading-relaxed">
          {subtitle}
        </p>
      </div>
    </div>
  )
}