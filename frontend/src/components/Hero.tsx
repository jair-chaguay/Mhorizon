export const Hero = () => {
  return (
    <section className="relative h-[500px] bg-[url('/images/bgImage.jpeg')] bg-cover bg-center">
      
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>

      <div className="relative h-full flex items-center">
        <p className="text-white italic max-w-5xl px-10 md:px-20 text-left leading-relaxed text-[1.3rem]">
          "Somos una firma consultora con más de 20 años de experiencia en el mercado ecuatoriano, conformada por profesionales especializados en prácticas tributarias, legales y financieras que buscan contribuir al mejoramiento de las actividades empresariales, basado en sus conocimientos y experiencia local e internacional que le permite entregar a nuestros clientes un servicio de calidad, acorde a sus expectativas."
        </p>
      </div>

    </section>
  )
}