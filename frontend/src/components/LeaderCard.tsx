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
        <div className="flex w-full max-w-[480px] h-[220px] gap-5 bg-blue-200 rounded-sm shadow-lg overflow-hidden">
            <div className="w-[40%] relative">
                <img className="w-full h-full object-cover" src={urlImg} alt={name}  />
                <div className='absolute inset-0 bg-linear-to-r from-black/40 to-transparent'></div>
            </div>
            <div className="flex flex-col justify-center gap-2 px-4 py-3 w-[60%]">
                <h2 className="font-semibold text-[1.25rem] text-orange-500">{name}</h2>
                <p className="text-white">{cargo}</p>
                <div className="flex gap-2 items-center">
                    <FontAwesomeIcon className="text-orange-500" icon={faEnvelope} />
                    <p className="font-light text-white text-[14px]">{email}</p>
                </div>
                <div className="flex gap-2 items-center">
                    <FontAwesomeIcon className="text-orange-500" icon={faPhone} />
                    <p className="font-extralight text-[14px] text-white">{telf}</p>
                </div>
                <a
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-400 mt-2 hover:bg-orange-500 transition"
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                   <FontAwesomeIcon className="text-blue-200" icon={faLinkedinIn} />
                </a>
            </div>
        </div>
    )
}
