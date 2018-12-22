import { Injectable } from '@angular/core';
import { Http, Headers, Response} from '@angular/http';
import { SinCorreo } from '../interfaces/sin-correo'; 
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class SinCorreoService {

  private headers = new Headers({'Content-Type':'application/json'});

  constructor(private http: Http) { }

  getAll() : Observable<SinCorreo[]>{
    return this.http.get("http://10.210.159.46/fmbapp_qa/public/api/sin_correo", {headers: this.headers})
               .map(
                 (res: Response) => res.json()
               )
  }

}
