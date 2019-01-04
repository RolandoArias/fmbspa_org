import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { GeneralService } from '../services/general.service';
import { FormControl, FormGroup, FormBuilder, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import { MatDialog, MatSelect, MatDialogRef, MAT_DIALOG_DATA, NativeDateAdapter } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import 'rxjs/Rx';

import * as XLSX from 'xlsx';
import { Headers, Http, Response } from '@angular/http';
import { SendService } from '../providers/send.service';
import { PnnService } from '../providers/pnn.service';

import { LandingValidation } from '../validations/landing.validations';
import { LandingService } from '../services/landing.service';

import { Ciclo } from '../interfaces/ciclo';
import { Campus } from '../interfaces/campus';
import { Carrera } from '../interfaces/carrera';
import { EscuelaEmpresa } from '../interfaces/escuela-empresa';
import { Upload } from '../interfaces/upload';
import { SubsubTipo } from '../interfaces/subsub-tipo';
import { SubTipo } from '../interfaces/sub-tipo';
import { Nivel } from '../interfaces/nivel';

import { Interes } from '../interfaces/interes';
import { Modalidad } from '../interfaces/modalidad';

import { InteresService } from '../providers/interes.service';
import { ModalidadService } from '../providers/modalidad.service';
import { Injectable } from "@angular/core";
import { TipoActividadService } from '../providers/tipo-actividad.service';
import { SubsubtipoActividadService } from '../providers/subsubtipo-actividad.service';

import { CicloService } from '../providers/ciclo.service';
import { CampusService } from '../providers/campus.service';
import { CarreraService } from '../providers/carrera.service';
import { EscuelaEmpresaService } from '../providers/escuela-empresa.service';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';
import { DialogFormComponent } from '../dialog-form/dialog-form.component';

import { NivelService } from '../providers/nivel.service';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as $ from 'jquery';
import * as jquery from 'jquery';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
//import { timeout } from 'rxjs/operators';
//import { jQuery } from '@angular/jQuery';

//declare var jQuery: any;

@Component({
  selector: 'app-carga-base',
  templateUrl: './carga-base.component.html',
  styleUrls: ['./carga-base.component.scss']
})

@Injectable()
export class CargaBaseComponent implements OnInit {

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
  rowss_emp = [];

  campusTxt: any;
  nivelTxt: any;

  uploads: Upload[] = [];
  ciclos: Ciclo[] = [];
  campus: Campus[] = [];
  carreras: Carrera[] = [];
  escuelas_empresas: EscuelaEmpresa[] = [];
  escuelasempresas: EscuelaEmpresa[] = [];

  sub_tipos: SubTipo[] = [];
  subsub_tipos: SubsubTipo[] = [];
  niveles: Nivel[] = [];

  intereses: Interes[] = [];
  modalidades: Modalidad[] = [];

  campos_con_error = [];

  public url: string;

  constructor(private pnnServ: PnnService,
              private sendServ: SendService,
              public dialog: MatDialog,
              private cicloServ: CicloService,
              private campusServ: CampusService,
              private carreraServ: CarreraService,
              private escuelaEmpresaServ: EscuelaEmpresaService,
              private subSubServ: SubsubtipoActividadService,
              private interesServ: InteresService,
              private modalidadServ: ModalidadService,
              private nivelServ: NivelService,
              public http: HttpClient

              ) {
    this.fetch((data) => {
      this.rows = data;
    });
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

    this.fetchs_escuela_empresa((data) => {
      this.rowss_emp = data;
    });


    this.nivelServ.getAll2()
    .subscribe(
        (data: Nivel[]) => this.niveles = data
    )


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
 this.interesServ.getAll()
 .subscribe(
   (data: Interes[]) => this.intereses = data
 )

    // Se obtienen los ciclos
    this.cicloServ.getAll()
      .subscribe(
        (data: Ciclo[]) => this.ciclos = data
      )


    this.escuelaEmpresaServ.getAll()
      .subscribe(
        (data: EscuelaEmpresa[]) => this.escuelas_empresas = data
    )

    this.escuelaEmpresaServ.getAll()
      .subscribe(
        (data: EscuelaEmpresa[]) => this.escuelasempresas = data
    )

      // Se obtienes los Subtipos de actividades
    this.sub_tipos = this.subSubServ.getAllSubTipo();

    // Se obtienes los Subsubtipos de actividades
    this.subsub_tipos = this.subSubServ.getAllSubSubTipo();
  }

  previewImage(event){
    console.log(event.srcElement.files[0]);
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
    req.open('GET', `http://10.210.136.121/fmbapp_qa/public/api/campus_carreras`);
    req.onload = () => {
      cb(JSON.parse(req.response));
    };
    req.send();
  }

  fetchs_modalidad(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `http://10.210.136.121/fmbapp_qa/public/api/modalidad`);
    req.onload = () => {
      cb(JSON.parse(req.response));
    };
    req.send();
  }

  fetchs_nivel(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `http://10.210.136.121/fmbapp_qa/public/api/nivel_estudios`);
    req.onload = () => {
      cb(JSON.parse(req.response));
    };
    req.send();
  }

  fetchs_escuela_empresa(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `http://10.210.136.121/fmbapp_qa/public/api/escuela_empresa`);
    req.onload = () => {
      cb(JSON.parse(req.response));
    };
    req.send();
  }




  checkCols(workbook) //your workbook variable
  {
      var colValues =[];
      var first_sheet_name = workbook.SheetNames[0];
      //console.log("Hoja = " + first_sheet_name);
     // console.log("XLSX = " + XLSX.utils);
      var worksheet = workbook.Sheets[first_sheet_name];
      var cells = Object.keys(worksheet);

      for (var i = 0; i < Object.keys(cells).length; i++)
      {
        //console.log("workbook - cells[i] -> "+cells[i]);
        if( cells[i].indexOf('1') > -1) //Hace la lectura de las cabeceras de excel y las envia para su posterior validacion con las permitidas.
        {
        colValues.push(worksheet[cells[i]].v);

        }
      }

      let col = '["Apellido_Paterno","Apellido_Materno","Nombre","Sexo","Teléfono_Domicilio","Teléfono_Celular","Correo_Electronico","escuela_de_procedencia","sub_tipo","sub_sub_tipo","calidad","campus","carrera","ciclo","area_atención","fuente_obtención"]';
      let cols_true = ["Apellido_Paterno","Apellido_Materno","Nombre","Sexo","Teléfono_Domicilio","Teléfono_Celular","Correo_Electronico","escuela_de_procedencia","sub_tipo","sub_sub_tipo","calidad","campus","carrera","ciclo","area_atención","fuente_obtención"];

      let cColum = JSON.stringify(colValues);

      console.log("Las columnas del excel deben ser:");
      console.log(colValues[0]+", "+
                  colValues[1]+", "+
                  colValues[2]+", "+
                  colValues[3]+", "+
                  colValues[4]+", "+
                  colValues[5]+", "+
                  colValues[6]+", "+
                  colValues[7]+", "+
                  colValues[8]+", "+
                  colValues[9]+", "+
                  colValues[10]+", "+
                  colValues[11]+", "+
                  colValues[12]+", "+
                  colValues[13]+", "+
                  colValues[14]+", "+
                  colValues[15]
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


      if(cols_true[8] == colValues[8]){

      //    console.log( cols_true[8]+ " == " +colValues[8]+" " +cols_true[8]+ " es igual = true");
          error_cols = 0

      }else{

        error_cols = error_cols + 1;

      }


      if(cols_true[9] == colValues[9]){

      //    console.log( cols_true[9]+ " == " +colValues[9]+" " +cols_true[9]+ " es igual = true");
          error_cols = 0;

      }else{

        error_cols = error_cols + 1;

      }


      if(cols_true[10] == colValues[10]){

      //    console.log( cols_true[10]+ " == " +colValues[10]+" " +cols_true[10]+ " es igual = true");
          error_cols = 0;

      }else


      if(cols_true[11] == colValues[11]){

      //    console.log( cols_true[11]+ " == " +colValues[11]+" " +cols_true[11]+ " es igual = true");
          error_cols = 0;

      }else{

        error_cols = error_cols + 1;

      }


      if(cols_true[12] == colValues[12]){

      //    console.log( cols_true[12]+ " == " +colValues[12]+" " +cols_true[12]+ " es igual = true");
          error_cols = 0;

      }else{

        error_cols = error_cols + 1;

      }


      if(cols_true[13] == colValues[13]){

      //    console.log( cols_true[13]+ " == " +colValues[13]+" " +cols_true[13]+ " es igual = true");
          error_cols = 0;

      }else{

        error_cols = error_cols + 1;

      }


      if(cols_true[14] == colValues[14]){

      //    console.log( cols_true[14]+ " == " +colValues[14]+" " +cols_true[14]+ " es igual = true");
          error_cols = 0;

      }else{

        error_cols = error_cols + 1;

      }


      if(cols_true[15] == colValues[15]){

      //    console.log( cols_true[15]+ " == " +colValues[15]+" " +cols_true[15]+ " es igual = true");
          error_cols = 0;

        }else{

          error_cols = error_cols + 1;

        }



      if(error_cols == 0 ){

        return true;

      } else {

        return false;
      }






     /* if(col == cColum){ //compara si la pila de columnas es igual a la pila permitida, procede a ingreso
        return true;

      }else{
        return false;
      }*/
  }

  Upload() {
    // Obtener

     let x = 0;
     let count = 0;

        let tipo = this.Tipo.value;

        let fileReader = new FileReader();


          fileReader.onload = (e) => {

              this.arrayBuffer = fileReader.result;
              var data = new Uint8Array(this.arrayBuffer);
              var arr = new Array();
              for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
              var bstr = arr.join("");
              var workbook = XLSX.read(bstr, {type:"binary"});
              var first_sheet_name = workbook.SheetNames[0];
              var worksheet = workbook.Sheets[first_sheet_name];
              let filas = XLSX.utils.sheet_to_json(worksheet,{raw:true});
              let count =  Object.keys(filas).length;
              let numero_registros = Object.keys(filas).length;




              if(!this.checkCols(workbook)){ //Verifica la coincidencia de los cabezales de columna si estan igual, por lo contrario no se permiten
                  this.showDialog("Los titulos de la columna no coinciden");
                  this.newdata.filename ="";
                  this.Tipo.value="";
                  this.columDistin = false;
                  return;

              }else{
                  this.columDistin = true;
              }
                  let f = 6000;




                  filas.forEach((key:Upload) => {



                    var Nombre_del_archivo_de_carga = this.newdata.filename;
                    var ext_file = Nombre_del_archivo_de_carga.split('.');
                    var escuelaCampo =  key.escuela_de_procedencia;
                    var escuelaTM = this.getObjects(this.escuelas_empresas, 'escuelaID', key.escuela_de_procedencia);
                    var campusTM = this.getObjects(this.campus, 'crmi_name',  key.campus);
                    var cicloTM =  this.getObjects(this.ciclos, 'crmit_name', key.ciclo);
                    var subtipoTM = this.getObjects( this.sub_tipos,'crmit_subname',key.sub_tipo);

                    var subsubtipotTM = this.getObjects( this.subsub_tipos,'crmit_subsubname',key.sub_sub_tipo);
                    var keyCelular = this.getValidaCampo("Telefono Celular", key.Teléfono_Celular);
                    var keyTelefono = this.getValidaCampo("Telefono", key.Teléfono_Domicilio);
                    var skeyTelefono =  String(keyTelefono);
                    var skeyCelular =  String(keyCelular);
                    var predTel = skeyCelular.substring(0,2);
                    var TelefonoPredictivo = null;
                        TelefonoPredictivo = '9045'+skeyCelular;
                        if(predTel == '55'){
                          TelefonoPredictivo = '9044'+skeyCelular;
                        }

                    var TelefonoCasaPredictivo = null;
                    var predTel2 = skeyTelefono.substring(0,2);
                        TelefonoCasaPredictivo = '901'+skeyTelefono;
                        if(predTel2 == '55'){
                          TelefonoCasaPredictivo = '9'+skeyTelefono;
                        }

                    let Genero = this.getValidaCampo("Genero", key.Sexo);
                    if(Genero=='M'){Genero='Masculino'; }else{Genero='Femenino';}

                    let cicloCampo = "";
                    let GUIDCiclo = "";
                    let valor_ciclo = "";
                    let ciclo = "";


                    for (let i = 0; i < this.ciclos.length; i++) {
                      if (this.ciclos[i].crmit_name == key.ciclo) {
                       // console.log(this.ciclos[i].crmit_name +" == "+ key.ciclo);

                        cicloCampo = this.ciclos[i].crmit_name;
                        ciclo = this.ciclos[i].crmit_name;
                        if(this.ciclos[i].crmit_codigounico !== "undefined"){
                        GUIDCiclo = this.ciclos[i].crmit_codigounico;
                        }

                        valor_ciclo = this.ciclos[i].nombreventas;

                      }else if(cicloCampo == null){ cicloCampo = null;    console.log("Ciclo null: "+cicloCampo); }
                    }


                   cicloCampo = this.getValidaCampo("Ciclo", cicloCampo);
                    console.log(cicloCampo + " == " + key.ciclo);
                    if(cicloCampo != key.ciclo ){
                      this.showDialogOk("Error en el registro de "+key.Nombre+" "+key.Apellido_Paterno+" "+key.Apellido_Materno+", el ciclo es incorrecto.");

                    }else{
                      console.log("Ciclo Bien: "+cicloCampo);
                    }

                    var carreraCampo =  key.carrera;
                    if(carreraCampo!="0"){
                        console.log("carreraCampo!=0");

                      var carreraTM = this.getObjects(this.carreras, 'id',  key.carrera);


                      console.log("Registro: "+key.Nombre+" "+key.Apellido_Paterno+" "+key.Apellido_Materno);
                      if(carreraTM[0].codigounico != undefined){
                       var GUIDCarrera = carreraTM[0].codigounico;
                      }
                      var TCarrera=carreraTM[0].name;
                    }


                    var GUIDEscuelaEmpresa = GUIDEscuelaEmpresa_;
                    // var TEscuelaEmpresa=escuelaTM[0].Name;
                    var GUIDCalidad=GUIDCalidadid_;

                    var campusCampo =  this.getValidaCampo("Campus",  key.campus);

                    if(campusCampo!="0"){
                      var GUIDCampus = campusTM[0].crmit_tb_campusid;
                      var campus = campusTM[0].crmi_name;
                    }



                   var GUIDSubTipo = "";
                   var GUIDSubSubTipo = "";




                  /* var subtipoCampo = this.getValidaCampo("SubTipo", key.sub_tipo);
                    if(subtipoCampo!="0"){
                       GUIDSubTipo = subsubtipotTM[0].crmit_subtipoactividadid;
                    }




                    var subsubtipoCampo = this.getValidaCampo("SubsubTipo", key.sub_sub_tipo);
                    if(subsubtipoCampo!="0"){
                      GUIDSubSubTipo = subtipoTM[0].crmit_subname;
                    }*/




                    for(var i=0 ; i < this.sub_tipos.length ; i++ ){

                      console.log("-- "+this.sub_tipos[i].crmit_subname);

                      if( key.sub_tipo == this.sub_tipos[i].crmit_subname ){
                        console.log(key.sub_tipo+" = "+this.sub_tipos[i].crmit_subname);
                        console.log("-- this.subsub_tipos[0].crmit_subtipoactividadid = "+this.sub_tipos[i].crmit_subtipoactividadid);

                        GUIDSubTipo = this.sub_tipos[i].crmit_subtipoactividadid;
                      }
                    }

                    for(var i=0 ; i < this.subsub_tipos.length ; i++ ){

                      if( key.sub_sub_tipo == this.subsub_tipos[i].crmit_subsubname ){
                        console.log(key.sub_sub_tipo+" = "+this.subsub_tipos[i].crmit_subsubname);
                        console.log("-- this.subsub_tipos[0].crmit_codigounico = "+this.subsub_tipos[i].crmit_codigounico);
                        GUIDSubSubTipo = this.subsub_tipos[i].crmit_codigounico;
                      }
                    }





                    var u = localStorage.getItem('user');
                    var data = JSON.parse(u);
                    var nom_usu = data.fullname;

                    /* obtener nivel y modalidad */
                    var NivelInteres = "";
                    var GUIDNivelInteres = "";

                    var Modalidad = "";
                    var GUIDModalidad = "";

                    let GUIDAreaInteres = "";


                    for (let i = 0; i < this.rowss.length; i++) {
                        if (this.rowss[i].campusId == GUIDCampus && this.rowss[i].carreraId == GUIDCarrera) {
                          GUIDModalidad = this.rowss[i].modalidadId;
                          GUIDNivelInteres = this.rowss[i].nivelId;
                        }
                    }

                    for (let i = 0; i < this.rowss_mod.length; i++) {
                      if(this.rowss_mod[i].crmit_codigounico !== undefined){
                        if (this.rowss_mod[i].crmit_codigounico == GUIDModalidad) {
                          Modalidad = this.rowss_mod[i].crmit_name;
                        }
                      }
                    }


                    for (let i = 0; i < this.rowss_niv.length; i++) {
                      if(this.rowss_niv[i].crmit_codigounico !== undefined){
                       if (this.rowss_niv[i].crmit_codigounico == GUIDNivelInteres) {
                         NivelInteres = this.rowss_niv[i].crmit_name;
                       }
                      }
                    }


                    for(let i=0 ; i < this.intereses.length ; i++ ){
                      if(this.intereses[i].area_interes == key.area_atención){
                        GUIDAreaInteres = this.intereses[i].id ;
                      }
                    }

                    var EscuelaEmpresa_ = "";
                    var GUIDEscuelaEmpresa_ = "";
                    var GUIDCalidadid_ = "";

                   // console.log("");console.log("");console.log("");

                    for (let i = 0; i < this.rowss_emp.length; i++) {
                     // console.log(this.rowss_emp[i].escuelaID +"=="+ key.escuela_de_procedencia);
                      if (this.rowss_emp[i].escuelaID == key.escuela_de_procedencia) {

                        EscuelaEmpresa_ = this.rowss_emp[i].Name;
                        //console.log("EscuelaEmpresa_ : "+EscuelaEmpresa_);
                        GUIDEscuelaEmpresa_ = this.rowss_emp[i].crmit_empresaescuela;
                            //console.log("GUIDEscuelaEmpresa_ : "+GUIDEscuelaEmpresa_);
                        GUIDCalidadid_ = this.rowss_emp[i].crmit_calidadid;
                        //console.log("GUIDCalidadid_ :"+GUIDCalidadid_);
                      }
                    }

                    let Team = "";
                    let Prioridad = 0;
                    let Attemp = "";

                    for (let i = 0; i < this.rows.length; i++) {

                      if (this.rows[i].CAMPUS == campus && this.rows[i].BL == NivelInteres && this.rows[i].CICLO == valor_ciclo) {

                        Team = this.rows[i].TEAM;
                        Prioridad = parseInt(this.rows[i].PRIORIDAD);
                        Attemp = this.rows[i].ATTEMP;
                      }
                    }

                    var GUIDUsuario = localStorage.getItem('UserId');
                    var u = localStorage.getItem('user');
                    var data = JSON.parse(u);
                    var nom_usu = data.fullname;
                    var guidcalidad  =  GUIDCalidadid_;
                    var fuente_obtecionCampo = this.getValidaCampo("Fuente Obtención", key.fuente_obtención);



                    let abreviatura_campus : any;
                    let abreviatura_nivel : any;
                    let abreviatura_calidad : any;

                  for(var i = 0 ; i < this.campus.length ; i++){
                    if(key.campus == this.campus[i].crmi_name){
                      abreviatura_campus = this.campus[i].abreviatura;
                    }
                  }

                  for(var i = 0 ; i < this.niveles.length ; i++){
                    if(NivelInteres == this.niveles[i].crmit_name){
                      abreviatura_nivel = this.niveles[i].abreviatura;
                    }
                  }

                  for(var i = 0 ; i < this.escuelasempresas.length ; i++){
                     // if(GUIDCalidadid_ == this.escuelasempresas.crmit_calidadid ){
                       // abreviatura_calidad = this.escuelasempresas.crmit_calidadidname;
                      //}
                  }

                  abreviatura_calidad = 'B';


                  var l_seg = "";

                  l_seg = ciclo+"_BDEXT_"+abreviatura_campus+"_"+abreviatura_nivel+"_"+abreviatura_calidad;


                 let obj_seguimiento = {};

                  obj_seguimiento = {
                    Lista_seg: l_seg ,
                    GUIDCampus: (GUIDCampus == '')?'2d3bdab0-5c72-e211-a4c9-6cae8b2a0430':GUIDCampus
                  };



                    var obj2 = {
                      "Usuario": ( nom_usu =='')? null : this.getValidaCampo("Usuario", nom_usu),
                      "GUIDUsuario": ( GUIDUsuario =='')? null : GUIDUsuario,
                      "Banner":"https://app.devmx.com.mx/carga-base",
                      "FuenteObtencion": ( this.getValidaCampo("FuenteObtencion", "BD EXTERNA") =='')? null : this.getValidaCampo("FuenteObtencion", "BD EXTERNA"),
                      "GUIDFuentedeObtencion":"2689dd13-6072-e211-b35f-6cae8b2a4ddc",
                      "FuenteNegocio": ( this.Tipo.value  =='')? null :this.Tipo.value,
                      "Attemp":  ( Attemp == '')? null : Attemp,
                      "Prioridad": ( Prioridad == 0)? null : Prioridad,
                      "Team": ( Team =='')? null : Team,
                      "ApellidoMaterno": ( this.getValidaCampo("ApellidoMaterno", key.Apellido_Materno) =='')? null : this.getValidaCampo("ApellidoMaterno", key.Apellido_Materno),
                      "ApellidoPaterno": ( this.getValidaCampo("ApellidoPaterno", key.Apellido_Paterno) =='')? null : this.getValidaCampo("ApellidoPaterno", key.Apellido_Paterno),
                      "Genero": ( Genero =='')? null : Genero,
                      "Calidad": ( this.getValidaCampo("Calidad", key.calidad) =='')? null : this.getValidaCampo("Calidad", key.calidad),
                      "GUIDCalidad": ( guidcalidad =='')? null : guidcalidad,
                      "Telefono": ( skeyCelular =='')? null : skeyCelular,
                      "TelefonoPredictivo": ( TelefonoPredictivo =='')? null : TelefonoPredictivo,
                      "TelefonoCasa": ( skeyTelefono =='')? null : skeyTelefono,
                      "TelefonoCasaPredictivo": ( TelefonoCasaPredictivo =='')? null : TelefonoCasaPredictivo,
                      "AreaInteres": ( this.getValidaCampo("AreaInteres", key.area_atención) =='')? null : this.getValidaCampo("AreaInteres", key.area_atención),
                      "GUIDAreaInteres": ( GUIDAreaInteres =='')? null : GUIDAreaInteres,
                      "Campus":  ( key.campus =='')? null : key.campus,
                      "CorreoElectronico": ( this.getValidaCampo("CorreoElectronico", key.Correo_Electronico) =='')? null : this.getValidaCampo("CorreoElectronico", key.Correo_Electronico),
                      "GUIDCampus": ( GUIDCampus =='')? null : GUIDCampus,
                      "Carrera": ( this.getValidaCampo("Carrera",TCarrera) =='')? null : this.getValidaCampo("Carrera",TCarrera),
                      "GUIDCarrera": ( GUIDCarrera =='')? null :GUIDCarrera,
                      "Ciclo": ( ciclo =='')? null : ciclo,
                      "GUIDCiclo": ( GUIDCiclo =='')? null : GUIDCiclo,
                      "EscuelaEmpresa": ( EscuelaEmpresa_ =='')? null : EscuelaEmpresa_,
                      "GUIDEscuelaEmpresa": ( this.getValidaCampo("Escuela",GUIDEscuelaEmpresa_) =='')? null : this.getValidaCampo("Escuela",GUIDEscuelaEmpresa_),
                      "SubSubTipo": ( key.sub_sub_tipo =='')? null : key.sub_sub_tipo,
                      "GUIDSubSubTipo": ( GUIDSubSubTipo =='')? null : GUIDSubSubTipo,
                      "SubTipo": ( key.sub_tipo =='')? null : key.sub_tipo,
                      "GUIDSubTipo": ( GUIDSubTipo =='')? null : GUIDSubTipo,
                      "Nivel": ( NivelInteres =='')? null : NivelInteres,
                      "GUIDNivelInteres": ( GUIDNivelInteres =='')? null : GUIDNivelInteres,
                      "Modalidad": ( Modalidad =='')? null : Modalidad,
                      "GUIDModalidad": ( GUIDModalidad =='')? null : GUIDModalidad,
                      "Nombredelarchivodecarga": ( Nombre_del_archivo_de_carga =='')? null : Nombre_del_archivo_de_carga,
                      "TipodeAcción": "CREAR",
                      "TipodeProceso": "PRIMER INGRESO",
                      "Razónparaelestado":"PROCESADO",
                      "FechayHorainicioCarga":new Date(),
                      "Estado":"Activo",
                      "ModificadoPor": ( nom_usu =='')? null : nom_usu,
                      "Lista_seg": (l_seg == '')? '' : l_seg,


                    };

                    delete key.Sexo;
                    delete key.Teléfono_Celular;
                    delete key.Teléfono_Domicilio;
                    delete key.area_atención;
                    delete key.sub_sub_tipo;
                    delete key.sub_tipo;
                    delete key.campus;
                    delete key.carrera;
                    delete key.ciclo;
                    delete key.calidad;
                    delete key.escuela_de_procedencia;
                    delete key.fuente_obtención;
                    delete key.Apellido_Materno;
                    delete key.Apellido_Paterno;
                    delete key.Correo_Electronico;




                    let datos = Object.assign(key, obj2);
                    let Archivo = Nombre_del_archivo_de_carga;


                    if( this.campos_con_error.length != 0 ){ //Verifica si hay errores

                      let datos_mal = Object.assign(key, obj2);

                       console.log("Bloquea Send");

                       console.log("Campos con error = "+this.campos_con_error);
                       this.showDialog("Hay datos incompletos o incorrectos en las columnas: "+this.campos_con_error+" .");

                       this.campos_con_error.splice(0);
                       console.log("Total de Errores:"+this.campos_con_error.length);

                       $.ajax({
                        type: "Post",
                        url: "/assets/log_carga_base.php",
                        data: {evento:"Campos con error.", data:datos_mal },
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




                    }else{ //Si no hay errores entra a envio



                                 //let datos = Object.assign(key, obj2);


                                  console.log("datos de : "+datos.Nombre);
                                  console.log("Inserta Send");

                                  console.log("");console.log("");console.log("");
                             /*     console.log("---------------------------------------------------");
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
                                  console.log("");console.log("");console.log("");*/

                    //Envio de datos




                    var valor = count;
                    var ceros = 0;
                      if(count > 12){
                        ceros = 10000;
                      }else{
                        ceros = 1000;
                      }


                      var timer = valor*ceros;

                      console.log("Timer: "+timer);

//                       this.sendServ.sendDataPromotor_CargaBase(datos).timeout(10000)






this.sendServ.sendListadeSeguimiento(obj_seguimiento)
.subscribe(
        (ress: any) => {
            console.log(ress.status);
            if (ress.status == 200) {
                console.log("7924: Los datos se han envido correctamente.");




                       this.sendServ.sendAllDev_cargabase(datos)
                          .subscribe(

                          (res: any) => {

                            //this.sleep(8000);
                              console.log("Se envio peticion");
                              console.log("res");
                              console.log(res);
                              if (res.status == 200) {

                                  //Envia Log

                                $.ajax({
                                  type: "Post",
                                  url: "/assets/log_carga_base.php",
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

                                x = x + 1;





                                if (count == x) {

                                  console.log(count +" == "+ x);

                                  this.showDialogOk("Los datos se han guardado correctamente.");
                                  this.newdata.filename = "";
                                  this.Tipo.value = "";
                                }
                              } else {

                                //Envia Log

                                $.ajax({
                                  type: "Post",
                                  url: "/assets/log_carga_base.php",
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

                                x = x - 1;
                                this.showDialog("Error al guardar el registro");
                              }
                          },
                            error => {
                              if (error.status === 400) {
                                console.warn(error._body);
                                this.showDialog("Error al guardar el registro");
                                x--;
                                //console.log("x-- Error x = "+x);



                                //Envio Log
                                $.ajax({
                                  type: "Post",
                                  url: "/assets/log_carga_base.php",
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


                              }
                              else if (error.status === 500) {
                                console.warn(error._body);



                                //Envia Log

                                $.ajax({
                                  type: "Post",
                                  url: "/assets/log_carga_base.php",
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

                              }else{
                                console.warn(error._body);



                                //Envia Log

                                $.ajax({
                                  type: "Post",
                                  url: "/assets/log_carga_base.php",
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
                              }
                          }

                        );



                      } else {
                        console.log("7924: Error al enviar el registro.");
                    }
                }
          )








                        //Termina sendServ




                    }//Termina validacion de campos vacios



                  }); //termina foreach Upload

          }

          // fileReader.readAsArrayBuffer(this.imgFileInput.nativeElement.files[0]);

            fileReader.readAsArrayBuffer(this.imgFileInput.nativeElement.files[0]);





  }






  onSubmit(){
      console.log(this.form.value)
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
            window.location.href = "/carga-base";
        });
    }
  //return an array of objects according to key, value, or key and value matching



//Funcion Sleep

sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

duerme_transaccion() {
  console.log('Descansando envio...');
  this.sleep(4000);
  console.log('4 segundos ');
}



//Funcion para validar campos
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

        }else if(campo == "Campus"){ //Valida Campus
          console.log("Validacion de campus");
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
          if(valor.length < 1 || valor.length == 0 || valor.length == undefined || valor.length == '0' || valor.length == null ){
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
        if(valor.length < 1 || valor.length == 0 || valor.length == undefined || valor.length == '0' || valor.length == null ){
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

 getObjects(obj, key, val) {
  var objects = [];
  for (var i in obj) {
    if (!obj.hasOwnProperty(i)) continue;
    if (typeof obj[i] == 'object') {
      objects = objects.concat(this.getObjects(obj[i], key, val));
    } else

      //console.log("- " + key + " : " + val);

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

//return an array of values that match on a certain key
 getValues(obj, key) {
  var objects = [];
  for (var i in obj) {
    if (!obj.hasOwnProperty(i)) continue;
    if (typeof obj[i] == 'object') {
      objects = objects.concat(this.getValues(obj[i], key));
    } else if (i == key) {
      objects.push(obj[i]);
    }
  }
  return objects;
}

//return an array of keys that match on a certain value
 getKeys(obj, val) {
  var objects = [];
  for (var i in obj) {
    if (!obj.hasOwnProperty(i)) continue;
    if (typeof obj[i] == 'object') {
      objects = objects.concat(this.getKeys(obj[i], val));

    } else if (obj[i] == val) {
      objects.push(i);
    }
  }
  return objects;
}

}

