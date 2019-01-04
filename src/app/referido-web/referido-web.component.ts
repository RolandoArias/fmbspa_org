import { AppConfig } from '../services/constants';
import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { GeneralService } from '../services/general.service';
import { MatDialog, MatSelect, MatInputModule } from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';
import 'rxjs/Rx';

import { LandingValidation } from '../validations/landing.validations';
import { LandingService } from '../services/landing.service';

import { DialogComponent } from '../dialog/dialog.component';
import 'rxjs/Rx';
//Interfaces
import { Campus } from '../interfaces/campus';
import { Carrera } from '../interfaces/carrera';
import { Nivel } from '../interfaces/nivel';
import { Modalidad } from '../interfaces/modalidad';
import { Parentesco } from '../interfaces/parentesco';
import { Ciclo } from '../interfaces/ciclo';
import { FuenteObtencion } from '../interfaces/fuenteobtencion';
import { EscuelaEmpresa } from '../interfaces/escuela-empresa';

//Servicios
import { CampusService } from '../providers/campus.service';
import { CarreraService } from '../providers/carrera.service';
import { ModalidadService } from '../providers/modalidad.service';
import { SendService } from '../providers/send.service';
import { ParentescoService } from '../providers/parentesco.service';
import { CampusCarreraService } from '../providers/campus-carrera.service';
import { CicloService } from '../providers/ciclo.service';
import { FuenteObtencionService } from '../providers/fuenteobtencion.service';
import { EscuelaEmpresaService} from '../providers/escuela-empresa.service';
import { NivelService } from '../providers/nivel.service';
import {Router} from "@angular/router";

import { Subysubsubtipo2 } from '../interfaces/subysubsubtipo2';
import { Subysubsubtipo2Service } from '../providers/subysubsubtipo2.service';


@Component({
  selector: 'app-referido-web',
  templateUrl: './referido-web.component.html',
  styleUrls: ['./referido-web.component.scss']
})
export class ReferidoWebComponent implements OnInit {

  form: FormGroup;
  conEmail = true;

  campus: Campus[] = [];
  carreras: Carrera[] = [];
  modalidades: Modalidad[] = [];
  niveles: Nivel[] = [];
  tiposReferentes: Parentesco[] = [];
  parentescos: Parentesco[] = [];
  ciclos: Ciclo[] = [];
  fuentesobtencion: FuenteObtencion[] = [];
  rows = [];
  campusTxt: any;
  nivelTxt: any;
  escuelasempresas: EscuelaEmpresa[] = [];
  campos_con_error = [];
  subysubsubtipos2: Subysubsubtipo2[] = [];

 etapaprocesoventaid :any;


  //maxDate = new Date(2018, this.month.getMonth(),12);
  maxDate = LandingValidation.fechaLimite();
  startDate = LandingValidation.fechaInicio();

  user: FormControl;
  name_ref: FormControl;
  patern_ref: FormControl;
  matern_ref: FormControl;
  mail_ref: FormControl;
  tipo_ref: FormControl;
  cuenta_ref: FormControl;
  phone_ref: FormControl;

  Nombre: FormControl;
  ApellidoPaterno: FormControl;
  ApellidoMaterno: FormControl;
  CorreoElectronico: FormControl;
  cel: FormControl;
  Telefono: FormControl;
  extension: FormControl;
  tipoCel: FormControl;

  Campus: FormControl;
  interestArea: FormControl;
  Nivel: FormControl;
  Modalidad: FormControl;
  Carrera: FormControl;
  Ciclo: FormControl;
  tipificacion: FormControl;
  public mostrarExtension: boolean = null;

  constructor(
    private subysubsubtipo2Serv: Subysubsubtipo2Service,
    private router: Router,
    private landingService: LandingService,
    private gralService: GeneralService,
    public dialog: MatDialog,
    private renderer: Renderer2,
    private campusServ: CampusService,
    private carreraServ: CarreraService,
    private modalidadServ: ModalidadService,
    private sendServ: SendService,
    private parentescoServ: ParentescoService,
    private campusCarreraServ: CampusCarreraService,
    private cicloServ: CicloService,
    private fuenteobtencionServ: FuenteObtencionService,
    private escualempresaServ: EscuelaEmpresaService,
    private tipoRefenteServ: ParentescoService, private appConfig: AppConfig, private nivelServ: NivelService) {

    this.fetch((data) => {
      this.rows = data;
    });

//    console.log( this.rows );
  }

