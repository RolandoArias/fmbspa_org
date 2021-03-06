import { Injectable } from '@angular/core';
import { Http, Headers, Response} from '@angular/http';
import { Programacion } from '../interfaces/programacion'; 
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class ProgramacionService {

  private headers = new Headers({'Content-Type':'application/json'});

  constructor(private http: Http) { }

  getAll() : Observable<Programacion[]>{
    return this.http.get("http://10.210.136.121/fmbapp_qa/public/api/programacion", {headers: this.headers})
               .map(
                 (res: Response) => res.json()
               )
  }

  
}
