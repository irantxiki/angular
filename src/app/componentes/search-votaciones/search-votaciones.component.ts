import { Component, OnInit } from '@angular/core';
import { VotacionesSource } from '../../modelo/votaciones.interface';
import { ElasticsearchService } from '../../servicios/elasticsearch.service';

@Component({
  selector: 'app-search-votaciones',
  templateUrl: './search-votaciones.component.html',
  styleUrls: ['./search-votaciones.component.css']
})
export class SearchVotacionesComponent implements OnInit {
  private static readonly INDEX = 'gkz_index';
  private static readonly TYPE = 'votacion';

  votacionesSources: VotacionesSource[];
  private queryText = '';

  private lastKeypress = 0;

  constructor(private es: ElasticsearchService) {
    this.queryText = '';
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
            this.votacionesSources = response.hits.hits;
            console.log(response);
          }, error => {
            console.error(error);
          }).then(() => {
            console.log('Search Completed!');
          });
    }

    this.lastKeypress = $event.timeStamp;
  }
}
