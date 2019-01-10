import { Component, OnInit } from '@angular/core';
import { ReclamacionesSource } from '../../modelo/reclamacion.interface';
import { ElasticsearchService } from '../../servicios/elasticsearch.service';
import { MessageService } from 'src/app/servicios/message.service';
import { tipo } from '../util/TipoAlertas';

@Component({
  selector: 'app-search-reclamaciones',
  templateUrl: './search-reclamaciones.component.html',
  styleUrls: []
})
export class SearchReclamacionesComponent implements OnInit {
  private static readonly INDEX = 'reclamaciones_index';
  private static readonly TYPE = 'reclamacion';

  reclamacionesSources: ReclamacionesSource[];
  private queryText = '';

  private lastKeypress = 0;

  constructor(private es: ElasticsearchService, private messageService: MessageService) {
    this.queryText = '';
    messageService.clear();
  }

  ngOnInit() {
  }

  search($event) {
    if ($event.timeStamp - this.lastKeypress > 100) {
      this.queryText = $event.target.value;

      this.es.fullTextSearch(
        SearchReclamacionesComponent.INDEX,
        SearchReclamacionesComponent.TYPE,
        'nombre', this.queryText).then(
          response => {
            if (response.hits.total > 0) {
              this.reclamacionesSources = response.hits.hits.map(a => {
                    a._source['id'] = a._id;
                    return a._source;
                  }
              );
            } else {
              this.reclamacionesSources = [];
            }

            console.log(response);
          }, error => {
            this.messageService.add({texto: error.message, tipo: tipo.error});
          }).then(() => {
            this.messageService.add({texto: 'Search in Elasticsearch Completed!', tipo: tipo.log});
          });
    }

    this.lastKeypress = $event.timeStamp;
  }
}
