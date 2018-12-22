import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { AsesorCita } from '../interfaces/asesor-cita';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class AsesorCitaService {

  private headers = new Headers({'Content-Type':'application/json'});

  constructor(private http: Http) { }

  getAll() : Observable<AsesorCita[]>{
      return this.http.get("https://devmx.com.mx/fmbspa/src/assets/Asesor_cita.json", {headers: this.headers})
       .map(
            (res: Response) => res.json()
      )
  }
}
