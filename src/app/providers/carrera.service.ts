import { AppConfig } from './../services/constants';
import { Injectable } from '@angular/core';
import { Http, Headers, Response} from '@angular/http';
import { Carrera } from '../interfaces/carrera';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class CarreraService {

  private headers = new Headers({'Content-Type':'application/json'});
  private carreras: Carrera[] = [];
  private carreras2: Carrera[] = [];
  api_cnn;

  constructor(private http: Http, private constante: AppConfig) {
    this.api_cnn =  this.constante.api_request;
   }


   getAll() {
    this.http.get("http://localhost:4200/assets/carrera.json", {headers: this.headers})
        .map(
          (res: Response) => res.json()
        )
        .subscribe(
          (data: Carrera[]) => this.carreras = data
        )
  }


  getAll2() : Observable<Carrera[]> {
          return this.http.get("/assets/carrera.json", {headers: this.headers})
            .map(
              (res: Response) => res.json()
            )
            .do(
              (data: Carrera[]) => this.carreras = data
            )
      }

  getAll3() : Observable<Carrera[]> {
        return this.http.get("/assets/carrera.json", {headers: this.headers})
          .map(
            (res: Response) => res.json()
          )
          .do(
            (data: Carrera[]) => this.carreras2 = data
          )
    }




  getAlls(): Observable<Carrera[]> {
      return this.http.get(this.api_cnn +"carrera", { headers: this.headers })
      .map(
        (data: Response) => data.json()
      )
  }


  getCarreras(): Carrera[]{
    return this.carreras;
  }

  getCarreras2(): Carrera[]{
    return this.carreras;
  }



}
