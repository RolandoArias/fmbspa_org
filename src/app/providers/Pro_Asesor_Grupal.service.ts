import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { InterfaceAsesorGrupal } from '../interfaces/interface_asesorgrupal';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class ProAsesorGrupal {

  private headers = new Headers({'Content-Type':'application/json'});

  constructor(private http: Http) { }

  getAll(tipo:string) : Observable<InterfaceAsesorGrupal[]>{
return this.http.get("https://devmx.com.mx/fmbspa/src/assets/Asesor_grupal.json", {headers: this.headers})
  
.map(
                 (res: Response) => res.json()
               )
  }
}
