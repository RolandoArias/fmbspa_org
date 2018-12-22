import { AppConfig } from './../services/constants';
import { Injectable } from '@angular/core';
import { Http, Headers, Response} from '@angular/http';
import { Parentesco } from '../interfaces/parentesco';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class ParentescoService {
  api_cnn;
  private headers = new Headers({'Content-Type':'application/json'});

  constructor(private http: Http, private constante: AppConfig) {
    this.api_cnn = this.constante.api_request;
   }


  getAll() : Observable<Parentesco[]>{
    //http://10.210.159.46/fmbapp_qa/public/api/

    return this.http.get(this.api_cnn+"parentesco", {headers: this.headers})
               .map(
                 (res: Response) => res.json()
               )
  }



}
