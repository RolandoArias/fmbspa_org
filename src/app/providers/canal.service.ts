import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Canal } from '../interfaces/canal';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';


@Injectable()
export class CanalService {

  private headers = new Headers({'Content-Type':'application/json'});

  constructor(private http: Http) { }

  getAll(): Observable<Canal[]>{
    return this.http.get("http://10.210.159.46/fmbapp_qa/public/api/canales", {headers: this.headers})
           .map(
              (data: Response) => data.json()
           )
  }
}
