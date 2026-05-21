export type ViewID = 'view-directorio' | 'view-repositorio-root' | 'view-informativos' | 'view-noticias' | 'view-perfil-cliente'| 'view-usuarios' | 'view-configuracion';

export interface Cliente {
    id: number;
    tipo_persona: 'Régimen General' | 'RIMPE' | 'Contribuyente Especial' | 'Persona Natural' | 'Entidad Pública';
    razon_social_nombres: string;
    identificacion: string;
    score_tributario: number;
    gestionado_por_id?: number | string | null;
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
    gestionador?: {
        id: number;
        nombre: string;
        apellido: string;
    };
}