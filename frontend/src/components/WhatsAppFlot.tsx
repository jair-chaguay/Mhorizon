
import { useLocation } from "react-router-dom";

const visiblePaths = new Set([
    "/",
    "/soluciones/membresia",
    "/soluciones",
    "/sectores",
    "/novedades",
    "/nosotros",
    "/soluciones/consultoria-empresarial",
    "/soluciones/auditoria",
    "/calculadora",
    "/sectores/industrial-comercial",
    "/soluciones/gestion-tributaria",
    "/soluciones/outsourcing",
    "/sectores/financiero",
    "/sectores/logistico-portuario",
    "/sectores/servicios-empresariales",
    "/soluciones/sistema-normativo",
    "/politicas-de-privacidad",
    "/terminos-de-uso",
]);

export const WhatsAppFlot = () => {
    const { pathname } = useLocation();
    const isNovedadDetail = /^\/novedades-sub\/[^/]+\/?$/.test(pathname);

    if (!visiblePaths.has(pathname) && !isNovedadDetail) {
        return null;
    }

    return (
        <a href="https://wa.me/593983643310?text=Hola%2C%20quisiera%20recibir%20m%C3%A1s%20informaci%C3%B3n"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contactar por WhatsApp"
            className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-blue-200 text-white shadow-lg transition hover:scale-110 hover:bg-orange-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-200">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                className="h-7 w-7 fill-current"
            >
                <path d="M16 .396C7.164.396 0 7.56 0 16.396c0 2.893.758 5.72 2.197 8.21L0 32l7.6-2.16a15.93 15.93 0 0 0 8.4 2.44c8.836 0 16-7.164 16-16S24.836.396 16 .396zm0 29.2c-2.5 0-4.94-.66-7.08-1.92l-.5-.3-4.52 1.28 1.2-4.4-.32-.52A13.8 13.8 0 0 1 2.4 16.4c0-7.5 6.1-13.6 13.6-13.6s13.6 6.1 13.6 13.6-6.1 13.6-13.6 13.6zm7.44-10.16c-.4-.2-2.36-1.16-2.72-1.28-.36-.14-.62-.2-.88.2s-1 1.28-1.22 1.54c-.22.26-.44.3-.82.1-.4-.2-1.66-.6-3.16-1.9-1.16-1.04-1.94-2.32-2.16-2.72-.22-.4-.02-.62.18-.82.18-.18.4-.44.6-.66.2-.22.26-.38.4-.64.14-.26.08-.48-.04-.68-.12-.2-.88-2.12-1.2-2.9-.32-.78-.64-.68-.88-.7h-.76c-.26 0-.68.1-1.04.48-.36.38-1.36 1.34-1.36 3.26 0 1.92 1.4 3.78 1.6 4.04.2.26 2.76 4.22 6.68 5.76.94.4 1.68.64 2.26.82.94.3 1.8.26 2.48.16.76-.12 2.36-.96 2.7-1.88.34-.92.34-1.7.24-1.88-.1-.18-.36-.28-.76-.48z" />
            </svg>
        </a>
    )
}
