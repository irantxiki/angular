export class Reclamacion {
    id?: number;
    nombre: string;
    telefono: string;
    email: string;
    comentario: string;
    fichero?: string;

    constructor(nombre?: string, telefono?: string, email?: string, comentario?: string, id?: number) {
        this.id = id;
        this.nombre = nombre;
        this.telefono = telefono;
        this.email = email;
        this.comentario = comentario;
    }
}
