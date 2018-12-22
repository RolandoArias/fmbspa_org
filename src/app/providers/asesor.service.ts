import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Asesor } from '../interfaces/asesor';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class AsesorService {

  private headers = new Headers({'Content-Type':'application/json'});

  constructor(private http: Http) { }

  getAll() : Observable<Asesor[]>{
    return this.http.get("http://localhost:8000/api/asesor", {headers: this.headers})
   // return this.http.get("https://devmx.com.mx/fmbspa/src/assets/Asesor_cita.json", {headers: this.headers})
               .map(
                 (res: Response) => res.json()
               )
  }
}
