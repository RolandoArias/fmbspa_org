import { AppConfig } from '../services/constants';
import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { GeneralService } from '../services/general.service';
import { FormControl, FormGroup, FormBuilder, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';

import { MatDialog, MatSelect, MatDialogRef, MAT_DIALOG_DATA, NativeDateAdapter, _MatButtonToggleGroupMixinBase } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { DialogFormComponent } from '../dialog-form/dialog-form.component';

import 'rxjs/Rx';

import * as $ from 'jquery';

import { LandingValidation } from '../validations/landing.validations';
import { LandingService } from '../services/landing.service';

import { Csq } from '../interfaces/csq';
import { Hora } from '../interfaces/hora';
import { Nivel } from '../interfaces/nivel';
import { Canal } from '../interfaces/canal';
import { Ciclo } from '../interfaces/ciclo';
import { Campus } from '../interfaces/campus';
import { Genero } from '../interfaces/genero';
import { Asesor } from '../interfaces/asesor';
import { AsesorGrupal } from '../interfaces/asesor-grupal';
import { Carrera } from '../interfaces/carrera';
import { Interes } from '../interfaces/interes';
import { Modalidad } from '../interfaces/modalidad';
import { Parentesco } from '../interfaces/parentesco';
import { CampusCita } from '../interfaces/campus-cita';
import { Tipificacion } from '../interfaces/tipificacion';
import { TipoActividad } from '../interfaces/tipo-actividad';
import { Turno } from '../interfaces/turno';
import { FuenteObtencion } from '../interfaces/fuenteobtencion';


import { PnnService } from '../providers/pnn.service';
import { CsqService } from '../providers/csq.service';
import { SendService } from '../providers/send.service';
import { HoraService } from '../providers/hora.service';
import { CanalService } from '../providers/canal.service';
import { CicloService } from '../providers/ciclo.service';
import { TurnoService } from '../providers/turno.service';
import { FormatService } from '../providers/format.service';
import { CampusService } from '../providers/campus.service';
import { AsesorService } from '../providers/asesor.service';
import { AsesorGrupalService } from '../providers/asesor-grupal.service';
import { GeneroService } from '../providers/genero.service';
import { CarreraService } from '../providers/carrera.service';
import { InteresService } from '../providers/interes.service';
import { ModalidadService } from '../providers/modalidad.service';
import { ParentescoService } from '../providers/parentesco.service';
import { CampusCitaService } from '../providers/campus-cita.service';
import { TipificacionService } from '../providers/tipificacion.service';
import { TipoActividadService } from '../providers/tipo-actividad.service';
import { CampusCarreraService } from '../providers/campus-carrera.service';
import { FuenteObtencionService } from '../providers/fuenteobtencion.service';
import { NivelService } from '../providers/nivel.service';

import { Subysubsubtipo2 } from '../interfaces/subysubsubtipo2';
import { Subysubsubtipo2Service } from '../providers/subysubsubtipo2.service';


@Component({
  selector: 'app-nuevo-solivno',
  templateUrl: './nuevo-solovino.component.html',
  styleUrls: ['./nuevo-solovino.component.scss']
})

export class NuevoRegistroSolovinoComponent implements OnInit {
  form: FormGroup;
  sinEmail=false;
  conEmail = true;


  //maxDate = new Date(2018, this.month.getMonth(),12);
  maxDate = LandingValidation.fechaLimite();
  startDate = LandingValidation.fechaInicio();

  ejecutivo: FormControl;
  actvidadNoTradicional: FormControl;
  subTipoActividad: FormControl;
  company: FormControl;
  SubSubTipoActividad: FormControl;
  turno: FormControl;
  school: FormControl;
  Calidad: FormControl;

  Usuario: FormControl;
  Canal: FormControl;
  CSQ: FormControl;
  TelefonoCorreo: FormControl;
  Interesa_NoInteresa: FormControl;

  Nombre: FormControl;
  ApellidoPaterno: FormControl;
  ApellidoMaterno: FormControl;
  CorreoElectronico: FormControl;
  NumeroCelular: FormControl;
  Telefono: FormControl;
  Genero: FormControl;
  FechaNacimiento: FormControl;
  Edad: FormControl;

  NombreTutor: FormControl;
  ApellidoPaternoTutor: FormControl;
  ApellidoMaternoTutor: FormControl;
  CorreoElectronicoTutor: FormControl;
  NumeroCelularTutor: FormControl;
  TelefonoTutor: FormControl;
  ParentescoTutor: FormControl;

  Campus: FormControl;
  AreaInteres: FormControl;
  Nivel: FormControl;
  Modalidad: FormControl;
  Carrera: FormControl;
  Ciclo: FormControl;
  Tipificacion: FormControl;
  Notas: FormControl;
  SinCorreo: FormControl;

  CampusCitas: FormControl;
//    FechaCita: FormControl;
  HoraCita: FormControl;
  Programacion: FormControl;
  Transferencia: FormControl;
  Asesor: FormControl;

  csqs: Csq[] = [];
  horas: Hora[] = [];
  ciclos: Ciclo[] = [];
  niveles: Nivel[] = [];
  canales: Canal[] = [];
  campus: Campus[] = [];
  generos: Genero[] = [];
  asesores: Asesor[] = [];
  asesorGrupal: AsesorGrupal[] = [];
  carreras: Carrera[] = [];
  intereses: Interes[] = [];
  modalidades: Modalidad[] = [];
  campus_citas: CampusCita[] = [];
  parentescos: Parentesco[] = [];
  tipificaciones: Tipificacion[] = [];
  tipo_actividades: TipoActividad[] = [];
  turnos: Turno[] = [];
  fuentesobtencion: FuenteObtencion[] = [];
  rows = [];
  campos_con_error = [];
  subysubsubtipos2: Subysubsubtipo2[] = [];

  etapaprocesoventaid :any;
  campusTxt: any;
  nivelTxt: any;

  constructor(private landingService: LandingService,
    private subysubsubtipo2Serv: Subysubsubtipo2Service,
      private gralService: GeneralService,
      public dialog: MatDialog,
      private renderer: Renderer2,
      private pnnServ: PnnService,
      private csqServ: CsqService,
      private horaServ: HoraService,
      private sendServ: SendService,
      private cicloServ: CicloService,
      private turnoServ: TurnoService,
      private canalServ: CanalService,
      private campusServ: CampusService,
      private asesorServ: AsesorService,
      private asesorGrupalServ: AsesorGrupalService,
      private formatServ: FormatService,
      private generoServ: GeneroService,
      private carreraServ: CarreraService,
      private interesServ: InteresService,
      private modalidadServ: ModalidadService,
      private parentescoServ: ParentescoService,
      private tipoActServ: TipoActividadService,
      private campusCitaServ: CampusCitaService,
      private tipicicacionServ: TipificacionService,
      private campusCarreraServ: CampusCarreraService,
      private fuenteobtencionServ: FuenteObtencionService, private appConfig: AppConfig, private nivelServ: NivelService) {
    this.fetch((data) => {
      this.rows = data;
    });
  }


  ngOnInit() {
      localStorage.setItem('bandera','');
      this.landingService.getInit();


  // Se obtienen todos los subysubsubtipos2
  this.subysubsubtipo2Serv.getAll()
    .subscribe(
      (data: Subysubsubtipo2[]) => this.subysubsubtipos2 = data
    )


      // Se obtiene todos los canales
      this.nivelServ.getAll2()
          .subscribe(
              (data: Nivel[]) => this.niveles = data
          )


      // Se obtiene los tipos de actividades
      this.tipoActServ.getAll()
          .subscribe(
              (data: TipoActividad[]) => this.tipo_actividades = data
          )
      // Se obtienen los turnos
      this.turnoServ.getAll()
          .subscribe(
              (data: Turno[]) => this.turnos = data
          )

      // Se obtiene todos los canales
      this.canalServ.getAll()
          .subscribe(
              (data: Canal[]) => this.canales = data
          )
      // Se obtienen todos los intereses
      this.interesServ.getAll()
          .subscribe(
              (data: Interes[]) => this.intereses = data
          )
      // Se obtienen todos los generos
      this.generoServ.getAll()
          .subscribe(
              (data: Genero[]) => this.generos = data
          )
      // Se obtienen todos los parentescos
      this.parentescoServ.getAll()
          .subscribe(
              (data: Parentesco[]) => this.parentescos = data
          )
      // Se obtienen todos los campus
      this.campusServ.getAll2()
          .subscribe(
              (data: Campus[]) => this.campus = data
          )
      // Se obtienen los ciclos
      this.cicloServ.getAll2()
          .subscribe(
              (data: Ciclo[]) => this.ciclos = data
          )
      // Se obtienen todos los intereses
      this.interesServ.getAll()
          .subscribe(
              (data: Interes[]) => this.intereses = data
          )
      // Se obtienen todas las tipificaciones
      this.tipicicacionServ.getAll()
          .subscribe(
              (data: Tipificacion[]) => this.tipificaciones = data
          )
      // Se obtienen todos los campus-cita
      this.campusCitaServ.getAll()
          .subscribe(
              (data: CampusCita[]) => this.campus_citas = data
          )
      // Se obtienen todas las hora para asignar una cita
      this.horaServ.getAll()
          .subscribe(
              (data: Hora[]) => this.horas = data
          )
      // Se obtienen todos lo asesores
      this.asesorServ.getAll()
          .subscribe(
              (data: Asesor[]) => this.asesores = data
          )

      //Se obtiene todos los fuente obtencion
      this.fuenteobtencionServ.getAll()
      .subscribe(
      (data: FuenteObtencion[]) => this.fuentesobtencion = data
      )

      this.formInit();
  }

fetch(cb) {
  const req = new XMLHttpRequest();
  req.open('GET', `assets/solovinos.json`);
  req.onload = () => {
    cb(JSON.parse(req.response));
  };
  req.send();
}

  formInit() {

      let userLocal = localStorage.getItem('user');
      let datos = JSON.parse(userLocal);

      this.form = new FormGroup({

          Usuario: new FormControl({ value: datos.fullname, disabled: false }),
          SinCorreo: new FormControl(''),

          Nombre: new FormControl('', [LandingValidation.palabraMalaValidator()]),
          ApellidoPaterno: new FormControl('', [LandingValidation.palabraMalaValidator()]),
          ApellidoMaterno: new FormControl('', [LandingValidation.palabraMalaValidator()]),
          CorreoElectronico: new FormControl('', [ LandingValidation.emailMaloValidator()]),
          NumeroCelular: new FormControl('', [Validators.minLength(10), LandingValidation.aceptNumberValidator(), LandingValidation.numberConValidator()]),
          Telefono: new FormControl('', [ Validators.minLength(10), LandingValidation.aceptNumberValidator(), LandingValidation.numberConValidator()]),
          Genero: new FormControl(''),
          FechaNacimiento: new FormControl(''),
          Edad: new FormControl('', [Validators.minLength(2), LandingValidation.edadMinValidator()]),

          NombreTutor: new FormControl(''),
          ApellidoPaternoTutor: new FormControl(''),
          ApellidoMaternoTutor: new FormControl(''),
          CorreoElectronicoTutor: new FormControl(''),
          NumeroCelularTutor: new FormControl(''),
          TelefonoTutor: new FormControl(''),
          ParentescoTutor: new FormControl(''),

          Campus: new FormControl(''),
          AreaInteres: new FormControl(''),
          Nivel: new FormControl({ value: '', disabled: true }),
          Modalidad: new FormControl({ value: '', disabled: true }),
          Carrera: new FormControl({ value: '', disabled: true }),
          Ciclo: new FormControl(''),
      });
  }

  onSubmit() {


      let form = this.form;
      let pnnServ = this.pnnServ;



      $('form').find(':input').each(function(){
          if($(this).hasClass('validPhoneNumber')){
              let name = $(this).attr('formControlName');
              if(form.controls[name].value != '' && form.controls[name].value != null){

                  if(!pnnServ.checkPnnIsValid(form.controls[name].value)){
                      form.controls[name].setErrors({'numInvalid': true});
                  }else{
                      form.controls[name].setErrors({'numInvalid': false});
                      form.controls[name].updateValueAndValidity();
                  }
              }else{
                  form.controls[name].setErrors({'numInvalid': false});
                  form.controls[name].reset();
              }
          }
      })

      this.onKeyFechaNacimiento();

      if (this.sinEmail) {
          this.form.controls.CorreoElectronico.clearValidators();
      }else{
          if (this.form.controls['CorreoElectronico'].value != "") {
             // this.form.controls.Telefono.clearValidators();
              this.form.controls.Telefono.setValidators([Validators.minLength(10), LandingValidation.aceptNumberValidator(), LandingValidation.numberConValidator()]);
              //this.form.controls.Telefono.updateValueAndValidity();
          } else {
              let tel = this.form.controls['Telefono'].value;
              if (tel) {
                  this.form.controls['CorreoElectronico'].reset({ value: tel + '@unitec.edu.mx', disabled: false });
                  this.form.controls.CorreoElectronico.clearValidators();
                  this.form.controls.CorreoElectronico.updateValueAndValidity();
                  this.conEmail = false;
              }
          }
      }


      if (this.form.valid) {
          if (this.sinEmail) {
              let tel = this.form.controls['Telefono'].value;
              this.form.controls['CorreoElectronico'].reset({ value: tel + '@unitec.edu.mx', disabled: false });
              this.conEmail = false;
          }

        // -------------------------------- Predictivo  ----------------------------------

        let tel_casa_predictivo = "";
        if(this.form.value.Telefono == "" || this.form.value.Telefono == null ){

            this.form.value.Telefono = '';
        }

         const predTel = this.form.value.Telefono.substring(0,2);


        if(predTel == 55){
          this.form.value.TelefonoPredictivo = '9'+this.form.value.Telefono;
          tel_casa_predictivo = "9"+this.form.value.Telefono;
         } else {
          this.form.value.TelefonoPredictivo = '901'+this.form.value.Telefono;
          tel_casa_predictivo = '901'+this.form.value.Telefono;
        }


        if (this.form.value.NumeroCelular){
            const predCel = this.form.value.NumeroCelular.substring(0, 2);
            if (predCel == 55) {
                this.form.value.TelefonoCelularPredictivo = '9044' + this.form.value.NumeroCelular;
            } else {
              this.form.value.TelefonoCelularPredictivo = '9045' + this.form.value.NumeroCelular;

            }
        }


        if (this.form.value.NumeroCelularTutor) {
            const predCelTutor = this.form.value.NumeroCelularTutor.substring(0, 2);
            if (predCelTutor == 55) {
                this.form.value.TelefonoCelularPredictivoTutor = '9044' + this.form.value.NumeroCelularTutor;
            }else{
                this.form.value.TelefonoCelularPredictivoTutor = '9045' + this.form.value.NumeroCelularTutor;

            }

        }

        if (this.form.value.TelefonoTutor) {
            const predTelTutor = this.form.value.TelefonoTutor.substring(0, 2);

            if (predTelTutor == 55) {
                this.form.value.TelefonoPredictivoTutor = '9' + this.form.value.TelefonoTutor;
            }else{
                this.form.value.TelefonoPredictivoTutor = '901' + this.form.value.TelefonoTutor;

            }
        }


          this.form.value.Banner = window.location.href;
          this.form.value.FuenteObtencion = "";

          let _Ciclo = (this.form.value.Ciclo == null) ? "" : this.form.value.Ciclo;
          let CicloV = _Ciclo.split('*');
          let ciclo = "";
          let nombre_ventas = "";

          //console.log("Ciclo del form: " + CicloV);
          //console.log(" " );
          //console.log(" " );console.log(" " );
          //console.log(" " );console.log(" " );
          //En caso de ser 18-3, esos son los resultados y ubicacion de var
          //console.log('CicloV[0] : '+CicloV[0]); //id
          //console.log('CicloV[1] : '+CicloV[1]); //18-3
          //console.log('CicloV[2] : '+CicloV[2]); //true
          //console.log('CicloV[3] : '+CicloV[3]); //Mayo
          //console.log('CicloV[4] : '+CicloV[4]); //C2

          let f_negocio = "";


          let main_carrera = this.form.value.Carrera.split("*");

          for (let i = 0; i < this.carreras.length; i++) {

            if(this.carreras[i].BL == main_carrera[2] && this.carreras[i].codigounico == main_carrera[0]){

            console.log("");console.log("");console.log("");console.log("");
            console.log("codigo unico de carrera:"+this.carreras[i].codigounico);
            console.log("Nombre de carrera:"+this.carreras[i].name);
            console.log("BL de Carrera:"+this.carreras[i].BL);
            console.log("");console.log("");console.log("");console.log("");


                /**Re calcula el team prioridad y attemp con respecto a la universidad**/

                for (let j = 0; j < this.rows.length; j++) {

                    nombre_ventas = (CicloV[4] == "") ? "" : CicloV[4];

                    //if (this.rows[i].CAMPUS == this.campusTxt && this.rows[i].BL == this.nivelTxt && this.rows[i].CICLO == nombre_ventas) {
                    if (this.rows[j].FUENTE_NEGOCIO == "SOLOVINOS" && this.rows[j].CICLO == nombre_ventas && this.rows[j].CAMPUS == this.campusTxt && this.rows[j].BL == this.carreras[i].BL ) {

                        this.form.value.Team = this.rows[j].TEAM;
                        console.log("TEAM : " + this.form.value.Team);
                        this.form.value.Prioridad = this.rows[j].PRIORIDAD;
                        console.log("Prioridad : " + this.form.value.Prioridad);
                        this.form.value.Attemp = this.rows[j].ATTEMP;
                        console.log("ATTEMP : " + this.form.value.Attemp);
                        this.form.value.FuenteObtencion = this.rows[j].FUENTE_NEGOCIO;
                        console.log("Fuente Obtencion : " + this.form.value.FuenteObtencion);
                        f_negocio = this.rows[i].FUENTE_NEGOCIO;


                    }

                }

                /**TErmina calculo de team prioridad y attemp con respecto a la universidad**/
            }

        }

          ciclo = CicloV[1];


               /***********Fuente Obtencion Begin***********/

    let f_o = "";
    let fuente_obtencion_nombre = "";
    let fuente_obtencion_GUID = "";

    f_o = this.form.value.FuenteObtencion;
    //console.log("this.form.value.FuenteObtencion = "+f_o);
    if(f_o == "" || f_o == null){
      fuente_obtencion_nombre = "SOLOVINOS";
    }else{
      this.form.value.FuenteObtencion = "SOLOVINOS";
      fuente_obtencion_nombre = "SOLOVINOS";
    }


    let fo = "";

    for(let i = 0 ; i <= this.fuentesobtencion.length ; i++ ){

      if(this.fuentesobtencion[i] !== undefined){
        if( this.fuentesobtencion[i].fuente_name == fuente_obtencion_nombre) {

          fuente_obtencion_GUID = this.fuentesobtencion[i].fuente_GUID;

            }
      }

    }
        console.log("___________________________________________");
        console.log(""); console.log(""); console.log("");
        console.log("Fuentes obtencion: " + fuente_obtencion_nombre);
        console.log("Fuente Guid: " + fuente_obtencion_GUID);
        console.log("Fuente Negocio: " + f_negocio);
        console.log("");console.log("");console.log("");
        console.log("___________________________________________");

        /***********Fuente Obtencion End***********/


        // -------------------------------- Predictivo  ----------------------------------
        let edadT = this.getValidaCampo("Edad", this.form.value.Edad);

          if(edadT==""){
              edadT = 12;
          }

          let bandera = localStorage.getItem('bandera');

          /* Interes GUID */
          let _Campus = (this.form.value.Campus==null)? "" : this.form.value.Campus;
          let _Nivel = (this.form.value.Nivel==null)? "": this.form.value.Nivel;
          let _Modalidad = (this.form.value.Modalidad==null)? "": this.form.value.Modalidad;
          let _Carrera = (this.form.value.Carrera==null)? "": this.form.value.Carrera;
          let _Interes = (this.form.value.AreaInteres == null) ? "" : this.form.value.AreaInteres;
          let _Parentesco = (this.form.value.ParentescoTutor == null) ? "" : this.form.value.ParentescoTutor;

          let CampusV = _Campus.split('*');
          let NivelV = _Nivel.split('*');
          let ModalidadV = _Modalidad.split('*');
          let CarreraV = _Carrera.split('*');
          let InteresV = _Interes.split('*');
          let ParentescoV = _Parentesco.split('*');


          let valor_genero  = "";
                  if(this.form.value.Genero == 1 || this.form.value.Genero == "M" ){
                     valor_genero = "Masculino";
                   }else if(this.form.value.Genero == 2 || this.form.value.Genero == "F"){
                     valor_genero = "Femenino";
                   }





                      //Consulta Fuente Obtencion

                      let fuente_obtencion_abreviatura : String;
                      for(let f = 0 ; f < this.fuentesobtencion.length ; f++){

                        if(this.fuentesobtencion[f].fuente_GUID == fuente_obtencion_GUID){
                         fuente_obtencion_abreviatura = this.fuentesobtencion[f].abreviatura;
                        }

                      }

                      //Consulta Campus
                      let campus_abreviatura : String;
                      for(let c = 0 ; c < this.campus.length ; c++){

                          if(this.campus[c].crmit_tb_campusid == CampusV[0]){
                            campus_abreviatura = this.campus[c].abreviatura;
                          }

                      }

                      //Consulta Niveles
                      let nivel_abreviatura : String;
                      for(let n = 0 ; n < this.niveles.length ; n++){

                          if(this.niveles[n].crmit_codigounico == NivelV[0]){
                              nivel_abreviatura = this.niveles[n].abreviatura;
                          }
                      }


                      console.log("");console.log("");
                      console.log("*********************************************");
                      console.log(">  "+ciclo+"_"+fuente_obtencion_abreviatura+"_"+campus_abreviatura+"_"+nivel_abreviatura+"  < ");
                      console.log("*********************************************");
                      console.log("");

                     /* let l_seg = ciclo+"_"+fuente_obtencion_abreviatura+"_"+campus_abreviatura+"_"+nivel_abreviatura;

                      let obj_seguimiento = {
                          Lista_seg: l_seg ,
                          GUIDCampus: CampusV[0]
                      };

                      */

                     let  l_seg = "";
                     let obj_seguimiento : any;


                     let f_o_ = (fuente_obtencion_abreviatura == '')?'':fuente_obtencion_abreviatura;
                     let c_a_ = (campus_abreviatura == '')?'':campus_abreviatura;
                     let n_a = (nivel_abreviatura == '')?'':nivel_abreviatura;




///Calculo de tipificacion desde tabala Sub y subsubtipo 2

let valor_tipificacion = "";
let tipi_actualizacion = "";
let tipi_creacion = "";
console.log("subysubsubtipo2: "+this.subysubsubtipos2.values);
for(let i = 0 ; i < this.subysubsubtipos2.length ; i++ ){
  if( this.subysubsubtipos2[i].crmit_subname == "RECEPCION" && this.subysubsubtipos2[i].crmit_subsubname == "CREA RECEPCION"){
    tipi_creacion = this.subysubsubtipos2[i].crmit_codigounico;
    console.log("tipi_creacion: "+tipi_creacion);
    this.etapaprocesoventaid = this.subysubsubtipos2[i].etapaprocesoventaid;
  }else if( this.subysubsubtipos2[i].crmit_subname == "RECEPCION" && this.subysubsubtipos2[i].crmit_subsubname == "ACTUALIZA RECEPCION"){
    tipi_actualizacion = this.subysubsubtipos2[i].crmit_codigounico;
    console.log("tipi_actualizacion: "+tipi_actualizacion);
    this.etapaprocesoventaid = this.subysubsubtipos2[i].etapaprocesoventaid;
  }
}
valor_tipificacion = 'RECEPCION';
//alor_tipificacion = 'RECEPCION_'+tipi_creacion+'_'+tipi_actualizacion;
console.log(valor_tipificacion);


this.form.value.Nombre = this.form.value.Nombre.toUpperCase();
this.form.value.ApellidoPaterno = this.form.value.ApellidoPaterno.toUpperCase();
this.form.value.ApellidoMaterno = this.form.value.ApellidoMaterno.toUpperCase();

this.form.value.NombreTutor = this.form.value.NombreTutor.toUpperCase();
this.form.value.ApellidoPaternoTutor = this.form.value.ApellidoPaternoTutor.toUpperCase();
this.form.value.ApellidoMaternoTutor = this.form.value.ApellidoMaternoTutor.toUpperCase();


this.form.value.CorreoElectronico = this.form.value.CorreoElectronico.toUpperCase();
this.form.value.CorreoElectronicoTutor = this.form.value.CorreoElectronicoTutor.toUpperCase();


          const sendd = {

          Usuario: ( this.form.value.Usuario =='')? null : this.form.value.Usuario,

          Nombre: ( this.form.value.Nombre =='')? null : this.getValidaCampo("Nombre", this.form.value.Nombre),
          ApellidoPaterno: ( this.form.value.ApellidoPaterno =='')? null : this.getValidaCampo("ApPaterno", this.form.value.ApellidoPaterno),
          ApellidoMaterno: ( this.form.value.ApellidoMaterno =='')? null : this.getValidaCampo("ApMaterno", this.form.value.ApellidoMaterno),
          CorreoElectronico: ( this.form.value.CorreoElectronico =='')? null : this.form.value.CorreoElectronico,
          Genero: (valor_genero == '')? -1 : valor_genero,
          Edad: ( edadT =='')? null : edadT,

          NombreTutor: (this.form.value.NombreTutor  =='')? null : this.getValidaCampo("NombreT", this.form.value.NombreTutor),
          ApellidoPaternoTutor: ( this.form.value.ApellidoPaternoTutor =='')? null : this.getValidaCampo("ApPaternoT", this.form.value.ApellidoPaternoTutor),
          ApellidoMaternoTutor: ( this.form.value.ApellidoMaternoTutor =='')? null : this.getValidaCampo("ApMaternoT", this.form.value.ApellidoMaternoTutor),
          CorreoElectronicoTutor: ( this.form.value.CorreoElectronicoTutor =='')? null : this.form.value.CorreoElectronicoTutor,

          ParentescoTutor: ( ParentescoV[0] =='')? null : ParentescoV[0],
          GUIDParentescotutor: ( ParentescoV[1] =='')? null : ParentescoV[1],

          Campus: ( CampusV[1] =='')? null : CampusV[1],
          Nivel: ( NivelV[1] =='')? null : NivelV[1],
          Modalidad: ( ModalidadV[1] =='')? null : ModalidadV[1],
          Carrera: ( CarreraV[1] =='')? null : CarreraV[1],
          AreaInteres: ( InteresV[1] =='')? null : InteresV[1],
          Ciclo:  ( ciclo =='')? null : ciclo,
          FuenteNegocio: ( fuente_obtencion_nombre =='')? null : fuente_obtencion_nombre,

          GUIDCampus: (CampusV[0]=='')? null : CampusV[0],
          GUIDNivelInteres: (NivelV[0]=='')? null : NivelV[0],
          GUIDModalidad: (ModalidadV[0]=='')? null : ModalidadV[0],
          GUIDCarrera: (CarreraV[0]=='')? null : CarreraV[0],
          GUIDAreaInteres:(InteresV[0]=='')? null : InteresV[0],
          GUIDCiclo:( CicloV[0]=='')? null : CicloV[0],
          GUIDUsuario: ( localStorage.getItem('UserId') =='')? null : localStorage.getItem('UserId'),
          GUIDFuentedeObtencion: (fuente_obtencion_GUID == '') ? '3c89dd13-6072-e211-b35f-6cae8b2a4ddc' : fuente_obtencion_GUID,


          Banner: ( this.form.value.Banner =='')? null : this.form.value.Banner,
          Bandera: (bandera==null)? "" :bandera,

          Team: (this.form.value.Team == undefined) ? "" : this.form.value.Team,
          Prioridad: (this.form.value.Prioridad == undefined) ? 0 : this.form.value.Prioridad,
          Attemp: (this.form.value.Attemp == undefined) ? 0 : this.form.value.Attemp,
          fuenteobtencion: (fuente_obtencion_nombre == "")? "" : fuente_obtencion_nombre,

          //Numero Celular
          Telefono: (this.form.value.NumeroCelular=="")?null:this.form.value.NumeroCelular,
          TelefonoPredictivo:(this.form.value.TelefonoCelularPredictivo == "9045null") ? null : this.form.value.TelefonoCelularPredictivo,
          //Numero Telefono o Telefono Casa
          TelefonoCasa: ( this.form.value.Telefono =='')? null : this.form.value.Telefono,
          TelefonoCasaPredictivo: ( this.form.value.Telefono =='')? null : tel_casa_predictivo,


          //Numero Celular Tutor
          NumeroCelularTutor:(this.form.value.NumeroCelularTutor=='')?null:this.form.value.NumeroCelularTutor,
          TelefonoCelularPredictivoTutor:(this.form.value.TelefonoCelularPredictivoTutor == "9045null") ? null : this.form.value.TelefonoCelularPredictivoTutor,
          //Numero Casa Tutor
          TelefonoTutor:(this.form.value.TelefonoTutor=='')?null:this.form.value.TelefonoTutor,
          TelefonoCasaTutorPredictivo: (this.form.value.TelefonoPredictivoTutor == "901null") ? null : this.form.value.TelefonoPredictivoTutor,
          Lista_seg: l_seg,
          Tipificacion: (valor_tipificacion == '' ) ? null : valor_tipificacion,
          GUIDTipificacion: 'c8aca7b6-cbdb-e811-8148-3863bb35ddc8',
          EtapaProcesoVentaGUID : (this.etapaprocesoventaid == '') ? null : this.etapaprocesoventaid,

        };




          //Comienza validacion de existencia de linea de seguimiento

          console.log("ciclo: "+ciclo);
          console.log("campus_abreviatura: "+campus_abreviatura);
          console.log("nivel_abreviatura: "+nivel_abreviatura);



          let b1 : any;
          let b2 : any;
          let b3 : any;

          if(ciclo === undefined ||  ciclo == ''){

            b1 = 'F';
          }else{
            b1 = 'V';

          }

          if(campus_abreviatura === undefined || campus_abreviatura == ''){

            b2 = 'F';
          }else{
            b2 = 'V';

          }

          if(nivel_abreviatura === undefined || nivel_abreviatura == ''){

            b3 = 'F';
          }else{
            b3 = 'V';

          }


          if( b1 == 'F' && b2 == 'F' && b3 == 'F' ){

            obj_seguimiento = {};
            console.log("Esta vacia la linea de seguimiento");


        }else if( b1 == 'V' && b2 == 'V' && b3 == 'V' ){


          console.log("Entro a validacion de linea de seguimiento");

          l_seg = ciclo+"_"+f_o_+"_"+c_a_+"_"+n_a;

          console.log("Linea de seguimiento: "+l_seg+" ___");

           obj_seguimiento = {
               Lista_seg: l_seg ,
               GUIDCampus: (CampusV[0] == '')?'2d3bdab0-5c72-e211-a4c9-6cae8b2a0430':CampusV[0]
             };


          sendd['Lista_seg'] =  l_seg;

        }

        //Termina validacion de Linea de seguimiento


        if(this.form.value.NumeroCelularTutor === null || this.form.value.NumeroCelularTutor == '' ){
          console.log("No hay error o valor para NumeroCelularTutor - "+this.form.value.NumeroCelularTutor);

      }else{

          console.log("Validando 0, valor de NumeroCelularTutor: "+this.form.value.NumeroCelularTutor);


          if(this.form.value.NumeroCelularTutor.substr(-10,1) == '0' ){
              this.showDialogE("El Numero Celular Tutor no pueden iniciar con 0.");
              return false;
          }


      }

      if(this.form.value.TelefonoTutor === null || this.form.value.TelefonoTutor == ''){
          console.log("No hay error o valor para TelefonoTutor - "+this.form.value.TelefonoTutor);

      }else{

          console.log("Validando 0, valor de TelefonoTutor: "+this.form.value.NumeroCelularTutor);

          if(this.form.value.TelefonoTutor.substr(-10,1) == '0'){
            this.showDialogE("El teléfono Tutor no pueden iniciar con 0.");
            return false;
          }


      }


      if(this.form.value.Telefono === null || this.form.value.Telefono == ''){
          console.log("No hay error o valor para Telefono - "+this.form.value.Telefono);

      }else{

          console.log("Validando 0, valor de Telefono: "+this.form.value.Telefono);

          if(this.form.value.Telefono.substr(-10,1) == '0'){
            this.showDialogE("El teléfono no pueden iniciar con 0.");
            return false;
          }


      }



      if(this.form.value.NumeroCelular === null || this.form.value.NumeroCelular == ''){
          console.log("No hay error o valor para NumeroCelular - "+this.form.value.NumeroCelular);


      }else{
          console.log("Validando 0, valor de NumeroCelular: "+this.form.value.NumeroCelular);

          if(this.form.value.NumeroCelular.substr(-10,1) == '0'){
            this.showDialogE("El Numero Celukar no pueden iniciar con 0.");
            return false;
          }


      }


//Validacion de espacios en blanco

if(this.valida_espacios_en_blanco(this.form.value.NombreTutor, "Nombre Tutor") > 10 ){

  this.showDialogE("No se permiten mas de un espacio en blanco en los campos de registro.");
  return false;
}else if(this.valida_espacios_en_blanco(this.form.value.ApellidoPaternoTutor, "Apellido Paterno Tutor") > 10){


  this.showDialogE("No se permiten mas de un espacio en blanco en los campos de registro.");
  return false;

}else if( this.valida_espacios_en_blanco(this.form.value.ApellidoMaternoTutor, "Apellido Materno Tutor") > 10 ){

  this.showDialogE("No se permiten mas de un espacio en blanco en los campos de registro.");
  return false;

}else if( this.valida_espacios_en_blanco(this.form.value.Nombre, "Nombre") > 10){

  this.showDialogE("No se permiten mas de un espacio en blanco en los campos de registro.");
  return false;

}else if(this.valida_espacios_en_blanco(this.form.value.ApellidoPaterno, "Apellido Paterno") > 10){


  this.showDialogE("No se permiten mas de un espacio en blanco en los campos de registro.");
  return false;

}else if( this.valida_espacios_en_blanco(this.form.value.ApellidoMaterno, "Apellido Materno") > 10){

  this.showDialogE("No se permiten mas de un espacio en blanco en los campos de registro.");
  return false;

}


/*
if( this.form.value.CorreoElectronico != '' ){

  if(this.Segunda_validacion_Email(this.form.value.CorreoElectronico) == false){
    this.showDialogE("El Correo Electronico introducido es incorrecto.");
    return false;
  }

}else if( this.form.value.CorreoElectronico != ''){

  if( this.Segunda_validacion_Email(this.form.value.CorreoElectronicoTutor) == false ){
    this.showDialogE("El Correo Electronico introducido es incorrecto.");
    return false;
  }

}*/


      if( this.campos_con_error.length != 0 ){ //Verifica si hay errores o errores de campos
          console.log("Bloquea Send");

          console.log("Campos con error = "+this.campos_con_error);
          this.showDialogE("Hay datos incompletos o incorrectos en los campos: "+this.campos_con_error+" .");
          this.campos_con_error.splice(0);
          console.log("Total de Errores:"+this.campos_con_error.length);

          var element = <HTMLInputElement> document.getElementById("Submit");
          element.disabled = false;

      } else {

                if (this.conEmail) {

                  var element = <HTMLInputElement> document.getElementById("Submit");
                  element.disabled = true;

                  this.sendServ.send_ListaSeguimiento_QA(obj_seguimiento)
                  .subscribe(
                          (ress: any) => {
                              console.log(ress.status);
                              if (ress.status == 200) {
                                  console.log("7924: Los datos se han envido correctamente.");
                                  //Se envia el segundo endpoint -> 7841


                        this.sendServ.send_Todos_inb_sol_prom_QA(sendd)// this.form.value)
                            .subscribe(
                                (res: any) => {
                                    //console.log(res.status);
                                    if (res.status == 200) {

                                      this.Abreventana(this.form.value.Nombre, this.form.value.ApellidoPaterno, '', this.form.value.CorreoElectronico, "", '');
                                      this.sendServ.sendHubSpot(this.form.value.Nombre, this.form.value.ApellidoPaterno, '', this.form.value.CorreoElectronico, "", '')// this.form.value)

                                        this.showDialog("Registro guardado con éxito.");


                                    } else {
                                        this.showDialogE("Error al guardar el registro.");
                                    }
                                }, error => {
                                    if (error.status === 400) {
                                        console.log(error);
                                        this.showDialogE(error._body);
                                    }
                                    else if (error.status === 500) {
                                        this.showDialogE(error._body);
                                    }
                                }
                            )





                          } else {
                            console.log("7924: Error al enviar el registro.");
                        }
                    }
              )



                } else {


                  this.sendServ.send_ListaSeguimiento_QA(obj_seguimiento)
                  .subscribe(
                        (ress: any) => {
                            console.log(ress.status);
                              if (ress.status == 200) {
                                  console.log("7924: Los datos se han envido correctamente.");
                                  //Se envia el segundo endpoint -> 7841

    ////////////////////////////////////////////////////









                        this.sendServ.send_Todos_inb_sol_prom_QA(sendd)// this.form.value)
                        .subscribe(
                                (res: any) => {
                                    console.log(res.status);
                                    if (res.status == 200) {

                                      this.Abreventana(this.form.value.Nombre, this.form.value.ApellidoPaterno, '', this.form.value.CorreoElectronico, "", '');
                                      this.sendServ.sendHubSpot(this.form.value.Nombre, this.form.value.ApellidoPaterno, '', this.form.value.CorreoElectronico, "", '')// this.form.value)

                                        this.showDialog("Registro guardado con éxito.");

                                    } else {
                                        this.showDialogE("Error al guardar el registro.");
                                    }
                                }, error => {
                                    if (error.status === 400) {
                                        console.log(error);
                                        this.showDialogE(error._body);
                                    }
                                    else if (error.status === 500) {
                                        this.showDialogE(error._body);

                                    }
                                }
                            )




                          } else {
                            console.log("7924: Error al enviar el registro.");
                        }
                    }
              )




                }
            }  //Termina validacion de envio con Email

      }




  }


//Validacion de correo Electronico

Segunda_validacion_Email(email) {
if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/.test(email)){
  return (true)
} else {
  return (false);
}
}


//Lector de caracteres

valida_espacios_en_blanco(texto, campo){

  var blancos =0;

      for(let k=0 ; k < texto.length ; k++){

          switch(texto[k]){

              case " ":
                  blancos++;
                  break;
          }
      }

          console.log("- Total de espacios en blanco: " + blancos + " en el campo "+campo);
      return blancos;

  }



getValidaCampo(campo, valor){

    let s = "";
    s = this.appConfig.SIMBOLOS_microregistro;

    let r = 0;


if(valor == "" || valor == null){ //Campo Vacio

  this.campos_con_error.push(" "+campo);
  return '0';
}else{ //Campo No Vacio


   if(campo == "NombreT"){ //Valida Nombre Tutor



    console.log("");
    console.log("------------Validacion de Nombre Tutor---------------");

                for (let k = 0; k < valor.length; k++) {
                  if (s.indexOf(valor.charAt(k), 0) != -1) {
                      r = 1;

                      if(r == 1){
                       //   this.showDialogE("Error en el campo Nombre Tutor, se encontraron simbolos o caracteres especiales en el campo.");
                          this.campos_con_error.push(" "+campo);
                          console.log("Error en campo Nombre Tutor");
                          r = 0;
                          return false;
                      }

                  } else { r = 0 ; return valor; }
              }



  }else if(campo == "ApPaternoT"){ //Valida Apellido Paterno Tutor


    console.log("");
    console.log("------------Validacion de Apellido Paterno T---------------");

                for (let k = 0; k < valor.length; k++) {
                  if (s.indexOf(valor.charAt(k), 0) != -1) {
                      r = 1;

                      if(r == 1){
                        //  this.showDialogE("Error en el campo Apellido Paterno de Tutor, se encontraron simbolos o caracteres especiales en el campo.");
                          this.campos_con_error.push(" "+campo);
                          console.log("Error en campo Apellido Paterno de Tutor");
                          r = 0;
                          return false;
                      }

                  } else { r = 0 ; return valor; }
              }



  }else if(campo == "ApMaternoT"){ //Valida Apellido Materno Tutor



    console.log("");
    console.log("------------Validacion de Apellido Materno de Tutor---------------");

                for (let k = 0; k < valor.length; k++) {
                  if (s.indexOf(valor.charAt(k), 0) != -1) {
                      r = 1;

                      if(r == 1){
                       //   this.showDialogE("Error en el campo Apellido Materno de Tutor, se encontraron simbolos o caracteres especiales en el campo.");
                          this.campos_con_error.push(" "+campo);
                          console.log("Error en campo Apellido Materno de Tutor");
                          r = 0;
                          return false;
                      }

                  } else { r = 0 ; return valor; }
              }



  }else  if(campo == "ApMaterno"){ //Valida Apellido Paterno



    console.log("");
    console.log("------------Validacion de Apellido Materno---------------");

                for (let k = 0; k < valor.length; k++) {
                  if (s.indexOf(valor.charAt(k), 0) != -1) {
                      r = 1;

                      if(r == 1){
                        //  this.showDialogE("Error en el campo Apellido Materno, se encontraron simbolos o caracteres especiales en el campo.");
                          this.campos_con_error.push(" "+campo);
                          console.log("Error en campo Apellido Materno");
                          r = 0;
                          return false;
                      }

                  } else { r = 0 ; return valor; }
              }



  }else if(campo == "ApPaterno"){ //Valida Apellido Paterno



    console.log("");
    console.log("------------Validacion de Apellido Paterno---------------");


                for (let j = 0; j < valor.length; j++) {
                  if (s.indexOf(valor.charAt(j), 0) != -1) {
                      r = 1;

                      if(r == 1){
                       //  this.showDialogE("Error en el campo Apellido Paterno, se encontraron simbolos o caracteres especiales en el campo.");
                         this.campos_con_error.push(" "+campo);
                         console.log("Error en campo Apellido Paterno");
                         r = 0;
                         return false;
                      }

                  } else { r = 0 ; return valor; }
              }


  }else if(campo == "Nombre"){ //Valida Nombre


    console.log("");
    console.log("------------Validacion de Nombre---------------");

                for (let i = 0; i < valor.length; i++) {
                  if (s.indexOf(valor.charAt(i), 0) != -1) {
                      r = 1;
                       if(r == 1){
                       //this.showDialogE("Error en el campo Nombre, se encontraron simbolos o caracteres especiales en el campo.");
                       this.campos_con_error.push(" "+campo);
                       console.log("Error en campo Nombre");
                       r=0;
                       return false;

    }

                  } else { r = 0 ; return valor; }
              }





  }else if(campo == "Edad"){ //Valida Edad
    console.log("");
    console.log("------------Validacion de Edad---------------");

    if(isNaN(valor)){
      //this.showDialogE("El valor de Edad no es numérico y puede contener símbolos no permitidos");
      this.campos_con_error.push(" "+campo);
      console.log("Error en el campo Edad");
      return false;
    }else{
      console.log("El campo Edad tiene valores númericos es correcto.");
      return valor;
    }


  }else if(campo == "CorreoElectronico"){ //Si es campo CorreoElectronico
    console.log("En validacion de Correo");

     if(LandingValidation.ValidacionEmail(valor) != null){
      this.campos_con_error.push(" "+campo);
     }else{
       return valor;
     }

  }else{ //Si cumplen las validaciones retorna el valor
    return valor;
  }
  console.log("");
}

}




  Abreventana(firstname, lastname, mobilphone, email, city, phone){

    var win = window.open("https://test.devmx.com.mx/formHub?firstname="+firstname+"&lastname="+lastname+"&mobilphone="+mobilphone+"&email="+email+"&city="+city+"&phone="+phone,'Envio Hotspot','width=-1,height=-1,left=4000,top=4000, toolbar=no, directories=no ,menubar=no');
    setTimeout(function() { win.close();}, 3000);

  }


  resetForm() {
      window.location.href = "/nuevo-solovino";
      this.form.reset();
  }

  onKeyFechaNacimiento() {
      let edad = this.form.controls.Edad.value;
      let year = new Date().getFullYear();
      let fecha = year - edad;
      this.form.controls.FechaNacimiento.setValue('01/01/'+fecha);
  }
  agruparClick(){
      let ases = this.asesorServ.getAll()
          .subscribe(
              (data: Asesor[]) => this.asesores = data
          );
      this.showDialogForm(this.asesores, "Selecciona a un Asesor", "Cita - ");
  }

  agruparDirectaClick() {
      //let nivelG = 'Posgrado';
      let k = this.form.controls.Nivel.value;
      let g = k.split('*');
      let nivelG = g[0];
      //console.log(nivelG);
      if(nivelG){
         let asess = this.asesorGrupalServ.getAll()
          .subscribe(
              (datat: AsesorGrupal[]) => this.asesorGrupal = datat
          )
          setTimeout(() => {
              this.showDialogForm(this.asesorGrupal, "Selecciona a un Asesor Grupal", "SesiónG - ");
          }, 1000);
      }else{
          this.showDialogE("Seleccione un Nivel");
      }
  }

  //BTN Asignar
  agruparDClick(){
      //localStorage.setItem('bandera',this.form.controls.Usuario.value);
      localStorage.setItem('bandera',"Cita - ");
  }


  onKeydownEmail(event: KeyboardEvent) {
      let name = this.form.controls.NombreTutor.value;
      if (name == '') {
          this.form.controls.NombreTutor.clearValidators();
          this.form.controls.ApellidoPaternoTutor.clearValidators();
          this.form.controls.ApellidoMaternoTutor.clearValidators();
          this.form.controls.CorreoElectronicoTutor.clearValidators();
          this.form.controls.NumeroCelularTutor.clearValidators();
          this.form.controls.TelefonoTutor.clearValidators();
          this.form.controls.ParentescoTutor.clearValidators();
      } else {

          this.form.controls.NombreTutor.setValidators([Validators.required, LandingValidation.palabraMalaValidator()]);
          this.form.controls.ApellidoPaternoTutor.setValidators([Validators.required, LandingValidation.palabraMalaValidator()]);
          this.form.controls.ApellidoMaternoTutor.setValidators([Validators.required, LandingValidation.palabraMalaValidator()]);
          this.form.controls.CorreoElectronicoTutor.setValidators([Validators.required, LandingValidation.emailMaloValidator()]);
          this.form.controls.NumeroCelularTutor.setValidators([Validators.required, Validators.minLength(10), LandingValidation.aceptNumberValidator(), LandingValidation.numberConValidator()]);
          this.form.controls.TelefonoTutor.setValidators([Validators.required, Validators.minLength(10), LandingValidation.aceptNumberValidator(), LandingValidation.numberConValidator()]);
          this.form.controls.ParentescoTutor.setValidators([Validators.required]);
      }
      this.form.controls.NombreTutor.updateValueAndValidity();
      this.form.controls.ApellidoPaternoTutor.updateValueAndValidity();
      this.form.controls.ApellidoMaternoTutor.updateValueAndValidity();
      this.form.controls.CorreoElectronicoTutor.updateValueAndValidity();
      this.form.controls.NumeroCelularTutor.updateValueAndValidity();
      this.form.controls.TelefonoTutor.updateValueAndValidity();
      this.form.controls.ParentescoTutor.updateValueAndValidity();
  }

  _keyOnly3letter(event: any, name: any) {
      LandingValidation.letterName(event, name);
  }

  _keyPress(event: any) {
      LandingValidation.onlyNumber(event);
  }

  _keyPressNumA(event: any, name: any) {

      LandingValidation.onlyNumberIgual(event, name);
  }
  _keyPressTxt(event: any) {
      LandingValidation.onlyLetter(event);
  }

  _keyPressNum(event: any, value: any, word: any) {
      if (value == 1) {
          LandingValidation.onlyNumber(event);
          LandingValidation.limitChar(event, word);
          LandingValidation.onlyNumberIgual(event, word);
      }
  }

  onChange() {}

  onChangeInteres(value) {
      if (value == '') {
          this.form.controls.Campus.clearValidators();
          this.form.controls.AreaInteres.clearValidators();
          this.form.controls.Nivel.clearValidators();
          this.form.controls.Modalidad.clearValidators();
          this.form.controls.Carrera.clearValidators();
          this.form.controls.Ciclo.clearValidators();
      } else {
          this.form.controls.Campus.setValidators([Validators.required]);
          this.form.controls.AreaInteres.setValidators([Validators.required]);
          this.form.controls.Nivel.setValidators([Validators.required]);
          this.form.controls.Modalidad.setValidators([Validators.required]);
          this.form.controls.Carrera.setValidators([Validators.required]);
          this.form.controls.Ciclo.setValidators([Validators.required]);
      }
      this.form.controls.Campus.updateValueAndValidity();
      this.form.controls.AreaInteres.updateValueAndValidity();
      this.form.controls.Nivel.updateValueAndValidity();
      this.form.controls.Modalidad.updateValueAndValidity();
      this.form.controls.Carrera.updateValueAndValidity();
      this.form.controls.Ciclo.updateValueAndValidity();
  }

  //Cambiado
  onChangeCampus(campus: string) {
      //console.log(campus);
      let cadena = campus.split('*');
      let value = cadena[0];
      for (let i = 0; i < this.campus.length; i++) {
          if (this.campus[i].crmit_tb_campusid == value) {
              this.campusTxt = this.campus[i].crmi_name;
          }
      }

      if (this.form.controls['Nivel'].disabled) {
          this.form.controls['Nivel'].enable();
      } else {
          this.form.controls['Nivel'].setValue('');
          this.form.controls['Nivel'].markAsUntouched();
      }

      if (this.form.controls['Modalidad'].enabled) {
          this.form.controls['Modalidad'].setValue('');
          this.form.controls['Modalidad'].markAsUntouched();
          this.form.controls['Modalidad'].disable();
      }

      if (this.form.controls['Carrera'].enabled) {
          this.form.controls['Carrera'].setValue('');
          this.form.controls['Carrera'].markAsUntouched();
          this.form.controls['Carrera'].disable();
      }
      this.niveles = this.campusCarreraServ.getNivelesByCarrera(value);
  }
  //Cambiando
  onChangeNivel(campus: string) {
      //console.log(campus);

      let cadena = campus.split('*');
      let value = cadena[0];

      for (let i = 0; i < this.niveles.length; i++) {
          if (this.niveles[i].crmit_codigounico == value) {
              this.nivelTxt = this.niveles[i].crmit_name;
          }
      }

      if (this.form.controls['Modalidad'].disabled) {
          this.form.controls['Modalidad'].enable();
      } else {
          this.form.controls['Modalidad'].setValue('');
          this.form.controls['Modalidad'].markAsUntouched();
      }

      if (this.form.controls['Carrera'].enabled) {
          this.form.controls['Carrera'].setValue('');
          this.form.controls['Carrera'].markAsUntouched();
          this.form.controls['Carrera'].disable();
      }

      this.modalidades = this.campusCarreraServ.getModalidadesByNivel(value);
  }
  //Cambiando
  onChangeModalidad(campus: string) {

      //console.log(campus);

      let cadena = campus.split('*');
      let value = cadena[0];

      if (this.form.controls['Carrera'].disabled) {
          this.form.controls['Carrera'].enable();
      } else {
          this.form.controls['Carrera'].setValue('');
          this.form.controls['Carrera'].markAsUntouched();
      }
      this.carreras = this.campusCarreraServ.getCarrerasByModalidad(value);
  }

  onFielCanal(value) {
      this.form.controls.TelefonoCorreo.clearValidators();
      this.form.controls.TelefonoCorreo.reset({ value: '', disabled: false });
      if (value == 1) {
          this.form.controls.TelefonoCorreo.setValidators([Validators.minLength(10), Validators.maxLength(10), LandingValidation.aceptNumberValidator()]);
      } else {
          this.form.controls.TelefonoCorreo.setValidators([LandingValidation.emailMaloValidator()]);
      }
      this.form.controls.TelefonoCorreo.updateValueAndValidity();
  }

  addValidation(isChecked) {
      if (isChecked.checked) {
          if(this.form.controls.Telefono.value == ""){
              isChecked.source.checked = false
              this.showDialogE("Debes ingresar un teléfono de contacto");
              return false;
          }
          this.form.controls.CorreoElectronico.reset({ value: 'telefono@unitec.edu.mx', disabled: false });
          this.sinEmail = true;
          //this.form.controls.SinCorreo.reset({ value: 'no', disabled: false });
          this.conEmail = false;

      } else {
          this.form.controls.CorreoElectronico.reset({ value: '', disabled: false });
         // this.form.controls.SinCorreo.reset({ value: 'ok', disabled: false });
          this.sinEmail = false;
          this.conEmail = true;
      }
      this.form.controls.CorreoElectronico.updateValueAndValidity();
  }

  addAsesor(isChecked) {
      if (isChecked.checked) {
          this.form.controls.Asesor.reset({ value: '', disabled: false });
      } else {
          this.form.controls.Asesor.reset({ value: '', disabled: true });
      }
      this.form.controls.Asesor.updateValueAndValidity();
  }

  showMjs(field: any) {
      return LandingValidation.getMensaje(field);
  }

  private showDialog(message: string) {
      let dialogRef = this.dialog.open(DialogComponent, {
          height: '180px',
          width: '500px',
          data: { message: message }
      });
      dialogRef.afterClosed().subscribe(result => {
          window.location.href = "/nuevo-solovino";
      });
  }

  private showDialogE(message: string) {
      let dialogRef = this.dialog.open(DialogComponent, {
          height: '180px',
          width: '500px',
          data: { message: message }
      });
  }

  private showDialogForm(array: any, message: string, bander: string) {
      let dialogForm = this.dialog.open(DialogFormComponent, {
          height: '180px',
          width: '500px',
          data: { message: array, title: message,bandera: bander }
      });
  }
}
