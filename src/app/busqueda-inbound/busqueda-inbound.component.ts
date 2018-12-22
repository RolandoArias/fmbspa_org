import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { GeneralService } from '../services/general.service';
import { FormControl, FormGroup, FormBuilder, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';
import {Router} from '@angular/router';

import { MatDialog, MatSelect, MatDialogRef, MAT_DIALOG_DATA, NativeDateAdapter } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import * as $ from 'jquery';

import 'rxjs/Rx';

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
import { Carrera } from '../interfaces/carrera';
import { Interes } from '../interfaces/interes';
import { Modalidad } from '../interfaces/modalidad';
import { Parentesco } from '../interfaces/parentesco';
import { CampusCita } from '../interfaces/campus-cita';
import { Tipificacion } from '../interfaces/tipificacion';

import { PnnService } from '../providers/pnn.service';
import { CsqService } from '../providers/csq.service';
import { SendService } from '../providers/send.service';
import { HoraService } from '../providers/hora.service';
import { NivelService } from '../providers/nivel.service';
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
import { TipificacionService } from '../providers/tipificacion.service';

export interface Search {
  numPerson: String;
  numCuenta: String;
  correo: String;
  nombre: String;
  apellido: String;
  materno: String;
  numCel: String;
  telCel: String;

  emailTuto: String;
}

@Component({
  selector: 'app-busqueda-inbound',
  templateUrl: './busqueda-inbound.component.html',
  styleUrls: ['./busqueda-inbound.component.scss']
})
export class BusquedaInboundComponent implements OnInit {

  form: FormGroup;
  Route: Router;
  serach: Search;

  //maxDate = new Date(2018, this.month.getMonth(),12);
  maxDate = LandingValidation.fechaLimite();
  startDate = LandingValidation.fechaInicio();

  Usuario: FormControl;
  Canal: FormControl;
  CSQ: FormControl;
  TelefonoCorreo: FormControl;
  Interesa: FormControl;

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
  NumeroCelularR: FormControl;
  TelefonoTutor: FormControl;
  ParentescoTutor: FormControl;

  NumeroPersona: FormControl;
  etapaVenta: FormControl;
  NumeroCuenta: FormControl;

  Campus: FormControl;
  AreaInteres: FormControl;
  Nivel: FormControl;
  Modalidad: FormControl;
  Carrera: FormControl;
  Ciclo: FormControl;
  Tipificacion: FormControl;
  Notas: FormControl;

  CampusCitas: FormControl;
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
  carreras: Carrera[] = [];
  intereses: Interes[] = [];
  modalidades: Modalidad[] = [];
  campus_citas: CampusCita[] = [];
  parentescos: Parentesco[] = [];
  tipificaciones: Tipificacion[] = [];


  constructor(
    private landingService: LandingService,
    private gralService: GeneralService,
    private router: Router,
    public dialog: MatDialog,
    private renderer: Renderer2,
    private csqServ: CsqService,
    private horaServ: HoraService,
    private sendServ: SendService,
    private nivelServ: NivelService,
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
    private tipicicacionServ: TipificacionService) { }



  ngOnInit() {

    this.landingService.getInit();

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
    // Se obtienen todos los niveles
    /*this.nivelServ.getAll()
      .subscribe(
        (data: Nivel[]) => this.niveles = data
      )

    // Se obtienen todas las carreras
    this.carreraServ.getAll()
      .subscribe(
        (data: Carrera[]) => this.carreras = data
      )*/
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

    this.formInit();
  }

  formInit() {
    this.form = new FormGroup({
      Usuario: new FormControl({ value: '', disabled: true }, Validators.required),
      Canal: new FormControl('', Validators.required),
      CSQ: new FormControl('', Validators.required),
      TelefonoCorreo: new FormControl({ value: '', disabled: true }),
      Interesa: new FormControl(''),

      Nombre: new FormControl('', [LandingValidation.palabraMalaValidator()]),
      ApellidoPaterno: new FormControl('', [LandingValidation.palabraMalaValidator()]),
      ApellidoMaterno: new FormControl('', [LandingValidation.palabraMalaValidator()]),
      CorreoElectronico: new FormControl('', [LandingValidation.emailMaloValidator()]),
     NumeroCelular: new FormControl('', [Validators.minLength(10), LandingValidation.aceptNumberValidator(), LandingValidation.numberConValidator()]),
            Telefono: new FormControl('', [Validators.minLength(10), LandingValidation.aceptNumberValidator(), LandingValidation.numberConValidator()]),
      Genero: new FormControl(''),
      FechaNacimiento: new FormControl(''),
      Edad: new FormControl('', [Validators.minLength(2)]),


      NumeroPersona: new FormControl('', Validators.pattern('^[0-9]+$')),
      etapaVenta: new FormControl(''),
      NumeroCuenta: new FormControl('', Validators.pattern('^[0-9]+$')),

      NombreTutor: new FormControl(''),
      ApellidoPaternoTutor: new FormControl(''),
      ApellidoMaternoTutor: new FormControl(''),
      CorreoElectronicoTutor: new FormControl('', [LandingValidation.emailMaloValidator()]),
      NumeroCelularR: new FormControl(''),
      TelefonoTutor: new FormControl(''),
      ParentescoTutor: new FormControl(''),

      Campus: new FormControl(''),
      AreaInteres: new FormControl(''),
      Nivel: new FormControl(''),
      Modalidad: new FormControl(''),
      Carrera: new FormControl(''),
      Ciclo: new FormControl(''),

      Tipificacion: new FormControl(''),
      Notas: new FormControl(''),

      CampusCitas: new FormControl({ value: '', disabled: true }, Validators.required),
      FechaCita: new FormControl({ value: '', disabled: true }, Validators.required),
      HoraCita: new FormControl({ value: '', disabled: true }, Validators.required),
      Programacion: new FormControl({ value: '', disabled: true }, Validators.required),
      Transferencia: new FormControl({ value: '', disabled: true }, Validators.required),
      Asesor: new FormControl({ value: '', disabled: true }, Validators.required)

    });
  }

  onSubmit() {
    // -------------------------------- Predictivo  ----------------------------------


    if(localStorage.getItem('search-register') != '' && localStorage.getItem('search_register_value') != '' ){
      localStorage.removeItem('search-register');
      localStorage.removeItem('search_register_value');
      }

    const predCel = this.form.value.NumeroCelular.substring(0,2);
    const predTel = this.form.value.Telefono.substring(0,2);
    this.form.value.TelefonoCelularPredictivo = '9045'+this.form.value.NumeroCelular;
    this.form.value.TelefonoPredictivo = '901'+this.form.value.Telefono;
    this.form.value.Banner = window.location.href;

    if(predCel == 55){
      this.form.value.TelefonoCelularPredictivo = '9044'+this.form.value.NumeroCelular;
    }

    if(predTel == 55){
      this.form.value.TelefonoPredictivo = '9'+this.form.value.Telefono;
    }

    // -------------------------------- Predictivo  ----------------------------------
    this.onKeyFechaNacimiento();
    let fecha_cita = this.formatServ.changeFormatFechaCita(this.form.controls['FechaCita'].value);
    this.form.controls['FechaCita'].setValue(fecha_cita);

    let busqueda: Search = {
      numPerson:  this.form.controls['NumeroPersona'].value,
      numCuenta:  this.form.controls['NumeroCuenta'].value,
      correo: this.form.controls['CorreoElectronico'].value,
      nombre: this.form.controls['Nombre'].value,
      apellido:  this.form.controls['ApellidoPaterno'].value,
      materno:  this.form.controls['ApellidoMaterno'].value,
      numCel:  this.form.controls['NumeroCelular'].value,
      telCel:  this.form.controls['Telefono'].value,
      emailTuto:  this.form.controls['CorreoElectronicoTutor'].value
    };

    if(this.form.controls['Telefono'].value==''){
      this.showDialog("Telefono requerido");
      return;
    }

    let bus = JSON.stringify(busqueda);

    localStorage.setItem('search-register', bus);
    console.log(bus);
    let es = this;
     let searchL = localStorage.getItem('search-register');
    let s = JSON.parse(searchL);
    let filter = '&$filter=';


     if(s.telCel!=''){
      if(s.correo == '' && s.apellido =="" && s.emailTuto == "" && s.materno =="" && s.numCel == "" && s.numCuenta == "" && s.numPerson =="" && s.nombre ==""){
       // filter = filter + "address1_telephone1 eq '"+s.telCel+"' or mobilephone eq '"+s.telCel+"'";
       filter = filter + " address1_telephone1 eq '"+s.telCel+"'";

      }else{

        filter = filter + " address1_telephone1 eq '"+s.telCel+"'";

      }
    }

    if(s.numCel!=''){
      if(s.correo == '' && s.apellido =="" && s.emailTuto == "" && s.materno =="" && s.telCel == "" && s.numCuenta == "" && s.numPerson =="" && s.nombre ==""){
       // filter = filter + "address1_telephone1 eq '"+s.telCel+"' or mobilephone eq '"+s.telCel+"'";
       filter = filter + " mobilephone eq '"+s.numCel+"'";
      }else{
         filter = filter + " and  mobilephone eq '"+s.numCel+"'";
      }
    }


    if(s.nombre!=''){
      if(s.correo == '' && s.apellido =="" && s.emailTuto == "" && s.materno =="" && s.numCel == "" && s.numCuenta == "" && s.numPerson =="" && s.telCel ==""){
        filter = filter + "contains(fullname,'"+s.nombre+"')";
      }else{
        filter = filter + " and contains(fullname,'"+s.nombre+"')";
      }
    }

    if(s.apellido!=''){
      if(s.correo == '' && s.nombre =="" && s.emailTuto == "" && s.materno =="" && s.numCel == "" && s.numCuenta == "" && s.numPerson =="" && s.telCel ==""){
        filter = filter + "contains(fullname,'"+s.apellido+"')";
      }else{
        filter = filter + " and contains(fullname,'"+s.apellido+"')";
      }
    }

    if(s.materno!=''){
      if(s.correo == '' && s.nombre =="" && s.emailTuto == "" && s.apellido =="" && s.numCel == "" && s.numCuenta == "" && s.numPerson =="" && s.telCel ==""){
        filter = filter + "contains(fullname,'"+s.materno+"')";
      }else{
        filter = filter + " and contains(fullname,'"+s.materno+"')";
      }
    }

    if(s.correo!=''){
      if(s.nombre == '' && s.apellido =="" && s.emailTuto == "" && s.materno =="" && s.numCel == "" && s.numCuenta == "" && s.numPerson =="" && s.telCel ==""){
        filter = filter + "emailaddress1 eq '"+s.correo+"'";
      }else{
        filter = filter + " and emailaddress1 eq '"+s.correo+"'";
      }
    }

    if(s.numCuenta!=''){
      if(s.nombre == '' && s.apellido =="" && s.emailTuto == "" && s.materno =="" && s.numCel == "" && s.correo == "" && s.numPerson =="" && s.telCel ==""){
        filter = filter + "crmit_nocuentasis  eq '"+s.numCuenta+"'";
      }else{
        filter = filter + " and crmit_nocuentasis  eq '"+s.numCuenta+"'";
      }
    }

    if(s.numPerson!=''){
      if(s.nombre == '' && s.apellido =="" && s.emailTuto == "" && s.materno =="" && s.numCel == "" && s.correo == "" && s.numCuenta =="" && s.telCel ==""){
        filter = filter + "crmit_nopersona eq "+s.numPerson;
      }else{
        filter = filter + " and crmit_nopersona eq "+s.numPerson;
      }
    }



    let url = "https://laulatammxqa.api.crm.dynamics.com/api/data/v8.2/leads?$select=crmit_nocuentasis,salesstagecode,crmit_nopersona,emailaddress1,fullname,address1_telephone1,mobilephone,_crmit_nivelinteresid_value,_crmit_asesorlineaid_value,telephone1,crmit_nooportunidad,crmit_etapaventaid,crmit_urloportunidad,crmit_emailtutor"+filter+"&$top=3";


//https://laulatammxqa.api.crm.dynamics.com/api/data/v8.2/leads?$select=crmit_nocuentasis,crmit_nopersona,emailaddress1,fullname,_crmit_nivelinteresid_value,_crmit_asesorlineaid_value,telephone1,crmit_urloportunidad,crmit_emailtutor%20&$filter=telephone1%20eq%20%275532786566%27&$top=3
//Con dos telefonos
//https://laulatammxqa.api.crm.dynamics.com/api/data/v8.2/leads?$select=crmit_nocuentasis,telephone1,crmit_nopersona,emailaddress1,fullname,_crmit_nivelinteresid_value,_crmit_asesorlineaid_value,telephone1,mobilephone,crmit_urloportunidad,crmit_emailtutor%20&$filter=telephone1%20eq%20%275565628906%27&$top=3


console.log("URL LEAD: "+url);

   console.log("FILTER");
   console.log(filter);


    //let url = "https://laulatammxqa.api.crm.dynamics.com/api/data/v8.2/systemusers?$select=fullname,domainname&$filter=contains(fullname,'ana')";
     var settings = {
            "async": true,
            "crossDomain": true,
            "url": url,
            "method": "GET",
            "headers": {
              "authorization": "Bearer "+localStorage.getItem('access_token'),
              "content-type": "application/json",
              "odata.metadata": "minimal",
            }
          }

          $.ajax(settings).done(function (response) {

            console.log("Resultado de busqueda: "+response.value);
            let jj = JSON.stringify(response.value);
            localStorage.setItem('search_register_value',jj);
            localStorage.setItem('search_tipo','search_recepcionist');

            this.reesults = response.value;
             es.router.navigate(['/resultado-inbound']);

            });

    //Create Storage

  }



  resetForm() {
    window.location.href = "/resultado-inbound";
    this.form.reset();
  }

  onKeyFechaNacimiento() {
    let edad = this.form.controls.Edad.value;
    let year = new Date().getFullYear();
    let fecha = year - edad;
    this.form.controls.FechaNacimiento.setValue(fecha);
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
      this.form.controls.CorreoElectronico.reset({ value: '', disabled: true });
    } else {
      this.form.controls.CorreoElectronico.reset({ value: '', disabled: false });
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
  }

}
