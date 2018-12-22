import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { CitaProspeccion }  from '../interfaces/cita-prospeccion';
import { Observable } from 'rxjs/Observable';
import 'rxjs';

@Injectable()
export class CitaProspeccionService {

  private headers = new Headers({'Content-Type':'application/json'});

  constructor(private http: Http) { }

  getAll() : Observable<CitaProspeccion[]>{
    return this.http.get("http://localhost:8000/api/cita_prospeccion", {headers: this.headers})
               .map(
                 (res: Response) => res.json()
               )
  }

}
