import { Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatSort} from '@angular/material';
import { Location } from '@angular/common';

import { MatDialog, MatSelect, MatDialogRef, MAT_DIALOG_DATA, NativeDateAdapter } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { DialogFormComponent } from '../dialog-form/dialog-form.component';


import * as $ from 'jquery';
import {Router} from "@angular/router";
@Component({
  selector: 'resultado-inbound',
  templateUrl: './resultado-inbound.component.html',
  styleUrls: ['./resultado-inbound.component.scss']
})
export class ResultadoInboundComponent implements OnInit {
  displayedColumns = ['selected', 'numberA', 'id', 'name', 'interest', 'mail', 'last', 'url'];
  //dataSource = new MatTableDataSource(ELEMENT_DATA);
  reesults: any;
  cantidad: any;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router,private location: Location,   public dialog: MatDialog) {
  }

  ngOnInit() {

      let h = JSON.parse(localStorage.getItem('search_register_value'));
      this.cantidad = h.length;
      this.reesults  = h;

      if(this.cantidad == 0){

        console.log("No se encontraron registros con los datos capturados");

        this.showDialog("No se encontraron registros con los datos capturados.");

      }

  }






  private showDialog(message: string) {
    let dialogRef = this.dialog.open(DialogComponent, {
        height: '180px',
        width: '500px',
        data: { message: message }
    });
    dialogRef.afterClosed().subscribe(result => {
        //window.location.href = "/register";
    });
}



  onGoto(url:string){
    this.router.navigate([url]);
  }
  cancel() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  showLead(values: any) {
    console.log(values.source.value);
    localStorage.setItem('lead_id_register', values.source.value);
  }

  seleccionarLead(){
    let useLead = localStorage.getItem('lead_id_register');
    let go = this;
    let urlGetLEad = "https://laulatammxqa.api.crm.dynamics.com/api/data/v8.2/leads?$filter=leadid eq " + useLead;
    var settings2 = {
      "async": true,
      "crossDomain": true,
      "url": urlGetLEad,
      "method": "GET",
      "headers": {
        "authorization": "Bearer " + localStorage.getItem('access_token'),
        "content-type": "application/json",
        "odata.metadata": "minimal",
      }
    }

    $.ajax(settings2).done(function (response) {
      const user = JSON.stringify(response);
      localStorage.setItem('lead_user', user);
      const tipo_search = localStorage.getItem('search_tipo');
      go.onGoto('/existente-inbound');
    //   if(tipo_search=='search_inbound'){
    //      go.onGoto('/register-existing');
    //   }else{
    //     go.onGoto('/register-existing-solo');
    //  }



    });
  }

}




export interface Element {
  name: string;
  numberA: number;
  id: number;
  interest: string;
  mail: string;
  last: string;
  selected: boolean;
}
