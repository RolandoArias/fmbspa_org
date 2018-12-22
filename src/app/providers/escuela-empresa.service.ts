import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { EscuelaEmpresa } from '../interfaces/escuela-empresa';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { Calidad } from '../interfaces/calidad';
import { CalidadService} from './calidad.service';

@Injectable()
export class EscuelaEmpresaService {

  private headers = new Headers({'Content-Type':'application/json'});
  private escuelaEmpresas: EscuelaEmpresa[] = [];

  constructor( private http: Http,
               private calidadServ: CalidadService) {}

  getAll() : Observable<EscuelaEmpresa[]>{
    return this.http.get("http://10.210.159.46/fmbapp_qa/public/api/escuela_empresa", {headers: this.headers})
               .map(
                 (res: Response) => res.json()
               )
               .do(
                 (data: EscuelaEmpresa[]) => this.escuelaEmpresas = data
               )

  }

  /*getEscuelasEmpresas() : EscuelaEmpresa[] {
    return this.escuelaEmpresas;
  }*/

  getCalidadByEscuelaEmpresa(escuelaId: string) : String{
    let calidades: Calidad[] = this.calidadServ.getCalidades();
    let calidad_name: string = "";

    for(let i = 0; i < calidades.length; i++){
      if(escuelaId == calidades[i].crmit_empresaescuela){
        calidad_name = calidades[i].crmit_calidadidname;
      }
    }
    if(calidad_name != ""){
      return calidad_name;
    }else{
      return null;
    }
  }

  getCalidadIdByEscuelaEmpresa(escuelaId: string) : String{
    let calidades: Calidad[] = this.calidadServ.getCalidades();
    let calidad_id: string = "";

    for(let i = 0; i < calidades.length; i++){
      if(escuelaId == calidades[i].crmit_empresaescuela){
        calidad_id = calidades[i].crmit_calidadid;
      }
    }
    if(calidad_id != ""){
      return calidad_id;
    }else{
      return null;
    }
  }

}
