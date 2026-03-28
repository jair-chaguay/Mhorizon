import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons"
import { faEnvelope } from "@fortawesome/free-regular-svg-icons"
import { faPhone } from "@fortawesome/free-solid-svg-icons"

interface LeaderProps {
  name: string
  cargo: string
  email?: string
  telf?: string
  urlImg: string
  link: string
}

export const LeaderCard = ({
  name,
  cargo,
  urlImg,
  email = '',
  telf = '',
  link,
}: LeaderProps) => {
  return (
    <div className="flex w-full max-w-[420px] min-h-[140px] bg-[#0f172a] rounded-md shadow-lg overflow-hidden">
      
      {/* Imagen */}
      <div className="w-[32%] sm:w-[30%] relative">
        <img className="w-full h-full object-cover" src={urlImg} alt={name} />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
      </div>

      {/* Info */}
      <div className="flex flex-col justify-center px-3 sm:px-4 py-3 w-[68%] sm:w-[70%] text-white">
        <h2 className="font-semibold text-[0.95rem] sm:text-[1rem] text-orange-400 leading-tight">
          {name}
        </h2>

        <p className="text-[0.78rem] sm:text-[0.82rem] leading-snug mt-1">
          {cargo}
        </p>

        <div className="flex gap-2 items-start text-[0.72rem] sm:text-[0.75rem] mt-2 break-all">
          <FontAwesomeIcon className="text-orange-400 mt-[2px]" icon={faEnvelope} />
          <span>{email}</span>
        </div>

        <div className="flex gap-2 items-start text-[0.72rem] sm:text-[0.75rem] mt-1">
          <FontAwesomeIcon className="text-orange-400 mt-[2px]" icon={faPhone} />
          <span>{telf}</span>
        </div>

        <a
          className="flex items-center self-end justify-center w-7 h-7 rounded-full bg-orange-400 mt-3 hover:bg-orange-500 hover:scale-105 transition-all duration-300"
          href={link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon className="text-white text-[12px]" icon={faLinkedinIn} />
        </a>
      </div>
    </div>
  )
}