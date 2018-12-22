import { Injectable } from '@angular/core';
import { Http, Headers, Response} from '@angular/http';
import { Campus } from '../interfaces/campus';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class CampusService {

  private headers = new Headers({'Content-Type':'application/json'});
  private campus: Campus[] = [];

  constructor(private http: Http) { }

  getAll() : Observable<Campus[]> {
    return this.http.get("http://10.210.159.46/fmbapp_qa/public/api/campus", {headers: this.headers})
        .map(
            (res: Response) => res.json()
        )
        .do(
          (data: Campus[]) => this.campus = data
        )
  }

  getAll2() {
    return this.http.get("/assets/campus.json", {headers: this.headers})
        .map(
          (res: Response) => res.json()
        )
        .do(
          (data: Campus[]) => this.campus = data
        )
  }

  getCampus() : Campus[]{
    return this.campus;
  }
  
}
