import { AppConfig } from './../services/constants';
import { Injectable } from '@angular/core';
import { Http, Headers, Response} from '@angular/http';
import { SubTipo } from '../interfaces/sub-tipo';
import { SubsubTipo } from '../interfaces/subsub-tipo';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class SubsubtipoActividadService {

  private headers = new Headers({'Content-Type':'application/json'});
  private subTipo: SubTipo[] = [];
  private subSubTipo: SubsubTipo[] = [];
  api_cnn;

  constructor(private http: Http, private constante: AppConfig) {
    this.api_cnn = this.constante.api_request;
  }

  getSubSubTiposActividad(){
    this.http.get(this.api_cnn+"subsubtipo_actividad", {headers: this.headers})
        .map(
          (res: Response) => res.json()
        )
        .subscribe(
          (data: any) => {
            for(let i = 0; i < data.length; i++){
              let st = {id: data[i].id,crmit_subtipoactividadid: data[i].crmit_subtipoactividadid, crmit_codigounico: data[i].crmit_codigounico, crmit_subname: data[i].crmit_subname,crmit_subsubname: data[i].crmit_subsubname, etapaprocesoventaid: data[i].etapaprocesoventaid};
              this.subTipo.push(st);
            }
          }
        )
  }

  getSubSubTiposActividadAll(){
    this.http.get(this.api_cnn+"subsubtipo_actividad_all", {headers: this.headers})
        .map(
          (res: Response) => res.json()
        )
        .subscribe(
          (data: any) => {
            for(let i = 0; i < data.length; i++){
              let sst = {id: data[i].id, crmit_subtipoactividadid: data[i].crmit_subtipoactividadid, crmit_codigounico: data[i].crmit_codigounico, crmit_subsubname: data[i].crmit_subsubname, crmit_subname: data[i].crmit_subname, etapaprocesoventaid: data[i].etapaprocesoventaid};
              this.subSubTipo.push(sst);
            }
          }
        )
  }

  getAllSubTipo() : SubTipo[] {
    return this.subTipo;
  }

  getAllSubSubTipo() : SubsubTipo[] {
    return this.subSubTipo;
  }

  getSubSubTiposBySubTipo(subTipoId: string) : SubsubTipo[] {

    console.log(subTipoId);

    let subsub_tipos: SubsubTipo[] = [];

    for(let i = 0; i < this.subSubTipo.length; i++){
      if(subTipoId == this.subSubTipo[i].crmit_subname){
        subsub_tipos.push(this.subSubTipo[i])
      }
    }
    console.log("subsub_tipos");
    console.log(subsub_tipos);
    return subsub_tipos;
  }

}
