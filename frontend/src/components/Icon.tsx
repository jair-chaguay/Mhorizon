import { faFacebookF, faInstagram, faLinkedinIn, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export const Icon = () => {
    return (
        <li className='flex gap-6 items-center '>
            <a
            className='border-1 rounded-full'
                href="https://www.facebook.com/Mhorizon-Ecuador-1695538914050588/" target='blank'>
                <FontAwesomeIcon  icon={faFacebookF} />
            </a>
            <a
            className='border-1 rounded-full'
                href="https://twitter.com/MhorizonEcuador" target='blank'>
                <FontAwesomeIcon icon={faXTwitter} />
            </a>
            <a
            className='border-1 rounded-full'
                href="https://www.instagram.com/mhorizon_ecuador/" target='blank'>
                <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a
            className='border-1 rounded-full'
                href="https://www.linkedin.com/in/mhorizon-ecuador-72689111a?trk=nav_responsive_tab_profile_pic" target='blank'>
                <FontAwesomeIcon icon={faLinkedinIn} />
            </a>
        </li>
    )
}
