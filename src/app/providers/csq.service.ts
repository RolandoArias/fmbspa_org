import { AppConfig } from './../services/constants';
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Csq } from '../interfaces/csq';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class CsqService {
  api_cnn;
  private headers = new Headers({'Content-Type':'application/json'});

  constructor( private http: Http, private constante: AppConfig) {
    this.api_cnn = this.constante.api_request;
  }
  private csqs: Csq[] = [];

  getAll(){
    //this.http.get("http://localhost:8000/api/csq", {headers: this.headers})
    this.http.get(this.api_cnn+"csq", {headers: this.headers})
        .map(
          (res: Response) => res.json()
        )
        .subscribe(
          (data: Csq[]) => this.csqs = data     
        )
  }

  getCsqs() : Csq[]{
    return this.csqs;
  }

  getCsqsByCanal(canalId: string) : Csq[]{
    console.log(canalId);//61ba8610-9989-e511-957f-005056be4250.EN LINEA
    let array = canalId.split('.');  
    let cID = array[0];
    let csqsByCanales: Csq[] = [];
    this.getAll();    
    for(let i = 0; i < this.csqs.length; i++){
      if(this.csqs[i].canalId == cID){
        csqsByCanales.push(this.csqs[i]);
      }
    }
    return csqsByCanales;
  }

}


                            