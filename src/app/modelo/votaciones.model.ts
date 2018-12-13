export class Votaciones {
    id: number;
    titulo: string;
    enlace: string;
    votos: number;

    constructor(title: string, link: string, votes?: number, id?: number) {
        this.id = id;
        this.titulo = title;
        this.enlace = link;
        this.votos = votes || 0;
    }

    votoPositivo(): void {
        this.votos++;
    }

    votoNegativo(): void {
        this.votos--;
    }

    formatDomain(): string {
        try {
            const domain: string = this.enlace.split('//')[1];
            return domain.split('/')[0];
        } catch (err) {
            return null;
        }

    }
}