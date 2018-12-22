import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { AsesorGrupal } from '../interfaces/asesor-grupal';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class AsesorGrupalService {

  private headers = new Headers({'Content-Type':'application/json'});

  constructor(private http: Http) { }

  getAll() : Observable<AsesorGrupal[]>{
return this.http.get("assets/Asesor_grupal.json", {headers: this.headers}).map(
                 (res: Response) => res.json()
               )
  }
}
