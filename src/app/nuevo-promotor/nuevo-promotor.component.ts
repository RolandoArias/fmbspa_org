import { AppConfig } from '../services/constants';
import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { GeneralService } from '../services/general.service';
import { FormControl, FormGroup, FormBuilder, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';

import { MatDialog, MatSelect, MatDialogRef, MAT_DIALOG_DATA, NativeDateAdapter } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import 'rxjs/Rx';

import * as $ from 'jquery';

import { LandingValidation } from '../validations/landing.validations';
import { LandingService } from '../services/landing.service';

import { Csq } from '../interfaces/csq';
import { Hora } from '../interfaces/hora';
import { Nivel } from '../interfaces/nivel';
import { Canal } from '../interfaces/canal';
import { Turno } from '../interfaces/turno';
import { Ciclo } from '../interfaces/ciclo';
import { Campus } from '../interfaces/campus';
import { Genero } from '../interfaces/genero';
import { Asesor } from '../interfaces/asesor';
import { Carrera } from '../interfaces/carrera';
import { SubTipo } from '../interfaces/sub-tipo';
import { Interes } from '../interfaces/interes';
import { Modalidad } from '../interfaces/modalidad';
import { Parentesco } from '../interfaces/parentesco';
import { SubsubTipo } from '../interfaces/subsub-tipo';
import { CampusCita } from '../interfaces/campus-cita';
import { Tipificacion } from '../interfaces/tipificacion';
import { EscuelaEmpresa } from '../interfaces/escuela-empresa';
import { ActividadAgenda } from '../interfaces/actividad-agenda';
import { FuenteObtencion } from '../interfaces/fuenteobtencion';

import { PnnService } from '../providers/pnn.service';
import { CsqService } from '../providers/csq.service';
import { SendService } from '../providers/send.service';
import { HoraService } from '../providers/hora.service';
import { TurnoService } from '../providers/turno.service';
import { CanalService } from '../providers/canal.service';
import { CicloService } from '../providers/ciclo.service';
import { FormatService } from '../providers/format.service';
import { CampusService } from '../providers/campus.service';
import { AsesorService } from '../providers/asesor.service';
import { GeneroService } from '../providers/genero.service';
import { CarreraService } from '../providers/carrera.service';
import { InteresService } from '../providers/interes.service';
import { ModalidadService } from '../providers/modalidad.service';
import { ParentescoService } from '../providers/parentesco.service';
import { CampusCitaService } from '../providers/campus-cita.service';
import { CampusCarreraService } from '../providers/campus-carrera.service';
import { TipificacionService } from '../providers/tipificacion.service';
import { TipoActividadService } from '../providers/tipo-actividad.service';
import { EscuelaEmpresaService } from '../providers/escuela-empresa.service';
import { ActividadAgendaService } from '../providers/actividad-agenda.service';
import { SubsubtipoActividadService } from '../providers/subsubtipo-actividad.service';
import { FuenteObtencionService } from '../providers/fuenteobtencion.service';
import { NivelService } from '../providers/nivel.service';


@Component({
    selector: 'app-nuevo-promotor',
    templateUrl: './nuevo-promotor.component.html',
    styleUrls: ['./nuevo-promotor.component.scss']
})

export class NuevoRegistroPromotorComponent implements OnInit {



  form: FormGroup;
  sinEmail = false;
  conEmail = true;

  data_escuela_empres: any;

  //maxDate = new Date(2018, this.month.getMonth(),12);
  maxDate = LandingValidation.fechaLimite();
  startDate = LandingValidation.fechaInicio();
  Usuario: FormControl;
  //Asesor: FormControl;
  SinCorreo: FormControl;

  actvidadNoTradicional: FormControl;

  ActividadAgenda: FormControl;
  SubTipoActividad: FormControl;
  SubSubTipoActividad: FormControl;
  EscuelaEmpresa: FormControl;
  Turno: FormControl;
  Calidad: FormControl;
  GUIDCalidad: FormControl;

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

  NumeroPersona: FormControl;
  etapaVenta: FormControl;
  NumeroCuenta: FormControl;

  csqs: Csq[] = [];
  horas: Hora[] = [];
  ciclos: Ciclo[] = [];
  turnos: Turno[] = [];
  turnos2: Turno[] = [];
  niveles: Nivel[] = [];
  canales: Canal[] = [];
  campus: Campus[] = [];
  generos: Genero[] = [];
  asesores: Asesor[] = [];
  sub_tipos: SubTipo[] = [];
  carreras: Carrera[] = [];
  subtipos: SubTipo[] = [];
  intereses: Interes[] = [];
  modalidades: Modalidad[] = [];
  subsub_tipos: SubsubTipo[] = [];
  campus_citas: CampusCita[] = [];
  parentescos: Parentesco[] = [];
  tipificaciones: Tipificacion[] = [];
  actividad_agenda: ActividadAgenda[] = [];
  escuelas_empresas: EscuelaEmpresa[] = [];
  fuentesobtencion: FuenteObtencion[] = [];
  campos_con_error = [];

  campusTxt: any;
  turnoTxt: any;
  nivelTxt: any;
  canalText: any;
  perfil_usuario:string;
  etapaprocesoventaid:any;

  local_ejecutivo : any;
  local_actividadagenda : any;
  local_calidad : any;
  local_subtipoactividad : any;
  local_subsubtipoactividad : any;
  local_escuelaempresa : any;
  local_turno : any;

  local_campus : any;
  local_nivel : any;
  local_modalidad : any;
  local_carrera : any;
  local_ciclo : any;
  local_areainteres: any;


  rows = [];
  constructor(private landingService: LandingService,
      private gralService: GeneralService,
      public dialog: MatDialog,
      private renderer: Renderer2,
      private csqServ: CsqService,
      private pnnServ: PnnService,
      private horaServ: HoraService,
      private sendServ: SendService,
      private cicloServ: CicloService,
      private turnoServ: TurnoService,
      private canalServ: CanalService,
      private campusServ: CampusService,
      private asesorServ: AsesorService,
      private formatServ: FormatService,
      private generoServ: GeneroService,
      private carreraServ: CarreraService,
      private interesServ: InteresService,
      private modalidadServ: ModalidadService,
      private parentescoServ: ParentescoService,
      private tipoActServ: TipoActividadService,
      private campusCitaServ: CampusCitaService,
      private campusCarreraServ: CampusCarreraService,
      private tipicicacionServ: TipificacionService,
      private subSubServ: SubsubtipoActividadService,
      private escuelaEmpresaServ: EscuelaEmpresaService,
      private fuenteobtencionServ: FuenteObtencionService,
      private actividadAgendaServ: ActividadAgendaService,
      private appConfig: AppConfig,
      private nivelServ: NivelService) {
          this.fetch((data) => {
              this.rows = data;
          });
      }

  ngOnInit() {

      localStorage.setItem('bandera','');
      this.perfil_usuario = localStorage.getItem('tipo_rol');



      this.landingService.getInit();

      // Se obtienes los Subtipos de actividades
      this.sub_tipos = this.subSubServ.getAllSubTipo();

      // Se obtienes los Subsubtipos de actividades
      this.subsub_tipos = this.subSubServ.getAllSubSubTipo();

      // Se obtienen los turnos

      this.turnoServ.getAll()
          .subscribe(
              (data: Turno[]) => this.turnos = data
      )

      this.turnoServ.getAll()
          .subscribe(
              (data: Turno[]) => this.turnos2 = data
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
      //Se obtienen todas las esculas empresas
      this.escuelaEmpresaServ.getAll()
          .subscribe(
              (data: EscuelaEmpresa[]) => this.escuelas_empresas = data
      )
      //Se obtienen todas las actividades agendas
      this.actividadAgendaServ.getAll()
           .subscribe(
               (data: ActividadAgenda[]) => this.actividad_agenda = data
      )

      //Se obtiene todos los fuente obtencion
      this.fuenteobtencionServ.getAll()
           .subscribe(
                (data: FuenteObtencion[]) => this.fuentesobtencion = data
      )

      // Se obtiene todos los canales
      this.nivelServ.getAll2()
          .subscribe(
                 (data: Nivel[]) => this.niveles = data
      )

      // Se obtiene todos los canales
      this.modalidadServ.getAll2()
          .subscribe(
                 (data: Modalidad[]) => this.modalidades = data
      )

              // Se obtiene todos los canales
      this.carreraServ.getAll2()
          .subscribe(
                 (data: Carrera[]) => this.carreras = data
      )


      this.formInit();

  }

  fetch(cb) {
      const req = new XMLHttpRequest();
      req.open('GET', `assets/promotor.json`);
      req.onload = () => {
          cb(JSON.parse(req.response));
      };
      req.send();
  }
  formInit() {

      let userLocal = localStorage.getItem('user');
      let datos = JSON.parse(userLocal);
      let bandera = localStorage.getItem('bandera');

      this.local_ejecutivo = (localStorage.getItem("local_ejecutivo") == '' ) ? '' : localStorage.getItem("local_ejecutivo");
      this.local_actividadagenda = (localStorage.getItem("local_actividadagenda") == '' ) ? '' : localStorage.getItem("local_actividadagenda");
      this.local_calidad = (localStorage.getItem("local_calidad") == '' ) ? '' : localStorage.getItem("local_calidad");
      this.local_subtipoactividad = (localStorage.getItem("local_subtipoactividad") == '' ) ? '' : localStorage.getItem("local_subtipoactividad");
      this.local_subsubtipoactividad = (localStorage.getItem("local_subsubtipoactividad") == '' ) ? '' : localStorage.getItem("local_subsubtipoactividad");
      this.local_escuelaempresa = (localStorage.getItem("local_escuelaempresa") == '' ) ? '' : localStorage.getItem("local_escuelaempresa");
      this.local_turno = (localStorage.getItem("local_turno") == '' ) ? '' : localStorage.getItem("local_turno");

      this.local_campus = (localStorage.getItem("local_campues") == '' ) ? '' : localStorage.getItem("local_campus");
      this.local_nivel = (localStorage.getItem("local_nivel") == '' ) ? '' : localStorage.getItem("local_nivel");
      this.local_modalidad = (localStorage.getItem("local_modalidad") == '' ) ? '' : localStorage.getItem("local_modalidad");
      this.local_carrera = (localStorage.getItem("local_carrera") == '' ) ? '' : localStorage.getItem("local_carrera");
      this.local_ciclo = (localStorage.getItem("local_ciclo") == '' ) ? '' : localStorage.getItem("local_ciclo");
      this.local_areainteres = (localStorage.getItem("local_areainteres") == '' ) ? '' : localStorage.getItem("local_areainteres");


console.log("Forminit - Ejecutivo: "+this.local_ejecutivo);
console.log("Forminit - ActividadAgenda: "+this.local_actividadagenda);
console.log("Forminit - Calidad: "+this.local_calidad);
console.log("Forminit - SubTipoActividad: "+this.local_subtipoactividad);
console.log("Forminit - SubsubtipoActividad: "+this.local_subsubtipoactividad);
console.log("Forminit - EscuelaEmpresa: "+this.local_escuelaempresa);
console.log("Forminit - Turno: "+this.local_turno);

console.log("Forminit - Campus: "+this.local_campus);
console.log("Forminit - Nivel: "+this.local_nivel);
console.log("Forminit - Modalidad: "+this.local_modalidad);
console.log("Forminit - Carrera: "+this.local_carrera);
console.log("Forminit - Ciclo: "+this.local_ciclo);
console.log("Forminit - Area Interes: "+this.local_areainteres);






      this.form = new FormGroup({

          Usuario: new FormControl({ value: datos.fullname, disabled: false }, Validators.required),
          Ejecutivo: new FormControl(this.local_ejecutivo),

          ActividadAgenda: new FormControl( this.local_actividadagenda ),
          SubTipoActividad: new FormControl( this.local_subtipoactividad  ),
          SubSubTipoActividad: new FormControl( this.local_subsubtipoactividad),
          EscuelaEmpresa: new FormControl( this.local_escuelaempresa  ),
          Turno: new FormControl( this.local_turno),
          Calidad: new FormControl({ value: this.local_calidad , disabled: true }, [Validators.required, Validators.maxLength(5)]),
          SinCorreo:new FormControl(''),

          actvidadNoTradicional: new FormControl(''),

          Nombre: new FormControl('', [Validators.required, LandingValidation.palabraMalaValidator()]),
          ApellidoPaterno: new FormControl('', [Validators.required, LandingValidation.palabraMalaValidator()]),
          ApellidoMaterno: new FormControl('',[Validators.required, LandingValidation.palabraMalaValidator()]),
          CorreoElectronico: new FormControl(''), //LandingValidation.emailMaloValidator()
          NumeroCelular: new FormControl('', [Validators.minLength(10), LandingValidation.aceptNumberValidator(), LandingValidation.numberConValidator()]),
          Telefono: new FormControl('', [ Validators.minLength(10), LandingValidation.aceptNumberValidator(), LandingValidation.numberConValidator()]),
          Genero: new FormControl(''),
          FechaNacimiento: new FormControl(''),
          Edad: new FormControl('', [Validators.minLength(2),LandingValidation.edadMinValidator()]),


          NombreTutor: new FormControl(''),
          ApellidoPaternoTutor: new FormControl(''),
          ApellidoMaternoTutor: new FormControl(''),
          CorreoElectronicoTutor: new FormControl(''),
          NumeroCelularTutor: new FormControl(''),
          TelefonoTutor: new FormControl(''),
          ParentescoTutor: new FormControl(''),

          Campus: new FormControl(this.local_campus),
          AreaInteres: new FormControl(this.local_areainteres),
          Nivel: new FormControl(this.local_nivel),
          Modalidad: new FormControl(this.local_modalidad),
          Carrera: new FormControl(this.local_carrera),
          Ciclo: new FormControl(this.local_ciclo),

          NumeroPersona: new FormControl('', Validators.pattern('^[0-9]+$')),
          etapaVenta: new FormControl(''),
          NumeroCuenta: new FormControl('', Validators.pattern('^[0-9]+$')),

          Tipificacion: new FormControl(''),
          Notas: new FormControl(''),

      });

  }



  onSubmit() {



    if( this.campos_con_error.length != 0 ){ //Verifica si hay errores o errores de campos
      console.log("Bloquea Send");

      console.log("Campos con error = "+this.campos_con_error);
      this.showDialogE("Hay datos incompletos o incorrectos en los campos: "+this.campos_con_error+" .");

      this.campos_con_error.splice(0);
      console.log("Total de Errores:"+this.campos_con_error.length);


    } else {

      console.log("Entrando a Sumbit");

      if (this.form.value.CorreoElectronico == "" && this.form.value.Telefono == "") {
          this.showDialogE("Ingresa Email o Telefono");
          return false;
      }

      if (this.form.value.Nombre == "") {
          this.showDialogE("Ingresa tu Nombre");
          return false;
      }

      if (this.form.value.ApellidoPaterno == "") {
          this.showDialogE("Ingresa tu Apellido Paterno");
          return false;
      }

      if (this.form.value.ApellidoMaterno == "") {
          this.showDialogE("Ingresa tu Apellido Materno");
          return false;
      }

      if (this.form.value.Ejecutivo  == "" && this.perfil_usuario != 'UNTC Ejecutivo de Cuenta' ) {
          this.showDialogE("Debe seleccionar un ejecutivo");
          return false;
      }


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
          }else{

          if (this.form.controls['CorreoElectronico'].value != ""){
              this.form.controls.Telefono.setValidators([Validators.minLength(10), LandingValidation.aceptNumberValidator(), LandingValidation.numberConValidator()]);
              //this.form.controls.Telefono.clearValidators();
              //this.form.controls.Telefono.updateValueAndValidity();
          }else{
              console.log('Entrando con correo, sin telefono');

              let t = "";
              var telcasa = String(this.form.controls.Telefono);
              var telcel = String(this.form.controls.NumeroCelular);


              if(telcasa != "" && telcel == ""){
                t = telcasa;
              }else if(telcasa == "" && telcel != ""){
                t = telcel;
              }else if(telcasa != "" && telcel != ""){
                t = telcel;
              }


              console.log("valida sin email - "+t);

              if (t == "") {
                  this.form.controls['CorreoElectronico'].reset({ value: t + '@unitec.edu.mx', disabled: false });
                  this.form.controls.CorreoElectronico.clearValidators();
                  this.form.controls.CorreoElectronico.updateValueAndValidity();
                  this.conEmail = true;

                  console.log("- Val Correo[] : "+t+'@unitec.edu.mx');
                  console.log("- Val Correo[] : "+this.form.controls.Telefono);

              }

          }

      }

      if (this.form.controls['CorreoElectronico'].value != "" && (this.form.controls['Telefono'].value == "" && this.form.controls['NumeroCelular'].value == "" ) ) {
          console.log('Si Correo no esta vacio y si telefono esta vacio');
          this.form.controls.Telefono.updateValueAndValidity();
          this.form.controls.Telefono.clearValidators();
      }

      if (this.form.valid) {

          console.log(this.sinEmail);

          if (this.sinEmail) {

              var tel_ = '';
              var tel_casa = this.form.controls['Telefono'].value;
              var tel_cel = this.form.controls['NumeroCelular'].value;

              if((tel_casa != null || tel_casa != 0 || tel_casa != '' ) && (tel_cel == null || tel_cel == 0 || tel_cel == '' )){
                tel_ = tel_casa;
              }else if((tel_casa == null || tel_casa == 0 || tel_casa == '' ) && (tel_cel != null || tel_cel != 0 || tel_cel != '' )){
                tel_ = tel_cel;
              }else if((tel_casa != null || tel_casa != 0 || tel_casa != '' ) && (tel_cel != null || tel_cel != 0 || tel_cel != '' )){
                tel_ = tel_cel;
              }


              this.form.controls['CorreoElectronico'].reset({ value: tel_ +'@unitec.edu.mx', disabled: false });
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

          this.form.value.Banner = window.location.href;
          this.form.value.FuenteObtencion = "";

          let _Ciclo = (this.form.value.Ciclo == null) ? "" : this.form.value.Ciclo;

          let CicloV = '';
          if(this.form.value.Ciclo != ''){
           CicloV = _Ciclo.split('*');
          }else {

            CicloV = '';

          }

          let f_negocio = "";



          let _EmpresaEscuela = (this.form.value.EscuelaEmpresa == undefined) ? "" : this.form.value.EscuelaEmpresa;

          let EmpresaEscuelaV : any;
          let cal_empresa : any;

          if(this.form.value.EscuelaEmpresa !== undefined){

            console.log("EscuelaEmpresa es distinto de Undefined");
            EmpresaEscuelaV = _EmpresaEscuela.split('*');
            cal_empresa = (EmpresaEscuelaV[3] === undefined) ? null : EmpresaEscuelaV[3];

          }



          let cal_status : any;
          let cal_fo : any;

          //Validacion de calidad
          if(cal_empresa == 'H'){
             cal_status = 'EMPRESAS';
             cal_fo = 'EMPRESAS';

          }else if(cal_empresa == 'A' || cal_empresa == 'B' || cal_empresa == 'C' || cal_empresa == 'D' ){
              cal_status = "ESCUELAS PROVEEDORAS";
              cal_fo = 'ESCUELAS PROVEEDORAS';

          }else if(cal_empresa == 'G'){
              cal_status = 'ESCUELAS BACK UP';
              cal_fo = 'ESCUELAS BACK UP';

           }else if(cal_empresa == 'E'){
              cal_status = 'ESCUELAS NO ESCOLARIZADAS';
              cal_fo = 'ESCUELAS NO ESCOLARIZADAS';

           }else if(cal_empresa == 'F'){
              cal_status = 'SISTEMAS ABIERTOS';
              cal_fo = 'SISTEMAS ABIERTOS';

           }else if(cal_empresa == 'A286'){
              cal_status = 'ACUERDO 286';
              cal_fo = 'ACUERDO 286';

           }else if(cal_empresa == 'S/A' || this.form.value.actvidadNoTradicional == true ){
              cal_status = 'PROMOCION NO TRADICIONAL';
              cal_fo = 'PROMOCION NO TRADICIONAL';

           }else{
             cal_status = "";
             cal_fo = '';
           }

           let ciclo_mocho : any;

          for (let i = 0; i < this.rows.length; i++) {


              var ciclo = CicloV[1];

            if(ciclo !== undefined){

              ciclo_mocho  = CicloV[1].split('-');

            }else{

              ciclo_mocho = "";

            }
              ciclo = "C"+ciclo_mocho[1];

              let nombre_ventas = CicloV[4];



              if (this.rows[i].FUENTE_NEGOCIO == cal_status && this.rows[i].CICLO == nombre_ventas && this.rows[i].CAMPUS == this.campusTxt && this.rows[i].BL == this.nivelTxt ) {


               /*   console.log("this.form.value.Team = "+this.rows[i].TEAM);
                  console.log("this.form.value.Prioridad = "+this.rows[i].PRIORIDAD);
                  console.log("this.form.value.Attemp = "+this.rows[i].ATTEMP);
                  console.log("this.form.value.FuenteObtencion = "+this.rows[i].FUENTE_NEGOCIO);*/

                  this.form.value.Team = this.rows[i].TEAM;
                  this.form.value.Prioridad = this.rows[i].PRIORIDAD;
                  this.form.value.Attemp = this.rows[i].ATTEMP;
                  this.form.value.FuenteObtencion = this.rows[i].FUENTE_NEGOCIO;

                  f_negocio = this.rows[i].FUENTE_NEGOCIO;

              }






          }


            ciclo =  (ciclo_mocho[0] !== undefined) ? '': ciclo_mocho[0]+"-"+ciclo_mocho[1];



         // console.log("------FuenteNegocio: " + f_negocio);


         let main_carrera = "";

        if( this.form.value.Carrera  !== undefined || this.form.value.Carrera  != null || this.form.value.Carrera  != '' || this.form.value.Carrera  != undefined){
        console.log("Validacion de Carrera");
        console.log("Carrera - "+this.form.value.Carrera);
          main_carrera = (this.form.value.Carrera == '' || this.form.value.Carrera == null )?'':this.form.value.Carrera.split("*");

        }


          for (let i = 0; i < this.carreras.length; i++) {

            if(this.carreras[i].BL == main_carrera[2] && this.carreras[i].codigounico == main_carrera[0]){

   /*       console.log("");console.log("");console.log("");console.log("");
            console.log("codigo unico de carrera:"+this.carreras[i].codigounico);
            console.log("Nombre de carrera:"+this.carreras[i].name);
            console.log("BL de Carrera:"+this.carreras[i].BL);
            console.log("");console.log("");console.log("");console.log("");
   */

                /**Re calcula el team prioridad y attemp con respecto a la universidad**/

                let nombre_ventas = "";
                for (let j = 0; j < this.rows.length; j++) {

                    nombre_ventas = (CicloV[4] == "") ? "" : CicloV[4];

                    //if (this.rows[i].CAMPUS == this.campusTxt && this.rows[i].BL == this.nivelTxt && this.rows[i].CICLO == nombre_ventas) {
                    if (this.rows[j].FUENTE_NEGOCIO == f_negocio && this.rows[j].CICLO == nombre_ventas && this.rows[j].CAMPUS == this.campusTxt && this.rows[j].BL == this.carreras[i].BL ) {


                        this.form.value.Team = this.rows[j].TEAM;
                        //console.log("TEAM : " + this.form.value.Team);
                        this.form.value.Prioridad = this.rows[j].PRIORIDAD;
                        //console.log("Prioridad : " + this.form.value.Prioridad);
                        this.form.value.Attemp = this.rows[j].ATTEMP;
                        //console.log("ATTEMP : " + this.form.value.Attemp);
                        this.form.value.FuenteObtencion = this.rows[j].FUENTE_NEGOCIO;
                       // console.log("Fuente Obtencion : " + this.form.value.FuenteObtencion);
                        //f_negocio = this.rows[i].FUENTE_NEGOCIO;
                    }

                }
                /**TErmina calculo de team prioridad y attemp con respecto a la universidad**/
            }

        }





        let edadT = this.form.value.Edad;
          if(edadT==""){ edadT = null; }

          this.form.value.Banner = window.location.href;


          let bandera = localStorage.getItem('bandera');

          console.log("Calidad de la Empresa de Form:"+this.form.value.Calidad+"");
          console.log("Calidad empresa de catalogo:"+cal_empresa);



/***********Fuente Obtencion Begin***********/

let f_o = "";
let fuente_obtencion_nombre = "";
let fuente_obtencion_GUID = "";

f_o = this.form.value.FuenteObtencion;
//console.log('this.form.value.FuenteObtencion = '+this.form.value.FuenteObtencion);
if(f_o == "" || f_o == null){
fuente_obtencion_nombre = "PROMOCION";
}else{
this.form.value.FuenteObtencion = "PROMOCION";
fuente_obtencion_nombre = "PROMOCION";
}


let fo = "";

for(let i = 0 ; i <= this.fuentesobtencion.length ; i++ ){

if(this.fuentesobtencion[i] !== undefined){
  if( this.fuentesobtencion[i].fuente_name == fuente_obtencion_nombre) {

    fuente_obtencion_GUID = this.fuentesobtencion[i].fuente_GUID;

      }
}

}
//   console.log("Fuentes obtencion: " + fuente_obtencion_nombre);
//  console.log("Fuente Guid: " + fuente_obtencion_GUID);

/***********Fuente Obtencion End***********/
          /* Interes GUID */

          let sendd = {};

          let _Campus = (this.form.value.Campus==null)? "" : this.form.value.Campus;
          let _Nivel = (this.form.value.Nivel==null)? "": this.form.value.Nivel;
          let _Modalidad = (this.form.value.Modalidad==null)? "": this.form.value.Modalidad;
          let _Carrera = (this.form.value.Carrera==null)? "": this.form.value.Carrera;
          let _Interes = (this.form.value.AreaInteres == null) ? "" : this.form.value.AreaInteres;
          let _Ejecutivo = (this.form.value.Ejecutivo == null) ? "" : this.form.value.Ejecutivo;

          let _SubTipo = this.form.value.SubTipoActividad;
          let _SubSubTipo = this.form.value.SubSubTipoActividad;

          let _ActividadAgenda = (this.form.value.ActividadAgenda==null)? "": this.form.value.ActividadAgenda;
          //let _EmpresaEscuela = (this.form.value.EscuelaEmpresa==null)? "": this.form.value.EscuelaEmpresa;
          let _Turno = (this.form.value.Turno==null)? "": this.form.value.Turno;



          let _Parentesco = (this.form.value.ParentescoTutor == null) ? "" : this.form.value.ParentescoTutor;

          let CampusV = _Campus.split('*');
          let NivelV = _Nivel.split('*');
          let ModalidadV = _Modalidad.split('*');
          let CarreraV = _Carrera.split('*');
          let InteresV = _Interes.split('*');
          let ParentescoV = _Parentesco.split('*');

          let EjecutivoV = _Ejecutivo.split('*');

          let SubTipoV = _SubTipo.split('*');
          let SubSubTipoV = _SubSubTipo.split('*');

          let ActividadAgendaV = _ActividadAgenda.split('*');


          let _turno = (this.form.value.Turno == null) ? "" : this.form.value.Turno;


          let TurnoV : any;

          TurnoV = _Turno.split('*');


          let obj_turno : any;

          obj_turno = _turno.split('*');



          console.log("Codigo unico de turno: "+obj_turno[0]);
          let _codigoturno = obj_turno[0];
          console.log("Nombre de turno: "+obj_turno[1]);
          let _nombreturno = obj_turno[1];
          console.log("ID de turno: "+obj_turno[2]);
          let _idturno = obj_turno[2];




          let EjecutivoUser = "";
          let GUIDEjecutivoUser = "";
          let userLocal = localStorage.getItem('user');
          let datos = JSON.parse(userLocal);

          if(this.perfil_usuario=='UNTC Ejecutivo de Cuenta'){
              EjecutivoUser = datos.fullname;
              GUIDEjecutivoUser = datos.systemuserid;
          }else{
               EjecutivoUser = EjecutivoV[1];
               GUIDEjecutivoUser = EjecutivoV[0];
          }
          //console.log("localStorage.getItem('UserId') = "+localStorage.getItem('UserId'));


          let valor_genero  = "";
          if(this.form.value.Genero == 1 || this.form.value.Genero == "M" ){
                     valor_genero = "Masculino";
                   }else if(this.form.value.Genero == 2 || this.form.value.Genero == "F"){
                     valor_genero = "Femenino";
                   }else{
                    valor_genero = null;
                   }


      console.log("Turno - "+TurnoV[2]);

      let cTurno = "";

      if( TurnoV[2] == 1){
      cTurno = "MATUTINO";
      }else if(TurnoV[2] == 2){
      cTurno = "NOCTURNO";
      }else if(TurnoV[2] == 3){
      cTurno = "VESPERTINO";
      }


      console.log("Tu turno: "+cTurno);



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



                      let ciclo_linea = CicloV[1];
                      console.log("");console.log("");
                      console.log("*********************************************");
                      console.log(">  "+ciclo_linea+"_"+fuente_obtencion_abreviatura+"_"+campus_abreviatura+"_"+nivel_abreviatura+"_"+cal_empresa+"  < ");
                      console.log("*********************************************");
                      console.log("");

                      let  l_seg = "";
                      let obj_seguimiento : any;



                      let f_o_ = (fuente_obtencion_abreviatura == '')?'':fuente_obtencion_abreviatura;
                      let c_a_ = (campus_abreviatura == '')?'':campus_abreviatura;
                      let n_a = (nivel_abreviatura == '')?'':nivel_abreviatura;


            //Tipificacion

            console.log("Esta es la tipificacion: "+SubSubTipoV[0]+"_"+SubSubTipoV[1]+"_"+SubSubTipoV[1]);

            //let tipificacion_subsubtipo_con_guid = SubSubTipoV[0]+"_"+SubSubTipoV[1]+"_"+SubSubTipoV[1];
            let tipificacion_subsubtipo_con_guid = 'Nuevo Promotor';

            this.etapaprocesoventaid = SubSubTipoV[2];



            this.form.value.Nombre = this.form.value.Nombre.toUpperCase();
            this.form.value.ApellidoPaterno = this.form.value.ApellidoPaterno.toUpperCase();
            this.form.value.ApellidoMaterno = this.form.value.ApellidoMaterno.toUpperCase();


            this.form.value.NombreTutor = this.form.value.NombreTutor.toUpperCase();
            this.form.value.ApellidoPaternoTutor = this.form.value.ApellidoPaternoTutor.toUpperCase();
            this.form.value.ApellidoMaternoTutor = this.form.value.ApellidoMaternoTutor.toUpperCase();

            this.form.value.CorreoElectronico = this.form.value.CorreoElectronico.toUpperCase();
            this.form.value.CorreoElectronicoTutor = this.form.value.CorreoElectronicoTutor.toUpperCase();





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




            if((valor_genero == null || valor_genero === undefined || valor_genero == '') && (edadT == null || edadT == '' || edadT === undefined)){


              sendd = {

                Usuario: ( this.form.value.Usuario =='')? null : this.form.value.Usuario,
                Nombre: ( this.form.value.Nombre =='')? null : this.getValidaCampo("Nombre", this.form.value.Nombre),
                ApellidoPaterno: ( this.form.value.ApellidoPaterno =='')? null : this.getValidaCampo("Paterno", this.form.value.ApellidoPaterno),
                ApellidoMaterno: ( this.form.value.ApellidoMaterno =='')? null : this.getValidaCampo("Materno", this.form.value.ApellidoMaterno),
                CorreoElectronico: ( this.form.value.CorreoElectronico =='')? null : this.form.value.CorreoElectronico,
                NombreTutor: ( this.form.value.NombreTutor =='')? null : this.form.value.NombreTutor,
                ApellidoPaternoTutor: ( this.form.value.ApellidoPaternoTutor =='')? null : this.form.value.ApellidoPaternoTutor,
                ApellidoMaternoTutor: ( this.form.value.ApellidoMaternoTutor =='')? null : this.form.value.ApellidoMaternoTutor,
                CorreoElectronicoTutor: ( this.form.value.CorreoElectronicoTutor =='')? null : this.form.value.CorreoElectronicoTutor,
                ParentescoTutor: ( ParentescoV[0] =='')? null : ParentescoV[0],
                GUIDParentescotutor: ( ParentescoV[1] =='')? null : ParentescoV[1],
                Ejecutivo: ( EjecutivoUser =='')? null : EjecutivoUser,
                GUIDEjecutivo: ( GUIDEjecutivoUser =='')? null : GUIDEjecutivoUser,
                FuenteNegocio : (f_negocio == "")? cal_fo : f_negocio,
                Campus: ( CampusV[1] =='')? null : CampusV[1],
                Nivel: ( NivelV[1] =='')? null : NivelV[1],
                Modalidad: ( ModalidadV[1] =='')? null : ModalidadV[1],
                Carrera: ( CarreraV[1] =='')? null : CarreraV[1],
                AreaInteres: ( InteresV[1] =='')? null : InteresV[1],
                Ciclo: ( CicloV[1] =='')? null : CicloV[1],
                ActividadAgenda: ( ActividadAgendaV[1] =='')? null : ActividadAgendaV[1],
                SubTipoActividad: ( SubTipoV[1] =='')? null : SubTipoV[1],
                SubSubTipoActividad: ( SubSubTipoV[0] =='')? null : SubSubTipoV[0],
                Calidad:(cal_empresa == "")?"S/A":cal_empresa,
                GUIDCampus: (CampusV[0]=='')? null : CampusV[0],
                GUIDNivelInteres: (NivelV[0]=='')? null : NivelV[0],
                GUIDModalidad: (ModalidadV[0]=='')? null : ModalidadV[0],
                GUIDCarrera: (CarreraV[0]=='')? null : CarreraV[0],
                GUIDAreaInteres:(InteresV[0]=='')? null : InteresV[0],
                GUIDCiclo:( CicloV[0]=='')? null : CicloV[0],
                GUIDUsuario: ( localStorage.getItem('UserId') =='')? null : localStorage.getItem('UserId'),
                GUIDActividAgenda: ( ActividadAgendaV[0] =='')? null : ActividadAgendaV[0],
                GUIDCalidad: ( EmpresaEscuelaV === undefined )? null : EmpresaEscuelaV[2],
                GUIDSubTipo: ( SubTipoV[0] =='')? null : SubTipoV[0],
                GUIDSubSubTipo: ( SubSubTipoV[1] =='')? null : SubSubTipoV[1],

                Banner: ( this.form.value.Banner =='')? null : this.form.value.Banner,
                //ParentescoTutor: this.form.value.ParentescoTutor,

                Team: (this.form.value.Team == undefined) ? "" : this.form.value.Team,
                Prioridad: (this.form.value.Prioridad == undefined) ? 0 : this.form.value.Prioridad,
                Attemp: (this.form.value.Attemp == undefined) ? 0 : this.form.value.Attemp,

                GUIDFuentedeObtencion: (fuente_obtencion_GUID == '') ? '3089dd13-6072-e211-b35f-6cae8b2a4ddc' : fuente_obtencion_GUID,
                FuenteObtencion: (fuente_obtencion_nombre == "")? "" : fuente_obtencion_nombre,

                //Numero Celular
                Telefono: (this.form.value.NumeroCelular=="")?null:this.form.value.NumeroCelular,
                TelefonoPredictivo:(this.form.value.TelefonoCelularPredictivo == "9045null") ? null : this.form.value.TelefonoCelularPredictivo,
                //Numero Telefono o Telefono Casa
                TelefonoCasa: this.form.value.Telefono,
                TelefonoCasaPredictivo: (this.form.value.Telefono == '' || this.form.value.Telefono == null) ? '': tel_casa_predictivo,


                //Numero Celular Tutor
                NumeroCelularTutor:(this.form.value.NumeroCelularTutor=='')?null:this.form.value.NumeroCelularTutor,
                TelefonoCelularPredictivoTutor:(this.form.value.TelefonoCelularPredictivoTutor == "9045null") ? null : this.form.value.TelefonoCelularPredictivoTutor,
                //Numero Casa Tutor
                TelefonoTutor:(this.form.value.TelefonoTutor=='')?null:this.form.value.TelefonoTutor,
                TelefonoCasaTutorPredictivo: (this.form.value.TelefonoPredictivoTutor == "901null") ? null : this.form.value.TelefonoPredictivoTutor,
                //Tipificacion: SubSubTipoV[0],
                Tipificacion: 'Nuevo Promotor',
                GUIDTipificacion:'c8aca7b6-cbdb-e811-8148-3863bb35ddc8',
                EtapaProcesoVentaGUID: ( SubSubTipoV[2] =='')? null : SubSubTipoV[2],

                EscuelaEmpresa: ( EmpresaEscuelaV[1] == '' || EmpresaEscuelaV[1] == null)? '': EmpresaEscuelaV[1],
                Turno: ( _nombreturno == '' || _nombreturno == null )? '' : _nombreturno,

                GUIDEscuelaEmpresa: ( EmpresaEscuelaV[0] =='' || EmpresaEscuelaV[0] == null )? '' : EmpresaEscuelaV[0],
                GUIDTurno: ( _codigoturno =='' || _codigoturno == null)? '' : _codigoturno,

              };


          }else if((valor_genero == null || valor_genero === undefined || valor_genero == '') && (edadT != null || edadT != '' || edadT !== undefined)){


            sendd = {

              Usuario: ( this.form.value.Usuario =='')? null : this.form.value.Usuario,
              Nombre: ( this.form.value.Nombre =='')? null : this.getValidaCampo("Nombre", this.form.value.Nombre),
              ApellidoPaterno: ( this.form.value.ApellidoPaterno =='')? null : this.getValidaCampo("Paterno", this.form.value.ApellidoPaterno),
              ApellidoMaterno: ( this.form.value.ApellidoMaterno =='')? null : this.getValidaCampo("Materno", this.form.value.ApellidoMaterno),
              CorreoElectronico: ( this.form.value.CorreoElectronico =='')? null : this.form.value.CorreoElectronico,
              Edad: (edadT =='')? null : edadT,
              NombreTutor: ( this.form.value.NombreTutor =='')? null : this.form.value.NombreTutor,
              ApellidoPaternoTutor: ( this.form.value.ApellidoPaternoTutor =='')? null : this.form.value.ApellidoPaternoTutor,
              ApellidoMaternoTutor: ( this.form.value.ApellidoMaternoTutor =='')? null : this.form.value.ApellidoMaternoTutor,
              CorreoElectronicoTutor: ( this.form.value.CorreoElectronicoTutor =='')? null : this.form.value.CorreoElectronicoTutor,
              ParentescoTutor: ( ParentescoV[0] =='')? null : ParentescoV[0],
              GUIDParentescotutor: ( ParentescoV[1] =='')? null : ParentescoV[1],
              Ejecutivo: ( EjecutivoUser =='')? null : EjecutivoUser,
              GUIDEjecutivo: ( GUIDEjecutivoUser =='')? null : GUIDEjecutivoUser,
              FuenteNegocio : (f_negocio == "")? cal_fo : f_negocio,
              Campus: ( CampusV[1] =='')? null : CampusV[1],
              Nivel: ( NivelV[1] =='')? null : NivelV[1],
              Modalidad: ( ModalidadV[1] =='')? null : ModalidadV[1],
              Carrera: ( CarreraV[1] =='')? null : CarreraV[1],
              AreaInteres: ( InteresV[1] =='')? null : InteresV[1],
              Ciclo: ( CicloV[1] =='')? null : CicloV[1],
              ActividadAgenda: ( ActividadAgendaV[1] =='')? null : ActividadAgendaV[1],
              SubTipoActividad: ( SubTipoV[1] =='')? null : SubTipoV[1],
              SubSubTipoActividad: ( SubSubTipoV[0] =='')? null : SubSubTipoV[0],
              Calidad:(cal_empresa == "")?"S/A":cal_empresa,
              GUIDCampus: (CampusV[0]=='')? null : CampusV[0],
              GUIDNivelInteres: (NivelV[0]=='')? null : NivelV[0],
              GUIDModalidad: (ModalidadV[0]=='')? null : ModalidadV[0],
              GUIDCarrera: (CarreraV[0]=='')? null : CarreraV[0],
              GUIDAreaInteres:(InteresV[0]=='')? null : InteresV[0],
              GUIDCiclo:( CicloV[0]=='')? null : CicloV[0],
              GUIDUsuario: ( localStorage.getItem('UserId') =='')? null : localStorage.getItem('UserId'),
              GUIDActividAgenda: ( ActividadAgendaV[0] =='')? null : ActividadAgendaV[0],
              GUIDCalidad:  ( EmpresaEscuelaV === undefined )? null : EmpresaEscuelaV[2],
              GUIDSubTipo: ( SubTipoV[0] =='')? null : SubTipoV[0],
              GUIDSubSubTipo: ( SubSubTipoV[1] =='')? null : SubSubTipoV[1],

              Banner: ( this.form.value.Banner =='')? null : this.form.value.Banner,
              //ParentescoTutor: this.form.value.ParentescoTutor,

              Team: (this.form.value.Team == undefined) ? "" : this.form.value.Team,
              Prioridad: (this.form.value.Prioridad == undefined) ? 0 : this.form.value.Prioridad,
              Attemp: (this.form.value.Attemp == undefined) ? 0 : this.form.value.Attemp,

              GUIDFuentedeObtencion: (fuente_obtencion_GUID == '') ? '3089dd13-6072-e211-b35f-6cae8b2a4ddc' : fuente_obtencion_GUID,
              FuenteObtencion: (fuente_obtencion_nombre == "")? "" : fuente_obtencion_nombre,

              //Numero Celular
              Telefono: (this.form.value.NumeroCelular=="")?null:this.form.value.NumeroCelular,
              TelefonoPredictivo:(this.form.value.TelefonoCelularPredictivo == "9045null") ? null : this.form.value.TelefonoCelularPredictivo,
              //Numero Telefono o Telefono Casa
              TelefonoCasa: this.form.value.Telefono,
              TelefonoCasaPredictivo: (this.form.value.Telefono == '' || this.form.value.Telefono == null) ? '': tel_casa_predictivo,


              //Numero Celular Tutor
              NumeroCelularTutor:(this.form.value.NumeroCelularTutor=='')?null:this.form.value.NumeroCelularTutor,
              TelefonoCelularPredictivoTutor:(this.form.value.TelefonoCelularPredictivoTutor == "9045null") ? null : this.form.value.TelefonoCelularPredictivoTutor,
              //Numero Casa Tutor
              TelefonoTutor:(this.form.value.TelefonoTutor=='')?null:this.form.value.TelefonoTutor,
              TelefonoCasaTutorPredictivo: (this.form.value.TelefonoPredictivoTutor == "901null") ? null : this.form.value.TelefonoPredictivoTutor,
              Tipificacion: tipificacion_subsubtipo_con_guid,
              GUIDTipificacion: 'c8aca7b6-cbdb-e811-8148-3863bb35ddc8',
              EtapaProcesoVentaGUID : ( SubSubTipoV[2] =='')? null : SubSubTipoV[2],

              EscuelaEmpresa: ( EmpresaEscuelaV[1] == '' || EmpresaEscuelaV[1] == null)? '': EmpresaEscuelaV[1],
              Turno: ( _nombreturno == '' || _nombreturno == null )? '' : _nombreturno,

              GUIDEscuelaEmpresa: ( EmpresaEscuelaV[0] =='' || EmpresaEscuelaV[0] == null)? '' : EmpresaEscuelaV[0],
              GUIDTurno: ( _codigoturno =='' || _codigoturno == null)? '' : _codigoturno,
          };

          } else if((valor_genero != null || valor_genero !== undefined || valor_genero != '') && (edadT == null || edadT == '' || edadT === undefined)){


            sendd = {

              Usuario: ( this.form.value.Usuario =='')? null : this.form.value.Usuario,
              Nombre: ( this.form.value.Nombre =='')? null : this.getValidaCampo("Nombre", this.form.value.Nombre),
              ApellidoPaterno: ( this.form.value.ApellidoPaterno =='')? null : this.getValidaCampo("Paterno", this.form.value.ApellidoPaterno),
              ApellidoMaterno: ( this.form.value.ApellidoMaterno =='')? null : this.getValidaCampo("Materno", this.form.value.ApellidoMaterno),
              CorreoElectronico: ( this.form.value.CorreoElectronico =='')? null : this.form.value.CorreoElectronico,
              Genero: (valor_genero == '')? null : valor_genero,
              NombreTutor: ( this.form.value.NombreTutor =='')? null : this.form.value.NombreTutor,
              ApellidoPaternoTutor: ( this.form.value.ApellidoPaternoTutor =='')? null : this.form.value.ApellidoPaternoTutor,
              ApellidoMaternoTutor: ( this.form.value.ApellidoMaternoTutor =='')? null : this.form.value.ApellidoMaternoTutor,
              CorreoElectronicoTutor: ( this.form.value.CorreoElectronicoTutor =='')? null : this.form.value.CorreoElectronicoTutor,
              ParentescoTutor: ( ParentescoV[0] =='')? null : ParentescoV[0],
              GUIDParentescotutor: ( ParentescoV[1] =='')? null : ParentescoV[1],
              Ejecutivo: ( EjecutivoUser =='')? null : EjecutivoUser,
              GUIDEjecutivo: ( GUIDEjecutivoUser =='')? null : GUIDEjecutivoUser,
              FuenteNegocio : (f_negocio == "")? cal_fo : f_negocio,
              Campus: ( CampusV[1] =='')? null : CampusV[1],
              Nivel: ( NivelV[1] =='')? null : NivelV[1],
              Modalidad: ( ModalidadV[1] =='')? null : ModalidadV[1],
              Carrera: ( CarreraV[1] =='')? null : CarreraV[1],
              AreaInteres: ( InteresV[1] =='')? null : InteresV[1],
              Ciclo: ( CicloV[1] =='')? null : CicloV[1],
              ActividadAgenda: ( ActividadAgendaV[1] =='')? null : ActividadAgendaV[1],
              SubTipoActividad: ( SubTipoV[1] =='')? null : SubTipoV[1],
              SubSubTipoActividad: ( SubSubTipoV[0] =='')? null : SubSubTipoV[0],
              Calidad:(cal_empresa == "")?"S/A":cal_empresa,
              GUIDCampus: (CampusV[0]=='')? null : CampusV[0],
              GUIDNivelInteres: (NivelV[0]=='')? null : NivelV[0],
              GUIDModalidad: (ModalidadV[0]=='')? null : ModalidadV[0],
              GUIDCarrera: (CarreraV[0]=='')? null : CarreraV[0],
              GUIDAreaInteres:(InteresV[0]=='')? null : InteresV[0],
              GUIDCiclo:( CicloV[0]=='')? null : CicloV[0],
              GUIDUsuario: ( localStorage.getItem('UserId') =='')? null : localStorage.getItem('UserId'),
              GUIDActividAgenda: ( ActividadAgendaV[0] =='')? null : ActividadAgendaV[0],
              GUIDCalidad:  ( EmpresaEscuelaV === undefined )? null : EmpresaEscuelaV[2],
              GUIDSubTipo: ( SubTipoV[0] =='')? null : SubTipoV[0],
              GUIDSubSubTipo: ( SubSubTipoV[1] =='')? null : SubSubTipoV[1],

              Banner: ( this.form.value.Banner =='')? null : this.form.value.Banner,
              //ParentescoTutor: this.form.value.ParentescoTutor,

              Team: (this.form.value.Team == undefined) ? "" : this.form.value.Team,
              Prioridad: (this.form.value.Prioridad == undefined) ? 0 : this.form.value.Prioridad,
              Attemp: (this.form.value.Attemp == undefined) ? 0 : this.form.value.Attemp,

              GUIDFuentedeObtencion: (fuente_obtencion_GUID == '') ? '3089dd13-6072-e211-b35f-6cae8b2a4ddc' : fuente_obtencion_GUID,
              FuenteObtencion: (fuente_obtencion_nombre == "")? "" : fuente_obtencion_nombre,

              //Numero Celular
              Telefono: (this.form.value.NumeroCelular=="")?null:this.form.value.NumeroCelular,
              TelefonoPredictivo:(this.form.value.TelefonoCelularPredictivo == "9045null") ? null : this.form.value.TelefonoCelularPredictivo,
              //Numero Telefono o Telefono Casa
              TelefonoCasa: this.form.value.Telefono,
              TelefonoCasaPredictivo: (this.form.value.Telefono == '' || this.form.value.Telefono == null) ? '': tel_casa_predictivo,


              //Numero Celular Tutor
              NumeroCelularTutor:(this.form.value.NumeroCelularTutor=='')?null:this.form.value.NumeroCelularTutor,
              TelefonoCelularPredictivoTutor:(this.form.value.TelefonoCelularPredictivoTutor == "9045null") ? null : this.form.value.TelefonoCelularPredictivoTutor,
              //Numero Casa Tutor
              TelefonoTutor:(this.form.value.TelefonoTutor=='')?null:this.form.value.TelefonoTutor,
              TelefonoCasaTutorPredictivo: (this.form.value.TelefonoPredictivoTutor == "901null") ? null : this.form.value.TelefonoPredictivoTutor,
              Tipificacion: tipificacion_subsubtipo_con_guid,
              GUIDTipificacion: 'c8aca7b6-cbdb-e811-8148-3863bb35ddc8',
              EtapaProcesoVentaGUID : ( SubSubTipoV[2] =='')? null : SubSubTipoV[2],

              EscuelaEmpresa: ( EmpresaEscuelaV[1] == '' || EmpresaEscuelaV[1] == null)? '': EmpresaEscuelaV[1],
              Turno: ( _nombreturno == '' || _nombreturno == null )? '' : _nombreturno,

              GUIDEscuelaEmpresa: ( EmpresaEscuelaV[0] =='' || EmpresaEscuelaV[0] == null)? '' : EmpresaEscuelaV[0],
              GUIDTurno: ( _codigoturno =='' || _codigoturno == null)? '' : _codigoturno,

          };



          }else if(this.form.controls.actvidadNoTradicional.value == true){

               this.form.value.actvidadNoTradicional = '';
               sendd = {

                  Usuario: ( this.form.value.Usuario =='')? null : this.form.value.Usuario,
                  Nombre: ( this.form.value.Nombre =='')? null : this.getValidaCampo("Nombre", this.form.value.Nombre),
                  ApellidoPaterno: ( this.form.value.ApellidoPaterno =='')? null : this.getValidaCampo("Paterno", this.form.value.ApellidoPaterno),
                  ApellidoMaterno: ( this.form.value.ApellidoMaterno =='')? null : this.getValidaCampo("Materno", this.form.value.ApellidoMaterno),
                  CorreoElectronico: ( this.form.value.CorreoElectronico =='')? null : this.form.value.CorreoElectronico,
                  Genero: (valor_genero == '')? null : valor_genero,
                  Edad: (edadT =='')? null : edadT,
                  NombreTutor: ( this.form.value.NombreTutor =='')? null : this.form.value.NombreTutor,
                  ApellidoPaternoTutor: ( this.form.value.ApellidoPaternoTutor =='')? null : this.form.value.ApellidoPaternoTutor,
                  ApellidoMaternoTutor: ( this.form.value.ApellidoMaternoTutor =='')? null : this.form.value.ApellidoMaternoTutor,
                  CorreoElectronicoTutor: ( this.form.value.CorreoElectronicoTutor =='')? null : this.form.value.CorreoElectronicoTutor,
                  ParentescoTutor: ( ParentescoV[0] =='')? null : ParentescoV[0],
                  GUIDParentescotutor: ( ParentescoV[1] =='')? null : ParentescoV[1],
                  Ejecutivo: ( EjecutivoUser =='')? null : EjecutivoUser,
                  GUIDEjecutivo: ( GUIDEjecutivoUser =='')? null : GUIDEjecutivoUser,
                  FuenteNegocio : (f_negocio == "")? cal_fo : f_negocio,
                  Campus: ( CampusV[1] =='')? null : CampusV[1],
                  Nivel: ( NivelV[1] =='')? null : NivelV[1],
                  Modalidad: ( ModalidadV[1] =='')? null : ModalidadV[1],
                  Carrera: ( CarreraV[1] =='')? null : CarreraV[1],
                  AreaInteres: ( InteresV[1] =='')? null : InteresV[1],
                  Ciclo: ( CicloV[1] =='')? null : CicloV[1],
                  ActividadAgenda: ( ActividadAgendaV[1] =='')? null : ActividadAgendaV[1],
                  SubTipoActividad: ( SubTipoV[1] =='')? null : SubTipoV[1],
                  SubSubTipoActividad: ( SubSubTipoV[0] =='')? null : SubSubTipoV[0],
                  Calidad:(cal_empresa == "")?"S/A":cal_empresa,
                  GUIDCampus: (CampusV[0]=='')? null : CampusV[0],
                  GUIDNivelInteres: (NivelV[0]=='')? null : NivelV[0],
                  GUIDModalidad: (ModalidadV[0]=='')? null : ModalidadV[0],
                  GUIDCarrera: (CarreraV[0]=='')? null : CarreraV[0],
                  GUIDAreaInteres:(InteresV[0]=='')? null : InteresV[0],
                  GUIDCiclo:( CicloV[0]=='')? null : CicloV[0],
                  GUIDUsuario: ( localStorage.getItem('UserId') =='')? null : localStorage.getItem('UserId'),
                  GUIDActividAgenda: ( ActividadAgendaV[0] =='')? null : ActividadAgendaV[0],
                  GUIDCalidad:  ( EmpresaEscuelaV === undefined )? null : EmpresaEscuelaV[2],
                  GUIDSubTipo: ( SubTipoV[0] =='')? null : SubTipoV[0],
                  GUIDSubSubTipo: ( SubSubTipoV[1] =='')? null : SubSubTipoV[1],

                  Banner: ( this.form.value.Banner =='')? null : this.form.value.Banner,
                  //ParentescoTutor: this.form.value.ParentescoTutor,

                  Team: (this.form.value.Team == undefined) ? "" : this.form.value.Team,
                  Prioridad: (this.form.value.Prioridad == undefined) ? 0 : this.form.value.Prioridad,
                  Attemp: (this.form.value.Attemp == undefined) ? 0 : this.form.value.Attemp,

                  GUIDFuentedeObtencion: (fuente_obtencion_GUID == '') ? '3089dd13-6072-e211-b35f-6cae8b2a4ddc' : fuente_obtencion_GUID,
                  FuenteObtencion: (fuente_obtencion_nombre == "")? "" : fuente_obtencion_nombre,

                  //Numero Celular
                  Telefono: (this.form.value.NumeroCelular=="")?null:this.form.value.NumeroCelular,
                  TelefonoPredictivo:(this.form.value.TelefonoCelularPredictivo == "9045null") ? null : this.form.value.TelefonoCelularPredictivo,
                  //Numero Telefono o Telefono Casa
                  TelefonoCasa: this.form.value.Telefono,
                  TelefonoCasaPredictivo: (this.form.value.Telefono == '' || this.form.value.Telefono == null) ? '': tel_casa_predictivo,


                  //Numero Celular Tutor
                  NumeroCelularTutor:(this.form.value.NumeroCelularTutor=='')?null:this.form.value.NumeroCelularTutor,
                  TelefonoCelularPredictivoTutor:(this.form.value.TelefonoCelularPredictivoTutor == "9045null") ? null : this.form.value.TelefonoCelularPredictivoTutor,
                  //Numero Casa Tutor
                  TelefonoTutor:(this.form.value.TelefonoTutor=='')?null:this.form.value.TelefonoTutor,
                  TelefonoCasaTutorPredictivo: (this.form.value.TelefonoPredictivoTutor == "901null") ? null : this.form.value.TelefonoPredictivoTutor,
                  Tipificacion: tipificacion_subsubtipo_con_guid,
                  GUIDTipificacion: 'c8aca7b6-cbdb-e811-8148-3863bb35ddc8',
                  EtapaProcesoVentaGUID : ( SubSubTipoV[2] =='')? null : SubSubTipoV[2],

                  EscuelaEmpresa: ( EmpresaEscuelaV[1] == '' || EmpresaEscuelaV[1] == null )? '': EmpresaEscuelaV[1],
                  Turno: ( _nombreturno == '' || _nombreturno == null)? '' : _nombreturno,

                  GUIDEscuelaEmpresa: ( EmpresaEscuelaV[0] =='' || EmpresaEscuelaV[0] == null  )? '' : EmpresaEscuelaV[0],
                  GUIDTurno: ( _codigoturno =='' || _codigoturno == null)? '' : _codigoturno,


              };


          }else{

                sendd = {


                  Usuario: ( this.form.value.Usuario =='')? null : this.form.value.Usuario,
                  Nombre: ( this.form.value.Nombre =='')? null : this.getValidaCampo("Nombre", this.form.value.Nombre),
                  ApellidoPaterno: ( this.form.value.ApellidoPaterno =='')? null : this.getValidaCampo("Paterno", this.form.value.ApellidoPaterno),
                  ApellidoMaterno: ( this.form.value.ApellidoMaterno =='')? null : this.getValidaCampo("Materno", this.form.value.ApellidoMaterno),
                  CorreoElectronico: ( this.form.value.CorreoElectronico =='')? null : this.form.value.CorreoElectronico,
                  Genero :(valor_genero == '')? null : valor_genero,
                  Edad: ( edadT =='')? null : edadT,

                  NombreTutor: ( this.form.value.NombreTutor =='')? null :  this.form.value.NombreTutor,
                  ApellidoPaternoTutor: ( this.form.value.ApellidoPaternoTutor =='')? null :  this.form.value.ApellidoPaternoTutor,
                  ApellidoMaternoTutor: ( this.form.value.ApellidoMaternoTutor =='')? null :  this.form.value.ApellidoMaternoTutor,
                  CorreoElectronicoTutor: ( this.form.value.CorreoElectronicoTutor =='')? null : this.form.value.CorreoElectronicoTutor,

                  ParentescoTutor: ( ParentescoV[0] =='')? null : ParentescoV[0],
                  GUIDParentescotutor: ( ParentescoV[1] =='')? null : ParentescoV[1],

                  Ejecutivo: ( EjecutivoUser =='')? null : EjecutivoUser,
                  GUIDEjecutivo: ( GUIDEjecutivoUser =='')? null : GUIDEjecutivoUser,
                  FuenteNegocio : (f_negocio == "")? cal_fo : f_negocio,

                  Campus: ( CampusV[1] =='')? null : CampusV[1],
                  Nivel: ( NivelV[1] =='')? null : NivelV[1],
                  Modalidad: ( ModalidadV[1] =='')? null : ModalidadV[1],
                  Carrera: ( CarreraV[1] =='')? null : CarreraV[1],
                  AreaInteres: ( InteresV[1] =='')? null : InteresV[1],
                  Ciclo: ( CicloV[1] =='')? null : CicloV[1],


                  ActividadAgenda: ( ActividadAgendaV[1] =='')? null : ActividadAgendaV[1],
                  SubTipoActividad: ( SubTipoV[1] =='')? null : SubTipoV[1],
                  SubSubTipoActividad: ( SubSubTipoV[0] =='')? null : SubSubTipoV[0],



                  EscuelaEmpresa: ( EmpresaEscuelaV[1] == '' || EmpresaEscuelaV[1] == null)? '': EmpresaEscuelaV[1],
                  Turno: ( _nombreturno == '' || _nombreturno == null) ? '' : _nombreturno,

                  GUIDEscuelaEmpresa: ( EmpresaEscuelaV[0] =='' || EmpresaEscuelaV[0] == null)? '' : EmpresaEscuelaV[0],
                  GUIDTurno: ( _codigoturno =='' || _codigoturno == null)? '' : _codigoturno,


                  Calidad:(cal_empresa == "")?"S/A":cal_empresa,

                  GUIDCampus: (CampusV[0]=='')? null : CampusV[0],
                  GUIDNivelInteres: (NivelV[0]=='')? null : NivelV[0],
                  GUIDModalidad: (ModalidadV[0]=='')? null : ModalidadV[0],
                  GUIDCarrera: (CarreraV[0]=='')? null : CarreraV[0],
                  GUIDAreaInteres:(InteresV[0]=='')? null : InteresV[0],
                  GUIDCiclo:( CicloV[0]=='')? null : CicloV[0],
                  GUIDUsuario: ( localStorage.getItem('UserId') == '' )? null : localStorage.getItem('UserId'),
                  GUIDActividAgenda:ActividadAgendaV[0],

                  GUIDCalidad:  ( EmpresaEscuelaV === undefined )? null : EmpresaEscuelaV[2],


                  GUIDSubTipo: ( SubTipoV[0] =='')? null : SubTipoV[0],
                  GUIDSubSubTipo: ( SubSubTipoV[1] =='')? null : SubSubTipoV[1],
                  //Calidad: this.form.value.Calidad,

                  Banner: ( this.form.value.Banner =='')? null : this.form.value.Banner,
                  //ParentescoTutor: this.form.value.ParentescoTutor,

                  Team: (this.form.value.Team == undefined) ? null : this.form.value.Team,
                  Prioridad: (this.form.value.Prioridad == undefined) ? 0 : this.form.value.Prioridad,
                  Attemp: (this.form.value.Attemp == undefined) ? 0 : this.form.value.Attemp,

                  GUIDFuentedeObtencion: (fuente_obtencion_GUID == '') ? '3089dd13-6072-e211-b35f-6cae8b2a4ddc' : fuente_obtencion_GUID,
                  FuenteObtencion: (fuente_obtencion_nombre == "")? "" : fuente_obtencion_nombre,

                  //Numero Celular
                  Telefono: (this.form.value.NumeroCelular=="")?null:this.form.value.NumeroCelular,
                  TelefonoPredictivo:(this.form.value.TelefonoCelularPredictivo == "9045null") ? null : this.form.value.TelefonoCelularPredictivo,
                  //Numero Telefono o Telefono Casa
                  TelefonoCasa:  ( this.form.value.Telefono =='')? null : this.form.value.Telefono,
                  TelefonoCasaPredictivo: (this.form.value.Telefono == '' || this.form.value.Telefono == null) ? '': tel_casa_predictivo,


                  //Numero Celular Tutor
                  NumeroCelularTutor:(this.form.value.NumeroCelularTutor=='')?null:this.form.value.NumeroCelularTutor,
                  TelefonoCelularPredictivoTutor:(this.form.value.TelefonoCelularPredictivoTutor == "9045null") ? null : this.form.value.TelefonoCelularPredictivoTutor,
                  //Numero Casa Tutor
                  TelefonoTutor:(this.form.value.TelefonoTutor=='')?null:this.form.value.TelefonoTutor,
                  TelefonoCasaTutorPredictivo: (this.form.value.TelefonoPredictivoTutor == "901null") ? null : this.form.value.TelefonoPredictivoTutor,
                  Tipificacion: tipificacion_subsubtipo_con_guid,
                  GUIDTipificacion: 'c8aca7b6-cbdb-e811-8148-3863bb35ddc8',
                  EtapaProcesoVentaGUID : ( SubSubTipoV[2] =='')? null : SubSubTipoV[2],
              };

          }



   //Creando variables Local Storage


   console.log("local_Ejecutivo - "+_Ejecutivo);
   localStorage.setItem("local_ejecutivo", _Ejecutivo);

   console.log("local_subtipoactividad - "+_SubTipo);
   localStorage.setItem("local_subtipoactividad", _SubTipo);

   console.log("local_subsubtipoactividad - "+_SubSubTipo );
   localStorage.setItem("local_subsubtipoactividad", _SubSubTipo);

   console.log("local_empresaescuela - "+_EmpresaEscuela);
   localStorage.setItem("local_escuelaempresa", _EmpresaEscuela);

   console.log("local_actividadagenda - "+_ActividadAgenda);
   localStorage.setItem("local_actividadagenda", _ActividadAgenda);

   console.log("local_turno - "+_Turno);
   localStorage.setItem("local_turno", _Turno);

   console.log("local_calidad - "+cal_empresa);
   localStorage.setItem("local_calidad", cal_empresa);

/*
   console.log("local_sinescuela - "+this.form.value.actvidadNoTradicional);
   localStorage.setItem("local_sinescuela", this.form.value.actvidadNoTradicional);*/



   //Modulo de nteres


   console.log("local_campus - "+_Campus);
   localStorage.setItem("local_campus", _Campus);


   console.log("local_nivel"+_Nivel );
   localStorage.setItem("local_nivel", _Nivel);

   console.log("local_modalidad"+_Modalidad );
   localStorage.setItem("local_modalidad", _Modalidad);

   console.log("local_carrera"+_Carrera);
   localStorage.setItem("local_carrera", _Carrera);


   console.log("local_ciclo"+_Ciclo);
   localStorage.setItem("local_ciclo", _Ciclo);

   console.log("local_areainteres"+_Interes);
   localStorage.setItem("local_areainteres", _Interes);




          //Comienza validacion de existencia de linea de seguimiento

          console.log("ciclo_linea: "+ciclo_linea);
          console.log("campus_abreviatura: "+campus_abreviatura);
          console.log("nivel_abreviatura: "+nivel_abreviatura);



          let b1 : any;
          let b2 : any;
          let b3 : any;

          if(ciclo_linea === undefined){

            b1 = 'F';
          }else{
            b1 = 'V';

          }

          if(campus_abreviatura === undefined){

            b2 = 'F';
          }else{
            b2 = 'V';

          }

          if(nivel_abreviatura === undefined){

            b3 = 'F';
          }else{
            b3 = 'V';

          }


          if( b1 == 'F' && b2 == 'F' && b3 == 'F' ){

            obj_seguimiento = {};
            console.log("Esta vacia la linea de seguimiento");


        }else if( b1 == 'V' && b2 == 'V' && b3 == 'V' ){


          console.log("Entro a validacion de linea de seguimiento");

          if(cal_empresa == '' || cal_empresa == null){

              l_seg = ciclo_linea+"_"+f_o_+"_"+c_a_+"_"+n_a;

           }else{

             l_seg = ciclo_linea+"_"+f_o_+"_"+c_a_+"_"+n_a+"_"+cal_empresa;

           }



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

///////////////////////////////////////////////////////////////////////////



            this.sendServ.send_Todos_inb_sol_prom_QA(sendd)//Anterior sendData4
                  .subscribe(
                      (res: any) => {
                          console.log(res.status);
                          if (res.status == 200) {

                            this.Abreventana(this.form.value.Nombre, this.form.value.ApellidoPaterno, ' ', this.form.value.CorreoElectronico, "", ' ');
                            this.sendServ.sendHubSpot(this.form.value.Nombre, this.form.value.ApellidoPaterno, ' ', this.form.value.CorreoElectronico, "", ' ')// this.form.value)

                              this.showDialog("Registro guardado con éxito.");

                          } else {
                              this.showDialogE("Error al guardar el registro.");
                          }
                      }, error => {
                          if (error.status === 400) {
                              //console.log(error);
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






              this.sendServ.send_Todos_inb_sol_prom_QA(sendd)// this.form.value)
                  .subscribe(
                      (res: any) => {
                          console.log(res.status);
                          if (res.status == 200) {
                            this.Abreventana(this.form.value.Nombre, this.form.value.ApellidoPaterno, ' ', this.form.value.CorreoElectronico, "", '');
                            this.sendServ.sendHubSpot(this.form.value.Nombre, this.form.value.ApellidoPaterno, ' ', this.form.value.CorreoElectronico, "", '')// this.form.value)

                              this.showDialog("Registro guardado con éxito.");

                          } else {
                              this.showDialogE("Error al guardar el registro.");
                          }
                      }, error => {
                          if (error.status === 400) {
                              //console.log(error);
                              this.showDialogE(error._body);
                          }
                          else if (error.status === 500) {
                              this.showDialogE(error._body);
                          }
                      }
                  )






                } else {
                  console.log("Error al enviar el registro.");
              }
          }
  )











          }

        }

      } else {
          this.showDialogE("Error al realizar el registro *");
      }

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

//Validacion de correo Electronico

Segunda_validacion_Email(email) {
if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/.test(email)){
  return (true)
} else {
  return (false);
}
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

/*    console.log("");
    console.log("------------Validacion de Nombre Tutor---------------");

                for (let i = 0; i < valor.length; i++) {
                  if (s.indexOf(valor.charAt(i), 0) != -1) {
                      r = 1;

                      if(r == 1){
                         this.campos_con_error.push(" "+campo);
                         console.log("Error en campo Nombre Tutor");
                         r=0;
                         return false;
                        }

                  } else { r = 0 ; return valor;}
              }


*/


  }else  if(campo == "Materno"){ //Valida Apellido Paterno



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
      window.location.href = "/nuevo-promotor";
      this.form.reset();
  }

  onKeyFechaNacimiento() {
      let edad = this.form.controls.Edad.value;
      let year = new Date().getFullYear();
      let fecha = year - edad;
      this.form.controls.FechaNacimiento.setValue('01/01/'+fecha);
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


///Pendiente
/*getEscuelaEmpresaByEjecutivo(guidejecutivo: string) : EscuelaEmpresa[] {
  let carrerasId: string[] = [];

  for(let i = 0; i < this.carreras_nivel.length; i++){
    if(this.carreras_nivel[i].modalidadId == guidejecutivo){
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

}*/


  onChangeejecutivo(ejecutivo_asesor: string) {

      console.log("Ejecutivo"+ejecutivo_asesor);

      let ejecutivo_ = ejecutivo_asesor.split('*');
      let guid_ejecutivo_ = ejecutivo_asesor[0];

      console.log("guid_ejecutivo_:" + guid_ejecutivo_);






  }


  addTradicional(isChecked) {
      if (isChecked.checked) {
          this.form.controls.EscuelaEmpresa.reset({ value: '', disabled: true });
        //  this.form.controls.Turno.reset({ value: '', disabled: true });
          this.form.controls.Calidad.reset({ value: '', disabled: true });
      } else {
          this.form.controls.EscuelaEmpresa.reset({ value: '', disabled: false });
      //    this.form.controls.Turno.reset({ value: '', disabled: false });
          this.form.controls.Calidad.reset({ value: '', disabled: false });
      }
      this.form.controls.EscuelaEmpresa.updateValueAndValidity();
      this.form.controls.Turno.updateValueAndValidity();
      this.form.controls.Calidad.updateValueAndValidity();
  }


  onChangeInteres(value) {
      if (value == '') {
        /*  this.form.controls.Campus.clearValidators();
          this.form.controls.AreaInteres.clearValidators();
          this.form.controls.Nivel.clearValidators();
          this.form.controls.Modalidad.clearValidators();
          this.form.controls.Carrera.clearValidators();
          this.form.controls.Ciclo.clearValidators(); */

      } else {
       /*controls.AreaInteres.setValidators([Validators.required]);
          this.form.controls.Nivel.setValidators([Validators.required]);
          this.form.controls.Modalidad.setValidators([Validators.required]);
          this.form.controls.Carrera.setValidators([Validators.required]);
          this.form.controls.Ciclo.setValidators([Validators.required]); */
      }
    /*  this.form.controls.Campus.updateValueAndValidity();
      this.form.controls.AreaInteres.updateValueAndValidity();
      this.form.controls.Nivel.updateValueAndValidity();
      this.form.controls.Modalidad.updateValueAndValidity();
      this.form.controls.Carrera.updateValueAndValidity();
      this.form.controls.Ciclo.updateValueAndValidity(); */
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

  onChangeTurno(turno_: string) {
    console.log("Haz seleccionado Turno :"+turno_);
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
      let value = cadena[0]+'*'+cadena[1];

     if (this.form.controls['Carrera'].disabled) {
          this.form.controls['Carrera'].enable();
      } else {
          this.form.controls['Carrera'].setValue('');
          this.form.controls['Carrera'].markAsUntouched();
      }
      this.carreras = this.campusCarreraServ.getCarrerasByModalidad2(value);

      console.log("LP - onchanCarreras: "+this.carreras);
  }

  onChangeSubTipo(campus: string){
      if(this.form.controls['SubSubTipoActividad'].disabled){
          this.form.controls['SubSubTipoActividad'].enable();
      }else{
          this.form.controls['SubSubTipoActividad'].setValue('');
          this.form.controls['SubSubTipoActividad'].markAsUntouched();
      }
      let cadena = campus.split('*');
      let value = cadena[1];
      console.log('subtipo-Value');
      console.log(cadena);
      this.subsub_tipos = this.subSubServ.getSubSubTiposBySubTipo(value);
  }

  onChangeEscuelaEmpresa(campus: string){
      let cadena = campus.split('*');
      let value = cadena[0];
      let cali = cadena[3];

      let calidad_name = cadena[0]; //this.escuelaEmpresaServ.getCalidadByEscuelaEmpresa(value);
      let calidad_id = this.escuelaEmpresaServ.getCalidadIdByEscuelaEmpresa(value);
      if(calidad_name != null){
          this.form.controls['Calidad'].setValue(cali);
      }
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

  addValidation(isChecked, valor) {
      if (isChecked.checked) {
          console.log("desde addValidation");


          if (this.form.controls.Telefono.value == "" && this.form.controls.NumeroCelular.value == "") {
              isChecked.source.checked = false;
              this.showDialogE("Debes ingresar un teléfono de contacto");
              return false;
          }else{

          let telefono =  '';
          let telefon_casa =  this.form.controls.Telefono.value;
          let telefono_cel =  this.form.controls.NumeroCelular.value;


          if(telefon_casa != "" && telefono_cel == ""){
            telefono = telefon_casa;
          }else if(telefon_casa == "" && telefono_cel != ""){
            telefono = telefono_cel;
          }else if(telefon_casa != "" && telefono_cel != ""){
            telefono = telefono_cel;
          }



          this.form.controls.CorreoElectronico.reset({ value:  telefono + '@unitec.edu.mx', disabled: false });
          this.sinEmail = true;
          this.conEmail = false;

          console.log("- Val Correo1 : "+telefono+'@unitec.edu.mx');
          console.log("- Val Correo2 : "+this.form.controls.Telefono);
          }

          console.log("- Valor de Correo: "+this.form.controls.Telefono);

      } else {

          this.form.controls.CorreoElectronico.reset({ value: '', disabled: false });
          this.sinEmail = false;
          this.conEmail = true;

      }
      this.form.controls.CorreoElectronico.updateValueAndValidity();
  }

  addAsesor(isChecked) {

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
          window.location.href = "/nuevo-promotor";
      });
  }
  private showDialogE(message: string) {
      let dialogRef = this.dialog.open(DialogComponent, {
          height: '180px',
          width: '500px',
          data: { message: message }
      });
  }


}
