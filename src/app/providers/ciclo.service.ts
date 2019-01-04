import { Injectable } from '@angular/core';
import { Http, Headers, Response} from '@angular/http';
import { Ciclo } from '../interfaces/ciclo';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class CicloService {

  private headers = new Headers({'Content-Type':'application/json'});

  constructor(private http: Http) { }

  getAll(): Observable<Ciclo[]>{
    return this.http.get("http://10.210.136.121/fmbapp_qa/public/api/ciclo", {headers: this.headers})
               .map(
                 (res: Response) => res.json()
               )
  }


  getAll2() {
   return  this.http.get("/assets/ciclo.json", {headers: this.headers})
        .map(
          (res: Response) => res.json()
        )
  }


}
