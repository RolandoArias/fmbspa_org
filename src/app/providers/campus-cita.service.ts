import { Injectable } from '@angular/core';
import { Http, Headers, Response} from '@angular/http';
import { CampusCita } from '../interfaces/campus-cita';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class CampusCitaService {

  private headers = new Headers({'Content-Type':'application/json'});

  constructor(private http: Http) { }

  getAll(): Observable<CampusCita[]>{
    return this.http.get("http://10.210.136.121/fmbapp_qa/public/api/campus_cita", {headers: this.headers})
               .map(
                 (res: Response) => res.json()
               )
  }

}
