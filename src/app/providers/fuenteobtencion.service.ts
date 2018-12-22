import { Injectable } from '@angular/core';
import { Http, Headers, Response} from '@angular/http';
import { FuenteObtencion } from '../interfaces/fuenteobtencion';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class FuenteObtencionService {

  private headers = new Headers({'Content-Type':'application/json'});

  constructor(private http: Http) { }

  getAll(): Observable<FuenteObtencion[]>{
    return this.http.get("assets/fuente_obtencion.json", {headers: this.headers})
    //return this.http.get("https://devmx.com.mx/fmbspa/src/assets/fuente_obtencion.json", {headers: this.headers})
    
               .map(
                 (res: Response) => res.json()
               )
  }

}
