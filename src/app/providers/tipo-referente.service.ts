import { Injectable } from '@angular/core';
import { Http, Headers, Response} from '@angular/http';
import { TipoReferente } from '../interfaces/tipo-referente';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class TipoReferenteService {

  private headers = new Headers({'Content-Type':'application/json'});

  constructor(private http: Http) { }

  getAll() : Observable<TipoReferente[]>{
    return this.http.get("http://10.210.159.46/fmbapp_qa/public/api/tipo_referente", {headers: this.headers})
               .map(
                 (res: Response) => res.json()
               )
  }

}
