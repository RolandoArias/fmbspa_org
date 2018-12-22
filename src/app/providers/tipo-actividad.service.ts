import { Injectable } from '@angular/core';
import { Http, Headers, Response} from '@angular/http';
import { TipoActividad } from '../interfaces/tipo-actividad';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class TipoActividadService {

  private headers = new Headers({'Content-Type':'application/json'});

  constructor(private http: Http) { }

  getAll() : Observable<TipoActividad[]>{
    return this.http.get("http://localhost:8000/api/tipo_actividad", {headers: this.headers})
               .map(
                 (res: Response) => res.json()
               )
  }

}
