import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { GeneralService } from '../services/general.service';
import { FormControl, FormGroup, FormBuilder, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';

import { MatDialog, MatSelect, MatDialogRef, MAT_DIALOG_DATA, NativeDateAdapter } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import 'rxjs/Rx';

import * as XLSX from 'xlsx';

import { SendService } from '../providers/send.service';
import { PnnService } from '../providers/pnn.service';
import { Injectable } from "@angular/core";
import { LandingValidation } from '../validations/landing.validations';
import { LandingService } from '../services/landing.service';

import { Ciclo } from '../interfaces/ciclo';
import { Campus } from '../interfaces/campus';
import { Carrera } from '../interfaces/carrera';
import { EscuelaEmpresa } from '../interfaces/escuela-empresa';
import { UploadSis } from '../interfaces/upload-sis';
import { CampusCarrera } from '../interfaces/campus-carrera';

import { Interes } from '../interfaces/interes';
import { Modalidad } from '../interfaces/modalidad';

import { InteresService } from '../providers/interes.service';
import { ModalidadService } from '../providers/modalidad.service';

import { CicloService } from '../providers/ciclo.service';
import { CampusService } from '../providers/campus.service';
import { CarreraService } from '../providers/carrera.service';
import { EscuelaEmpresaService } from '../providers/escuela-empresa.service';
import { CampusCarreraService } from '../providers/campus-carrera.service';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as $ from 'jquery';
import * as jquery from 'jquery';
import { INTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS } from '@angular/platform-browser-dynamic/src/platform_providers';


@Component({
  selector: 'carga-sis',
  templateUrl: './carga-sis.component.html',
  styleUrls: ['./carga-sis.component.scss']
})

@Injectable()
export class CargaSisComponent implements OnInit {
  @ViewChild("imgFileInput") imgFileInput: any;
  @ViewChild("Tipo") Tipo: any;

  newdata: any = {};
  form: FormGroup;
  datos: FormControl;
  arrayBuffer:any;
  file:File;
  columDistin:boolean;
  rows = [];
  rowss = [];
  rowss_mod = [];
  rowss_niv = [];
  campusTxt: any;
  nivelTxt: any;

  uploads: UploadSis[] = [];
  ciclos: Ciclo[] = [];
  campus: Campus[] = [];
  intereses: Interes[] = [];
  modalidades: Modalidad[] = [];
  carreras: Carrera[] = [];
  campusCarreras: CampusCarrera[] = [];
  campos_con_error = [];


  constructor(
                private pnnServ: PnnService,
                private sendServ: SendService,
                public dialog: MatDialog,
                private cicloServ: CicloService,
                private campusServ: CampusService,
                private campusCarreraServ: CampusCarreraService,
                private interesServ: InteresService,
                private modalidadServ: ModalidadService,
                private carreraServ: CarreraService,
                public http: HttpClient) {

    this.fetch((data) => {
      this.rows = data;
    });
    this.fetchs((data) => {
      this.rowss = data;
    });

    this.fetchs_modalidad((data) => {
      this.rowss_mod = data;
    });

    this.fetchs_nivel((data) => {
      this.rowss_niv = data;
    });
   }

  ngOnInit() {
    this.form = new FormGroup({
      datos: new FormControl(''),
    });

    // Se obtienen todos los campus
    this.campusServ.getAll()
      .subscribe(
        (data: Campus[]) => this.campus = data
      )

    // Se obtienen todos los campus
    this.carreraServ.getAlls()
      .subscribe(
        (data: Carrera[]) => this.carreras = data
      )

    // Se obtienen los ciclos
    this.cicloServ.getAll()
      .subscribe(
        (data: Ciclo[]) => this.ciclos = data
      )

  }

  previewImage(event){
     this.newdata.filename = event.srcElement.files[0].name;
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/carga-sis.json`);
    req.onload = () => {
      cb(JSON.parse(req.response));
    };
    req.send();
  }

  fetchs(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `http://localhost:8000/ api/campus_carreras`);
    req.onload = () => {
      cb(JSON.parse(req.response));
    };
    req.send();
  }

  fetchs_modalidad(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `http://localhost:8000/ api/modalidad`);
    req.onload = () => {
      cb(JSON.parse(req.response));
    };
    req.send();
  }

  fetchs_nivel(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `http://localhost:8000/ api/nivel_estudios`);
    req.onload = () => {
      cb(JSON.parse(req.response));
    };
    req.send();
  }

  checkCols(workbook)
  {
      var colValues =[];
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      var cells = Object.keys(worksheet);
      for (var i = 0; i < Object.keys(cells).length; i++)
      {
        if( cells[i].indexOf('1') > -1)
        {
        colValues.push(worksheet[cells[i]].v);
        //Contails all column names
      }
    }

    let col = '["Num_Persona","id_campus","nombre_corto_telemarketer","ciclo","lista_de_seguimiento","nombre_corto_asesor","fuente_obtención","clave_de_sis_carrera"]';
    let cols_true = ["Num_Persona","id_campus","nombre_corto_telemarketer","ciclo","lista_de_seguimiento","nombre_corto_asesor","fuente_obtención","clave_de_sis_carrera"];

    let cColum = JSON.stringify(colValues);


    console.log("Las columnas del excel deben ser:");
    console.log(colValues[0]+", "+
                colValues[1]+", "+
                colValues[2]+", "+
                colValues[3]+", "+
                colValues[4]+", "+
                colValues[5]+", "+
                colValues[6]+", "+
                colValues[7]+", "
              );

    console.log("");
    console.log("");


    let error_cols = 0;

    if(cols_true[0] == colValues[0]){
      //console.log( cols_true[0]+ " == " +colValues[0]+" " +cols_true[0]+ " es igual = true");
      error_cols = 0;
    }else{
      error_cols = error_cols + 1;
    }

  if(cols_true[1] == colValues[1]){
     // console.log( cols_true[1]+ " == " +colValues[1]+" " +cols_true[1]+ " es igual = true");
      error_cols = 0;
  }else{
    error_cols = error_cols + 1;
  }

  if(cols_true[2] == colValues[2]){
    //  console.log( cols_true[2]+ " == " +colValues[2]+" " +cols_true[2]+ " es igual = true");
      error_cols = 0;
  }else{
    error_cols = error_cols + 1;
  }

  if(cols_true[3] == colValues[3]){
    //   console.log( cols_true[3]+ " == " +colValues[3]+" " +cols_true[3]+ " es igual = true");
       error_cols = 0;
  }else{
    error_cols = error_cols + 1;
  }

  if(cols_true[4] == colValues[4]){
  //    console.log( cols_true[4]+ " == " +colValues[4]+" " +cols_true[4]+ " es igual = true");
      error_cols = 0;
  }else{
    error_cols = error_cols + 1;
  }

  if(cols_true[5] == colValues[5]){
  //    console.log( cols_true[5]+ " == " +colValues[5]+" " +cols_true[5]+ " es igual = true");
      error_cols = 0;
  }else{
    error_cols = error_cols + 1;
  }

  if(cols_true[6] == colValues[6]){
  //    console.log( cols_true[6]+ " == " +colValues[6]+" " +cols_true[6]+ " es igual = true");
      error_cols = 0

  }else{
    error_cols = error_cols + 1;
  }

  if(cols_true[7] == colValues[7]){
  //    console.log( cols_true[7]+ " == " +colValues[7]+" " +cols_true[7]+ " es igual = true");
      error_cols = 0;
  }else{
    error_cols = error_cols + 1;
  }




  if(error_cols == 0 ){

    return true;

  } else {

    return false;
  }




    /*if(col == cColum){
      return true;
    }else{
      return false;
    }*/

  }

   Upload() {

     //console.log('this.modalidades');
     //console.log(this.modalidades);

     let count = 0;

         let tipo = this.Tipo.value;
        let fileReader = new FileReader();
          fileReader.onload = (e) => {
              this.arrayBuffer = fileReader.result;
              var data = new Uint8Array(this.arrayBuffer);
              var arr = new Array();
              var rol = new Array();
              for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
              var bstr = arr.join("");
              var workbook = XLSX.read(bstr, {type:"binary"});
              var first_sheet_name = workbook.SheetNames[0];
              var worksheet = workbook.Sheets[first_sheet_name];
              let filas = XLSX.utils.sheet_to_json(worksheet,{raw:true});
              count =  Object.keys(filas).length;
             // console.log(this.checkCols(workbook));

              if(!this.checkCols(workbook)){
                  this.showDialog("Los titulos de la columna no coinciden");
                  this.newdata.filename ="";
                  this.Tipo.value="";
                  this.columDistin = false;
                  return;
              }else{
                  this.columDistin = true;
              }

            let f = 500;
              let x = 0;

            filas.forEach((key: UploadSis) => {

               var Nombre_del_archivo_de_carga = this.newdata.filename;
               var extension_file = Nombre_del_archivo_de_carga.split('.');

               var telemarketerCampo = this.getValidaCampo("Telemarketer", key.nombre_corto_telemarketer);
               var nombre_corto_asesorCampo = this.getValidaCampo("Nombre_corto_asesor", key.nombre_corto_asesor);
               var fuente_obtencionCampo = this.getValidaCampo("Fuente Obtención", key.fuente_obtención);
               var lista_de_seguimientoCampo = this.getValidaCampo("ListadeSeguimiento", key.lista_de_seguimiento);



                let campusCampo = this.getValidaCampo("Campus", key.id_campus);
                let carreraCampo =  this.getValidaCampo("Carrera", key.clave_de_sis_carrera);


                //Validacion de Campus

                var carrera_activo = "";
                var campus_activo = "";

                for( i = 0 ; i < this.carreras.length ; i++  ){
                  if(this.carreras[i].id == carreraCampo ){
                    if(this.carreras[i].Activo == "Activo"){
                      carrera_activo = "Activo";

                      console.log("---------Carrera--------------");
                      console.log("| ID = "+this.carreras[i].id+"                      |");
                      console.log("| Activo = "+carrera_activo+"              |");
                      console.log("------------------------------");

                    }else{
                      carrera_activo = "";
                    }

                  }

                }

                console.log("Carrera_Activo: "+carrera_activo);

                //Validacion de Carrera

                for( i = 0 ; i < this.campus.length ; i++ ){

                  if(this.campus[i].crmit_codigounico == campusCampo){
                    if(this.campus[i].activo == 'Activo' ){
                        campus_activo = "Activo";
                        console.log("---------Campus---------------");
                        console.log("| ID = "+this.campus[i].crmit_codigounico+"                      |");
                        console.log("| Activo = "+campus_activo+"              |");
                        console.log("------------------------------");

                    }else{
                      campus_activo = "";
                    }
                  }
                }
                console.log("Campus_Activo: " + campus_activo );

                //Validacion de campus activo y carrera activa


               //Queda pendiente validar Campus Activo
                if(campus_activo != "Activo" ){
                  this.showDialog("Error en el Numero de Persona "+key.Num_Persona+", el campus es incorrecto o no existe.");

                }

                if(carrera_activo != "Activo"){
                  this.showDialog("Error en el Numero de Persona "+key.Num_Persona+", la Carrera "+key.clave_de_sis_carrera+" no existe en el campus o no se encontro ninguna relacion con el Campus "+key.id_campus+".");
                }




                if(campusCampo != "0"){
                var campusTM = this.getObjects(this.campus, 'crmit_codigounico', key.id_campus);
                }

                var cicloTM = this.getObjects(this.ciclos, 'crmit_name', key.ciclo);


                //console.log("carreraCampo: " + key.clave_de_sis_carrera);

                if( carreraCampo != '0'){

                var carreraTM = this.getObjects(this.carreras, 'id', key.clave_de_sis_carrera);
                var GUIDCarrera = (carreraTM[0].codigounico == null )?null: carreraTM[0].codigounico;
                var TCarrera = carreraTM[0].name;

              }
                //var nivelTM = this.getObjects(this.niveles, 'id', campusTM[0].crmit_tb_campusid);

                    let cicloCampo = "";
                    let GUIDCiclo = "";
                    let valor_ciclo = "";
                    let ciclo = "";



                    for (let i = 0; i < this.ciclos.length; i++) {
                      if (this.ciclos[i].crmit_name == key.ciclo && this.ciclos[i].Activo == "Activo") {  //Validando Ciclo al Servicio

                        console.log("");
                        console.log("*********************************");
                        console.log("");
                        console.log("Comparativa:   "+this.ciclos[i].crmit_name +" == "+ key.ciclo);
                        console.log("Ciclo Activo");
                        console.log("");
                        console.log("*********************************");
                        console.log("");

                        cicloCampo = this.ciclos[i].crmit_name;
                        ciclo = this.ciclos[i].crmit_name;
                        GUIDCiclo = (this.ciclos[i].crmit_codigounico == null)?null : this.ciclos[i].crmit_codigounico;
                        valor_ciclo = this.ciclos[i].nombreventas;

                      }else if(cicloCampo == null){ cicloCampo = null;  console.log("Ciclo null: "+cicloCampo); console.log("Ciclo Activo"); }
                    }


                   cicloCampo = this.getValidaCampo("Ciclo", cicloCampo);

                   console.log("cicloCampo = "+cicloCampo);

                    console.log(cicloCampo + " == " + key.ciclo);

                    if(cicloCampo != key.ciclo ){
                      this.showDialog("Error en el Numero de Persona "+key.Num_Persona+", el ciclo es incorrecto.");

                    }else{
                      console.log("Ciclo Bien: "+cicloCampo);
                     }

                if( cicloCampo != '0' ){

                var campus = campusTM[0].crmi_name;
                var GUIDCampus = campusTM[0].crmit_tb_campusid;

                 }

                /* obtener nivel y modalidad */
                var NivelInteres = "" ;
                var GUIDNivelInteres = "" ;

                var Modalidad = "" ;
                var GUIDModalidad = "" ;

                console.log("Carrera: "+GUIDCarrera);
                console.log("Campus: "+GUIDCampus);



              for (let i = 0; i < this.rowss.length; i++) {

               //console.log("Estoy dentro de ciclo rowss");

                if (this.rowss[i].campusId == GUIDCampus && this.rowss[i].carreraId == GUIDCarrera) {

                  GUIDModalidad = this.rowss[i].modalidadId;
                  GUIDNivelInteres = this.rowss[i].nivelId;
                }
              }


              for (let i = 0; i < this.rowss_mod.length; i++) {
                if (this.rowss_mod[i].crmit_codigounico == GUIDModalidad) {
                  Modalidad = this.rowss_mod[i].crmit_name;
                }
              }

              for (let i = 0; i < this.rowss_niv.length; i++) {
                if (this.rowss_niv[i].crmit_codigounico == GUIDNivelInteres) {
                  NivelInteres = this.rowss_niv[i].crmit_name;
                }
              }



                let Team = "";
                let Prioridad = 0;
                let Attemp = "";


                for (let i = 0; i < this.rows.length; i++) {

                  if (this.rows[i].CAMPUS == campus && this.rows[i].BL == NivelInteres && this.rows[i].CICLO == valor_ciclo) {

                  //  console.log("");console.log("");console.log("");
                  //  console.log("---------------------------------------------------");
                  //  console.log("");console.log("");
                  //  console.log("IdCampus: "+GUIDCampus);
                  //  console.log("NombreCampus:"+campus);

                  //  console.log("Modalidad: "+Modalidad);
                  //  console.log("NivelInteres: "+NivelInteres);

                    Team = this.rows[i].TEAM;
                  //  console.log("TEAM: "+Team);
                    Prioridad = parseInt(this.rows[i].PRIORIDAD);
                  //  console.log("PRIORIDAD: "+Prioridad);
                    Attemp = this.rows[i].ATTEMP;
                  //  console.log("ATTEMP: "+Attemp);
                  //  console.log("Ciclo:"+ciclo);
                  //  console.log("");console.log("");
                  //  console.log("---------------------------------------------------");
                  //  console.log("");console.log("");console.log("");
                  }

                }

                var u = localStorage.getItem('user');
                var data = JSON.parse(u);
                var nom_usu = data.fullname;

              var obj2 = {
                "Usuario": nom_usu,
                "GUIDUsuario":  localStorage.getItem('UserId'),
                "Banner": "https://www.calidadacademica.mx/carga-sis",
                "FuenteObtencion":"ABSORCION",
                "GUIDFuentedeObtencion":"2489dd13-6072-e211-b35f-6cae8b2a4ddc",
                "Attemp": Attemp,
                "FuenteNegocio":  this.Tipo.value,
                "NumPersona":  this.getValidaCampo("Num_Persona", key.Num_Persona),
                "Prioridad":  Prioridad,
                "Team":  Team,
                "Ciclo":  ciclo,
                "GUIDCiclo":  GUIDCiclo,
                "Carrera":  TCarrera,
                "GUIDCarrera":  GUIDCarrera,
                "Nivel":  NivelInteres,
                "GUIDNivelInteres":  GUIDNivelInteres,
                "Modalidad":  Modalidad,
                "GUIDModalidad":  GUIDModalidad,
                "campus":  campus,
                "GUIDCampus":  GUIDCampus,
                "EsAlumno": true,
                "Nombredelarchivodecarga":  Nombre_del_archivo_de_carga,
                "TipodeAcción": "CREAR",
                "TipodeProceso": "PRIMER INGRESO",
                "Razónparaelestado":"PROCESADO",
                "FechayHorainicioCarga":new Date(),
                "Estado":"Activo",
                "ModificadoPor":  nom_usu,
                "Tipificacion": 'SIS',

              };

              let datos = Object.assign(key, obj2);

              let Archivo = Nombre_del_archivo_de_carga;

              /*if(extension_file[1] != "xls" || extension_file[1] != "xlsx" || extension_file[1] != "XLS" || extension_file[1] != "XLSX"){  this.showDialog("El documento "+Nombre_del_archivo_de_carga+" no es valido, \n solo se permiten xls y xlsx."); }

              else*/ if( this.campos_con_error.length != 0 ){ //Verifica si hay errores
                console.log("Bloquea Send");

                console.log("Campos con error = "+this.campos_con_error);
                this.showDialog("Hay datos incompletos o incorrectos en las columnas: "+this.campos_con_error+" .");

                this.campos_con_error.splice(0);
                console.log("Total de Errores:"+this.campos_con_error.length);


                $.ajax({
                  type: "Post",
                  url: "/assets/log_carga_sis.php",
                  data: {evento:"Campos con error.", data:datos },
                  // dataType: "JSON",
                  success: function(res) {
                    console.log("Datos Enviados");
                    console.log(res);
                  },
                  error: function(xhr, textStatus, error){
                      console.log(xhr.statusText);
                      console.log(textStatus);
                      console.log(error);
                  }
                });


               // window.location.reload(true);



             }else{ //Si no hay errores entra a envio



              console.log("Inserta Send");

              console.log("");console.log("");console.log("");
              console.log("---------------------------------------------------");
              console.log("");console.log("");
              console.log("IdCampus: "+GUIDCampus);
              console.log("NombreCampus:"+campus);
              console.log("Modalidad: "+Modalidad);
              console.log("NivelInteres: "+NivelInteres);
              console.log("TEAM: "+Team);
              console.log("PRIORIDAD: "+Prioridad);
              console.log("ATTEMP: "+Attemp);
              console.log("Ciclo:"+ciclo);
              console.log("");console.log("");
              console.log("---------------------------------------------------");
              console.log("");console.log("");console.log("");

                      //Envio de los datos
                      setTimeout(() => {
                        this.sendServ.send_Todos_cargasis_QA(obj2) // Anterior sendData7
                          .subscribe(

                            (res: any) => {
                              console.log("res");
                              console.log("res = "+res.status);

                              if (res.status == 200) {



                            /*   this.sendServ.sendData8(datos, Archivo) //EndPoint sendData8 para pruebas
                                  .subscribe(
                                    (ress: any) => {
                                      console.log("ress");
                                      console.log(ress);
                                    }
                                  );*/



                                  //Envia Log

                                  $.ajax({
                                    type: "Post",
                                    url: "/assets/log_carga_sis.php",
                                    data: {evento:"200", data:datos },
                                    // dataType: "JSON",
                                    success: function(res) {
                                      console.log("Datos Enviados");
                                      console.log(res);
                                    },
                                    error: function(xhr, textStatus, error){
                                        console.log(xhr.statusText);
                                        console.log(textStatus);
                                        console.log(error);
                                    }
                                  });




                                x=x+1;
                                if (count == x) {
                                  this.showDialogOk("Los datos se han guardado correctamente.");
                                  this.newdata.filename = "";
                                  this.Tipo.value = "";
                                  console.log("x=x+1 Guardado x = "+x);
                                }
                              } else {


                             /* let MensajeError = "ErroralGuardarElRegistro";
                                this.sendServ.sendData8Error(datos, MensajeError, Archivo) //EndPoint sendData8 para pruebas
                                .subscribe(
                                  (ress: any) => {
                                    console.log("ress");
                                    console.log(ress);
                                  }
                                );*/

                                //Envia Log

                                $.ajax({
                                  type: "Post",
                                  url: "/assets/log_carga_sis.php",
                                  data: {evento:"Error al Guardar Registro", data:datos },
                                  // dataType: "JSON",
                                  success: function(res) {
                                    console.log("Datos Enviados");
                                    console.log(res);
                                  },
                                  error: function(xhr, textStatus, error){
                                      console.log(xhr.statusText);
                                      console.log(textStatus);
                                      console.log(error);
                                  }
                                });



                                x=x-1;
                                this.showDialog("Error al guardar el registro");
                                console.log("x=x-1 Error x = "+x);


                              }
                            },
                            error => {

                              console.log("Errores = " + error.status);

                              if (error.status === 400) {
                                console.warn(error._body);
                                this.showDialog("Error al guardar el registro",);


                             /* let MensajeError = "ErroralGuardarElRegistro";
                                this.sendServ.sendData8Error(datos, MensajeError, Archivo) //EndPoint sendData8 para pruebas
                                .subscribe(
                                  (ress: any) => {
                                    console.log("ress");
                                    console.log(ress);
                                  }
                                );*/



                                //Envio Log
                                $.ajax({
                                  type: "Post",
                                  url: "/assets/log_carga_sis.php",
                                  data: {evento:"400", data:datos },
                                  success: function(res) {
                                    console.log("Datos Enviados");
                                    console.log(res);
                                  },
                                  error: function(xhr, textStatus, error){
                                      console.log(xhr.statusText);
                                      console.log(textStatus);
                                      console.log(error);
                                  }
                                });



                                x--;
                                console.log("x-- Error x = "+x);
//                                window.location.reload(true);


                              }
                              else if (error.status === 500) {
                                console.warn(error._body);


                             /* let MensajeError = "ErroralGuardarElRegistro";
                                this.sendServ.sendData8Error(datos, MensajeError, Archivo) //EndPoint sendData8 para pruebas
                                .subscribe(
                                  (ress: any) => {
                                    console.log("ress");
                                    console.log(ress);
                                  }
                                );*/



                                //Envia Log

                                $.ajax({
                                  type: "Post",
                                  url: "/assets/log_carga_sis.php",
                                  data: {evento:"500", data:datos },
                                  // dataType: "JSON",
                                  success: function(res) {
                                    console.log("Datos Enviados");
                                    console.log(res);
                                  },
                                  error: function(xhr, textStatus, error){
                                      console.log(xhr.statusText);
                                      console.log(textStatus);
                                      console.log(error);
                                  }
                                });


                                this.showDialog("Error al guardar el registro");
                               // window.location.reload(true);

                              }else{
                                console.warn(error._body);


                            /*  let MensajeError = "ErrorEnLaTransaccion";
                                this.sendServ.sendData8Error(datos, MensajeError, Archivo) //EndPoint sendData8 para pruebas
                                .subscribe(
                                  (ress: any) => {
                                    console.log("ress");
                                    console.log(ress);
                                  }
                                );*/


                                //Envia Log

                                $.ajax({
                                  type: "Post",
                                  url: "/assets/log_carga_sis.php",
                                  data: {evento:"Error en la transacción", data:datos },
                                  // dataType: "JSON",
                                  success: function(res) {
                                    console.log("Datos Enviados");
                                    console.log(res);
                                  },
                                  error: function(xhr, textStatus, error){
                                      console.log(xhr.statusText);
                                      console.log(textStatus);
                                      console.log(error);
                                  }
                                });



                                this.showDialog("Error en la transaccion");
                               // window.location.reload(true);

                              }
                            })
                      }, 2500);


                }//Termina validacion de campos vacios



              });

               /*   let total;
                  total = f * count;

                  console.log('X = ' + x);

                   setTimeout(() => {
                          if(this.columDistin){

                          }else{

                          }
                  }, total);*/

          }

          fileReader.readAsArrayBuffer(this.imgFileInput.nativeElement.files[0]);

  }


