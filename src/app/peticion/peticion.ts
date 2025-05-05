export interface Peticion {
    id: string
    titulo: string;
    descripcion: string;
    destinatario: string;
    categoria_id: number;
    user_id?: number;
    file: {
        id?: number;
        file_path: string;
        name?: string
    };
    firmantes?: number;
    estado?: "pendiente" | "aceptada" ;
    categoria?: {
        nombre:string
    }
    user?: {
        name: string
    }

}
