import { AppConfig } from './../services/constants';
import { Injectable } from '@angular/core';
import { Http, Headers, Response} from '@angular/http';
import { Usuario } from '../interfaces/usuario';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class UsuarioService {

  private headers = new Headers({'Content-Type':'application/json'});

  constructor(private http: Http, private constante: AppConfig) { }

  getAll() : Observable<Usuario[]>{
    return this.http.get("http://10.210.136.121/fmbapp_qa/public/api/usuario", {headers: this.headers})
               .map(
                 (res: Response) => res.json()
               )
  }

  getRolUsuario(email){
    return this.http.get(this.constante.api_request+"roles_perfil/"+email, {headers: this.headers})    
    .map(this.extractData)
    .do(this.logResponse);

  }

  private logResponse(res: Response){
    // console.log(res);
   }
 
   private extractData(res: Response){    
     return res.json();
   }
 
   private extractDataPlain(res: Response){    
     return res;
   }

}