//Funcion para validacion de campo

getValidaCampo(campo, valor){

  if(valor == "" || valor == null){ //Campo Vacio

    this.campos_con_error.push(" "+campo);
    return '0';
  }else{ //Campo No Vacio

    if(campo == "Fuente Obtención"){ //Valida Area de Atencion
      console.log("Validacion de Fuente Obtención");
      //console.log("valor.length = " + valor);
      if(valor.length < 1 || valor.length == 0 || valor.length == undefined || valor.length == '0' || valor.length == null ){
        this.campos_con_error.push(" "+campo);
       }else{
        return valor;
       }

    }else if(campo == "AreaInteres"){ //Valida Area de Atencion
      console.log("Validacion de Area de Atencion");
      //console.log("valor.length = " + valor);
      if(valor.length < 1 || valor.length == 0 || valor.length == undefined || valor.length == '0' || valor.length == null ){
        this.campos_con_error.push(" "+campo);
       }else{
        return valor;
       }

    }else if(campo == "Calidad"){ //Valida Calidad
      console.log("Validacion de Calidad");
      //console.log("valor.length = " + valor);
      if(valor.length < 1 || valor.length == 0 || valor.length == undefined || valor.length == '0' || valor.length == null ){
        this.campos_con_error.push(" "+campo);
       }else{
        return valor;
       }

    }else if(campo == "Escuela"){ //Valida Escuela
      console.log("Validacion de Escuela");
      //console.log("valor.length = " + valor);
      if(valor.length < 1 || valor.length == 0 || valor.length == undefined || valor.length == '0' || valor.length == null ){
        this.campos_con_error.push(" "+campo);
       }else{
        return valor;
       }

    }else if(campo == "SubsubTipo"){ //Valida SubsubTipo
      console.log("Validacion de SubsubTipo");
      //console.log("valor.length = " + valor);
      if(valor.length < 1 || valor.length == 0 || valor.length == undefined || valor.length == '0' || valor.length == null ){
        this.campos_con_error.push(" "+campo);
       }else{
        return valor;
       }

    }else if(campo == "SubTipo"){ //Valida SubTipo
      console.log("Validacion de SubTipo");
      //console.log("valor.length = " + valor);
      if(valor.length < 1 || valor.length == 0 || valor.length == undefined || valor.length == '0' || valor.length == null ){
        this.campos_con_error.push(" "+campo);
       }else{
        return valor;
       }

    }else if(campo == "Campus"){ //Valida Campus
      console.log("Validacion de campus");
      //console.log("valor.length = " + valor);
      if(valor.length < 1 || valor.length == 0 || valor == undefined || valor.length == '0' || valor == null || valor == "" ){
        this.campos_con_error.push(" "+campo);
       }else{
        return valor;
       }

    }else if(campo == "Ciclo"){ //Valida Ciclo
      console.log("Validacion de ciclo");
      //console.log("valor.length = " + valor);
      if(valor.length < 1 || valor.length == 0 || valor.length == undefined || valor.length == '0' || valor.length == null ){
        this.campos_con_error.push(" "+campo);
       }else{
        return valor;
       }

    }else if(campo == "Carrera"){ //Valida Carrera
    console.log("Validacion de carrera");
    //console.log("valor.length = " + valor);
    if(valor.length < 1 || valor.length == 0 || valor == undefined || valor.length == '0' || valor == null || valor == "" ){
      this.campos_con_error.push(" "+campo);
     }else{
      return valor;
     }

  }else if(campo == "CorreoElectronico"){ //Si es campo CorreoElectronico
      console.log("En validacion de Correo");

       if(LandingValidation.ValidacionEmail(valor) != null){
        this.campos_con_error.push(" "+campo);
       }else{
         return valor;
       }

    }else if(campo == "Telefono Celular"){
      console.log("En validacion de Telefono Celular");

      if(!isNaN(valor)){ //Verifica si es numero
        console.log("Es numero");
        var v = String(valor);

          if(v.length == 10){ //Valida el numero de caracteres, debe llevar 10
           console.log("Es un valor permitido global");

            //verifica si es nuero valido en black list

            let pnnServ = this.pnnServ;

            if(!pnnServ.getNumeroPermtido_pnn(String(valor))) { //Mira el json de PNN para verificar que sea un numero valido
                console.log("No esta permitido el numero");
                this.campos_con_error.push(" "+campo);

               } else {
                console.log("Si esta permitido el numero");
                return valor;
               }
          }else{
            this.campos_con_error.push(" "+campo);
          }
    }else{ //En caso de no ser numero
      console.log("No es numero");
      this.campos_con_error.push(" "+campo);
    }


    }else if(campo == "Telefono"){ //Si es campo Telefono
      console.log("En validacion de Telefono");

      if(!isNaN(valor)){ //Verifica si es numero
          console.log("Es numero");
          var v = String(valor);

            if(v.length == 10){ //Valida el numero de caracteres, debe llevar 10
             console.log("Es un valor permitido global");

              //verifica si es nuero valido en black list

              let pnnServ = this.pnnServ;

              if(!pnnServ.getNumeroPermtido_pnn(String(valor))) { //Mira el json de PNN para verificar que sea un numero valido
                  console.log("No esta permitido el numero");
                  this.campos_con_error.push(" "+campo);

                 } else {
                  console.log("Si esta permitido el numero");
                  return valor;
                 }
            }else{
              this.campos_con_error.push(" "+campo);
            }
      }else{ //En caso de no ser numero
        console.log("No es numero");
        this.campos_con_error.push(" "+campo);
      }

    }else{ //Si cumplen las validaciones retorna el valor

      return valor;
    }
  }

}



