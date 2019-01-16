import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ReclamacionesSource } from '../../modelo/reclamacion.interface';
import { ElasticsearchService } from '../../servicios/elasticsearch.service';
import { MessageService } from 'src/app/servicios/message.service';
import { tipo } from '../util/TipoAlertas';
import { ReclamacionesService } from 'src/app/servicios/reclamaciones.service';

@Component({
  selector: 'app-search-reclamaciones',
  templateUrl: './search-reclamaciones.component.html',
  styleUrls: []
})
export class SearchReclamacionesComponent implements OnInit {
  private static readonly INDEX = 'reclamaciones_index';
  private static readonly TYPE = 'reclamacion';

  @ViewChild('inputSearch') userInput: ElementRef;

  reclamacionesSources: ReclamacionesSource[];
  private queryText = '';

  private lastKeypress = 0;

  constructor(private reclamacionesService: ReclamacionesService, private messageService: MessageService) {
    this.queryText = '';
    messageService.clear();
  }

  ngOnInit() {
  }

  search(textoBusqueda: string): void {
      this.reclamacionesService.searchInReclamacionesAttachment(textoBusqueda)
          .subscribe( data => {
            if (data.length > 0) {
              this.reclamacionesSources = data;
            } else {
              this.reclamacionesSources = [];
            }
            this.messageService.add({texto: 'Search in Elasticsearch Completed!', tipo: tipo.log});
          }, error => {
            this.messageService.add({texto: error.message, tipo: tipo.error});
          });
  }
}
