import { Injectable } from '@angular/core';
import { Client } from 'elasticsearch-browser';
import { Votaciones } from '../modelo/votaciones.model';
import { Reclamacion } from '../modelo/reclamacion.model';
import { HttpHeaders, HttpClientModule } from '@angular/common/http';


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

  constructor(/*private http: HttpClientModule*/) {
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
      body: 'You know, for search'
    });
  }

  deleteVotacion(votacion: Votaciones): any {
    return this.client.delete({
      index: 'votaciones_index',
      type: 'votacion',
      id: votacion.id
    });
  }

  updateVotacion(votacion: Votaciones): any {
    return this.client.update({
      index: 'votaciones_index',
      type: 'votacion',
      id: votacion.id,
      body: {
        doc : {
          numero: votacion.numero,
          titulo: votacion.titulo,
          enlace: votacion.enlace
        }
      }
    });
  }

  addVotacionToIndex(votacion: Votaciones): any {
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

  addReclamacionToIndex(reclamacion: Reclamacion): any {
    return this.client.create({
      index: 'reclamaciones_index',
      type: 'reclamacion',
      id: reclamacion.id,
      body: {
        nombre: reclamacion.nombre,
        telefono: reclamacion.telefono,
        email: reclamacion.email,
        comentario: reclamacion.comentario,
        adjunto: reclamacion.adjunto,
        published: new Date().toLocaleString()
      }
    });

    // return this.client._ingest({
    //   index: 'reclamaciones_index',
    //   type: 'reclamacion',
    //   id: reclamacion.id,
    //   body: {
    //     nombre: reclamacion.nombre,
    //     telefono: reclamacion.telefono,
    //     email: reclamacion.email,
    //     comentario: reclamacion.comentario,
    //     adjunto: reclamacion.adjunto,
    //     published: new Date().toLocaleString()
    //   }
    // });
    
    // const opciones = {
    //   headers: new HttpHeaders({
    //     'Content-Type' : 'application/json'
    //   })
    // };

    // this.http.put('http://127.0.0.1:9200/_ingest/pipeline/attachment', {
    //   description : 'Tipo ' + reclamacion.adjunto.type + ' | ' + reclamacion.adjunto.name,
    //     processors : [
    //     {
    //       attachment : {
    //         field : 'data',
    //         properties : [ 'content', 'title', 'name', 'author', 'keywords', 'date', 'content_type', 'content_length', 'language']
    //       }        
    //     }
    //   ]
    // //   // ,
    // //   // data : [{
    // //   //   reclamacion.adjunto
    // //   // }]
    // }, opciones);
    //   .subscribe(
    //     res => {console.log(res);
    //     console.log('Funciona')}
    //  );
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
