import { Injectable } from '@angular/core';
import { Http, Headers, Response} from '@angular/http';
import { Transferencia } from '../interfaces/transferencia';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class TransferenciaService {

  private headers = new Headers({'Content-Type':'application/json'});

  constructor(private http: Http) { }

  getAll() : Observable<Transferencia[]>{
    return this.http.get("http://localhost:8000/api/transferencia", {headers: this.headers})
               .map(
                 (res: Response) => res.json()
               )
  }

}
