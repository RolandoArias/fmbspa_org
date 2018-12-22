import { Injectable } from '@angular/core';
import { Http, Headers, Response} from '@angular/http';
import { Subysubsubtipo2 } from '../interfaces/subysubsubtipo2';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class Subysubsubtipo2Service {

  private headers = new Headers({'Content-Type':'application/json'});

  constructor(private http: Http) { }




  getAll() {
   return  this.http.get("/assets/subysubsubtipo2.json", {headers: this.headers})
        .map(
          (res: Response) => res.json()
        )
  }


}