//Funcion para validar coincidencia de valor de columna con catalogo
  getObjects(obj, key, val) {
    var objects = [];
    for (var i in obj) {
      if (!obj.hasOwnProperty(i)) continue;
      if (typeof obj[i] == 'object') {
        objects = objects.concat(this.getObjects(obj[i], key, val));

      } else
        //if key matches and value matches or if key matches and value is not passed (eliminating the case where key matches but passed value does not)
        if (i == key && obj[i] == val || i == key && val == '') { //
          objects.push(obj);
        } else if (obj[i] == val && key == '') {
          //only add if the object is not already in the array
          if (objects.lastIndexOf(obj) == -1) {
            objects.push(obj);
          }
        }
    }
    return objects;
  }

  onSubmit(){
    /*this.sendServ.sendData('http://www.calidadacademica.mx/fmbapp_qa/public/api/sendData',this.form.value)
      .subscribe(
        (res: any) => {
          if (res.status == 200) {
            //this.showDialog("Los datos se han guardado correctamente.");
            //this.resetForm();
          } else {
            //this.showDialog("Error al realizar el registro.");
            //this.resetForm();
          }
        }
      )*/
  }

  resetForm() {
    window.location.href = "/carga-sis";

    this.form.reset();

  }

  private showDialog(message: string){
        let dialogRef = this.dialog.open(DialogComponent, {
          height: '200px',
          width: '500px',
          data: {message: message}
        });
      }

      private showDialogOk(message: string) {
        let dialogRef = this.dialog.open(DialogComponent, {
            height: '180px',
            width: '500px',
            data: { message: message }
        });
        dialogRef.afterClosed().subscribe(result => {
            window.location.href = "/carga-sis";
        });
    }

}
