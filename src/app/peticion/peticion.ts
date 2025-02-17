export interface Peticion {
    id?: number
    titulo: string;
    descripcion: string;
    destinatario: string;
    categoria_id: number;
    firmantes: number;
    estado: "aceptada"|"pendiente";
    user_id?: number;
}
