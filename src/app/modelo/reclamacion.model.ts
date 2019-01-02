export class Reclamacion {
    id: number;
    nombre: string;
    telefono: string;
    email: string;
    texto: string;

    constructor(nombre: string, telefono: string, email: string, texto: string, id?: number) {
        this.id = id;
        this.nombre = nombre;
        this.telefono = telefono;
        this.email = email;
        this.texto = texto;
    }
}
