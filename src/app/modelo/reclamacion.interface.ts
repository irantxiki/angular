export interface Reclamacion {
    id: number;
    nombre: string;
    telefono: string;
    email: string;
    comentario: string;
    adjunto: File;
}

export interface ReclamacionesSource {
    source: Reclamacion;
}
