import { Injectable } from '@angular/core';
import { Http, Headers, Response} from '@angular/http';
import { CampusCarrera } from '../interfaces/campus-carrera';

import { Nivel } from '../interfaces/nivel';
import { NivelService } from '../providers/nivel.service';

import { Modalidad } from '../interfaces/modalidad';
import { ModalidadService } from '../providers/modalidad.service';

import { Carrera } from '../interfaces/carrera';
import { CarreraService } from '../providers/carrera.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class CampusCarreraService {

  private headers = new Headers({'Content-Type':'application/json'});

  private campusCarreras: CampusCarrera[] = [];
  private carreras_campus: CampusCarrera[];
  private carreras_nivel: CampusCarrera[];
  private carreras: Carrera[];

  constructor(private http: Http,
              private nivelServ: NivelService,
              private carreraServ: CarreraService,
              private modalidadServ: ModalidadService) { }

  getAll(){
    this.http.get("http://localhost:8000/api/campus_carreras", {headers: this.headers})
        .map(
          (res: Response) => res.json()
        )
        .subscribe(
          (data: CampusCarrera[]) => this.campusCarreras = data
        )
  }

  getAlls(): Observable<CampusCarrera[]> {
    return this.http.get("http://localhost:8000/api/campus_carreras", { headers: this.headers })
      .map(
        (res: Response) => res.json()
      )
  }

  getAll_Carreras(): Observable<Carrera[]> {
    return this.http.get("http://localhost:8000/api/carreras", { headers: this.headers })
      .map(
        (res: Response) => res.json()
      )
  }

  getNivelesByCarrera(campus: string) : Nivel[] {

    let cadena = campus.split('*');
    let campusId = cadena[0];

    this.findCarrerasByCampus(campusId);

    let nivelesId: string[] = [];
    for(let i = 0; i < this.carreras_campus.length; i++){
      if(nivelesId.length > 0){
          if(!this.checkIfNivelIdExists(nivelesId, this.carreras_campus[i].nivelId)){
            nivelesId.push(this.carreras_campus[i].nivelId);
          }
      }else{
        nivelesId.push(this.carreras_campus[i].nivelId);
      }
    }

    let niveles = this.nivelServ.getNiveles();
    let nivelesByCarrera: Nivel[] = [];

    for(let i = 0; i < nivelesId.length; i++){
      for(let j = 0; j < niveles.length; j++){
        if(nivelesId[i] == niveles[j].crmit_codigounico){
          nivelesByCarrera.push(niveles[j])
        }
      }
    }
    return nivelesByCarrera;
  }

  getModalidadesByNivel(nivelId: string) : Modalidad[]{
    this.findCarrerasByNivel(nivelId);

    let modalidadesId: string[] = [];
    for(let i = 0; i < this.carreras_nivel.length; i++){
      if(modalidadesId.length > 0){
          if(!this.checkIfModalidadIdExists(modalidadesId, this.carreras_nivel[i].modalidadId)){
            modalidadesId.push(this.carreras_nivel[i].modalidadId);
          }
      }else{
        modalidadesId.push(this.carreras_nivel[i].modalidadId);
      }
    }

    let modalidades = this.modalidadServ.getModalidades();
    let modalidadesByCarrera: Modalidad[] = [];

    for(let i = 0; i < modalidadesId.length; i++){
      for(let j = 0; j < modalidades.length; j++){
        if(modalidadesId[i] == modalidades[j].crmit_codigounico){
          modalidadesByCarrera.push(modalidades[j])
        }
      }
    }
    return modalidadesByCarrera;
  }

   // Elimina duplicados
   removeDuplicates(originalArray, prop) {
    var newArray = [];
    var lookupObject  = {};

    for(var i in originalArray) {
       lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for(i in lookupObject) {
        newArray.push(lookupObject[i]);
    }
     return newArray;
}


  getCarrerasByModalidad(modalidadId: string) : Carrera[] {
    let carrerasId: string[] = [];

    for(let i = 0; i < this.carreras_nivel.length; i++){
      if(this.carreras_nivel[i].modalidadId == modalidadId){
        carrerasId.push(this.carreras_nivel[i].carreraId);
      }
    }

    let carreras = this.carreraServ.getCarreras();
    let carrerasByModalidad: Carrera[] = [];

    for(let i = 0; i < carrerasId.length; i++){
      for(let j = 0; j < carreras.length; j++){
        if(carrerasId[i] == carreras[j].codigounico){
          carrerasByModalidad.push(carreras[j])
        }
      }
    }
    console.log(carrerasByModalidad);


    return carrerasByModalidad;

  }

  getCarrerasByModalidad2(modalidadId: string) : Carrera[] {
    let carrerasId: string[] = [];
    let carreras__: any;

    carreras__ = modalidadId.split('*');
    modalidadId = carreras__[0];

   console.log("getCarrerasByModalidad2: "+modalidadId);



    for(let i = 0; i < this.carreras_nivel.length; i++){
      if(this.carreras_nivel[i].modalidadId == modalidadId){
        carrerasId.push(this.carreras_nivel[i].carreraId);
        console.log("Carrera encontrada: "+this.carreras_nivel[i].carreraId);
      }
    }

    let carreras = this.carreraServ.getCarreras2();
    let carrerasByModalidad: Carrera[] = [];

    for(let i = 0; i < carrerasId.length; i++){
      for(let j = 0; j < carreras.length; j++){
        if(carrerasId[i] == carreras[j].codigounico){
          carrerasByModalidad.push(carreras[j])
        }
      }
    }
    console.log("carrerasByModalidad: "+carrerasByModalidad);

  

    return carrerasByModalidad;

  }



  private findCarrerasByCampus(campusId: string){
    this.carreras_campus = [];

    for(let i = 0; i < this.campusCarreras.length; i++){
      if(this.campusCarreras[i].campusId == campusId){
        this.carreras_campus.push(this.campusCarreras[i]);
      }
    }
  }

  private findCarrerasByNivel(nivelId: string){
    this.carreras_nivel = [];

    for(let i = 0; i < this.carreras_campus.length; i++){
      if(this.carreras_campus[i].nivelId == nivelId){
        this.carreras_nivel.push(this.carreras_campus[i]);
      }
    }
  }

  private checkIfNivelIdExists(niveles: string[], id: string) : boolean {
    let exists: boolean = false;

    for(let i = 0; i < niveles.length; i++){
      if(niveles[i] == id){
        exists = true;
      }
    }
    return exists;
  }

  private checkIfModalidadIdExists(modalidades: string[], id: string) : boolean {
    let exists: boolean = false;

    for(let i = 0; i < modalidades.length; i++){
      if(modalidades[i] == id){
        exists = true;
      }
    }
    return exists;
  }

}
