import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Interes } from '../interfaces/interes';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class InteresService {

  private headers = new Headers({'Content-Type':'application/json'});

  constructor(private http: Http) { }

  getAll() : Observable<Interes[]>{
    return this.http.get("http://10.210.136.121/fmbapp_qa/public/api/area_interes", {headers: this.headers})
               .map(
                 (res: Response) => res.json()
               )
  }

}
