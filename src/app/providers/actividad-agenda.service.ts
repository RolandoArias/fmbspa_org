import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { ActividadAgenda } from '../interfaces/actividad-agenda';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class ActividadAgendaService {

  private headers = new Headers({'Content-Type':'application/json'});

  constructor(private http: Http) { }

  getAll() : Observable<ActividadAgenda[]>{
    return this.http.get("http://10.210.136.121/fmbapp_qa/public/api/actividad_agenda", {headers: this.headers})
               .map(
                 (res: Response) => res.json()
               )
  }

}
