import { AppConfig } from './../services/constants';
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http'; 
import { Nivel } from '../interfaces/nivel';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class NivelService {

  private headers = new Headers({'Content-Type':'application/json'});
  private niveles: Nivel[] = [];
  api_cnn;
  constructor(private http: Http, private constante: AppConfig) { 
    this.api_cnn = this.constante.api_request;
  }

  getAll(){
    //http://localhost:8000/api
    this.http.get(this.api_cnn+"nivel_estudios", {headers: this.headers})
        .map(
            (res: Response) => res.json()
        )
        .subscribe(
            (data: Nivel[]) => this.niveles = data
        )
  }

  getAll2() {
   return this.http.get("/assets/nivel_estudios.json", {headers: this.headers})
        .map(
          (res: Response) => res.json()
        )
        .do(
          (data: Nivel[]) => this.niveles = data
        )
  }


  getNiveles() : Nivel[] {
    return this.niveles;
  }

}
