import { Component, OnInit } from '@angular/core';
import { VotacionesSource } from '../../modelo/votaciones.interface';
import { ElasticsearchService } from '../../servicios/elasticsearch.service';
import { MessageService } from 'src/app/servicios/message.service';
import { tipo } from '../util/TipoAlertas';

@Component({
  selector: 'app-search-votaciones',
  templateUrl: './search-votaciones.component.html',
  styleUrls: []
})
export class SearchVotacionesComponent implements OnInit {
  private static readonly INDEX = 'votaciones_index';
  private static readonly TYPE = 'votacion';

  votacionesSources: VotacionesSource[];
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
        SearchVotacionesComponent.INDEX,
        SearchVotacionesComponent.TYPE,
        'titulo', this.queryText).then(
          response => {
            if (response.hits.total > 0) {
              this.votacionesSources = response.hits.hits.map(a => {
                    a._source['id'] = a._id;
                    return a._source;
                  }
              );
            } else {
              this.votacionesSources = [];
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
