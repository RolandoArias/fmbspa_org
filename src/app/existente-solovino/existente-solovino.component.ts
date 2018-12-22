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



@Component({
  selector: 'app-existente-solovino',
  templateUrl: './existente-solovino.component.html',
  styleUrls: ['./existente-solovino.component.scss'],

})

export class ExistenteSolovinoComponent implements OnInit {


  public url_oportunidad : string;
  public nombre_oportunidad : string;
  public nocuentasis : string;

  form: FormGroup;
  sinEmail=false;
  conEmail = true;
  campusValue = '';


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
  FechaCita: FormControl;
  HoraCita: FormControl;
  Programacion: FormControl;
  Transferencia: FormControl;
  Asesor: FormControl;

  No_oportunidad: FormControl;
  No_persona: FormControl;
  Etapa_venta: FormControl;
  No_cuenta: FormControl;

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
  fuentesobtencion: FuenteObtencion[] = [];
  turnos: Turno[] = [];
  rows = [];
  campusTxt: any;
  nivelTxt: any;

  constructor(private landingService: LandingService,
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
      private fuenteobtencionServ: FuenteObtencionService,
      private campusCarreraServ: CampusCarreraService,) {
    this.fetch((data) => {
      this.rows = data;
    });
  }


  ngOnInit() {
      localStorage.setItem('bandera','');
      this.landingService.getInit();

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
      this.campusServ.getAll()
          .subscribe(
              (data: Campus[]) => this.campus = data
          )
      // Se obtienen los ciclos
      this.cicloServ.getAll()
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


      let userSearch = localStorage.getItem('lead_user');
      let jsonSearch = JSON.parse(userSearch);

      let U = jsonSearch.value[0];


      let leadId = localStorage.getItem('lead_id_registersolo');

      let sv = JSON.parse(localStorage.getItem('search_registersolo_value'));


      let l_crmit_nooportunidad = "" ;
      let l_nopersona = "";
      let l_crmit_etapaventaid = "";
      let l_crmit_nocuentasis = "";
      let l_urloportunidad = "";


      for(let i=0 ; i < sv.length ; i++ ){

        if(sv[i].leadid == leadId){

            if(sv[i].crmit_nocuentasis != '0'){



            console.log("");
            console.log("---------------------------------");
            console.log("Id Lead: "+sv[i].leadid);
            console.log("---------------------------------");
            console.log("");

             l_crmit_nooportunidad = sv[i].leadid;
             l_nopersona = sv[i].crmit_nopersona;
             //l_crmit_etapaventaid = sv[i].crmit_etapaventaid;
             l_crmit_etapaventaid = sv[i].salesstagecode;
             l_crmit_nocuentasis = sv[i].crmit_nocuentasis;



             if(typeof sv[i].crmit_urloportunidad !== null){
                 l_urloportunidad = sv[i].crmit_urloportunidad;
             }else{
                 l_urloportunidad = '';
             }

            }else{
              l_crmit_nooportunidad = null;
             l_nopersona = null;
             l_crmit_etapaventaid = null;
             l_crmit_nocuentasis = '0';
             l_urloportunidad = '';
            }

         }

      }

        this.url_oportunidad = l_urloportunidad;
        this.nombre_oportunidad = l_crmit_nooportunidad;
        this.nocuentasis = l_crmit_nocuentasis;


        let parentesco_tipocontactoid = "";

        if(U.crmit_tipocontactoid_value == "8442e0b3-ce48-e811-810f-3863bb3c4538"){ //Mama

           parentesco_tipocontactoid = "MADRE*8442e0b3-ce48-e811-810f-3863bb3c4538*TUTOR";

        }else if(U.crmit_tipocontactoid_value == "2bfef405-a957-e811-8115-3863bb3c4538"){ //Papa

           parentesco_tipocontactoid = "PADRE*2bfef405-a957-e811-8115-3863bb3c4538*TUTOR";

        }

        let ParentescoTutor1 = U._crmit_tipocontactoid_value;


      this.form = new FormGroup({

          Usuario: new FormControl({ value: datos.fullname, disabled: true }),

          SinCorreo: new FormControl(''),

          Nombre: new FormControl(U.firstname, [LandingValidation.palabraMalaValidator()]),
          ApellidoPaterno: new FormControl(U.middlename, [LandingValidation.palabraMalaValidator()]),
          ApellidoMaterno: new FormControl(U.lastname, [LandingValidation.palabraMalaValidator()]),
          CorreoElectronico: new FormControl(U.emailaddress1, [Validators.required, LandingValidation.emailMaloValidator()]),
          NumeroCelular: new FormControl(U.mobilephone, [Validators.minLength(10), LandingValidation.aceptNumberValidator(), LandingValidation.numberConValidator()]),
          Telefono: new FormControl(U.address1_telephone1, [Validators.required, Validators.minLength(10), LandingValidation.aceptNumberValidator(), LandingValidation.numberConValidator()]),
          Genero: new FormControl(U.crmit_sexo),
          FechaNacimiento: new FormControl(''),

          Edad: new FormControl(U.crmit_edad, [Validators.minLength(2),LandingValidation.edadMinValidator()]),


          NombreTutor: new FormControl(U.crmit_nombretutor),
          ApellidoPaternoTutor: new FormControl(U.crmit_apaternotutor),
          ApellidoMaternoTutor: new FormControl(U.crmit_amaternotutor),
          CorreoElectronicoTutor: new FormControl(U.crmit_emailtutor),
          NumeroCelularTutor: new FormControl(U.crmit_telefonopredictivo1),
          TelefonoTutor: new FormControl(U.crmit_telefonotutor),
          ParentescoTutor: new FormControl(ParentescoTutor1),

          Campus: new FormControl(''),
          AreaInteres: new FormControl(''),
          Nivel: new FormControl({ value: '', disabled: true }),
          Modalidad: new FormControl({ value: '', disabled: true }),
          Carrera: new FormControl({ value: '', disabled: true }),
          Ciclo: new FormControl(''),




         // No_oportunidad: new FormControl("<a href='"+l_urloportunidad+"' target='_blank'>"+l_crmit_nooportunidad+"</a>"),

          No_oportunidad: new FormControl(l_crmit_nooportunidad),
          No_persona: new FormControl(l_nopersona),
          Etapa_venta: new FormControl(l_crmit_etapaventaid),
          No_cuenta: new FormControl(l_crmit_nocuentasis),

      });

      //parentescoServ
      this.parentescoServ.getAll()
      .subscribe(
          (data: Parentesco[]) =>{
              const parentescoObjec = this.getObjects(data, 'crmit_codigounico', U._crmit_tipocontactoid_value);
              const parentescoValue = parentescoObjec[0].crmit_name+'*'+parentescoObjec[0].crmit_codigounico+'*'+'TUTOR';
              this.form.controls.ParentescoTutor.reset({ value: parentescoValue, disabled: false });
          }
      )

      this.campusServ.getAll()
      .subscribe(
          (data: Campus[]) => {
              //campus
              const objecCam = this.getObjects(this.campus, 'crmit_tb_campusid', U._crmit_campusid_value);
              this.campusValue = objecCam[0].crmit_tb_campusid+'*'+objecCam[0].crmi_name;
              this.campusTxt = objecCam[0].crmi_name;

              //nivel
              this.niveles = this.campusCarreraServ.getNivelesByCarrera(U._crmit_campusid_value);
              const nivelesEstudio = this.campusCarreraServ.getNivelesByCarrera(U._crmit_campusid_value);
              const objecNivelEstudio = this.getObjects(nivelesEstudio, 'crmit_codigounico', U._crmit_nivelinteresid_value);
              const nivelEstudioValue = objecNivelEstudio[0].crmit_codigounico+'*'+objecNivelEstudio[0].crmit_name;
              this.nivelTxt =objecNivelEstudio[0].crmit_name;

              //modalidad
              this.modalidades = this.campusCarreraServ.getModalidadesByNivel(objecNivelEstudio[0].crmit_codigounico);
              const modalidadess = this.campusCarreraServ.getModalidadesByNivel(objecNivelEstudio[0].crmit_codigounico);
              const modalidadObjec = this.getObjects(modalidadess, 'crmit_codigounico', U._crmit_modalidadid_value);
              const modalidadValue = modalidadObjec[0].crmit_codigounico+'*'+modalidadObjec[0].crmit_name;

              //carrera
              this.carreras = this.campusCarreraServ.getCarrerasByModalidad(modalidadObjec[0].crmit_codigounico);
              const carrerass = this.campusCarreraServ.getCarrerasByModalidad(modalidadObjec[0].crmit_codigounico);
              const carrerasObjec = this.getObjects(carrerass, 'codigounico', U._crmit_carrerainteresid_value);
              const carrerasValue = carrerasObjec[0].codigounico+'*'+carrerasObjec[0].name;

              this.form.controls.Campus.reset({ value: this.campusValue , disabled: false });
              this.form.controls.Nivel.reset({ value: nivelEstudioValue, disabled: false });
              this.form.controls.Modalidad.reset({ value: modalidadValue, disabled: false });
              this.form.controls.Carrera.reset({ value: carrerasValue, disabled: false });
          }
      )
      //ciclo
      this.cicloServ.getAll()
          .subscribe(
          (data: Ciclo[]) => {
                  const cicloObjec = this.getObjects(data, 'crmit_codigounico', U._crmit_ciclointeresid_value);
                  const cicloValue = cicloObjec[0].crmit_codigounico+'*'+cicloObjec[0].crmit_name+'*'+cicloObjec[0].crmit_ciclovigenteventas+'*'+cicloObjec[0].nombremes+'*'+cicloObjec[0].nombreventas;

                  this.form.controls.Ciclo.reset({ value: cicloValue, disabled: false });

              }
          )
      //Area de Interes
      this.interesServ.getAll()
      .subscribe(
          (data: Interes[]) =>{
              const interesObjec = this.getObjects(data, 'id', U._crmit_areaatencionid_value);
              const peopleArray = Object.values(interesObjec[0]);
              const interesValue = peopleArray[0]+'*'+peopleArray[1];
              this.form.controls.AreaInteres.reset({ value: interesValue, disabled: false });
          }
      )
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
              this.form.controls.Telefono.clearValidators();
             // this.form.controls.Telefono.setValidators([Validators.minLength(10), LandingValidation.aceptNumberValidator(), LandingValidation.numberConValidator()]);
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

           const predTel = this.form.value.Telefono.substring(0,2);
          if(predTel == 55){
            this.form.value.TelefonoPredictivo = '9'+this.form.value.Telefono;
            tel_casa_predictivo = "9"+this.form.value.Telefono;

          }
          this.form.value.TelefonoPredictivo = '901'+this.form.value.Telefono;


          if (this.form.value.NumeroCelular){
              const predCel = this.form.value.NumeroCelular.substring(0, 2);
              this.form.value.TelefonoCelularPredictivo = '9045' + this.form.value.NumeroCelular;
              if (predCel == 55) {
                  this.form.value.TelefonoCelularPredictivo = '9044' + this.form.value.NumeroCelular;
              }
          }


          if (this.form.value.NumeroCelularTutor) {
              const predCelTutor = this.form.value.NumeroCelularTutor.substring(0, 2);
              this.form.value.TelefonoCelularPredictivoTutor = '9045' + this.form.value.NumeroCelularTutor;
              if (predCelTutor == 55) {
                  this.form.value.TelefonoCelularPredictivoTutor = '9044' + this.form.value.NumeroCelularTutor;
              }

          }

          if (this.form.value.TelefonoTutor) {
              const predTelTutor = this.form.value.TelefonoTutor.substring(0, 2);
              this.form.value.TelefonoPredictivoTutor = '901' + this.form.value.TelefonoTutor;
              if (predTelTutor == 55) {
                  this.form.value.TelefonoPredictivoTutor = '9' + this.form.value.TelefonoTutor;
              }
          }

          this.form.value.Banner = window.location.href;
          this.form.value.FuenteObtencion = "";

          let _Ciclo = (this.form.value.Ciclo == null) ? "" : this.form.value.Ciclo;
          let CicloV = _Ciclo.split('*');

          let ciclo = "";
          let nombre_ventas = "";


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

          for (let i = 0; i < this.rows.length; i++) {

              nombre_ventas = (CicloV[4] == "") ? "C3" : CicloV[4];

              if (this.rows[i].CAMPUS == this.campusTxt && this.rows[i].BL == this.nivelTxt && this.rows[i].CICLO == nombre_ventas) {
                  this.form.value.Team = this.rows[i].TEAM;
                  this.form.value.Prioridad = this.rows[i].PRIORIDAD;
                  this.form.value.Attemp = this.rows[i].ATTEMP;
                  this.form.value.FuenteObtencion = this.rows[i].FUENTE_NEGOCIO;
                  f_negocio = this.rows[i].FUENTE_NEGOCIO;

              }

          }

          ciclo = CicloV[1];

/***********Fuente Obtencion Begin***********/

let f_o = "";
let fuente_obtencion_nombre = "";
let fuente_obtencion_GUID = "";

f_o = this.form.value.FuenteObtencion;

let c = this.form.value.Canal.split('*');

c = c[1];

if(c == "Chat"){

  fuente_obtencion_nombre = "CHAT";
  console.log("Esta es la fuente obtencion = " + fuente_obtencion_nombre);

}else if(c == "Social"){

  fuente_obtencion_nombre = "SOCIAL";
  console.log("Esta es la fuente obtencion = " + fuente_obtencion_nombre);

}else{

  /*if(f_o == "" || f_o == null){
      fuente_obtencion_nombre = "INBOUND";
      }else{*/
      this.form.value.FuenteObtencion = "INBOUND";
      fuente_obtencion_nombre = "INBOUND";
     /* } */

}
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
        let edadT = this.form.value.Edad;

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

          const sendd = {

          Usuario: this.form.value.Usuario,

          Nombre: this.form.value.Nombre,
          ApellidoPaterno: this.form.value.ApellidoPaterno,
          ApellidoMaterno: this.form.value.ApellidoMaterno,
          CorreoElectronico: this.form.value.CorreoElectronico,
          Genero: (valor_genero == '')? -1 : valor_genero,
          Edad:edadT,

          NombreTutor: this.form.value.NombreTutor,
          ApellidoPaternoTutor: this.form.value.ApellidoPaternoTutor,
          ApellidoMaternoTutor: this.form.value.ApellidoMaternoTutor,
          CorreoElectronicoTutor: this.form.value.CorreoElectronicoTutor,

          ParentescoTutor: ParentescoV[0],
          GUIDParentescotutor: ParentescoV[1],

          Campus: CampusV[1],
          Nivel: NivelV[1],
          Modalidad: ModalidadV[1],
          Carrera: CarreraV[1],
          AreaInteres: InteresV[1],
          Ciclo:  ciclo,

          FuenteNegocio : (f_negocio == "")? "" : f_negocio,
          GUIDCampus: (CampusV[0]=='')? null : CampusV[0],
          GUIDNivelInteres: (NivelV[0]=='')? null : NivelV[0],
          GUIDModalidad: (ModalidadV[0]=='')? null : ModalidadV[0],
          GUIDCarrera: (CarreraV[0]=='')? null : CarreraV[0],
          GUIDAreaInteres:(InteresV[0]=='')? null : InteresV[0],
          GUIDCiclo:( CicloV[0]=='')? null : CicloV[0],
          GUIDUsuario:localStorage.getItem('UserId'),
          GUIDFuentedeObtencion: (fuente_obtencion_GUID == '') ? '3c89dd13-6072-e211-b35f-6cae8b2a4ddc' : fuente_obtencion_GUID,
          fuenteobtencion: (fuente_obtencion_nombre == "")? "" : fuente_obtencion_nombre,


          Banner: this.form.value.Banner,
          Bandera: (bandera==null)? "" :bandera,

          Team: (this.form.value.Team == undefined) ? "" : this.form.value.Team,
          Prioridad: (this.form.value.Prioridad == undefined) ? 0 : this.form.value.Prioridad,
          Attemp: (this.form.value.Attemp == undefined) ? 0 : this.form.value.Attemp,


          //Numero Celular
          Telefono: (this.form.value.NumeroCelular=="")?null:this.form.value.NumeroCelular,
          TelefonoPredictivo:(this.form.value.TelefonoCelularPredictivo == "9045null") ? null : this.form.value.TelefonoCelularPredictivo,
          //Numero Telefono o Telefono Casa
          TelefonoCasa: this.form.value.Telefono,
          TelefonoCasaPredictivo:tel_casa_predictivo,


          //Numero Celular Tutor
          NumeroCelularTutor:(this.form.value.NumeroCelularTutor=='')?null:this.form.value.NumeroCelularTutor,
          TelefonoCelularPredictivoTutor:(this.form.value.TelefonoCelularPredictivoTutor == "9045null") ? null : this.form.value.TelefonoCelularPredictivoTutor,
          //Numero Casa Tutor
          TelefonoTutor:(this.form.value.TelefonoTutor=='')?null:this.form.value.TelefonoTutor,
         // TelefonoCasaTutorPredictivo: (this.form.value.TelefonoPredictivoTutor == "901null") ? null : this.form.value.TelefonoPredictivoTutor,
          TelefonoCasaTutorPredictivo: (this.form.value.TelefonoPredictivoTutor == "901null") ? null : this.form.value.TelefonoPredictivoTutor,

        };

          console.log("this.conEmail");
          console.log(this.conEmail);
          if (this.conEmail) {
              this.sendServ.send_Todos_inb_sol_prom_QA(sendd)// this.form.value)
                  .subscribe(
                      (res: any) => {
                          console.log(res.status);
                          if (res.status == 200) {
                              this.showDialog("Registro guardado con éxito.");
                             /* this.sendServ.sendData6(sendd)// this.form.value)
                                  .subscribe(
                                      (ress: any) => {
                                          console.log(ress.status);
                                          if (ress.status == 200) {
                                              this.showDialog("Los datos se han guardado correctamente.");
                                          } else {
                                              this.showDialogE("Error al guardar el registro.");
                                          }
                                      }
                                  )*/

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
              this.sendServ.send_Todos_inb_sol_prom_QA(sendd)// this.form.value)
                  .subscribe(
                      (res: any) => {
                          console.log(res.status);
                          if (res.status == 200) {
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
          }
      } else {
          this.showDialogE("Error al realizar el registro *");
      }


  }

  resetForm() {
      window.location.href = "/nuevo-solovino";
      this.form.reset();
  }
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
      this.showDialogForm(this.asesores, "Selecciona a un Asesor", "Cita-");
  }

  agruparDirectaClick() {
      //let nivelG = 'Posgrado';
      let k = this.form.controls.Nivel.value;
      let g = k.split('*');
      let nivelG = g[0];
      console.log(nivelG);
      if(nivelG){
         let asess = this.asesorGrupalServ.getAll()
          .subscribe(
              (datat: AsesorGrupal[]) => this.asesorGrupal = datat
          )
          setTimeout(() => {
              this.showDialogForm(this.asesorGrupal, "Selecciona a un Asesor Grupal", "SesiónG-");
          }, 1000);
      }else{
          this.showDialogE("Seleccione un Nivel");
      }
  }

  agruparDClick(){
      localStorage.setItem('bandera',this.form.controls.Usuario.value);
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
      console.log('value 2');

      var cadena2 = value.split('*');
      var word2 = cadena2[0];
      console.log(word2);
      if (word2 == '64bed5d6-404f-e811-8113-3863bb3c5058' || word2 == '66bed5d6-404f-e811-8113-3863bb3c5058' || word2 == '6abed5d6-404f-e811-8113-3863bb3c5058' || word2 == '6ebed5d6-404f-e811-8113-3863bb3c5058') {
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
