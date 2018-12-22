import { Location } from '@angular/common';
import { AppConfig } from '../services/constants';
import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { GeneralService } from '../services/general.service';
import { FormControl, FormGroup, FormBuilder, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';



import { MatDialog, MatSelect, MatDialogRef, MAT_DIALOG_DATA, NativeDateAdapter } from '@angular/material';
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
import { AsesorCita } from '../interfaces/asesor-cita';
import { Carrera } from '../interfaces/carrera';
import { Interes } from '../interfaces/interes';
import { Modalidad } from '../interfaces/modalidad';
import { Parentesco } from '../interfaces/parentesco';
import { CampusCita } from '../interfaces/campus-cita';
import { Tipificacion } from '../interfaces/tipificacion';
import { AsesorGrupal } from '../interfaces/asesor-grupal';
import { FuenteObtencion } from '../interfaces/fuenteobtencion';
import { CampusCarrera } from '../interfaces/campus-carrera';

import { PnnService } from '../providers/pnn.service';
import { CsqService } from '../providers/csq.service';
import { SendService } from '../providers/send.service';
import { HoraService } from '../providers/hora.service';
import { CanalService } from '../providers/canal.service';
import { CicloService } from '../providers/ciclo.service';
import { FormatService } from '../providers/format.service';
import { CampusService } from '../providers/campus.service';
import { AsesorGrupalService } from '../providers/asesor-grupal.service';
import { AsesorService } from '../providers/asesor.service';
import { GeneroService } from '../providers/genero.service';
import { CarreraService } from '../providers/carrera.service';
import { InteresService } from '../providers/interes.service';
import { ModalidadService } from '../providers/modalidad.service';
import { ParentescoService } from '../providers/parentesco.service';
import { CampusCitaService } from '../providers/campus-cita.service';
import { TipificacionService } from '../providers/tipificacion.service';
import { CampusCarreraService } from '../providers/campus-carrera.service';
import { FuenteObtencionService } from '../providers/fuenteobtencion.service';
import { NivelService } from '../providers/nivel.service';




@Component({
    selector: 'app-nuevo-inbound',
    templateUrl: './nuevo-inbound.component.html',
    styleUrls: ['./nuevo-inbound.component.scss']
})


export class NuevoRegistroInboundComponent implements OnInit {

  form: FormGroup;
  sinEmail = false;
  conEmail = true;

  arm_bandera = "";
  cita = "";
  GUIDTipificacion = "";
  Tipificacion_con_GUID = "";

  minDate = new Date(new Date().setDate(new Date().getDate()));
  maxDate = LandingValidation.fechaLimiteInbound(0);
  startDate = LandingValidation.fechaInicio();

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
  SinCorreo: FormControl;

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

  CampusCita: FormControl;
  FechaCita: FormControl;
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
  fuentesobtencion: FuenteObtencion[] = [];

  campus_carreras: CampusCarrera[] = [];

  carreras: Carrera[] = [];
  intereses: Interes[] = [];
  modalidades: Modalidad[] = [];
  campus_citas: CampusCita[] = [];
  parentescos: Parentesco[] = [];
  tipificaciones: Tipificacion[] = [];
  rows = [];
  sendd = {};

  asesoresGrupal: AsesorGrupal[] = [];
    campos_con_error = [];



  campusTxt: any;
  nivelTxt: any;
  canalText: any;
  _etapaprocesoventaid: any;

  constructor(private landingService: LandingService,
      private gralService: GeneralService,
      public dialog: MatDialog,
      private renderer: Renderer2,
      private pnnServ: PnnService,
      private csqServ: CsqService,
      private horaServ: HoraService,
      private sendServ: SendService,
      private cicloServ: CicloService,
      private canalServ: CanalService,
      private campusServ: CampusService,
      private asesorServ: AsesorService,
      private formatServ: FormatService,
      private generoServ: GeneroService,
      private carreraServ: CarreraService,
      private interesServ: InteresService,
      private modalidadServ: ModalidadService,
      private parentescoServ: ParentescoService,
      private campusCitaServ: CampusCitaService,
      private campusCarreraServ: CampusCarreraService,
      private asesorGrupalServ: AsesorGrupalService,
      private fuenteobtencionServ: FuenteObtencionService,
      private tipicicacionServ: TipificacionService,
      private appConfig: AppConfig,
      private nivelServ: NivelService ) {
      this.fetch((data) => {
          this.rows = data;
      });
  }



  ngOnInit() {


      // this.resetTimer();

      this.landingService.getInit();

      // Se obtiene todos los canales
      this.nivelServ.getAll2()
          .subscribe(
              (data: Nivel[]) => this.niveles = data
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

      //Se obtiene todos los fuente obtencion
      this.fuenteobtencionServ.getAll()
      .subscribe(
      (data: FuenteObtencion[]) => this.fuentesobtencion = data
      )


      //Se obtiene todos los campus carrera
      this.campusCarreraServ.getAlls()
          .subscribe(
              (data: CampusCarrera[]) => this.campus_carreras = data
          )

      //Se obtiene todos los fuente obtencion
      this.fuenteobtencionServ.getAll()
      .subscribe(
      (data: FuenteObtencion[]) => this.fuentesobtencion = data
      )

      //Se obtienen todos los asesores

      let ases = this.asesorServ.getAll()
          .subscribe(
              (data: Asesor[]) => this.asesores = data
          );


      //Se obtiene todas los asesores grupales
      this.asesorGrupalServ.getAll()
          .subscribe(
              (data: AsesorGrupal[]) => this.asesoresGrupal = data
          )


      this.formInit();


      this.form.controls.CampusCita.reset({ value: '', disabled: true });
      this.form.controls.FechaCita.reset({ value: '', disabled: true });
      this.form.controls.HoraCita.reset({ value: '', disabled: true });
      this.form.controls.Programacion.reset({ value: '', disabled: true });
      this.form.controls.Transferencia.reset({ value: '', disabled: true });



  }

  fetch(cb) {
      const req = new XMLHttpRequest();
      req.open('GET', `assets/inbound.json`);
      req.onload = () => {
          cb(JSON.parse(req.response));
      };
      req.send();
  }

  formInit() {
      localStorage.setItem('bandera', '');
      let userLocal = localStorage.getItem('user');
      let datos = JSON.parse(userLocal);
      this.form = new FormGroup({
          Usuario: new FormControl({ value: datos.fullname, disabled: false }),
          Canal: new FormControl('', Validators.required),
          CSQ: new FormControl({ value: '', disabled: true }, Validators.required),
          TelefonoCorreo: new FormControl('', Validators.required),
          Interesa_NoInteresa: new FormControl('', Validators.required),

          Nombre: new FormControl('', [LandingValidation.palabraMalaValidator()]),
          ApellidoPaterno: new FormControl('', [LandingValidation.palabraMalaValidator()]),
          ApellidoMaterno: new FormControl('', [LandingValidation.palabraMalaValidator()]),
          CorreoElectronico: new FormControl(''),
          NumeroCelular: new FormControl('', [Validators.minLength(10), LandingValidation.aceptNumberValidator(), LandingValidation.numberConValidator()]),
          Telefono: new FormControl('', [ Validators.minLength(10), LandingValidation.aceptNumberValidator(), LandingValidation.numberConValidator()]),
          Genero: new FormControl(''),
          FechaNacimiento: new FormControl(''),
          Edad: new FormControl('', [Validators.minLength(2), LandingValidation.edadMinValidator()]),

          SinCorreo: new FormControl(''),

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

          Tipificacion: new FormControl(''),

          Notas: new FormControl(''),

          CampusCita: new FormControl({ value: '', disabled: true }),
          FechaCita: new FormControl({ value: '', disabled: true }),
          HoraCita: new FormControl({ value: '', disabled: true }),
          Programacion: new FormControl({ value: '', disabled: false }),
          Transferencia: new FormControl({ value: '', disabled: false }),
          Asesor: new FormControl({ value: '', disabled: true })
      });
  }




//Comiezan el Submit

  onSubmit() {


      let form = this.form;
      let pnnServ = this.pnnServ;


      $('form').find(':input').each(function () {
          if ($(this).hasClass('validPhoneNumber')) {
              let name = $(this).attr('formControlName');
              if (form.controls[name].value != '' && form.controls[name].value != null) {
                  if (!pnnServ.checkPnnIsValid(form.controls[name].value)) {
                      form.controls[name].setErrors({ 'numInvalid': true });
                  } else {
                      form.controls[name].setErrors({ 'numInvalid': false });
                      form.controls[name].updateValueAndValidity();
                  }
              } else {
                  form.controls[name].setErrors({ 'numInvalid': false });
                  form.controls[name].reset();
              }
          }
      })

      if (this.sinEmail) {
          this.form.controls.CorreoElectronico.clearValidators();
      }


      if (this.sinEmail) {
          this.form.controls.CorreoElectronico.clearValidators();
      }else{
          if (this.form.controls['CorreoElectronico'].value!=""){
              this.form.controls.Telefono.setValidators([Validators.minLength(10), LandingValidation.aceptNumberValidator(), LandingValidation.numberConValidator()]);
          }else{

            var tel = '';
            var telcasa = this.form.controls.Telefono.value;
            var telcel = this.form.controls.NumeroCelular.value;



            console.log("Antes Telefono: "+telcasa);
            console.log("Telelfono Celular: "+telcel);

            if(telcasa != "" && telcel == ""){
              tel = telcasa;
            }else if(telcasa == "" && telcel != ""){
              tel = telcel;
            }else if(telcasa != "" && telcel != ""){
              tel = telcel;
            }


              console.log("telefono: "+tel);

              if (tel) {
                  this.form.controls['CorreoElectronico'].reset({ value: tel + '@unitec.edu.mx', disabled: false });
                  this.form.controls.CorreoElectronico.clearValidators();
                  this.form.controls.CorreoElectronico.updateValueAndValidity();
                  this.conEmail = false;
              }
          }
      }

      if (this.form.controls['CorreoElectronico'].value != "" && (this.form.controls['Telefono'].value == "" && this.form.controls['NumeroCelular'].value == "" ) ) {
          this.form.controls.Telefono.updateValueAndValidity();
          this.form.controls.Telefono.clearValidators();
      }


      if (this.form.valid){

          this.onKeyFechaNacimiento();

          let fecha_cita = this.formatServ.changeFormatFecha(this.form.controls['FechaCita'].value);

          this.form.controls['FechaCita'].setValue(fecha_cita);


          if (this.sinEmail) {

              var tel_ = "";
              var tel_casa = this.form.controls['Telefono'].value;
              var tel_cel = this.form.controls['NumeroCelular'].value;




              console.log("tel_casa - "+tel_casa);
              console.log("tel_cel - "+tel_cel);



              if((tel_casa != null || tel_casa != 0 || tel_casa != '' ) && (tel_cel == null || tel_cel == 0 || tel_cel == '' )){
                tel_ = tel_casa;
              }else if((tel_casa == null || tel_casa == 0 || tel_casa == '' ) && (tel_cel != null || tel_cel != 0 || tel_cel != '' )){
                tel_ = tel_cel;
              }else if((tel_casa != null || tel_casa != 0 || tel_casa != '' ) && (tel_cel != null || tel_cel != 0 || tel_cel != '' )){
                tel_ = tel_cel;
              }


              console.log("telefono - "+tel_);

              this.form.controls['CorreoElectronico'].reset({ value: tel_ + '@unitec.edu.mx', disabled: false });
              this.conEmail = false;
          }




          // -------------------------------- Predictivo  ----------------------------------
          let tel_casa_predictivo = "";
          if(this.form.value.Telefono == "" || this.form.value.Telefono == null ){

              this.form.value.Telefono = "";
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

        let _Ciclo =  this.form.value.Ciclo;
        let CicloV = _Ciclo.split('*');
        let ciclo = "";
        let nombre_ventas = "";
        let c_cita = Array("","");


        this.form.value.Banner = window.location.href;
        this.form.value.FuenteObtencion="";

        console.log("Ciclo del form: " + CicloV);
        console.log(" " );
        console.log(" " );console.log(" " );
        console.log(" " );console.log(" " );

        //En caso de ser 18-3, esos son los resultados y ubicacion de var
        console.log('CicloV[0] : '+CicloV[0]); //id
        console.log('CicloV[1] : '+CicloV[1]); //18-3
        console.log('CicloV[2] : '+CicloV[2]); //true
        console.log('CicloV[3] : '+CicloV[3]); //Mayo
        console.log('CicloV[4] : '+CicloV[4]); //C2



        let f_negocio = "";

        let c = this.form.value.Canal.split('*');
        let fuente_obtencion_nombre = "";
        c = c[1];


        if(c == "Voz"){

            f_negocio = "INBOUND";
            fuente_obtencion_nombre = "INBOUND";
            console.log("Esta es la fuente obtencion = " + fuente_obtencion_nombre);

        } else if(c == "Inbound Campus"){

            f_negocio = "INBOUND CAMPUS";
            fuente_obtencion_nombre = "INBOUND CAMPUS";
            console.log("Esta es la fuente obtencion = " + fuente_obtencion_nombre);

        }else if(c == "Inbound"){

          f_negocio = "INBOUND";
          fuente_obtencion_nombre = "INBOUND";
          console.log("Esta es la fuente obtencion = " + fuente_obtencion_nombre);

        }else if(c == "Chat"){

            f_negocio = "CHAT";
            fuente_obtencion_nombre = "CHAT";
            console.log("Esta es la fuente obtencion = " + fuente_obtencion_nombre);

        }else if(c == "Social"){

            f_negocio = "SOCIAL";
            fuente_obtencion_nombre = "SOCIAL";
            console.log("Esta es la fuente obtencion = " + fuente_obtencion_nombre);

        }else if(c == "Recuperación"){

            f_negocio = "RECUPERACION";
            fuente_obtencion_nombre = "INBOUND";
            console.log("Esta es la fuente obtencion = " + fuente_obtencion_nombre);

        }else if(c == "SMS"){

            f_negocio = "SMS";
            fuente_obtencion_nombre = "INBOUND";
            console.log("Esta es la fuente obtencion = " + fuente_obtencion_nombre);

        }else if(c == "WhatsApp"){

            f_negocio = "WhatsApp";
            fuente_obtencion_nombre = "INBOUND";
            console.log("Esta es la fuente obtencion = " + fuente_obtencion_nombre);


        }else{
                f_negocio = "INBOUND";
                this.form.value.FuenteObtencion = "INBOUND";
                fuente_obtencion_nombre = "INBOUND";

        }

        console.log("f_negocio ==> "+f_negocio);

if( this.form.value.Carrera  !== undefined){
    console.log("Estoy dentro de for para validar carrera");
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
                  if (this.rows[j].FUENTE_NEGOCIO == f_negocio && this.rows[j].CICLO == nombre_ventas && this.rows[j].CAMPUS == this.campusTxt && this.rows[j].BL == this.carreras[i].BL ) {

                      this.form.value.Team = this.rows[j].TEAM;
                      console.log("TEAM : " + this.form.value.Team);
                      this.form.value.Prioridad = this.rows[j].PRIORIDAD;
                      console.log("Prioridad : " + this.form.value.Prioridad);
                      this.form.value.Attemp = this.rows[j].ATTEMP;
                      console.log("ATTEMP : " + this.form.value.Attemp);
                      this.form.value.FuenteObtencion = this.rows[j].FUENTE_NEGOCIO;
                      console.log("Fuente Obtencion : " + this.form.value.FuenteObtencion);
                      //f_negocio = this.rows[i].FUENTE_NEGOCIO;


                  }

              }

              /**TErmina calculo de team prioridad y attemp con respecto a la universidad**/
          }

      }


          ciclo = CicloV[1];


    }

/***********Fuente Obtencion Begin***********/

let f_o = "";
f_o = this.form.value.FuenteObtencion;

let fuente_obtencion_GUID = "";



console.log("-------------------------------");
console.log("Valor de Canal y Fuente Obtencion: " + fuente_obtencion_nombre);
console.log("-------------------------------");


let fo = "";

for(let i = 0 ; i <= this.fuentesobtencion.length ; i++ ){

if(this.fuentesobtencion[i] !== undefined){
  if( this.fuentesobtencion[i].fuente_name == fuente_obtencion_nombre) {

    fuente_obtencion_GUID = this.fuentesobtencion[i].fuente_GUID;

      }
}

}
  console.log("Fuentes obtencion: " + fuente_obtencion_nombre);
  console.log("Fuente Guid: " + fuente_obtencion_GUID);

/***********Fuente Obtencion End***********/




        // -------------------------------- Predictivo  ----------------------------------
          this.form.value.Banner = window.location.href;
          this.form.value.CanalPreferido = 'Voz';
          if (this.form.value.Canal == 'Chat' || this.form.value.Canal == 'WhatsApp' || this.form.value.Canal == 'SMS') {
              this.form.value.CanalPreferido = 'Redes Sociales';
          }


          // -------------------------------- Predictivo  ----------------------------------
          let edadT = this.form.value.Edad;

          if (edadT == "") {
              edadT = null;
          }

          /* Interes GUID */
          let _Campus = (this.form.value.Campus==null)? "" : this.form.value.Campus;
          let _Nivel = (this.form.value.Nivel==null)? "": this.form.value.Nivel;
          let _Modalidad = (this.form.value.Modalidad==null)? "": this.form.value.Modalidad;
          let _Carrera = (this.form.value.Carrera==null)? "": this.form.value.Carrera;
          let _Interes =( this.form.value.AreaInteres==null)? "": this.form.value.AreaInteres;
          let _Canal = (this.form.value.Canal==null)? "": this.form.value.Canal;
          let _Parentesco = (this.form.value.ParentescoTutor == null ) ? "" : this.form.value.ParentescoTutor;


          let CampusV = _Campus.split('*');
          let NivelV = _Nivel.split('*');
          let ModalidadV = _Modalidad.split('*');
          let CarreraV = _Carrera.split('*');
          let InteresV = _Interes.split('*');
          let ParentescoV = _Parentesco.split('*');


          let CanalV = _Canal.split('*');


          console.log("TelefonoCorreo desde Form: "+this.form.value.TelefonoCorreo);
          /**********Funcion para validar si contiene Telefono o correo************/

          /*    if (isNaN(this.form.value.TelefonoCorreo)) {
                  //Aqui asignamos Correo
                      if(this.form.value.CorreoElectronico == "" || this.form.value.CorreoElectronico == null ){
                          this.form.value.CorreoElectronico = this.form.value.TelefonoCorreo;
                      }
                  console.log("Conteniene: Correo");

              } else {
                  //Aqui asignamos Telefono
                  if(this.form.value.Telefono == "" || this.form.value.Telefono == null ){
                      this.form.value.Telefono = this.form.value.TelefonoCorreo;
                  }
                  console.log("Conteniene: Telefono");
              }
         */
          /*********Termina funcion para validar si contiene Telefono o correo***********/
          /******Si la opcion de no me inter******/



          if(this.form.controls.Transferencia.value == true){
             this. arm_bandera = "Cita-"+this.form.value.Asesor;

          }else if(this.form.controls.Programacion.value == true){
              this.arm_bandera = "RLL-"+this.form.value.FechaCita+"-"+this.form.value.HoraCita+"-"+this.form.value.NumeroCelular;
          }



          if(this.form.value.CampusCita){
            c_cita = this.form.value.CampusCita.split("*");
          }else{
          c_cita = Array("","");
          }


          console.log("Campus Cita: "+c_cita[0]);
          console.log("GUIDCampuscita: "+c_cita[1]);
          console.log("GUIDCampuscita: "+c_cita[2]);


          let valor_genero  = "";
          if(this.form.value.Genero == 1 || this.form.value.Genero == "M" ){
              valor_genero = "Masculino";
          }else if(this.form.value.Genero == 2 || this.form.value.Genero == "F"){
            valor_genero = "Femenino";
          }else{


            valor_genero = null;

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



                    let  l_seg = "";
                    let obj_seguimiento : any;


                    let f_o_ = (fuente_obtencion_abreviatura == '')?'':fuente_obtencion_abreviatura;
                    let c_a_ = (campus_abreviatura == '')?'':campus_abreviatura;
                    let n_a = (nivel_abreviatura == '')?'':nivel_abreviatura;



                    this.form.value.Nombre = this.form.value.Nombre.toUpperCase();
                    this.form.value.ApellidoPaterno = this.form.value.ApellidoPaterno.toUpperCase();
                    this.form.value.ApellidoMaterno = this.form.value.ApellidoMaterno.toUpperCase();

                    this.form.value.NombreTutor = this.form.value.NombreTutor.toUpperCase();
                    this.form.value.ApellidoPaternoTutor = this.form.value.ApellidoPaternoTutor.toUpperCase();
                    this.form.value.ApellidoMaternoTutor = this.form.value.ApellidoMaternoTutor.toUpperCase();

                    this.form.value.CorreoElectronico = this.form.value.CorreoElectronico.toUpperCase();
                    this.form.value.CorreoElectronicoTutor = this.form.value.CorreoElectronicoTutor.toUpperCase();

                    this.form.value.TelefonoCorreo = this.form.value.TelefonoCorreo.toUpperCase();


              if(this.form.value.CorreoElectronico == '' || this.form.value.CorreoElectronico == null ){

                  if( this.form.value.NumeroCelular != null  && this.form.value.Telefono != null ){

                    this.form.value.CorreoElectronico = this.form.value.NumeroCelular+"@UNITEC.EDU.MX";
                    console.log("Valor de correo: "+this.form.value.CorreoElectronico);

                  }else if(this.form.value.NumeroCelular != null && this.form.value.Telefono == null ){

                    this.form.value.CorreoElectronico = this.form.value.NumeroCelular+"@UNITEC.EDU.MX";
                    console.log("Valor de correo: "+this.form.value.CorreoElectronico);

                  }else if(this.form.value.Telefono != null && this.form.value.NumeroCelular == null ){

                    this.form.value.CorreoElectronico = this.form.value.Telefono+"@UNITEC.EDU.MX";
                    console.log("Valor de correo: "+this.form.value.CorreoElectronico);
                  }



              }




              if( ( edadT == null || edadT === undefined || edadT == '' ) && ( valor_genero == null || valor_genero === undefined || valor_genero == '' ) && ( this.form.value.FechaCita == null || this.form.value.FechaCita === undefined || this.form.value.FechaCita == '') ){



                this.sendd = { //Envio de Variables

                  Usuario: ( this.form.value.Usuario =='')? null : this.form.value.Usuario,

                  Canal: ( CanalV[1] =='')? null : CanalV[1],   //Se envia Canal en vez de CanalPreferido
                  CSQ: ( this.form.value.CSQ =='')? null : this.form.value.CSQ,
                  TelefonoCorreo: ( this.form.value.TelefonoCorreo =='')? null : this.form.value.TelefonoCorreo,
                  Interesa_NoInteresa: (this.form.value.Interesa_NoInteresa = '') ? null : this.form.value.Interesa_NoInteresa,


                  Nombre: ( this.form.value.Nombre =='')? null : this.getValidaCampo("Nombre", this.form.value.Nombre),
                  ApellidoPaterno: ( this.form.value.ApellidoPaterno =='')? null : this.getValidaCampo("Paterno", this.form.value.ApellidoPaterno),
                  ApellidoMaterno: ( this.form.value.ApellidoMaterno =='')? null : this.getValidaCampo("Materno", this.form.value.ApellidoMaterno),
                  CorreoElectronico: ( this.form.value.CorreoElectronico =='')? null : this.form.value.CorreoElectronico,
                  NombreTutor: ( this.form.value.NombreTutor =='')? null : this.getValidaCampo("Nombre Tutor", this.form.value.NombreTutor),
                  ApellidoPaternoTutor: ( this.form.value.ApellidoPaternoTutor =='')? null : this.getValidaCampo("Paterno Tutor", this.form.value.ApellidoPaternoTutor),
                  ApellidoMaternoTutor: ( this.form.value.ApellidoMaternoTutor =='')? null : this.getValidaCampo("Materno Tutor", this.form.value.ApellidoMaternoTutor),
                  CorreoElectronicoTutor: ( this.form.value.CorreoElectronicoTutor =='')? null : this.form.value.CorreoElectronicoTutor,

                  ParentescoTutor: ( ParentescoV[0] == '')? null : ParentescoV[0],
                  GUIDParentescotutor: (ParentescoV[0] == '' || ParentescoV[0] == undefined )? null : ParentescoV[1],

                  Campus:(CampusV[1]=='')? null : CampusV[1],
                  Nivel: (NivelV[1]=='')? null : NivelV[1],
                  Modalidad: (ModalidadV[1]=='')? null : ModalidadV[1],
                  Carrera: (CarreraV[1]=='')? null : CarreraV[1],
                  AreaInteres:(InteresV[1]=='')? null : InteresV[1],
                  //Ciclo: CicloV[1],
                  Ciclo: (ciclo=='')? null : ciclo,

                  CampusCita: (c_cita[0] == "" ) ? null : c_cita[0],
                  GUIDCampusCita: (c_cita[1] == '') ? null : c_cita[1],

                  GUIDCanal: (CanalV[0]=='')? null : CanalV[0],
                  GUIDCampus: (CampusV[0]=='')? null : CampusV[0],
                  GUIDNivelInteres: (NivelV[0]=='')? null : NivelV[0],
                  GUIDModalidad: (ModalidadV[0]=='')? null : ModalidadV[0],
                  GUIDCarrera: (CarreraV[0]=='')? null : CarreraV[0],
                  GUIDAreaInteres:(InteresV[0]=='')? null : InteresV[0],
                  GUIDCiclo:( CicloV[0]=='')? null : CicloV[0],
                  GUIDUsuario: ( localStorage.getItem('UserId') =='')? null : localStorage.getItem('UserId'),
                  FuenteNegocio : (f_negocio == "")? "INBOUND" : f_negocio,

                  Banner: (this.form.value.Banner =='')? null : this.form.value.Banner,

                  Tipificacion: (this.form.value.Tipificacion =='')? null : this.Tipificacion_con_GUID,
                  EtapaProcesoVentaGUID: (this._etapaprocesoventaid == '' )?null:this._etapaprocesoventaid,


                  Notas: (this.form.value.Notas == '') ? null : this.form.value.Notas,

                  Asesor: (this.form.value.Asesor) ? null : this.form.value.Asesor,

                  Team: (this.form.value.Team == undefined) ? null : this.form.value.Team,
                  Prioridad: (this.form.value.Prioridad == undefined) ? 0 : this.form.value.Prioridad,
                  Attemp: (this.form.value.Attemp == undefined) ? 0 : this.form.value.Attemp,
                  GUIDFuentedeObtencion: (fuente_obtencion_GUID == '') ? '2e89dd13-6072-e211-b35f-6cae8b2a4ddc' : fuente_obtencion_GUID,

                  fuenteobtencion: (fuente_obtencion_nombre == "")? null : fuente_obtencion_nombre,


                  //Numero Celular
                  Telefono: (this.form.value.NumeroCelular == "")? null :this.form.value.NumeroCelular,
                  TelefonoPredictivo:(this.form.value.TelefonoCelularPredictivo == "9045null") ? null : this.form.value.TelefonoCelularPredictivo,
                  //Numero Telefono o Telefono Casa
                  TelefonoCasa: (this.form.value.Telefono == "")? null : this.form.value.Telefono,
                  TelefonoCasaPredictivo: (this.form.value.Telefono == '' || this.form.value.Telefono == null) ? '': tel_casa_predictivo,


                  //Numero Celular Tutor
                  NumeroCelularTutor:(this.form.value.NumeroCelularTutor=='')?null : this.form.value.NumeroCelularTutor,
                  TelefonoCelularPredictivoTutor:(this.form.value.TelefonoCelularPredictivoTutor == "9045null") ? null : this.form.value.TelefonoCelularPredictivoTutor,
                  //Numero Casa Tutor
                  TelefonoTutor:(this.form.value.TelefonoTutor=='')?null:this.form.value.TelefonoTutor,
                  TelefonoCasaTutorPredictivo: (this.form.value.TelefonoPredictivoTutor == "901null") ? null : this.form.value.TelefonoPredictivoTutor,

              };



              }else if(( edadT != null || edadT !== undefined || edadT != '' ) && ( valor_genero == null || valor_genero === undefined || valor_genero == '' ) && ( this.form.value.FechaCita == null || this.form.value.FechaCita === undefined || this.form.value.FechaCita == '') ){


                this.sendd = { //Envio de Variables

                  Usuario: ( this.form.value.Usuario =='')? null : this.form.value.Usuario,

                  Canal: ( CanalV[1] =='')? null : CanalV[1],   //Se envia Canal en vez de CanalPreferido
                  CSQ: ( this.form.value.CSQ =='')? null : this.form.value.CSQ,
                  TelefonoCorreo: ( this.form.value.TelefonoCorreo =='')? null : this.form.value.TelefonoCorreo,
                  Interesa_NoInteresa: (this.form.value.Interesa_NoInteresa = '') ? null : this.form.value.Interesa_NoInteresa,


                  Nombre: ( this.form.value.Nombre =='')? null : this.getValidaCampo("Nombre", this.form.value.Nombre),
                  ApellidoPaterno: ( this.form.value.ApellidoPaterno =='')? null : this.getValidaCampo("Paterno", this.form.value.ApellidoPaterno),
                  ApellidoMaterno: ( this.form.value.ApellidoMaterno =='')? null : this.getValidaCampo("Materno", this.form.value.ApellidoMaterno),
                  CorreoElectronico: ( this.form.value.CorreoElectronico =='')? null : this.form.value.CorreoElectronico,
                  Edad: ( edadT =='')? null : edadT,
                  NombreTutor: ( this.form.value.NombreTutor =='')? null : this.getValidaCampo("Nombre Tutor", this.form.value.NombreTutor),
                  ApellidoPaternoTutor: ( this.form.value.ApellidoPaternoTutor =='')? null : this.getValidaCampo("Paterno Tutor", this.form.value.ApellidoPaternoTutor),
                  ApellidoMaternoTutor: ( this.form.value.ApellidoMaternoTutor =='')? null : this.getValidaCampo("Materno Tutor", this.form.value.ApellidoMaternoTutor),
                  CorreoElectronicoTutor: ( this.form.value.CorreoElectronicoTutor =='')? null : this.form.value.CorreoElectronicoTutor,

                  ParentescoTutor: ( ParentescoV[0] == '')? null : ParentescoV[0],
                  GUIDParentescotutor: (ParentescoV[0] == '' || ParentescoV[0] == undefined )? null : ParentescoV[1],

                  Campus:(CampusV[1]=='')? null : CampusV[1],
                  Nivel: (NivelV[1]=='')? null : NivelV[1],
                  Modalidad: (ModalidadV[1]=='')? null : ModalidadV[1],
                  Carrera: (CarreraV[1]=='')? null : CarreraV[1],
                  AreaInteres:(InteresV[1]=='')? null : InteresV[1],
                  //Ciclo: CicloV[1],
                  Ciclo: (ciclo=='')? null : ciclo,

                  CampusCita: (c_cita[0] == "" ) ? null : c_cita[0],
                  GUIDCampusCita: (c_cita[1] == '') ? null : c_cita[1],

                  GUIDCanal: (CanalV[0]=='')? null : CanalV[0],
                  GUIDCampus: (CampusV[0]=='')? null : CampusV[0],
                  GUIDNivelInteres: (NivelV[0]=='')? null : NivelV[0],
                  GUIDModalidad: (ModalidadV[0]=='')? null : ModalidadV[0],
                  GUIDCarrera: (CarreraV[0]=='')? null : CarreraV[0],
                  GUIDAreaInteres:(InteresV[0]=='')? null : InteresV[0],
                  GUIDCiclo:( CicloV[0]=='')? null : CicloV[0],
                  GUIDUsuario: ( localStorage.getItem('UserId') =='')? null : localStorage.getItem('UserId'),
                  FuenteNegocio : (f_negocio == "")? "INBOUND" : f_negocio,

                  Banner: (this.form.value.Banner =='')? null : this.form.value.Banner,

                  Tipificacion: (this.form.value.Tipificacion =='')? null : this.Tipificacion_con_GUID,
                  EtapaProcesoVentaGUID: (this._etapaprocesoventaid == '' )?null:this._etapaprocesoventaid,

                  Notas: (this.form.value.Notas == '') ? null : this.form.value.Notas,

                  Asesor: (this.form.value.Asesor) ? null : this.form.value.Asesor,

                  Team: (this.form.value.Team == undefined) ? null : this.form.value.Team,
                  Prioridad: (this.form.value.Prioridad == undefined) ? 0 : this.form.value.Prioridad,
                  Attemp: (this.form.value.Attemp == undefined) ? 0 : this.form.value.Attemp,
                  GUIDFuentedeObtencion: (fuente_obtencion_GUID == '') ? '2e89dd13-6072-e211-b35f-6cae8b2a4ddc' : fuente_obtencion_GUID,

                  fuenteobtencion: (fuente_obtencion_nombre == "")? null : fuente_obtencion_nombre,


                  //Numero Celular
                  Telefono: (this.form.value.NumeroCelular == "")? null :this.form.value.NumeroCelular,
                  TelefonoPredictivo:(this.form.value.TelefonoCelularPredictivo == "9045null") ? null : this.form.value.TelefonoCelularPredictivo,
                  //Numero Telefono o Telefono Casa
                  TelefonoCasa: (this.form.value.Telefono == "")? null : this.form.value.Telefono,
                  TelefonoCasaPredictivo: (this.form.value.Telefono == '' || this.form.value.Telefono == null) ? '': tel_casa_predictivo,


                  //Numero Celular Tutor
                  NumeroCelularTutor:(this.form.value.NumeroCelularTutor=='')?null : this.form.value.NumeroCelularTutor,
                  TelefonoCelularPredictivoTutor:(this.form.value.TelefonoCelularPredictivoTutor == "9045null") ? null : this.form.value.TelefonoCelularPredictivoTutor,
                  //Numero Casa Tutor
                  TelefonoTutor:(this.form.value.TelefonoTutor=='')?null:this.form.value.TelefonoTutor,
                  TelefonoCasaTutorPredictivo: (this.form.value.TelefonoPredictivoTutor == "901null") ? null : this.form.value.TelefonoPredictivoTutor,

              };


              }else if( ( edadT == null || edadT === undefined || edadT == '' ) && ( valor_genero != null || valor_genero !== undefined || valor_genero != '' ) && ( this.form.value.FechaCita == null || this.form.value.FechaCita === undefined || this.form.value.FechaCita == '') ){

                this.sendd = { //Envio de Variables

                  Usuario: ( this.form.value.Usuario =='')? null : this.form.value.Usuario,

                  Canal: ( CanalV[1] =='')? null : CanalV[1],   //Se envia Canal en vez de CanalPreferido
                  CSQ: ( this.form.value.CSQ =='')? null : this.form.value.CSQ,
                  TelefonoCorreo: ( this.form.value.TelefonoCorreo =='')? null : this.form.value.TelefonoCorreo,
                  Interesa_NoInteresa: (this.form.value.Interesa_NoInteresa = '') ? null : this.form.value.Interesa_NoInteresa,


                  Nombre: ( this.form.value.Nombre =='')? null : this.getValidaCampo("Nombre", this.form.value.Nombre),
                  ApellidoPaterno: ( this.form.value.ApellidoPaterno =='')? null : this.getValidaCampo("Paterno", this.form.value.ApellidoPaterno),
                  ApellidoMaterno: ( this.form.value.ApellidoMaterno =='')? null : this.getValidaCampo("Materno", this.form.value.ApellidoMaterno),
                  CorreoElectronico: ( this.form.value.CorreoElectronico =='')? null : this.form.value.CorreoElectronico,
                  Genero: (valor_genero == '')? null : valor_genero,
                  NombreTutor: ( this.form.value.NombreTutor =='')? null : this.getValidaCampo("Nombre Tutor", this.form.value.NombreTutor),
                  ApellidoPaternoTutor: ( this.form.value.ApellidoPaternoTutor =='')? null : this.getValidaCampo("Paterno Tutor", this.form.value.ApellidoPaternoTutor),
                  ApellidoMaternoTutor: ( this.form.value.ApellidoMaternoTutor =='')? null : this.getValidaCampo("Materno Tutor", this.form.value.ApellidoMaternoTutor),
                  CorreoElectronicoTutor: ( this.form.value.CorreoElectronicoTutor =='')? null : this.form.value.CorreoElectronicoTutor,

                  ParentescoTutor: ( ParentescoV[0] == '')? null : ParentescoV[0],
                  GUIDParentescotutor: (ParentescoV[0] == '' || ParentescoV[0] == undefined )? null : ParentescoV[1],

                  Campus:(CampusV[1]=='')? null : CampusV[1],
                  Nivel: (NivelV[1]=='')? null : NivelV[1],
                  Modalidad: (ModalidadV[1]=='')? null : ModalidadV[1],
                  Carrera: (CarreraV[1]=='')? null : CarreraV[1],
                  AreaInteres:(InteresV[1]=='')? null : InteresV[1],
                  //Ciclo: CicloV[1],
                  Ciclo: (ciclo=='')? null : ciclo,

                  CampusCita: (c_cita[0] == "" ) ? null : c_cita[0],
                  GUIDCampusCita: (c_cita[1] == '') ? null : c_cita[1],

                  GUIDCanal: (CanalV[0]=='')? null : CanalV[0],
                  GUIDCampus: (CampusV[0]=='')? null : CampusV[0],
                  GUIDNivelInteres: (NivelV[0]=='')? null : NivelV[0],
                  GUIDModalidad: (ModalidadV[0]=='')? null : ModalidadV[0],
                  GUIDCarrera: (CarreraV[0]=='')? null : CarreraV[0],
                  GUIDAreaInteres:(InteresV[0]=='')? null : InteresV[0],
                  GUIDCiclo:( CicloV[0]=='')? null : CicloV[0],
                  GUIDUsuario: ( localStorage.getItem('UserId') =='')? null : localStorage.getItem('UserId'),
                  FuenteNegocio : (f_negocio == "")? "INBOUND" : f_negocio,

                  Banner: (this.form.value.Banner =='')? null : this.form.value.Banner,

                  Tipificacion: (this.form.value.Tipificacion =='')? null : this.Tipificacion_con_GUID,
                  EtapaProcesoVentaGUID: (this._etapaprocesoventaid == '' )?null:this._etapaprocesoventaid,

                  Notas: (this.form.value.Notas == '') ? null : this.form.value.Notas,

                  Asesor: (this.form.value.Asesor) ? null : this.form.value.Asesor,

                  Team: (this.form.value.Team == undefined) ? null : this.form.value.Team,
                  Prioridad: (this.form.value.Prioridad == undefined) ? 0 : this.form.value.Prioridad,
                  Attemp: (this.form.value.Attemp == undefined) ? 0 : this.form.value.Attemp,
                  GUIDFuentedeObtencion: (fuente_obtencion_GUID == '') ? '2e89dd13-6072-e211-b35f-6cae8b2a4ddc' : fuente_obtencion_GUID,

                  fuenteobtencion: (fuente_obtencion_nombre == "")? null : fuente_obtencion_nombre,


                  //Numero Celular
                  Telefono: (this.form.value.NumeroCelular == "")? null :this.form.value.NumeroCelular,
                  TelefonoPredictivo:(this.form.value.TelefonoCelularPredictivo == "9045null") ? null : this.form.value.TelefonoCelularPredictivo,
                  //Numero Telefono o Telefono Casa
                  TelefonoCasa: (this.form.value.Telefono == "")? null : this.form.value.Telefono,
                  TelefonoCasaPredictivo: (this.form.value.Telefono == '' || this.form.value.Telefono == null) ? '': tel_casa_predictivo,


                  //Numero Celular Tutor
                  NumeroCelularTutor:(this.form.value.NumeroCelularTutor=='')?null : this.form.value.NumeroCelularTutor,
                  TelefonoCelularPredictivoTutor:(this.form.value.TelefonoCelularPredictivoTutor == "9045null") ? null : this.form.value.TelefonoCelularPredictivoTutor,
                  //Numero Casa Tutor
                  TelefonoTutor:(this.form.value.TelefonoTutor=='')?null:this.form.value.TelefonoTutor,
                  TelefonoCasaTutorPredictivo: (this.form.value.TelefonoPredictivoTutor == "901null") ? null : this.form.value.TelefonoPredictivoTutor,

              };


              }else if(( edadT == null || edadT === undefined || edadT == '' ) && ( valor_genero != null || valor_genero !== undefined || valor_genero != '' ) && ( this.form.value.FechaCita != null || this.form.value.FechaCita !== undefined || this.form.value.FechaCita != '')){

              this.sendd = { //Envio de Variables

                Usuario: ( this.form.value.Usuario =='')? null : this.form.value.Usuario,

                Canal: ( CanalV[1] =='')? null : CanalV[1],   //Se envia Canal en vez de CanalPreferido
                CSQ: ( this.form.value.CSQ =='')? null : this.form.value.CSQ,
                TelefonoCorreo: ( this.form.value.TelefonoCorreo =='')? null : this.form.value.TelefonoCorreo,
                Interesa_NoInteresa: (this.form.value.Interesa_NoInteresa = '') ? null : this.form.value.Interesa_NoInteresa,


                Nombre: ( this.form.value.Nombre =='')? null : this.getValidaCampo("Nombre", this.form.value.Nombre),
                ApellidoPaterno: ( this.form.value.ApellidoPaterno =='')? null : this.getValidaCampo("Paterno", this.form.value.ApellidoPaterno),
                ApellidoMaterno: ( this.form.value.ApellidoMaterno =='')? null : this.getValidaCampo("Materno", this.form.value.ApellidoMaterno),
                CorreoElectronico: ( this.form.value.CorreoElectronico =='')? null : this.form.value.CorreoElectronico,
                Genero: (valor_genero == '')? null : valor_genero,
                NombreTutor: ( this.form.value.NombreTutor =='')? null : this.getValidaCampo("Nombre Tutor", this.form.value.NombreTutor),
                ApellidoPaternoTutor: ( this.form.value.ApellidoPaternoTutor =='')? null : this.getValidaCampo("Paterno Tutor", this.form.value.ApellidoPaternoTutor),
                ApellidoMaternoTutor: ( this.form.value.ApellidoMaternoTutor =='')? null : this.getValidaCampo("Materno Tutor", this.form.value.ApellidoMaternoTutor),
                CorreoElectronicoTutor: ( this.form.value.CorreoElectronicoTutor =='')? null : this.form.value.CorreoElectronicoTutor,

                ParentescoTutor: ( ParentescoV[0] == '')? null : ParentescoV[0],
                GUIDParentescotutor: (ParentescoV[0] == '' || ParentescoV[0] == undefined )? null : ParentescoV[1],

                Campus:(CampusV[1]=='')? null : CampusV[1],
                Nivel: (NivelV[1]=='')? null : NivelV[1],
                Modalidad: (ModalidadV[1]=='')? null : ModalidadV[1],
                Carrera: (CarreraV[1]=='')? null : CarreraV[1],
                AreaInteres:(InteresV[1]=='')? null : InteresV[1],
                //Ciclo: CicloV[1],
                Ciclo: (ciclo=='')? null : ciclo,

                CampusCita: (c_cita[0] == "" ) ? null : c_cita[0],
                GUIDCampusCita: (c_cita[1] == '') ? null : c_cita[1],

                GUIDCanal: (CanalV[0]=='')? null : CanalV[0],
                GUIDCampus: (CampusV[0]=='')? null : CampusV[0],
                GUIDNivelInteres: (NivelV[0]=='')? null : NivelV[0],
                GUIDModalidad: (ModalidadV[0]=='')? null : ModalidadV[0],
                GUIDCarrera: (CarreraV[0]=='')? null : CarreraV[0],
                GUIDAreaInteres:(InteresV[0]=='')? null : InteresV[0],
                GUIDCiclo:( CicloV[0]=='')? null : CicloV[0],
                GUIDUsuario: ( localStorage.getItem('UserId') =='')? null : localStorage.getItem('UserId'),
                FuenteNegocio : (f_negocio == "")? "INBOUND" : f_negocio,

                Banner: (this.form.value.Banner =='')? null : this.form.value.Banner,
                Bandera: (this.cita == '') ? null : this.cita,

                Tipificacion: (this.form.value.Tipificacion =='')? null : this.Tipificacion_con_GUID,
                EtapaProcesoVentaGUID: (this._etapaprocesoventaid == '' )?null:this._etapaprocesoventaid,

                Notas: (this.form.value.Notas == '') ? null : this.form.value.Notas,

                FechaCita: (this.form.value.FechaCita == undefined || this.form.value.FechaCita =="aN/aN/NaN") ? null : this.form.value.FechaCita,
                HoraCita: (this.form.value.HoraCita == undefined || this.form.value.HoraCita=="") ? null : this.form.value.HoraCita,


                Asesor: (this.form.value.Asesor) ? null : this.form.value.Asesor,

                Team: (this.form.value.Team == undefined) ? null : this.form.value.Team,
                Prioridad: (this.form.value.Prioridad == undefined) ? 0 : this.form.value.Prioridad,
                Attemp: (this.form.value.Attemp == undefined) ? 0 : this.form.value.Attemp,
                GUIDFuentedeObtencion: (fuente_obtencion_GUID == '') ? '2e89dd13-6072-e211-b35f-6cae8b2a4ddc' : fuente_obtencion_GUID,

                fuenteobtencion: (fuente_obtencion_nombre == "")? null : fuente_obtencion_nombre,


                //Numero Celular
                Telefono: (this.form.value.NumeroCelular == "")? null :this.form.value.NumeroCelular,
                TelefonoPredictivo:(this.form.value.TelefonoCelularPredictivo == "9045null") ? null : this.form.value.TelefonoCelularPredictivo,
                //Numero Telefono o Telefono Casa
                TelefonoCasa: (this.form.value.Telefono == "")? null : this.form.value.Telefono,
                TelefonoCasaPredictivo: (this.form.value.Telefono == '' || this.form.value.Telefono == null) ? '': tel_casa_predictivo,


                //Numero Celular Tutor
                NumeroCelularTutor:(this.form.value.NumeroCelularTutor=='')?null : this.form.value.NumeroCelularTutor,
                TelefonoCelularPredictivoTutor:(this.form.value.TelefonoCelularPredictivoTutor == "9045null") ? null : this.form.value.TelefonoCelularPredictivoTutor,
                //Numero Casa Tutor
                TelefonoTutor:(this.form.value.TelefonoTutor=='')?null:this.form.value.TelefonoTutor,
                TelefonoCasaTutorPredictivo: (this.form.value.TelefonoPredictivoTutor == "901null") ? null : this.form.value.TelefonoPredictivoTutor,

              };

            }else if(( edadT != null || edadT !== undefined || edadT != '' ) && ( valor_genero == null || valor_genero === undefined || valor_genero == '' ) && ( this.form.value.FechaCita != null || this.form.value.FechaCita !== undefined || this.form.value.FechaCita != '')){


              this.sendd = { //Envio de Variables

                Usuario: ( this.form.value.Usuario =='')? null : this.form.value.Usuario,

                Canal: ( CanalV[1] =='')? null : CanalV[1],   //Se envia Canal en vez de CanalPreferido
                CSQ: ( this.form.value.CSQ =='')? null : this.form.value.CSQ,
                TelefonoCorreo: ( this.form.value.TelefonoCorreo =='')? null : this.form.value.TelefonoCorreo,
                Interesa_NoInteresa: (this.form.value.Interesa_NoInteresa = '') ? null : this.form.value.Interesa_NoInteresa,


                Nombre: ( this.form.value.Nombre =='')? null : this.getValidaCampo("Nombre", this.form.value.Nombre),
                ApellidoPaterno: ( this.form.value.ApellidoPaterno =='')? null : this.getValidaCampo("Paterno", this.form.value.ApellidoPaterno),
                ApellidoMaterno: ( this.form.value.ApellidoMaterno =='')? null : this.getValidaCampo("Materno", this.form.value.ApellidoMaterno),
                CorreoElectronico: ( this.form.value.CorreoElectronico =='')? null : this.form.value.CorreoElectronico,
                Edad: ( edadT =='')? null : edadT,
               //SinCorreo: this.form.value.SinCorreo,

                NombreTutor: ( this.form.value.NombreTutor =='')? null : this.getValidaCampo("Nombre Tutor", this.form.value.NombreTutor),
                ApellidoPaternoTutor: ( this.form.value.ApellidoPaternoTutor =='')? null : this.getValidaCampo("Paterno Tutor", this.form.value.ApellidoPaternoTutor),
                ApellidoMaternoTutor: ( this.form.value.ApellidoMaternoTutor =='')? null : this.getValidaCampo("Materno Tutor", this.form.value.ApellidoMaternoTutor),
                CorreoElectronicoTutor: ( this.form.value.CorreoElectronicoTutor =='')? null : this.form.value.CorreoElectronicoTutor,

                ParentescoTutor: ( ParentescoV[0] == '')? null : ParentescoV[0],
                GUIDParentescotutor: (ParentescoV[0] == '' || ParentescoV[0] == undefined )? null : ParentescoV[1],

                Campus:(CampusV[1]=='')? null : CampusV[1],
                Nivel: (NivelV[1]=='')? null : NivelV[1],
                Modalidad: (ModalidadV[1]=='')? null : ModalidadV[1],
                Carrera: (CarreraV[1]=='')? null : CarreraV[1],
                AreaInteres:(InteresV[1]=='')? null : InteresV[1],
                //Ciclo: CicloV[1],
                Ciclo: (ciclo=='')? null : ciclo,

                CampusCita: (c_cita[0] == "" ) ? null : c_cita[0],
                GUIDCampusCita: (c_cita[1] == '') ? null : c_cita[1],

                GUIDCanal: (CanalV[0]=='')? null : CanalV[0],
                GUIDCampus: (CampusV[0]=='')? null : CampusV[0],
                GUIDNivelInteres: (NivelV[0]=='')? null : NivelV[0],
                GUIDModalidad: (ModalidadV[0]=='')? null : ModalidadV[0],
                GUIDCarrera: (CarreraV[0]=='')? null : CarreraV[0],
                GUIDAreaInteres:(InteresV[0]=='')? null : InteresV[0],
                GUIDCiclo:( CicloV[0]=='')? null : CicloV[0],
                GUIDUsuario: ( localStorage.getItem('UserId') =='')? null : localStorage.getItem('UserId'),
                FuenteNegocio : (f_negocio == "")? "INBOUND" : f_negocio,

                Banner: (this.form.value.Banner =='')? null : this.form.value.Banner,
                Bandera: (this.cita == '') ? null :this.cita,

                Tipificacion: (this.form.value.Tipificacion =='')? null : this.Tipificacion_con_GUID,
                EtapaProcesoVentaGUID: (this._etapaprocesoventaid == '' )?null:this._etapaprocesoventaid,


                Notas: (this.form.value.Notas == '') ? null : this.form.value.Notas,
                HoraCita: (this.form.value.HoraCita == undefined || this.form.value.HoraCita=="") ? null : this.form.value.HoraCita,
                Asesor: (this.form.value.Asesor) ? null : this.form.value.Asesor,

                Team: (this.form.value.Team == undefined) ? null : this.form.value.Team,
                Prioridad: (this.form.value.Prioridad == undefined) ? 0 : this.form.value.Prioridad,
                Attemp: (this.form.value.Attemp == undefined) ? 0 : this.form.value.Attemp,
                GUIDFuentedeObtencion: (fuente_obtencion_GUID == '') ? '2e89dd13-6072-e211-b35f-6cae8b2a4ddc' : fuente_obtencion_GUID,

                fuenteobtencion: (fuente_obtencion_nombre == "")? null : fuente_obtencion_nombre,

                //Numero Celular
                Telefono: (this.form.value.NumeroCelular == "")? null :this.form.value.NumeroCelular,
                TelefonoPredictivo:(this.form.value.TelefonoCelularPredictivo == "9045null") ? null : this.form.value.TelefonoCelularPredictivo,
                //Numero Telefono o Telefono Casa
                TelefonoCasa: (this.form.value.Telefono == "")? null : this.form.value.Telefono,
                TelefonoCasaPredictivo: (this.form.value.Telefono == '' || this.form.value.Telefono == null) ? '': tel_casa_predictivo,


                //Numero Celular Tutor
                NumeroCelularTutor:(this.form.value.NumeroCelularTutor=='')?null : this.form.value.NumeroCelularTutor,
                TelefonoCelularPredictivoTutor:(this.form.value.TelefonoCelularPredictivoTutor == "9045null") ? null : this.form.value.TelefonoCelularPredictivoTutor,
                //Numero Casa Tutor
                TelefonoTutor:(this.form.value.TelefonoTutor=='')?null:this.form.value.TelefonoTutor,
                TelefonoCasaTutorPredictivo: (this.form.value.TelefonoPredictivoTutor == "901null") ? null : this.form.value.TelefonoPredictivoTutor,

            };



            }else if( this.form.value.FechaCita == null || this.form.value.FechaCita == '' || this.form.value.FechaCita == 'aN/aN/NaN'){

          this.sendd = { //Envio de Variables

              Usuario: ( this.form.value.Usuario =='')? null : this.form.value.Usuario,

              Canal: ( CanalV[1] =='')? null : CanalV[1],   //Se envia Canal en vez de CanalPreferido
              CSQ: ( this.form.value.CSQ =='')? null : this.form.value.CSQ,
              TelefonoCorreo: ( this.form.value.TelefonoCorreo =='')? null : this.form.value.TelefonoCorreo,
              Interesa_NoInteresa: (this.form.value.Interesa_NoInteresa = '') ? null : this.form.value.Interesa_NoInteresa,


              Nombre: ( this.form.value.Nombre =='')? null : this.getValidaCampo("Nombre", this.form.value.Nombre),
              ApellidoPaterno: ( this.form.value.ApellidoPaterno =='')? null : this.getValidaCampo("Paterno", this.form.value.ApellidoPaterno),
              ApellidoMaterno: ( this.form.value.ApellidoMaterno =='')? null : this.getValidaCampo("Materno", this.form.value.ApellidoMaterno),
              CorreoElectronico: ( this.form.value.CorreoElectronico =='')? null : this.form.value.CorreoElectronico,

              Genero: (valor_genero == '')? null : valor_genero,
              Edad: ( edadT =='')? null : edadT,
             //SinCorreo: this.form.value.SinCorreo,

              NombreTutor: ( this.form.value.NombreTutor =='')? null : this.getValidaCampo("Nombre Tutor", this.form.value.NombreTutor),
              ApellidoPaternoTutor: ( this.form.value.ApellidoPaternoTutor =='')? null : this.getValidaCampo("Paterno Tutor", this.form.value.ApellidoPaternoTutor),
              ApellidoMaternoTutor: ( this.form.value.ApellidoMaternoTutor =='')? null : this.getValidaCampo("Materno Tutor", this.form.value.ApellidoMaternoTutor),
              CorreoElectronicoTutor: ( this.form.value.CorreoElectronicoTutor =='')? null : this.form.value.CorreoElectronicoTutor,

              ParentescoTutor: ( ParentescoV[0] == '')? null : ParentescoV[0],
              GUIDParentescotutor: (ParentescoV[0] == '' || ParentescoV[0] == undefined )? null : ParentescoV[1],

              Campus:(CampusV[1]=='')? null : CampusV[1],
              Nivel: (NivelV[1]=='')? null : NivelV[1],
              Modalidad: (ModalidadV[1]=='')? null : ModalidadV[1],
              Carrera: (CarreraV[1]=='')? null : CarreraV[1],
              AreaInteres:(InteresV[1]=='')? null : InteresV[1],
              //Ciclo: CicloV[1],
              Ciclo: (ciclo=='')? null : ciclo,

              CampusCita: (c_cita[0] == "" ) ? null : c_cita[0],
              GUIDCampusCita: (c_cita[1] == '') ? null : c_cita[1],

              GUIDCanal: (CanalV[0]=='')? null : CanalV[0],
              GUIDCampus: (CampusV[0]=='')? null : CampusV[0],
              GUIDNivelInteres: (NivelV[0]=='')? null : NivelV[0],
              GUIDModalidad: (ModalidadV[0]=='')? null : ModalidadV[0],
              GUIDCarrera: (CarreraV[0]=='')? null : CarreraV[0],
              GUIDAreaInteres:(InteresV[0]=='')? null : InteresV[0],
              GUIDCiclo:( CicloV[0]=='')? null : CicloV[0],
              GUIDUsuario: ( localStorage.getItem('UserId') =='')? null : localStorage.getItem('UserId'),
              FuenteNegocio : (f_negocio == "")? "INBOUND" : f_negocio,

              Banner: (this.form.value.Banner =='')? null : this.form.value.Banner,

              Tipificacion: (this.form.value.Tipificacion =='')? null : this.Tipificacion_con_GUID,
              EtapaProcesoVentaGUID: (this._etapaprocesoventaid == '' )?null:this._etapaprocesoventaid,

              Notas: (this.form.value.Notas == '') ? null : this.form.value.Notas,

              Asesor: (this.form.value.Asesor) ? null : this.form.value.Asesor,

              Team: (this.form.value.Team == undefined) ? null : this.form.value.Team,
              Prioridad: (this.form.value.Prioridad == undefined) ? 0 : this.form.value.Prioridad,
              Attemp: (this.form.value.Attemp == undefined) ? 0 : this.form.value.Attemp,
              GUIDFuentedeObtencion: (fuente_obtencion_GUID == '') ? '2e89dd13-6072-e211-b35f-6cae8b2a4ddc' : fuente_obtencion_GUID,

              fuenteobtencion: (fuente_obtencion_nombre == "")? null : fuente_obtencion_nombre,


              //Numero Celular
              Telefono: (this.form.value.NumeroCelular == "")? null :this.form.value.NumeroCelular,
              TelefonoPredictivo:(this.form.value.TelefonoCelularPredictivo == "9045null") ? null : this.form.value.TelefonoCelularPredictivo,
              //Numero Telefono o Telefono Casa
              TelefonoCasa: (this.form.value.Telefono == "")? null : this.form.value.Telefono,
              TelefonoCasaPredictivo: (this.form.value.Telefono == '' || this.form.value.Telefono == null) ? '': tel_casa_predictivo,


              //Numero Celular Tutor
              NumeroCelularTutor:(this.form.value.NumeroCelularTutor=='')?null : this.form.value.NumeroCelularTutor,
              TelefonoCelularPredictivoTutor:(this.form.value.TelefonoCelularPredictivoTutor == "9045null") ? null : this.form.value.TelefonoCelularPredictivoTutor,
              //Numero Casa Tutor
              TelefonoTutor:(this.form.value.TelefonoTutor=='')?null:this.form.value.TelefonoTutor,
              TelefonoCasaTutorPredictivo: (this.form.value.TelefonoPredictivoTutor == "901null") ? null : this.form.value.TelefonoPredictivoTutor,

          };

        }else{


          this.sendd = { //Envio de Variables

            Usuario: ( this.form.value.Usuario =='')? null : this.form.value.Usuario,

            Canal: ( CanalV[1] =='')? null : CanalV[1],   //Se envia Canal en vez de CanalPreferido
            CSQ: ( this.form.value.CSQ =='')? null : this.form.value.CSQ,
            TelefonoCorreo: ( this.form.value.TelefonoCorreo =='')? null : this.form.value.TelefonoCorreo,
            Interesa_NoInteresa: (this.form.value.Interesa_NoInteresa = '') ? null : this.form.value.Interesa_NoInteresa,


            Nombre: ( this.form.value.Nombre =='')? null : this.getValidaCampo("Nombre", this.form.value.Nombre),
            ApellidoPaterno: ( this.form.value.ApellidoPaterno =='')? null : this.getValidaCampo("Paterno", this.form.value.ApellidoPaterno),
            ApellidoMaterno: ( this.form.value.ApellidoMaterno =='')? null : this.getValidaCampo("Materno", this.form.value.ApellidoMaterno),
            CorreoElectronico: ( this.form.value.CorreoElectronico =='')? null : this.form.value.CorreoElectronico,

            Genero: (valor_genero == '')? null : valor_genero,
            Edad: ( edadT =='')? null : edadT,
           //SinCorreo: this.form.value.SinCorreo,

            NombreTutor: ( this.form.value.NombreTutor =='')? null : this.getValidaCampo("Nombre Tutor", this.form.value.NombreTutor),
            ApellidoPaternoTutor: ( this.form.value.ApellidoPaternoTutor =='')? null : this.getValidaCampo("Paterno Tutor", this.form.value.ApellidoPaternoTutor),
            ApellidoMaternoTutor: ( this.form.value.ApellidoMaternoTutor =='')? null : this.getValidaCampo("Materno Tutor", this.form.value.ApellidoMaternoTutor),
            CorreoElectronicoTutor: ( this.form.value.CorreoElectronicoTutor =='')? null : this.form.value.CorreoElectronicoTutor,

            ParentescoTutor: ( ParentescoV[0] == '')? null : ParentescoV[0],
            GUIDParentescotutor: (ParentescoV[0] == '' || ParentescoV[0] == undefined )? null : ParentescoV[1],

            Campus:(CampusV[1]=='')? null : CampusV[1],
            Nivel: (NivelV[1]=='')? null : NivelV[1],
            Modalidad: (ModalidadV[1]=='')? null : ModalidadV[1],
            Carrera: (CarreraV[1]=='')? null : CarreraV[1],
            AreaInteres:(InteresV[1]=='')? null : InteresV[1],
            //Ciclo: CicloV[1],
            Ciclo: (ciclo=='')? null : ciclo,

            CampusCita: (c_cita[0] == "" ) ? null : c_cita[0],
            GUIDCampusCita: (c_cita[1] == '') ? null : c_cita[1],

            GUIDCanal: (CanalV[0]=='')? null : CanalV[0],
            GUIDCampus: (CampusV[0]=='')? null : CampusV[0],
            GUIDNivelInteres: (NivelV[0]=='')? null : NivelV[0],
            GUIDModalidad: (ModalidadV[0]=='')? null : ModalidadV[0],
            GUIDCarrera: (CarreraV[0]=='')? null : CarreraV[0],
            GUIDAreaInteres:(InteresV[0]=='')? null : InteresV[0],
            GUIDCiclo:( CicloV[0]=='')? null : CicloV[0],
            GUIDUsuario: ( localStorage.getItem('UserId') =='')? null : localStorage.getItem('UserId'),
            FuenteNegocio : (f_negocio == "")? "INBOUND" : f_negocio,

            Banner: (this.form.value.Banner =='')? null : this.form.value.Banner,
            Bandera: (this.cita == '') ? null : this.cita,
//              Tipificacion: (this.form.value.Tipificacion =='')? null : this.form.value.Tipificacion,

            Tipificacion: (this.form.value.Tipificacion =='')? null : this.Tipificacion_con_GUID,
            EtapaProcesoVentaGUID: (this._etapaprocesoventaid == '' )?null:this._etapaprocesoventaid,

            Notas: (this.form.value.Notas == '') ? null : this.form.value.Notas,

            FechaCita: (this.form.value.FechaCita == undefined || this.form.value.FechaCita =="aN/aN/NaN") ? null : this.form.value.FechaCita,
            HoraCita: (this.form.value.HoraCita == undefined || this.form.value.HoraCita=="") ? null : this.form.value.HoraCita,
            Asesor: (this.form.value.Asesor) ? null : this.form.value.Asesor,

            Team: (this.form.value.Team == undefined) ? null : this.form.value.Team,
            Prioridad: (this.form.value.Prioridad == undefined) ? 0 : this.form.value.Prioridad,
            Attemp: (this.form.value.Attemp == undefined) ? 0 : this.form.value.Attemp,
            GUIDFuentedeObtencion: (fuente_obtencion_GUID == '') ? '2e89dd13-6072-e211-b35f-6cae8b2a4ddc' : fuente_obtencion_GUID,

            fuenteobtencion: (fuente_obtencion_nombre == "")? null : fuente_obtencion_nombre,


            //Numero Celular
            Telefono: (this.form.value.NumeroCelular == "")? null :this.form.value.NumeroCelular,
            TelefonoPredictivo:(this.form.value.TelefonoCelularPredictivo == "9045null") ? null : this.form.value.TelefonoCelularPredictivo,
            //Numero Telefono o Telefono Casa
            TelefonoCasa: (this.form.value.Telefono == "")? null : this.form.value.Telefono,
            TelefonoCasaPredictivo: (this.form.value.Telefono == '' || this.form.value.Telefono == null) ? '': tel_casa_predictivo,


            //Numero Celular Tutor
            NumeroCelularTutor:(this.form.value.NumeroCelularTutor=='')?null : this.form.value.NumeroCelularTutor,
            TelefonoCelularPredictivoTutor:(this.form.value.TelefonoCelularPredictivoTutor == "9045null") ? null : this.form.value.TelefonoCelularPredictivoTutor,
            //Numero Casa Tutor
            TelefonoTutor:(this.form.value.TelefonoTutor=='')?null:this.form.value.TelefonoTutor,
            TelefonoCasaTutorPredictivo: (this.form.value.TelefonoPredictivoTutor == "901null") ? null : this.form.value.TelefonoPredictivoTutor,

        };



        }
        if (( ( this.form.value.Telefono < 1 || this.form.value.Telefono == '' ) && (this.form.value.NumeroCelular < 1 || this.form.value.NumeroCelular == '')  ) && (this.form.value.CorreoElectronico == "" || this.form.value.CorreoElectronico == null) ) {
          this.showDialogE("Debes Ingresar un Teléfono o Correo Electrónico.");
          return false;
        }


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


          this.sendd['Lista_seg'] =  l_seg;



        }

        //Termina validacion de Linea de seguimiento

 //Termina validacion de Linea de seguimiento



/*   if( (this.form.value.Telefono == '' || this.form.value.Telefono == null) || (this.form.value.NumeroCelular == '' || this.form.value.NumeroCelular == null) ){
    this.showDialogE("Debe introducir un número de Celular o Telefono de Casa.");
    return false;
 }*/



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

//Validar Telefono Correo
  if(isNaN(this.form.value.TelefonoCorreo)){
      console.log("Conteniene: Correo");


      let valida_antes_arroba = this.form.value.TelefonoCorreo.split("@");
      let ante_arroba = valida_antes_arroba[0].replace(" ", "");

      console.log("ante arroba - "+ante_arroba);

      let nuevo_valor = this.form.value.TelefonoCorreo.replace(" ", "");

        if(nuevo_valor == "" || nuevo_valor == null){
          this.showDialogE("El correo electronico no es valido.");
        }


  } else {
      console.log("Conteniene: Telefono");


      if ( this.form.value.TelefonoCorreo != "" && this.form.value.TelefonoCorreo.length != '10'  ) {
          this.showDialogE("Debes proporcionar un Telefono correcto");
          return false;
        }





  }
//Termina validacion de telefono Correo
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

///////////////////////////////////////////////////////////////////////////





              this.sendServ.send_Todos_inb_sol_prom_QA(this.sendd)
                .subscribe(
                      (res: any) => {
                          console.log(res.status);
                          if (res.status == 200) {
                            this.Abreventana(this.form.value.Nombre, this.form.value.ApellidoPaterno, '', this.form.value.CorreoElectronico, "", '');
                              this.showDialog("Registro guardado con éxito.");
                              this.sendServ.sendHubSpot(this.form.value.Nombre, this.form.value.ApellidoPaterno, '', this.form.value.CorreoElectronico, "", '')// this.form.value)

                              .subscribe(
                                      (ress: any) => {
                                          console.log(ress.status);
                                          if (ress.status == 200) {
                                               console.log("Hubspot: Los datos se han envido a Hubspot correctamente.");
                                            } else {
                                               console.log("Hubspot: Error al enviar el registro.");
                                          }
                                      }
                                  )

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




           ///////////////////////////////////////////////////////////////////////////

                          } else {
                            console.log("7924: Error al enviar el registro.");
                        }
                    }
              )








          } else {




            this.sendServ.send_ListaSeguimiento_QA(obj_seguimiento) //EndPoint 7924
            .subscribe(
                    (ress: any) => {
                        console.log(ress.status);
                        if (ress.status == 200) {
                            console.log("Ok: Los datos se han envido correctamente.");
                            //Se envia el segundo endpoint -> 7841


///////////////////////////////////////////////////////////////////////////


this.sendServ.send_Todos_inb_sol_prom_QA(this.sendd)
.subscribe(
    (res: any) => {
        console.log(res.status);

        if (res.status == 200) {

//            this.sendServ.sendHubSpot(this.form.value.Nombre, this.form.value.ApellidoPaterno+" "+this.form.value.ApellidoMaterno, this.form.value.NumeroCelular, this.form.value.CorreoElectronico, "", this.form.value.Telefono)// this.form.value)
          this.sendServ.sendHubSpot(this.form.value.Nombre, this.form.value.ApellidoPaterno+" "+this.form.value.ApellidoMaterno, '', this.form.value.CorreoElectronico, "", '')// this.form.value)

          .subscribe(
                  (ress: any) => {
                      console.log(ress.status);
                      if (ress.status == 200) {
                          console.log("Hubspot: Los datos se han envido a Hubspot correctamente.");



                        } else {
                          console.log("Hubspot: Error al enviar el registro.");
                      }
                  }
          )

//            this.Abreventana(this.form.value.Nombre, this.form.value.ApellidoPaterno+" "+this.form.value.ApellidoMaterno, this.form.value.NumeroCelular, this.form.value.CorreoElectronico, "", this.form.value.Telefono);
          this.Abreventana(this.form.value.Nombre, this.form.value.ApellidoPaterno+" "+this.form.value.ApellidoMaterno, '', this.form.value.CorreoElectronico, "", '');

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


///////////////////////////////////////////////////////////////////////////


                          } else {
                            console.log("Error al enviar el registro.");
                        }
                    }
            )







          }


        }

      } else {
          this.showDialogE("Error al guardar el registro.");
          //window.open('http://www.google.com','popup','width=300,height=400');

      }


  }

//Termina el submit



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


resetTimer() {

  clearTimeout(t);
  var t = setTimeout(function() {

    window.location.href = "https://login.microsoftonline.com/346a1d1d-e75b-4753-902b-74ed60ae77a1/oauth2/authorize?client_id=8b121322-84ec-4bb9-8929-6c64333775f6&response_type=code&redirect_uri=https://app.devmx.com.mx&response_mode=query&resource=https://laulatammxqa.crm.dynamics.com";

}, 60000);

}



getValidaCampo(campo, valor){

    let s = "";
    s = this.appConfig.SIMBOLOS_microregistro;

    let r = 0;


if(valor == "" || valor == null){ //Campo Vacio

  this.campos_con_error.push(" "+campo);
  return '0';
}else{ //Campo No Vacio


 if(campo == "Materno Tutor"){ //Valida Apellido Materno Tutor



    console.log("");
    console.log("------------Validacion de Apellido Materno Tutor---------------");

                for (let k = 0; k < valor.length; k++) {
                  if (s.indexOf(valor.charAt(k), 0) != -1) {
                      r = 1;

                      if(r == 1){
                          //this.showDialogE("Error en el campo Apellido Materno, se encontraron simbolos o caracteres especiales en el campo.");
                          this.campos_con_error.push(" "+campo);
                          console.log("Error en campo Apellido Materno Tutor");
                          r = 0;
                          return false;
                      }

                  } else { r = 0 ; return valor; }
              }



  }else if(campo == "Paterno Tutor"){ //Valida Apellido Paterno Tutor



    console.log("");
    console.log("------------Validacion de Apellido Paterno Tutor---------------");


                for (let j = 0; j < valor.length; j++) {
                  if (s.indexOf(valor.charAt(j), 0) != -1) {
                      r = 1;

                      if(r == 1){
                         //this.showDialogE("Error en el campo Apellido Paterno, se encontraron simbolos o caracteres especiales en el campo.");
                         this.campos_con_error.push(" "+campo);
                         console.log("Error en campo Apellido Paterno Tutor");
                         r = 0;
                         return false;
                      }

                  } else { r = 0 ; return valor; }
              }


  }else if(campo == "Nombre Tutor"){ //Valida Nombre Tutor


    console.log("");
    console.log("------------Validacion de Nombre Tutor---------------");

                for (let i = 0; i < valor.length; i++) {
                  if (s.indexOf(valor.charAt(i), 0) != -1) {
                      r = 1;

                      if(r == 1){
                        // this.showDialogE("Error en el campo Nombre, se encontraron simbolos o caracteres especiales en el campo.");
                         this.campos_con_error.push(" "+campo);
                         console.log("Error en campo Nombre Tutor");
                         r=0;
                         return false;
                        }

                  } else { r = 0 ; return valor; }
              }





  }else  if(campo == "Materno"){ //Valida Apellido Paterno



    console.log("");
    console.log("------------Validacion de Apellido Materno---------------");

    let nuevo_valor = valor.replace(" ", "");

    if(valor.length < 3 ){

      this.campos_con_error.push(" "+campo);

    }else if(nuevo_valor == ""){

      console.log("Materno viene vacio");
      this.campos_con_error.push(" "+campo);

    }else{




      console.log("");
      console.log("------------Validacion de Apellido Materno---------------");

                  for (let k = 0; k < valor.length; k++) {
                    if (s.indexOf(valor.charAt(k), 0) != -1) {
                        r = 1;

                        if(r == 1){
                            //this.showDialogE("Error en el campo Apellido Materno, se encontraron simbolos o caracteres especiales en el campo.");
                            this.campos_con_error.push(" "+campo);
                            console.log("Error en campo Apellido Materno");
                            r = 0;
                            return false;
                        }

                    } else { r = 0 ; return valor; }
                }

    }



  }else if(campo == "Paterno"){ //Valida Apellido Paterno



    console.log("");
    console.log("------------Validacion de Apellido Paterno---------------");


    let nuevo_valor = valor.replace(" ", "");

    if(valor.length < 3 ){

      this.campos_con_error.push(" "+campo);

    }else if(nuevo_valor == ""){

      console.log("Paterno viene vacio");
      this.campos_con_error.push(" "+campo);

    }else{



                for (let j = 0; j < valor.length; j++) {
                  if (s.indexOf(valor.charAt(j), 0) != -1) {
                      r = 1;

                      if(r == 1){
                         //this.showDialogE("Error en el campo Apellido Paterno, se encontraron simbolos o caracteres especiales en el campo.");
                         this.campos_con_error.push(" "+campo);
                         console.log("Error en campo Apellido Paterno");
                         r = 0;
                         return false;
                      }

                  } else { r = 0 ; return valor; }
              }
    }


  }else if(campo == "Nombre"){ //Valida Nombre


    let nuevo_valor = valor.replace(" ", "");

    if(valor.length < 3 ){

      this.campos_con_error.push(" "+campo);

    }else if(nuevo_valor == ""){

      console.log("Nombre viene vacio");
      this.campos_con_error.push(" "+campo);

    }else{


      console.log("");
      console.log("------------Validacion de Nombre---------------");

                  for (let i = 0; i < valor.length; i++) {
                    if (s.indexOf(valor.charAt(i), 0) != -1) {
                        r = 1;

                        if(r == 1){
                          // this.showDialogE("Error en el campo Nombre, se encontraron simbolos o caracteres especiales en el campo.");
                           this.campos_con_error.push(" "+campo);
                           console.log("Error en campo Nombre");
                           r=0;
                           return false;
                          }

                    } else { r = 0 ; return valor; }
                }


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
      window.location.href = "/nuevo-inbound";
      this.form.reset();
  }

  onKeyFechaNacimiento() {
      let edad = this.form.controls.Edad.value;
      let year = new Date().getFullYear();
      let fecha = year - edad;
      this.form.controls.FechaNacimiento.setValue("01/01/" + fecha);


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

  _keyPressNum(event: any, value: any, campus: any) {

      var cadena = campus.split('*');
      var word = cadena[0];
  }


//Validacion de correo Electronico

Segunda_validacion_Email(email) {
if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/.test(email)){
  return (true)
} else {
  return (false);
}
}

  onChange() {

      if (this.form.controls.Nombre.value != '' && this.form.controls.ApellidoPaterno.value != '' && this.form.controls.ApellidoMaterno.value != '' && this.form.controls.CorreoElectronico.value != '' && this.form.controls.NumeroCelular.value != '' && this.form.controls.Telefono.value != '') {

        /*this.form.controls.CampusCita.reset({ value: '', disabled: false });
          this.form.controls.FechaCita.reset({ value: '', disabled: false });
          this.form.controls.HoraCita.reset({ value: '', disabled: false });
          this.form.controls.Programacion.reset({ value: '', disabled: false });
          this.form.controls.Transferencia.reset({ value: '', disabled: false });
      } else {
          this.form.controls.CampusCita.reset({ value: '', disabled: true });
          this.form.controls.FechaCita.reset({ value: '', disabled: true });
          this.form.controls.HoraCita.reset({ value: '', disabled: true });
          this.form.controls.Programacion.reset({ value: '', disabled: true });
          this.form.controls.Transferencia.reset({ value: '', disabled: true });*/
      }

  }

  onChangeInteres(value) {

console.log("onChangeInteres: "+value);


   /*   if (value == '') {
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
      this.form.controls.Ciclo.updateValueAndValidity(); */

  }


 //Funcion en caso de Interesa / No Interesa

  onChangeInteresaNo(value) {
      if (value == '1') {
        console.log("No me interesa");

        this.form.controls.Nombre.reset({ value: '', disabled: true });
          this.form.controls.ApellidoPaterno.reset({ value: '', disabled: true });
          this.form.controls.ApellidoMaterno.reset({ value: '', disabled: true });
          this.form.controls.CorreoElectronico.reset({ value: '', disabled: true });
          this.form.controls.Genero.reset({ value: '', disabled: true });
          this.form.controls.NumeroCelular.reset({ value: '', disabled: true });
          this.form.controls.Telefono.reset({ value: '', disabled: true });
          this.form.controls.Edad.reset({ value: '', disabled: true });

          this.form.controls.NombreTutor.reset({ value: '', disabled: true });
          this.form.controls.ApellidoPaternoTutor.reset({ value: '', disabled: true });
          this.form.controls.ApellidoMaternoTutor.reset({ value: '', disabled: true });
          this.form.controls.CorreoElectronicoTutor.reset({ value: '', disabled: true });
          this.form.controls.ParentescoTutor.reset({ value: '', disabled: true });
          this.form.controls.NumeroCelularTutor.reset({ value: '', disabled: true });
          this.form.controls.TelefonoTutor.reset({ value: '', disabled: true });

          this.form.controls.Campus.reset({ value: '', disabled: true });
          this.form.controls.AreaInteres.reset({ value: '', disabled: true });
          this.form.controls.Nivel.reset({ value: '', disabled: true });
          this.form.controls.Modalidad.reset({ value: '', disabled: true });
          this.form.controls.Carrera.reset({ value: '', disabled: true });
          this.form.controls.Ciclo.reset({ value: '', disabled: true });

      } else {
      console.log("Si me interesa");
         this.form.controls.Nombre.reset({ value: '', disabled: false });
          this.form.controls.ApellidoPaterno.reset({ value: '', disabled: false });
          this.form.controls.ApellidoMaterno.reset({ value: '', disabled: false });
          this.form.controls.CorreoElectronico.reset({ value: '', disabled: false });
          this.form.controls.Genero.reset({ value: '', disabled: false });
          this.form.controls.NumeroCelular.reset({ value: '', disabled: false });
          this.form.controls.Telefono.reset({ value: '', disabled: false });
          this.form.controls.Edad.reset({ value: '', disabled: false });

          this.form.controls.NombreTutor.reset({ value: '', disabled: false });
          this.form.controls.ApellidoPaternoTutor.reset({ value: '', disabled: false });
          this.form.controls.ApellidoMaternoTutor.reset({ value: '', disabled: false });
          this.form.controls.CorreoElectronicoTutor.reset({ value: '', disabled: false });
          this.form.controls.ParentescoTutor.reset({ value: '', disabled: false });
          this.form.controls.NumeroCelularTutor.reset({ value: '', disabled: false });
          this.form.controls.TelefonoTutor.reset({ value: '', disabled: false });

          this.form.controls.Campus.reset({ value: '', disabled: false });
          this.form.controls.AreaInteres.reset({ value: '', disabled: false });
          this.form.controls.Nivel.reset({ value: '', disabled: false });
          this.form.controls.Modalidad.reset({ value: '', disabled: false });
          this.form.controls.Carrera.reset({ value: '', disabled: false });
          this.form.controls.Ciclo.reset({ value: '', disabled: false });

      }
  }






  //Cambiado

  onChangeCampus(campus: string) {
      console.log(campus);
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
      console.log(campus);

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

      console.log(campus);

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

  onChangeCanal(campus: string) {
      var cadena = campus.split('*');
      var value = cadena[0];

      if (this.form.controls['CSQ'].disabled) {
          this.form.controls['CSQ'].enable();
      } else {
          this.form.controls['CSQ'].setValue('');
          this.form.controls['CSQ'].markAsUntouched();
      }
      this.csqs = this.csqServ.getCsqsByCanal(value);
  }

  onFielCanal(campus) {
      var cadena = campus.split('*');
      var value = cadena[0];

      this.canalText = value.toUpperCase();
      this.form.controls.TelefonoCorreo.clearValidators();

      //Chat: 68bed5d6-404f-e811-8113-3863bb3c5058
      //Recuperacion: 70bed5d6-404f-e811-8113-3863bb3c5058
      //Watts: 6abed5d6-404f-e811-8113-3863bb3c5058


      this.form.controls.TelefonoCorreo.setValidators([LandingValidation.emailMaloValidator()]);
      this.form.controls.TelefonoCorreo.setValidators([Validators.minLength(10), LandingValidation.aceptNumberValidator(), LandingValidation.numberConValidator()]);

  }


  //Tipificacion y Cita

  onChangeTipificacion(Tipificacion){




    console.log("Esta es la tipificacion Seleccionada: "+Tipificacion);


    for(let i = 0 ; i < this.tipificaciones.length ; i++){

        if(Tipificacion == this.tipificaciones[i].Tipificacion ){

          this.Tipificacion_con_GUID = Tipificacion+"_"+this.tipificaciones[i].id+"_"+this.tipificaciones[i].id;
          this.form.value.Tipificacion = Tipificacion+"_"+this.tipificaciones[i].id+"_"+this.tipificaciones[i].id;
          this._etapaprocesoventaid = this.tipificaciones[i].etapaprocesoventaid;

          console.log("EtapaProcesoVentaGUID: "+this._etapaprocesoventaid);
          console.log("Tipificacion con GUID: "+this.Tipificacion_con_GUID);
          console.log("GUID Tipificacion: "+this.tipificaciones[i].id);

        }else{

          this.form.value.Tipificacion = Tipificacion;

        }

    }



    if( (this.form.value.Nombre != "" && this.form.value.ApellidoPaterno != "" && this.form.value.ApellidoMaterno != "" && this.form.value.CorreoElectronico != "" && this.form.value.Telefono != "" ) && ( Tipificacion == "REAGENDA CITA (INBOUND)" || Tipificacion == "AGENDA CITA (INBOUND)") ){

      console.log("Valor de Tipificacion "+Tipificacion);
      this.arm_bandera = Tipificacion;
      this.maxDate = LandingValidation.fechaLimiteInbound(15);
      this.cita = "PCita-4";

      this.form.controls.CampusCita.reset({ value: '', disabled: false });
      this.form.controls.FechaCita.reset({ value: '', disabled: false });
      this.form.controls.HoraCita.reset({ value: '', disabled: false });


      this.form.controls.Programacion.reset({ value: '', disabled: true });
      this.form.controls.Transferencia.reset({ value: '', disabled: true });

    }else if( (this.form.value.Nombre != "" && this.form.value.ApellidoPaterno != "" && this.form.value.ApellidoMaterno != "" && this.form.value.CorreoElectronico != "" && this.form.value.Telefono != "" ) && ( Tipificacion == "PROGRAMAR UNA LLAMADA" || Tipificacion == "REPROGRAMA LLAMADA") ){

      console.log("Valor de Tipificacion "+Tipificacion);
      this.arm_bandera = Tipificacion;
      this.maxDate = LandingValidation.fechaLimiteInbound(15);
      this.cita = "RLL";


      this.form.controls.CampusCita.reset({ value: '', disabled: false });
      this.form.controls.FechaCita.reset({ value: '', disabled: false });
      this.form.controls.HoraCita.reset({ value: '', disabled: false });


      this.form.controls.Transferencia.reset({ value: '', disabled: true });

      this.form.controls.Programacion.reset({ value: '', disabled: false });
      this.form.controls.Programacion.reset({ value: '', checked: true });


    }else if( (this.form.value.Nombre != "" && this.form.value.ApellidoPaterno != "" && this.form.value.ApellidoMaterno != "" && this.form.value.CorreoElectronico != "" && this.form.value.Telefono != "" ) && ( Tipificacion == "TRANSFERENCIA") ){


      console.log("Valor de Tipificacion "+Tipificacion);
      this.arm_bandera = Tipificacion;
      this.maxDate = LandingValidation.fechaLimiteInbound(15);
      this.cita = "PCita-4";


      this.form.controls.CampusCita.reset({ value: '', disabled: true });
      this.form.controls.FechaCita.reset({ value: '', disabled: true });
      this.form.controls.HoraCita.reset({ value: '', disabled: true });
      this.form.controls.Programacion.reset({ value: '', disabled: true });
      this.form.controls.Transferencia.reset({ value: '', disabled: false });

      this.form.controls.Transferencia.reset({ value: '', checked: true });
      this.form.controls.Asesor.reset({ value: '', disabled: false });


    } else{


          if(Tipificacion == "PROGRAMAR UNA LLAMADA" || Tipificacion == "REPROGRAMA LLAMADA"){
            this.cita = "RLL";
          }else if(this.form.controls.FechaCita.value != ""){
          this.cita = "PCita-4";
          }else{
            this.cita = "";
          }

      this.maxDate = LandingValidation.fechaLimiteInbound(3);
      console.log("Tipificacion distinta");
      this.arm_bandera = Tipificacion;
      this.form.controls.CampusCita.reset({ value: '', disabled: true });
      this.form.controls.FechaCita.reset({ value: '', disabled: true });
      this.form.controls.HoraCita.reset({ value: '', disabled: true });

      this.form.controls.Programacion.reset({ value: '', disabled: true });
      this.form.controls.Transferencia.reset({ value: '', disabled: true });

    }

  }


  addValidation(isChecked) {
      if (isChecked.checked) {
          if(this.form.controls.Telefono.value == "" && this.form.controls.NumeroCelular.value == ""){
              isChecked.source.checked = false
              this.showDialogE("Debes ingresar un Número de Celular o teléfono de contacto");
              return false;
          }


          var t='';
          var tcasa = this.form.controls.Telefono.value;
          var tcel = this.form.controls.NumeroCelular.value;

          console.log("tcasa * "+tcasa);
          console.log("tcel * "+tcel);

          if(tcasa != "" && tcel == ""){
            t = tcasa;
          }else if(tcasa == "" && tcel != ""){
            t = tcel;
          }else if(tcasa != "" && tcel != ""){
            t = tcel;
          }

          console.log("t * "+t);
          this.form.controls.CorreoElectronico.reset({ value: t+'@unitec.edu.mx', disabled: false });



          this.sinEmail = true;
          this.conEmail = false;

        } else {

          this.form.controls.CorreoElectronico.reset({ value: '', disabled: false });

          this.sinEmail = false;
          this.conEmail = true;

      }
      this.form.controls.CorreoElectronico.updateValueAndValidity();
  }

  addAsesor(isChecked) {
      if (isChecked.checked) {

      /*    this.form.controls.Asesor.reset({ value: '', disabled: false });

          this.form.controls.CampusCita.reset({ value: '', disabled: true });
          this.form.controls.FechaCita.reset({ value: '', disabled: true });
          this.form.controls.HoraCita.reset({ value: '', disabled: true });
          this.form.controls.Programacion.reset({ value: '', disabled: true });



      } else {

          this.form.controls.CampusCita.reset({ value: '', disabled: false });
          this.form.controls.FechaCita.reset({ value: '', disabled: false });
          this.form.controls.HoraCita.reset({ value: '', disabled: false });
          this.form.controls.Programacion.reset({ value: '', disabled: false });


          this.form.controls.Asesor.reset({ value: '', disabled: true });

*/
      }

      this.form.controls.Asesor.updateValueAndValidity();
  }

  checkProgramacion(isChecked) {
      if (isChecked.checked) {

         /* this.form.controls.Asesor.reset({ value: '', disabled: true });

          this.form.controls.CampusCita.reset({ value: '', disabled: true });
          this.form.controls.Transferencia.reset({ value: '', disabled: true });
          console.log('activo');*/

      } else {

/*            this.form.controls.Asesor.reset({ value: '', disabled: true });
          this.form.controls.CampusCita.reset({ value: '', disabled: false });
          this.form.controls.Transferencia.reset({ value: '', disabled: false });
          console.log('in activo');
*/
      }

      //this.form.controls.Asesor.updateValueAndValidity();
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
          window.location.href = "/nuevo-inbound";
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

  agruparClick(){

  }

  agruparDClick(){
      let ases = this.asesorServ.getAll()
          .subscribe(
              (data: AsesorCita[]) => this.asesores = data
          );

      localStorage.setItem('bandera',this.form.controls.Usuario.value);
      this.showDialogForm(this.asesores, "Selecciona a un Asesor", "Cita - Alfonso Silva");
  }


  agruparDirectaClick(){

      let ases = this.asesorGrupalServ.getAll()
          .subscribe(
              (data: AsesorGrupal[]) => this.asesoresGrupal = data
          );

      this.showDialogForm(this.asesoresGrupal, "Selecciona a un Asesor", "SesionG - Alfonso Silva");
  }




}
