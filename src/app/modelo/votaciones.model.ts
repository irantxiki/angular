import { Observable } from 'rxjs';

export class Votaciones {
    id: number;
    titulo: string;
    enlace: string;
    numero: number;
    animacion: boolean;

    constructor(title: string, link: string, votes?: number, id?: number) {
        this.id = id;
        this.titulo = title;
        this.enlace = link;
        this.numero = votes || 0;
    }
}
