import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Genero } from '../interfaces/genero';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class GeneroService {

  private headers = new Headers({'Content-Type':'application/json'});

  constructor( private http: Http) {}

  getAll() : Observable<Genero[]>{
    return this.http.get("http://10.210.136.121/fmbapp_qa/public/api/genero", {headers: this.headers})
           .map(
              (res: Response) => res.json()
            )
  }

}
