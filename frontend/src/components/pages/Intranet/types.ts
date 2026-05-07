export type ViewID = 'view-directorio' | 'view-repositorio-root' | 'view-informativos' | 'view-noticias' | 'view-perfil-cliente'| 'view-usuarios';

export interface Cliente {
    id: number;
    tipo_persona: 'Natural' | 'Jurídica';
    razon_social_nombres: string;
    identificacion: string;
    score_tributario: number;
    creador?: {
        id: number;
        nombre: string;
        apellido: string;
    };
    usuarios?: Array<{ // <-- AÑADE ESTO
        id: number;
        nombre: string;
        apellido: string;
        correo: string;
    }>;
}