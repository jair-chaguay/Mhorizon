/* eslint-disable @typescript-eslint/no-explicit-any */
import {useEffect} from "react"
import { useLocation } from "react-router-dom"

export const MetaPixelTracker = () => {
    const location = useLocation()
    
    useEffect(() => {
        if (typeof window !== "undefined" && (window as any).fbq){
            (window as any).fbq('track', 'PageView');
        }
    }, [location]);

    return null;
}

export default MetaPixelTracker