import { Injectable } from '@angular/core';
import { Http, Headers, Response} from '@angular/http';
import { Territorio } from '../interfaces/territorio';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class TerritorioService {

  private headers = new Headers({'Content-Type':'application/json'});

  constructor(private http: Http) { }

  getAll() : Observable<Territorio[]>{
    return this.http.get("http://10.210.159.46/fmbapp_qa/public/api/territorio", {headers: this.headers})
               .map(
                 (res: Response) => res.json()
               )
  }

}
