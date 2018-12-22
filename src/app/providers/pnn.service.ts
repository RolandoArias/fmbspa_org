import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Pnn } from '../interfaces/pnn';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class PnnService {

  private pnns: Pnn[] = [];
  private isValid: boolean;

  private headers = new Headers({'Content-Type':'application/json'});

  constructor(private http: Http) { }

  getAll() {
    this.http.get("/assets/pnnpublico.json")
        .map(
          (res: Response) => res.json()
        )
        .subscribe(
          (data: Pnn[]) => this.pnns = data
    )
    /*this.http.get("http://10.210.159.46/assets/pnnpublico.json", {headers: this.headers})
        .map(
          (res: Response) => res.json()
        )
        .subscribe(
          (data: Pnn[]) => this.pnns = data
        )*/
  }

  checkPnnIsValid(value: string) : boolean {
    this.isValid = false;
    let serie = value.substr(0,6);

    for(let i = 0; i < this.pnns.length; i++){
      if(serie == this.pnns[i].serie){
           this.isValid = true;
         }
    }
    return this.isValid;
  }

  getNumeroPermtido_pnn(value: string) : boolean {
    this.isValid = false;
    let serie = value.substr(0,6);

    for(let i = 0; i < this.pnns.length; i++){
      if(serie == this.pnns[i].serie){
           this.isValid = true;
         }
    }
    return this.isValid;
  }

}


