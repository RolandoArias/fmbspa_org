import { Injectable } from '@angular/core';
import { AppConfig } from './../services/constants';
import { Http, Headers, Response} from '@angular/http';
import { Modalidad } from '../interfaces/modalidad';
import { Nivel } from '../interfaces/nivel';
import { Landing } from '../interfaces/landing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class ModalidadService {

  private headers = new Headers({'Content-Type':'application/json'});
  private modalidades: Modalidad[] = [];
  private niveles: Nivel[] = [];
  private landings: Landing[] = [];
  api_cnn;

  constructor(private http: Http,private constante: AppConfig) {
    this.api_cnn = this.constante.api_request;
  }

  getAll() {
    this.http.get(this.api_cnn+"modalidad", {headers: this.headers})
        .map(
          (res: Response) => res.json()
        )
        .subscribe(
          (data: any[]) => this.modalidades = data
        )          
  }


 getAll2(): Observable<Modalidad[]>{
    return this.http.get("http://10.210.136.121/fmbapp_qa/public/api/modalidad", {headers: this.headers})
               .map(
                 (res: Response) => res.json()
               )
  }


  getModalidades(): Modalidad[]{
    return this.modalidades; 
  }

  getNiveles() : Nivel[] {
    return this.niveles;
  }

}
