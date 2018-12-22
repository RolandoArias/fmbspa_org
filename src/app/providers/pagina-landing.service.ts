import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http'; 
import { PaginaLanding } from '../interfaces/pagina-landing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class PaginaLandingService {

  private headers = new Headers({'Content-Type':'application/json'});

  constructor(private http: Http) { }

  getAll() : Observable<PaginaLanding[]>{
    return this.http.get("http://10.210.159.46/fmbapp_qa/public/api/paginas_landing", {headers: this.headers})
               .map(
                 (res: Response) => res.json()
               )
  }

}
