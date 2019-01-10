import { Injectable } from '@angular/core';
import { Client } from 'elasticsearch-browser';
import { Votaciones } from '../modelo/votaciones.model';

@Injectable({
  providedIn: 'root'
})
export class ElasticsearchService {

  private client: Client;

  private queryalldocs = {
    'query': {
      'match_all': {}
    }
  };

  constructor() {
    if (!this.client) {
      this.connect();
      this.isAvailable();
    }
  }

  private connect() {
    this.client = new Client({
      host: 'http://localhost:9200',
      log: 'trace'
    });
  }

  isAvailable(): any {
    return this.client.ping({
      requestTimeout: Infinity,
      body: 'hello grokonez!'
    });
  }

  delete(votacion: Votaciones): any {
    return this.client.delete({
      index: 'votaciones_index',
      type: 'votacion',
      id: votacion.id
    });
  }

  update(votacion: Votaciones): void {
    return this.client.update({
      index: 'votaciones_index',
      type: 'votacion',
      id: votacion.id,
      body: {
        doc : {
          numero: votacion.numero
        }
      }
    });
  }

  addToIndex(votacion: Votaciones): any {
    return this.client.create({
      index: 'votaciones_index',
      type: 'votacion',
      id: votacion.id,
      body: {
        titulo: votacion.titulo,
        enlace: votacion.enlace,
        numero: votacion.numero,
        published: new Date().toLocaleString()
      }
    });
  }

  getAllDocuments(_index, _type): any {
    return this.client.search({
      index: _index,
      type: _type,
      body: this.queryalldocs,
      filterPath: ['hits.hits._source']
    });
  }

  getAllDocumentsWithScroll(_index, _type, _size): any {
    return this.client.search({
      index: _index,
      type: _type,
      scroll: '1m',
      filterPath: ['hits.hits._source', 'hits.total', '_scroll_id'],
      body: {
        'size': _size,
        'query': {
          'match_all': {}
        },
        'sort': [
          { '_uid': { 'order': 'asc' } }
        ]
      }
    });
  }

  getNextPage(scroll_id): any {
    return this.client.scroll({
      scrollId: scroll_id,
      scroll: '1m',
      filterPath: ['hits.hits._source', 'hits.total', '_scroll_id']
    });
  }

  fullTextSearch(_index, _type, _field, _queryText): any {
    return this.client.search({
      index: _index,
      type: _type,
      body: {
        'query': {
          'match_phrase_prefix': {
            [_field]: _queryText,
          }
        }
      }
    });
  }
}
