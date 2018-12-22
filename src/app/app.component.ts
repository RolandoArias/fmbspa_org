import { AppConfig } from './services/constants';
//import { IdleUserService } from './providers/idle-user.service';
import { Component, OnInit,ViewChild } from '@angular/core';


import { CsqService } from './providers/csq.service';
import { PnnService } from './providers/pnn.service';
import { AuthService } from './providers/auth.service';
import { NivelService } from './providers/nivel.service';
import { CarreraService } from './providers/carrera.service';
import { ModalidadService } from './providers/modalidad.service';
import { CampusCarreraService } from './providers/campus-carrera.service';
import { SubsubtipoActividadService } from './providers/subsubtipo-actividad.service';
import { HomeService } from './providers/home.service';
import { LandingService } from './services/landing.service';
import { CalidadService } from './providers/calidad.service';
import { EscuelaEmpresaService } from './providers/escuela-empresa.service';

import {Router} from "@angular/router";

import {MatSidenav} from '@angular/material/sidenav';

import * as $ from 'jquery';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
  @ViewChild('sidenav') sidenav: MatSidenav;
  shows:boolean = false;
  landings: any = [];
  api_cnn;

  constructor(
              private router: Router,
              private landingService: LandingService,
              private csqServ: CsqService,
              private homeService: HomeService,
              private pnnServ: PnnService,
              private authServ:AuthService,
              private nivelServ: NivelService,
              private carreraServ: CarreraService,
              private calidadServ: CalidadService,
              private modalidadServ: ModalidadService,
              private subSubServ: SubsubtipoActividadService,
              private campusCarreraServ: CampusCarreraService,
              private escuelaEmpresaServ: EscuelaEmpresaService,
              //public userActive:  IdleUserService,
              private route: Router,
              private constante: AppConfig){

              }

  ngOnInit(){

    this.api_cnn = this.constante.api_request;
    //** Detección de inactividad **//
    if(this.route.url != '/'){
      // this.userActive.conteoInactividad();
      // this.userActive.detectaActividad();
    }else{


    }



    //** Detección de inactividad **//

    this.landingService.getInit();
    this.pnnServ.getAll();
    // this.campusCarreraServ.getAll();

    this.csqServ.getAll();
    this.nivelServ.getAll();

    this.carreraServ.getAll();
    this.calidadServ.getAll();
    this.modalidadServ.getAll();
    this.campusCarreraServ.getAll();
    this.subSubServ.getSubSubTiposActividad();
    this.subSubServ.getSubSubTiposActividadAll();

    this.escuelaEmpresaServ.getAll();

    let userLocal = localStorage.getItem('user');
    let datos = JSON.parse(userLocal);

    setTimeout(function(){
      //this.subSubServ.getSubSubTiposActividad();
    },100);
   // this.subsGetMe = this.homeService.getMe(  ).subscribe(me => this.meget = me);

    if(window.location.pathname!='/'){
      if(datos===null){
        this.homeService.getInit();
         this.shows = false;

      }else{
         this.shows = true;
        $.ajax(this.api_cnn+'roles/'+datos.domainname,
        {
           //data: {user_id:''},
            contentType: 'application/json',
            type: 'GET',
            success: function(result) {
                let dat = JSON.stringify(result);
                this.landings = result;
                localStorage.setItem('landings', dat);
            }
        });
      }
       let userLanding = localStorage.getItem('landings');
    let land = JSON.parse(userLanding);
    this.landings = land;
    }else{
     this.shows = true;
      let userLanding = localStorage.getItem('landings');
      let land = JSON.parse(userLanding);
       this.landings = land;
    }
  }



  onLogout() {
    //this.authServ.logout();
    this.sidenav.close();
    localStorage.clear();
    window.location.href='https://login.microsoftonline.com/346a1d1d-e75b-4753-902b-74ed60ae77a1/oauth2/logout?post_logout_redirect_uri=https://www.calidadacademica.mx/';

  }
  getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

  onMenu(){
      if(window.location.pathname =='/' || window.location.pathname == '/home' || window.location.pathname == '/menu' ){
        this.sidenav.close();
        return "no";
      }
	  	if(localStorage.access_token){
	  		 	return "access_token";
	  	}else{
	  		return "no";
	  	}
 	}


  onMenu2() {
    if (window.location.pathname == '/' || window.location.pathname == '/home' || window.location.pathname == '/menu') {

      return "no";
    }
    if (localStorage.access_token) {
      return "access_token";
    } else {
      return "no";
    }
  }
  onGoto(url: string) {
    this.sidenav.close();
    this.router.navigate([url]);
  }

  onGoto2(url: string) {
    this.router.navigate([url]);
  }

}