  ngOnInit() {

        this.landingService.getInit();

            // Se obtienen todos los subysubsubtipos2
    this.subysubsubtipo2Serv.getAll()
    .subscribe(
      (data: Subysubsubtipo2[]) => this.subysubsubtipos2 = data
    )


    // Se obtienen todos los campus
    this.campusServ.getAll2()
        .subscribe(
          (data: Campus[]) => this.campus = data
        )
    // Se obtienen todas las carreras
    this.tipoRefenteServ.getAll()
      .subscribe(
        (data: Parentesco[]) => this.tiposReferentes = data
      );


    // Se obtienen todos los parentescos
    this.parentescoServ.getAll()
    .subscribe(
        (data: Parentesco[]) => this.parentescos = data
    )






    //Se obtienen todos los ciclo
    this.cicloServ.getAll2()
    .subscribe(
      (data: Ciclo[]) => this.ciclos = data
    )

    //Se obtiene todos los fuente obtencion
    this.fuenteobtencionServ.getAll()
    .subscribe(
      (data: FuenteObtencion[]) => this.fuentesobtencion = data
    )

    //Se obtiene todas las escuelas empresas
    this.escualempresaServ.getAll()
    .subscribe(
      (data: EscuelaEmpresa[]) => this.escuelasempresas = data
    )

        // Se obtiene todos los canales
        this.nivelServ.getAll2()
        .subscribe(
          (data: Nivel[]) => this.niveles = data
       )


    this.formInit();



// console.log("DAtos: "+this.parentescos[0].crmit_name);
// console.log("DAtos: "+this.parentescos[1].crmit_name);
// console.log("DAtos: "+this.parentescos[2].crmit_name);

//     for(let r = 0 ; r < this.parentescos.length ; r++ ){

//   let nombre_parentesco_ = this.parentescos[r].crmit_name;
//     console.log("- "+nombre_parentesco_);
//     }



  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/referidos.json`);
    req.onload = () => {
      cb(JSON.parse(req.response));
    };
    req.send();
  }

  formInit() {

    this.form = new FormGroup({
      name_ref:new FormControl('', [LandingValidation.palabraMalaValidator()]),
      patern_ref:new FormControl('', [LandingValidation.palabraMalaValidator()]),
      matern_ref:new FormControl('', [LandingValidation.palabraMalaValidator()]),
      mail_ref: new FormControl('', [LandingValidation.emailMaloValidator(), Validators.pattern(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i)]),
      tipo_ref: new FormControl(''),
      phone_ref: new FormControl('', [ Validators.minLength(10), LandingValidation.aceptNumberValidator(), LandingValidation.numberConValidator()]),
      cuenta_ref: new FormControl('',[Validators.minLength(12)]),

      Nombre: new FormControl('', [LandingValidation.palabraMalaValidator()]),
      ApellidoPaterno: new FormControl('', [LandingValidation.palabraMalaValidator()]),
      ApellidoMaterno: new FormControl('', [LandingValidation.palabraMalaValidator()]),
      CorreoElectronico: new FormControl('', [Validators.required, Validators.pattern(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i)]),
      cel: new FormControl('', [Validators.minLength(10)]),
      Telefono: new FormControl('', [Validators.required, Validators.minLength(10), LandingValidation.aceptNumberValidator(), LandingValidation.numberConValidator()]),
      extension: new FormControl(''),
      tipoCel: new FormControl({value: '', disabled: true}),
      Campus: new FormControl(''),
      Nivel: new FormControl({ value: '', disabled: true }),
      Modalidad: new FormControl({ value: '', disabled: true }),
      Carrera: new FormControl({ value: '', disabled: true }),
      tipificacion: new FormControl(''),
    });






  }




        // var UserId = localStorage.getItem('UserId22');
        // var url_user ="https://laulatammxqa.api.crm.dynamics.com/api/data/v8.2/systemusers("+UserId+")";
        // var settings2 = {
        //   "async": true,
        //   "crossDomain": true,
        //   "url": url_user,
        //   "method": "GET",
        //   "headers": {
        //     "authorization": "Bearer "+localStorage.getItem('access_token'),
        //     "content-type": "application/json",
        //     "odata.metadata": "minimal",
        //   }
        // }

        // $.ajax(settings2).done(function (response){
        //   var user = JSON.stringify(response)
        //   localStorage.setItem('user',user);
        //   $.ajax('http://10.210.136.121/fmbapp_qa/public/api/roles/'+response.domainname,
        //     {
        //        //data: {user_id:''},
        //         contentType: 'application/json',
        //         type: 'GET',
        //         success: function(result) {
        //             console.log(result);
        //             var dat = JSON.stringify(result);
        //             this.landings = result;
        //             localStorage.setItem('landings', dat);
        //             this.onGoto('/referidoWeb');
        //         }
        //     });


        // });




  resetTimer() {

          clearTimeout(t);
          var t = setTimeout(function() {  console.log("Sleeep 0L0");  }, 3000);

      }


  onSubmit() {







    if (this.form.value.Nombre == "" || this.form.value.Nombre == null) {
      this.showDialogE("Los datos de registro no estan llenos, favor de revisarlos.");
      return false;
    }

    if (this.form.value.ApellidoPaterno == "" || this.form.value.ApellidoPaterno == null){
      this.showDialogE("Los datos de registro no estan llenos, favor de revisarlos.");
      return false;
    }

    if (this.form.value.ApellidoMaterno == "" || this.form.value.ApellidoMaterno == null){
      this.showDialogE("Los datos de registro no estan llenos, favor de revisarlos.");
      return false;
    }

    if (this.form.value.Telefono == "" && this.form.value.CorreoElectronico == "" ) {
      this.showDialogE("Debes Ingresar un Telefono o Correo Electronico. ");
      return false;
    }

    if ( this.form.value.Telefono != "" && this.form.value.tipoCel == "" ) {
      this.showDialogE("Debes seleccionar un tipo de Telefono");
      return false;
    }

    if ( this.form.value.Telefono != "" && this.form.value.Telefono.length != '10'  ) {
      this.showDialogE("Debes proporcionar un Telefono correcto");
      return false;
    }



/*    if (this.form.controls['cuenta_ref'].value != "") {
      this.form.controls.cuenta_ref.setValidators([Validators.minLength(12), LandingValidation.aceptNumberValidator(), LandingValidation.numberConValidator()]);
      this.form.controls.cuenta_ref.clearValidators();
      this.form.controls.cuenta_ref.updateValueAndValidity();
    }*/

    if (this.form.controls['CorreoElectronico'].value != "") {
      this.form.controls.Telefono.setValidators([Validators.minLength(10), LandingValidation.aceptNumberValidator(), LandingValidation.numberConValidator()]);
      this.form.controls.Telefono.clearValidators();
      this.form.controls.Telefono.updateValueAndValidity();
    } else {
      let tel = this.form.controls['Telefono'].value;
      if (tel) {
        this.form.controls['CorreoElectronico'].reset({ value: tel + '@unitec.edu.mx', disabled: false });
        this.form.controls.CorreoElectronico.clearValidators();
        this.form.controls.CorreoElectronico.updateValueAndValidity();
      }
    }

    this.mostrarExtension = true;




    if (this.form.valid) {



      // -------------------------------- Predictivo  ----------------------------------

      this.form.value.Telefonocelularpredictivoreferente = null;
      this.form.value.Telefonocelularreferente=null;

      if (this.form.value.phone_ref){
          const predCel = this.form.value.phone_ref.substring(0, 2);
          this.form.value.Telefonocelularpredictivoreferente = '9045' + this.form.value.phone_ref;
          if (predCel == 55) {
            this.form.value.Telefonocelularpredictivoreferente = '9044' + this.form.value.phone_ref;
          }
      }

      const predTel = this.form.value.Telefono.substring(0, 2);
      this.form.value.Banner = window.location.href;

      this.form.value.TelefonoCelular = null;
      this.form.value.TelefonoPredictivo = null;

      this.form.value.TelefonoCasa = null;
      this.form.value.TelefonoCasaPredictivo = null;

      this.form.value.TelefonoOficina = null;
      this.form.value.TelefonoOficinaPredictivo = null;

      if (this.form.value.tipoCel == "" && this.form.value.Telefono != "") {
        this.showDialogE("Ingresa un tipo de teléfono");
        return false;
      }

      if ( (this.form.value.Telefono != '' || this.form.value.Telefono != null ) && this.form.value.tipoCel == "Celular") {

        if (predTel == 55) {
          this.form.value.TelefonoPredictivo = '9044' + this.form.value.Telefono;
        } else {
          this.form.value.TelefonoPredictivo = '9045' + this.form.value.Telefono;
        }
      }

      if ( (this.form.value.Telefono != '' || this.form.value.Telefono != null ) && this.form.value.tipoCel == "Casa") {
        if (predTel == 55) {
          this.form.value.TelefonoCasaPredictivo = '9' + this.form.value.Telefono;
        } else {
          this.form.value.TelefonoCasaPredictivo = '901' + this.form.value.Telefono;
        }
      }

 if ( (this.form.value.Telefono != '' || this.form.value.Telefono != null ) && this.form.value.tipoCel == "Oficina") {
        if (predTel == 55) {
          this.form.value.TelefonoOficinaPredictivo = '9' + this.form.value.Telefono;
        } else {
          this.form.value.TelefonoOficinaPredictivo = '901' + this.form.value.Telefono;
        }
      }


/*****Si no hay ciclo, se extrae de la base de datos el ciclo*******/

      this.form.value.FuenteObtencion = "";
      let ciclo_vigente = "";
      let ciclo_codigounico = "";
      let ciclo = "";
      let ciclo_nombreventas = "";


      console.log("localStorage.getItem('ciclo_name') = " + localStorage.getItem('ciclo_name'));
      let ciclo_name = (localStorage.getItem('ciclo_name') == null) ? "18-3" : localStorage.getItem('ciclo_name');



      for(let i = 0 ; i <= this.ciclos.length ; i++ ){
          if(this.ciclos[i] !== undefined){
            if( this.ciclos[i].crmit_ciclovigenteventas == "True") {

                  ciclo_vigente = this.ciclos[i].crmit_name;
                  ciclo_nombreventas = this.ciclos[i].nombreventas;
                  ciclo_codigounico = this.ciclos[i].crmit_codigounico;

                }
          }

      }


    //Asignacion a ciclo
     ciclo = ciclo_vigente;

     /***********Fuente Obtencion Begin***********/

      let f_o = "";
      let fuente_obtencion_nombre = "";
      let fuente_obtencion_GUID = "";

      f_o = this.form.value.FuenteObtencion;

      if(f_o == "" || f_o == null){
        fuente_obtencion_nombre = "REFERIDOS";
      }else{
        this.form.value.FuenteObtencion = "REFERIDOS";
        fuente_obtencion_nombre = "REFERIDOS";
      }


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
if(this.form.value.Carrera !== undefined){
     let main_carrera = this.form.value.Carrera.split("*");
     let nombre_ventas ="";
     let f_negocio = "";
     let valor_ciclo = "";

     if(ciclo == "19-1"){
        valor_ciclo = "C3";
     }else if(ciclo == "20-1"){
      valor_ciclo = "C3";
     }else if(ciclo == "20-2"){
    valor_ciclo = "C1";
    }else if(ciclo == "18-3"){
      valor_ciclo = "C2";
    }
    ciclo = valor_ciclo;

    console.log("");console.log("");
    console.log("------------------Ciclo ----------------------");
    console.log("");
    console.log("Ciclo: "+ ciclo);
    console.log("");
    console.log("----------------------------------------------");


     for (let i = 0; i < this.carreras.length; i++) {

       if(this.carreras[i].BL == main_carrera[2] && this.carreras[i].codigounico == main_carrera[0]){

        console.log("");console.log("");console.log("");
        console.log("------------------ Datos de Empresa ----------------------");
        console.log("");console.log("");
        console.log("Codigo unico de carrera:"+this.carreras[i].codigounico);
        console.log("Nombre de carrera:"+this.carreras[i].name);
        console.log("BL de Carrera:"+this.carreras[i].BL);
        console.log("");console.log("");
        console.log("---------------------------------------------------------");
        console.log("");console.log("");console.log("");console.log("");



        if( this.campusTxt  !== undefined){

           for (let j = 0; j < this.rows.length; j++) {

               nombre_ventas = valor_ciclo;
              //console.log("Ciclo: "+this.rows[j].CICLO+" =  Nombre Ventas Ciclo: "+nombre_ventas);
              // console.log(this.rows[j].FUENTE_NEGOCIO+" = "+fuente_obtencion_nombre);




                  if (this.rows[j].FUENTE_NEGOCIO == "REFERIDOS" && this.rows[j].CICLO == nombre_ventas && this.rows[j].CAMPUS == this.campusTxt && this.rows[j].BL == this.carreras[i].BL ) {

                    console.log("------------------ TPA (Team, Prioridad y Attemp) ----------------------");
                    console.log("");
                    this.form.value.Team = this.rows[j].TEAM;
                    console.log("- TEAM : " + this.form.value.Team);
                    this.form.value.Prioridad = this.rows[j].PRIORIDAD;
                    console.log("- Prioridad : " + this.form.value.Prioridad);
                    this.form.value.Attemp = this.rows[j].ATTEMP;
                    console.log("- ATTEMP : " + this.form.value.Attemp);
                    this.form.value.FuenteObtencion = this.rows[j].FUENTE_NEGOCIO;
                    console.log("- Fuente Obtencion : " + this.form.value.FuenteObtencion);
                    f_negocio = this.rows[i].FUENTE_NEGOCIO;
                    console.log("");
                    console.log("---------------------------------------------------------");


                  }

           }
          }
           /**TErmina calculo de team prioridad y attemp con respecto a la universidad**/
       }

   }
}

     // -------------------------------- Predictivo  ----------------------------------


            let _Campus = (this.form.value.Campus==null)? "" : this.form.value.Campus;
            let _Nivel = (this.form.value.Nivel==null)? "": this.form.value.Nivel;
            let _Modalidad = (this.form.value.Modalidad==null)? "": this.form.value.Modalidad;
            let _Carrera = (this.form.value.Carrera==null)? "": this.form.value.Carrera;
            let _TipoReferente = (this.form.value.tipo_ref == null) ? "" : this.form.value.tipo_ref;


            let TipoRefV = _TipoReferente.split('*');
            let CampusV = _Campus.split('*');
            let NivelV = _Nivel.split('*');
            let ModalidadV = _Modalidad.split('*');
            let CarreraV = _Carrera.split('*');


            let u = localStorage.getItem('user');
            let data = JSON.parse(u);
            let nom_usu = data.fullname;


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
console.log(">  "+ciclo_vigente+"_"+fuente_obtencion_abreviatura+"_"+campus_abreviatura+"_"+nivel_abreviatura+"  < ");
console.log("*********************************************");
console.log("");

let  l_seg = "";
let obj_seguimiento : any;


let f_o_ = (fuente_obtencion_abreviatura == '')?'':fuente_obtencion_abreviatura;
let c_a_ = (campus_abreviatura == '')?'':campus_abreviatura;
let n_a = (nivel_abreviatura == '')?'':nivel_abreviatura;



//EValuando tipo de telefono


let Telefono_de_ofincina = "";

console.log("");
console.log("****************************************");
console.log("Opcion seleccionada de Telefono:");

 if(this.form.value.tipoCel == "Oficina"){

  console.log("Tipo: "+this.form.value.tipoCel);


    if( (this.form.value.Telefono != "" || this.form.value.Telefono != '') &&  (this.form.value.extension != "" || this.form.value.extension != null) ){
  console.log("Tipo: "+this.form.value.tipoCel);
      Telefono_de_ofincina = this.form.value.Telefono+"X"+this.form.value.extension;
      console.log("Telefono oficina con extension: "+Telefono_de_ofincina);
    }else{


      Telefono_de_ofincina = this.form.value.Telefono;
      console.log("Telefono oficina sin extension: "+Telefono_de_ofincina);
    }

 }
  console.log("****************************************");

///Calculo de tipificacion desde tabala Sub y subsubtipo 2

let valor_tipificacion = "";
let tipi_actualizacion = "";
let tipi_creacion = "";
console.log("subysubsubtipo2: "+this.subysubsubtipos2.values);
for(let i = 0 ; i < this.subysubsubtipos2.length ; i++ ){
    if( this.subysubsubtipos2[i].crmit_subname == "REFERIDOS WEB" && this.subysubsubtipos2[i].crmit_subsubname == "CREA REFERIDOS WEB"){

      tipi_creacion = this.subysubsubtipos2[i].crmit_codigounico;
      this.etapaprocesoventaid = this.subysubsubtipos2[i].etapaprocesoventaid;

      console.log("tipi_creacion: "+tipi_creacion);
    }else if( this.subysubsubtipos2[i].crmit_subname == "REFERIDOS WEB" && this.subysubsubtipos2[i].crmit_subsubname == "ACTUALIZA REFERIDOS WEB"){

      tipi_actualizacion = this.subysubsubtipos2[i].crmit_codigounico;
      this.etapaprocesoventaid = this.subysubsubtipos2[i].etapaprocesoventaid;
      console.log("tipi_actualizacion: "+tipi_actualizacion);
    }
}
//valor_tipificacion = 'REFERIDO WEB_'+tipi_creacion+'_'+tipi_actualizacion;
valor_tipificacion = 'REFERIDO WEB';
console.log(valor_tipificacion);


  this.form.value.Nombre = this.form.value.Nombre.toUpperCase();
  this.form.value.ApellidoPaterno = this.form.value.ApellidoPaterno.toUpperCase();
  this.form.value.ApellidoMaterno = this.form.value.ApellidoMaterno.toUpperCase();

  this.form.value.name_ref = this.form.value.name_ref.toUpperCase();
  this.form.value.patern_ref = this.form.value.patern_ref.toUpperCase();
  this.form.value.matern_ref = this.form.value.matern_ref.toUpperCase();


  this.form.value.CorreoElectronico = this.form.value.CorreoElectronico.toUpperCase();
  this.form.value.mail_ref = this.form.value.mail_ref.toUpperCase();


            const sendd = {

                Usuario: (nom_usu == '') ? null : nom_usu,
                NombreReferente: (this.form.value.name_ref == '') ? null : this.getValidaCampo("Nombre Referente", this.form.value.name_ref),
                ApellidoPaternoReferente: (this.form.value.patern_ref == '') ? null : this.getValidaCampo("Paterno Referente", this.form.value.patern_ref),
                ApellidoMaternoReferente: (this.form.value.matern_ref == '') ? null : this.getValidaCampo("Materno Referente", this.form.value.matern_ref),
                CorreoElectronicoReferente: (this.form.value.mail_ref == '') ? null : this.form.value.mail_ref,
                ParentescoReferente: (TipoRefV[1] == '') ? null : TipoRefV[1],
                CuentaReferente: (this.form.value.cuenta_ref == '') ? null : this.form.value.cuenta_ref,

                Nombre: ( this.form.value.Nombre =='')? null : this.getValidaCampo("Nombre", this.form.value.Nombre),
                ApellidoPaterno: ( this.form.value.ApellidoPaterno =='')? null : this.getValidaCampo("Paterno", this.form.value.ApellidoPaterno),
                ApellidoMaterno: ( this.form.value.ApellidoMaterno =='')? null : this.getValidaCampo("Materno", this.form.value.ApellidoMaterno),
                CorreoElectronico: ( this.form.value.CorreoElectronico =='')? null : this.form.value.CorreoElectronico,
                NumeroCelular: ( this.form.value.NumeroCelular =='')? null : this.form.value.NumeroCelular,

                Campus: ( CampusV[1] =='')? null : CampusV[1],
                Nivel: ( NivelV[1] =='')? null : NivelV[1],
                Modalidad: ( ModalidadV[1] =='')? null : ModalidadV[1],
                Carrera: ( CarreraV[1] =='')? null : CarreraV[1],

                GUIDCampus: (CampusV[0]=='')? null : CampusV[0],
                GUIDNivelInteres: (NivelV[0]=='')? null : NivelV[0],
                GUIDModalidad: (ModalidadV[0]=='')? null : ModalidadV[0],
                GUIDCarrera: (CarreraV[0]=='')? null : CarreraV[0],
                GUIDUsuario: ( localStorage.getItem('UserId') =='')? null : localStorage.getItem('UserId'),
                GUIDReferidoParentesco: (TipoRefV[0] == '') ? null : TipoRefV[0],
                GUIDFuentedeObtencion: (fuente_obtencion_GUID == '') ? '3289dd13-6072-e211-b35f-6cae8b2a4ddc' : fuente_obtencion_GUID,
                FuenteObtencion: (fuente_obtencion_nombre == "")? "" : fuente_obtencion_nombre,
                Banner: ( this.form.value.Banner =='')? null : this.form.value.Banner,
                //FuenteNegocio : (f_negocio == "")? "" : f_negocio,
                FuenteNegocio : (fuente_obtencion_nombre == "")? "" : fuente_obtencion_nombre,

                Telefono: (this.form.value.tipoCel == "Celular") ? this.form.value.Telefono : null,
                TelefonoCasa: (this.form.value.tipoCel == "Casa") ? this.form.value.Telefono : null,
                TelefonoOficina: (Telefono_de_ofincina == "" || Telefono_de_ofincina == null ) ? null : Telefono_de_ofincina,

                TelefonoPredictivo: ( this.form.value.TelefonoPredictivo =='')? null : this.form.value.TelefonoPredictivo,
                TelefonoCasaPredictivo: ( this.form.value.TelefonoCasaPredictivo =='')? null : this.form.value.TelefonoCasaPredictivo,
                TelefonoOficinaPredictivo: (Telefono_de_ofincina  == '') ? null : this.form.value.TelefonoOficinaPredictivo,

                Telefonocelularreferente: ( this.form.value.phone_ref =='')? null : this.form.value.phone_ref,
                Telefonocelularpredictivoreferente: (this.form.value.Telefonocelularpredictivoreferente =='')? null:this.form.value.Telefonocelularpredictivoreferente,

                Team: (this.form.value.Team == undefined) ? "" : this.form.value.Team,
                Prioridad: (this.form.value.Prioridad == undefined) ? 0 : this.form.value.Prioridad,
                Attemp: (this.form.value.Attemp == undefined) ? 0 : this.form.value.Attemp,

                Ciclo: ( ciclo_vigente =='')? null : ciclo_vigente,
               // GUIDCiclo: (localStorage.getItem('GUIDCiclo') == null) ? null : localStorage.getItem('GUIDCiclo'),
                GUIDCiclo: ( ciclo_codigounico =='')? null : ciclo_codigounico,
                Tipificacion: (valor_tipificacion == '' ) ? null : valor_tipificacion,
                GUIDTipificacion: 'c8aca7b6-cbdb-e811-8148-3863bb35ddc8',
                EtapaProcesoVentaGUID : (this.etapaprocesoventaid == '') ? null : this.etapaprocesoventaid,
            };




              //Comienza validacion de existencia de linea de seguimiento

              console.log("ciclo: "+ciclo_vigente);
              console.log("campus_abreviatura: "+campus_abreviatura);
              console.log("nivel_abreviatura: "+nivel_abreviatura);



              let b1 : any;
              let b2 : any;
              let b3 : any;

             /* if(ciclo_vigente === undefined ||  ciclo_vigente == ''){

                b1 = 'F';
              }else{
                b1 = 'V';

              }*/

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


              if(  b2 == 'F' && b3 == 'F' ){

                obj_seguimiento = {};
                console.log("Esta vacia la linea de seguimiento");


            }else if(  b2 == 'V' && b3 == 'V' ){


              console.log("Entro a validacion de linea de seguimiento");

              l_seg = ciclo_vigente+"_"+f_o_+"_"+c_a_+"_"+n_a;

              console.log("Linea de seguimiento: "+l_seg+" ___");

               obj_seguimiento = {
                   Lista_seg: l_seg ,
                   GUIDCampus: (CampusV[0] == '')?'2d3bdab0-5c72-e211-a4c9-6cae8b2a0430':CampusV[0]
               };



              sendd['Lista_seg'] =  l_seg;



            }


/*if(this.form.value.phone_ref != '' && this.form.value.phone_ref != null && this.form.value.phone_ref != '0' && this.form.value.phone_ref != 0){

if(this.Validacion_numeros_repetidos_consecutivos(this.form.value.phone_ref) == false ){
  console.log("phone_ref : El Telefono no debe llevar mas de 6 numeros iguales consecutivos.");

//  this.showDialogE("El teléfono no debe llevar mas de 6 numeros iguales consecutivos.");

  return false;
}

}*/

  //Termina validacion de Linea de seguimiento




  if (this.form.value.Nombre != "" || this.form.value.Nombre != null) {

    let array = localStorage.getBasuraObss;

    if(array.search(new RegExp(this.form.value.Nombre, "i"))>0){
        this.showDialogE("Algunos campos están tiene textos incorrectos, favor de verificarlos.");
      return false;
    }
}

if (this.form.value.ApellidoPaterno != "" || this.form.value.ApellidoPaterno != null) {

let array = localStorage.getBasuraObss;

if(array.search(new RegExp(this.form.value.ApellidoPaterno, "i"))>0){
    this.showDialogE("Algunos campos están incorrectos, favor de verificarlos.");
  return false;
}
}

if (this.form.value.ApellidoMaterno != "" || this.form.value.ApellidoMaterno != null) {

let array = localStorage.getBasuraObss;

if(array.search(new RegExp(this.form.value.ApellidoMaterno, "i"))>0){
this.showDialogE("Algunos campos están incorrectos, favor de verificarlos.");
return false;
}
}

if (this.form.value.nom_ref != "" || this.form.value.name_ref != null) {

let array = localStorage.getBasuraObss;

if(array.search(new RegExp(this.form.value.name_ref, "i"))>0){
this.showDialogE("Algunos campos están incorrectos, favor de verificarlos.");
return false;
}
}

if (this.form.value.patern_ref != "" || this.form.value.patern_ref != null) {

let array = localStorage.getBasuraObss;

if(array.search(new RegExp(this.form.value.patern_ref, "i"))>0){
this.showDialogE("Algunos campos están incorrectos, favor de verificarlos.");
return false;
}
}

if (this.form.value.matern_ref != "" || this.form.value.matern_ref != null) {

let array = localStorage.getBasuraObss;

if(array.search(new RegExp(this.form.value.matern_ref, "i"))>0){
this.showDialogE("Algunos campos están incorrectos, favor de verificarlos.");
return false;
}
}




if( (this.form.value.CorreoElectronico == '' || this.form.value.CorreoElectronico == null) && (this.form.value.Telefono != null) ){

  if(this.form.value.Telefono != null &&  this.form.value.Telefono.length < 1 ){
    if ( this.form.value.Telefono.length != '10' ) {
     this.showDialogE("Debes proporcionar un Telefono correcto");
     return false;
   }
  }
}



   if(this.form.value.Telefono != null && this.form.value.Telefono.charAt(0) != null ){

           console.log("this.form.value.Telefono.charAt(0): "+this.form.value.Telefono.charAt(0));

           if(this.form.value.Telefono.charAt(0) == '0'){
             this.showDialogE("Los teléfonos no pueden iniciar con 0.");
             return false;
           }

   }



if(this.Segunda_validacion_Email(this.form.value.CorreoElectronico) == false || this.Segunda_validacion_Email(this.form.value.mail_ref) == false ){
  this.showDialogE("El Correo Electronico introducido es incorrecto.");
  return false;
}

///Expresion regular para correo
   /* let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

    if (emailRegex.test(this.form.value.mail_ref)) {
      console.log("Correo valido Refernte");
    } else {
      console.log("Correo no valido Referente");
    }

    if (emailRegex.test(this.form.value.CorreoElectronico)) {
      console.log("Correo valido Referido");
    } else {
      console.log("Correo no valido Referido");
    }*/


//Validacion de espacios en blanco

if(this.valida_espacios_en_blanco(this.form.value.name_ref, "Nombre Referido") > 10 || this.valida_espacios_en_blanco(this.form.value.patern_ref, "Apellido Paterno Referido") > 10 || this.valida_espacios_en_blanco(this.form.value.matern_ref, "Apellido Materno Referido") > 10 || this.valida_espacios_en_blanco(this.form.value.Nombre, "Nombre") > 10 || this.valida_espacios_en_blanco(this.form.value.ApellidoPaterno, "Apellido Paterno") > 1 || this.valida_espacios_en_blanco(this.form.value.ApellidoMaterno, "Apellido Materno") > 1 ){

  this.showDialogE("No se permiten mas de un espacio en blanco en los campos de registro.");

  return false;
}


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






        this.sendServ.send_Todos_Referidos_QA(sendd)// Anterior sendData4
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






      } else {




        this.sendServ.send_ListaSeguimiento_QA(obj_seguimiento) //EndPoint 7924
        .subscribe(
                (ress: any) => {
                    console.log(ress.status);
                    if (ress.status == 200) {
                        console.log("Ok: Los datos se han envido correctamente.");
                        //Se envia el segundo endpoint -> 7841







        this.sendServ.send_Todos_Referidos_QA(sendd)// this.form.value)
          .subscribe(
            (res: any) => {
              console.log(res.status);
              if (res.status == 200) {
                this.Abreventana(this.form.value.Nombre, this.form.value.ApellidoPaterno+" "+this.form.value.ApellidoMaterno, '', this.form.value.CorreoElectronico, "", '');
                this.sendServ.sendHubSpot(this.form.value.Nombre, this.form.value.ApellidoPaterno+" "+this.form.value.ApellidoMaterno, '', this.form.value.CorreoElectronico, "", '')// this.form.value)

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
          console.log("Error al enviar el registro.");
        }
        }
        )






      }




    } //Termina validacion de errores



    } else {
      this.showDialogE("Error al realizar el registro *");
    }

  }

//Actualiza el correo si no hay correo ocupa numero de telefono
ActualizacionCorreo_con_Tel(event:any, tel:any){

if(this.form.value.CorreoElectronico == ''){

       console.log(tel);
        this.form.controls['CorreoElectronico'].reset({ value: tel + '@unitec.edu.mx', disabled: false });

}else if(this.form.value.CorreoElectronico != ''){

let parte_correo = this.form.value.CorreoElectronico.split('@');

     if(  parte_correo[1] == 'unitec.edu.mx' || parte_correo[1] == ''|| parte_correo[0] == '' ){

         this.form.controls['CorreoElectronico'].reset({ value: tel + '@unitec.edu.mx', disabled: false });

     }


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

/*Validacion_numeros_repetidos_consecutivos(tel_ref){
	if (/(.)\1{6}/.test(tel_ref)){
		return (true)
	} else {
		return (false);
	}

}*/


getValidaCampo(campo, valor){

      let s = "";
      s = this.appConfig.SIMBOLOS_microregistro;

      let r = 0;


  if(valor == "" || valor == null){ //Campo Vacio

    this.campos_con_error.push(" "+campo);
    return '0';
  }else{ //Campo No Vacio



  if(campo == "Nombre Referente"){ //Valida Nombre Referente



      console.log("");
      console.log("------------Validacion de Nombre ReferenTe----------------");

                  for (let k = 0; k < valor.length; k++) {
                    if (s.indexOf(valor.charAt(k), 0) != -1) {
                        r = 1;

                        if(r == 1){
                            //this.showDialogE("Error en el campo Apellido Materno, se encontraron simbolos o caracteres especiales en el campo.");
                            this.campos_con_error.push(" "+campo);
                            console.log("Error en campo Nombre Referente");
                            r = 0;
                            return false;
                        }

                    } else { r = 0 ; return valor; }
                }



    }else if(campo == "Paterno Referente"){ //Valida Apellido Paterno Referente



      console.log("");
      console.log("------------Validacion de Apellido Paterno Referente---------------");

                  for (let k = 0; k < valor.length; k++) {
                    if (s.indexOf(valor.charAt(k), 0) != -1) {
                        r = 1;

                        if(r == 1){
                            //this.showDialogE("Error en el campo Apellido Materno, se encontraron simbolos o caracteres especiales en el campo.");
                            this.campos_con_error.push(" "+campo);
                            console.log("Error en campo Apellido Paterno Referente");
                            r = 0;
                            return false;
                        }

                    } else { r = 0 ; return valor; }
                }



    }else if(campo == "Materno Referente"){ //Valida Apellido Materno Referente



      console.log("");
      console.log("------------Validacion de Apellido Materno Referente---------------");

                  for (let k = 0; k < valor.length; k++) {
                    if (s.indexOf(valor.charAt(k), 0) != -1) {
                        r = 1;

                        if(r == 1){
                            //this.showDialogE("Error en el campo Apellido Materno, se encontraron simbolos o caracteres especiales en el campo.");
                            this.campos_con_error.push(" "+campo);
                            console.log("Error en campo Apellido Materno Referente");
                            r = 0;
                            return false;
                        }

                    } else { r = 0 ; return valor; }
                }



    }else if(campo == "Materno"){ //Valida Apellido Paterno


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

      let valida_antes_arroba = valor.split("@");
      let ante_arroba = valida_antes_arroba[0].replace(" ", "");

      console.log("ante arroba - "+ante_arroba);

      let nuevo_valor = valor.replace(" ", "");

        if(this.form.value.Telefono == "" || this.form.value.Telefono == null){

              if(ante_arroba == ""){

                console.log();
                this.campos_con_error.push(" "+campo);

              }else if(nuevo_valor == ""){

                console.log("Nombre viene vacio");
                this.campos_con_error.push(" "+campo);

              }else{

                 if(LandingValidation.ValidacionEmail(valor) != null){
                  this.campos_con_error.push(" "+campo);
                 }else{
                   return valor;
                 }

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
    window.location.href = "/referido-Web";

    this.form.reset();

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


_keyPressTelefono(event:any, valor:any){

   if( valor != ''){

this.form.controls.tipoCel.reset({ value: '', disabled: false });

   }else if(valor == '' || valor == null ){

     this.form.controls.tipoCel.reset({ value: '', disabled: true });

   }

}


ValidaciondePalabra(control: any){

console.log("Estoy dentro de la valudacion de Palabra: "+control);

}

  _keyOnly3letter(event: any, name: any) {
    LandingValidation.letterName(event, name);
  }

  _keyPress(event: any) {
    LandingValidation.onlyNumber(event);
  }

  _keyPressTxt(event: any) {
    LandingValidation.onlyLetter(event);
  }

  showMjs(field: any) {
    return LandingValidation.getMensaje(field);
  }

  _keyPressNum(event: any, value: any, word: any) {
    if (value == 1) {
      LandingValidation.onlyNumber(event);
      LandingValidation.limitChar(event, word);
      LandingValidation.onlyNumberIgual(event, word);
    }
  }
  _keyPressNumA(event: any, name: any) {
    LandingValidation.onlyNumberIgual(event, name);
  }
  onChange() {
    if (this.form.controls.tipoCel.value == 'Oficina') {
      this.mostrarExtension = false;
    } else {
      this.mostrarExtension = true;
    }
  }

  onGoto(url:string){
    this.router.navigate([url]);
  }


  onChangeCarrera(carrera: string){
    console.log(carrera);

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

 private showDialog(message: string){
        let dialogRef = this.dialog.open(DialogComponent, {
          height: '180px',
          width: '500px',
          data: {message: message}
        });
       dialogRef.afterClosed().subscribe(result => {
         window.location.href = "/referido-Web";
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
