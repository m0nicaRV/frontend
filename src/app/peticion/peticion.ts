export interface Peticion {
    titulo: string;
    descripcion: string;
    destinatario: string;
    categoria_id: number;
    firmantes: number;
    estado: "aceptada"|"pendiente" 
}
