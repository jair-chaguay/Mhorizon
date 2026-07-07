export type ViewID = 'view-directorio' | 'view-repositorio-root' | 'view-informativos' | 'view-noticias' | 'view-perfil-cliente'| 'view-usuarios' | 'view-configuracion';

export interface Cliente {
    id: number;
    tipo_persona: 'Régimen General' | 'RIMPE' | 'Contribuyente Especial' | 'Persona Natural' | 'Entidad Pública';
    razon_social_nombres: string;
    identificacion: string;
    score_tributario: number;
    comentario_score?: string;
    
    tipo_servicio?: string;
    tipo_contribuyente?: string;
    regimen_tributario?: string;
    agente_retencion?: boolean;
    actividad_economica?: string;
    sector?: string;
    telefono_contacto?: string;

    // Relaciones del cliente
    gestores?: Array<{
        id: number;
        nombre: string;
        apellido: string;
    }>;
    
    correos?: Array<{
        id: number;
        correo: string;
    }>;

    detalle_score?: Array<{
        pregunta_id: number;
        enunciado: string;
        peso_maximo: number;
        valor_seleccionado: number;
        puntos_obtenidos: number;
    }>;

    creador?: {
        id: number;
        nombre: string;
        apellido: string;
    };

    usuarios?: Array<{
        id: number;
        nombre: string;
        apellido: string;
        correo: string;
        correo_personal?: string; 
        cargo?: string;           
        activo?: boolean;         
        rol_id?: number;          
    }>;
}