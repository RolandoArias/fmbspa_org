import { Injectable } from '@angular/core';
import { Http, Headers, Response} from '@angular/http';
import { Tipificacion } from '../interfaces/tipificacion'; 
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class TipificacionService {

  private headers = new Headers({'Content-Type':'application/json'});

  constructor(private http: Http) { }

  getAll() : Observable<Tipificacion[]>{
    return this.http.get("http://localhost:8000/api/tipificacion", {headers: this.headers})
               .map(
                 (res: Response) => res.json()
               )
  }

}
