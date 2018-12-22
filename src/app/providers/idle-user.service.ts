import { DialogComponent } from './../dialog/dialog.component';
import { MatDialog } from '@angular/material';
//import { AppComponent } from './../app.component';
import { Router } from '@angular/router';
import { AppConfig } from './../services/constants';
import { Injectable } from '@angular/core';

@Injectable()
export class IdleUserService {
  public n: number = 1;
  minutosEspera:number;
  rMinutosEspera:number ;
  timeIlde ;
  constructor( private constante: AppConfig, private router: Router, private dialog :MatDialog ) { }
  //constructor( private constante: AppConfig, private router: Router, private root_Ctrl: AppComponent, private dialog :MatDialog ) { }

  detectaActividad(){
    document.addEventListener("click",          this.resetearTiempo, false );
    // document.addEventListener("mousemove",      this.resetearTiempo, false);
    // document.addEventListener("mousedown",      this.resetearTiempo, false);
    document.addEventListener("keypress",       this.resetearTiempo, false);
    //document.addEventListener("DOMMouseScroll", this.resetearTiempo, false);
    //document.addEventListener("mousewheel",     this.resetearTiempo, false);
    //document.addEventListener("touchmove",      this.resetearTiempo, false);
    //document.addEventListener("MSPointerMove",  this.resetearTiempo, false);
  }

  conteoInactividad(){    
    
    this.minutosEspera = this.constante.IldleWaiting;
    this.n = this.minutosEspera * 1000 * 60 ;
    
    
    this.timeIlde = setTimeout(()=>{ 
      var reinicia  = 0;
      if(localStorage.getItem('rMinutosEspera') != null){
        localStorage.removeItem('rMinutosEspera');
        
        this.n = this.minutosEspera * 1000 * 60 ;   
        this.conteoInactividad();   
        
      }else{
        this.showDialog("Los datos se han guardado correctamente.");        
      }
      
      
    },this.n);

  }

  resetearTiempo(){
    this.minutosEspera = 5;
    this.n = this.minutosEspera * 1000 ;

    this.rMinutosEspera = 10;
    
    localStorage.setItem('rMinutosEspera', '10' );

  }

  private showDialog(message: string) {
    let dialogRef = this.dialog.open(DialogComponent, {
        height: '180px',
        width: '500px',
        data: { message: message }
    });
    dialogRef.afterClosed().subscribe(result => {
        //window.location.href = "/";
        localStorage.clear();
        //this.root_Ctrl.onLogout();
    });
  }
  
}


