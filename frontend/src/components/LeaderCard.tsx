import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons"
import { faEnvelope } from "@fortawesome/free-regular-svg-icons"
import { faPhone } from "@fortawesome/free-solid-svg-icons"

interface LeaderProps {
    name: string,
    cargo: string,
    email?: string,
    telf?: string,
    urlImg: string
    link: string
}

export const LeaderCard = ({ name, cargo, urlImg, email = '', telf = '', link }: LeaderProps) => {
    return (
        <div className="flex w-full max-w-[420px] h-[140px] bg-[#0f172a] rounded-md shadow-lg overflow-hidden">

            <div className="w-[30%] relative">
                <img className="w-full h-full object-cover" src={urlImg} alt={name} />
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
            </div>

            <div className="flex flex-col justify-center px-4 py-2 w-[65%] text-white">
                <h2 className="font-semibold text-[1rem] text-orange-400">{name}</h2>
                <p className="text-[0.8rem]">{cargo}</p>

                <div className="flex gap-2 items-center text-[0.75rem] mt-1">
                    <FontAwesomeIcon className="text-orange-400" icon={faEnvelope} />
                    <span>{email}</span>
                </div>

                <div className="flex gap-2 items-center text-[0.75rem]">
                    <FontAwesomeIcon className="text-orange-400" icon={faPhone} />
                    <span>{telf}</span>
                </div>

                <a
                    className="flex items-center self-end justify-center w-6 h-6 rounded-full bg-orange-400 mt-2 hover:bg-orange-500 transition"
                    href={link}
                    target="_blank"
                >
                    <FontAwesomeIcon className="text-white text-[12px]" icon={faLinkedinIn} />
                </a>
            </div>
        </div>
    )
}
