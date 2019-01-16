export interface Reclamacion {
    id: number;
    nombre: string;
    telefono: string;
    email: string;
    comentario: string;
    fichero: string;
}

export interface ReclamacionesSource {
    source: Reclamacion;
}
