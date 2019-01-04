import { Injectable } from '@angular/core';
import { Http, Headers, Response} from '@angular/http';
import { Calidad } from '../interfaces/calidad';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class CalidadService {

  private headers = new Headers({'Content-Type':'application/json'});
  private calidades: Calidad[] = [];

  constructor(private http: Http) { }

  getAll() {
    this.http.get("http://10.210.136.121/fmbapp_qa/public/api/calidad", {headers: this.headers})
        .map(
          (res: Response) => res.json()
        )
        .subscribe(
          (data: Calidad[]) => this.calidades = data
        )
  }

  getCalidades(): Calidad[]{
    return this.calidades;
  }

}
