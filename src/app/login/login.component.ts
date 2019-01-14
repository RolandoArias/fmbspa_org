import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {GeneralService} from '../services/general.service';
import {MatDialog} from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {ModalConfirmComponent} from '../modal-confirm/modal-confirm.component';
import { Http, Headers, Response} from '@angular/http';

import { AuthService } from '../providers/auth.service';
import * as $ from 'jquery';
import {Router} from "@angular/router";

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  @ViewChild('username') usernameInput: ElementRef;
  @ViewChild('password') passwordInput: ElementRef;
  user: any = {};
  send = false;
  inputError: any;
  txtError: any;
  email: any;

  matcher = new MyErrorStateMatcher();

  private headers = new Headers({'Content-Type':'application/jsonp'});

  constructor(private router: Router,private gralService: GeneralService, public dialog: MatDialog, private authService: AuthService,private http: Http) {

  }

  ngOnInit() {

    this.email = new FormControl('', this.validUsuario.bind(this));
    console.log('CODE='+this.getParameterByName('code'));
    if(this.getParameterByName('code')!=''){
      window.location.href = "http://10.210.136.121/fmbapp_qa/public/api/getToken?code="+this.getParameterByName('code');
    }

    if(this.getParameterByName('access_token')!=''){
        var userLocal = localStorage.setItem('access_token',this.getParameterByName('access_token'));
        console.log('creando Access_token');
          var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://laulatammxqa.api.crm.dynamics.com/api/data/v8.2/WhoAmI",
            "method": "GET",
            "headers": {
              "authorization": "Bearer "+localStorage.getItem('access_token'),
              "content-type": "application/json",
              "odata.metadata": "minimal",
            }
          }
          var old = this;
          $.ajax(settings).done(function (response2){
            var WhoAmI = JSON.stringify(response2)
            localStorage.setItem('WhoAmI',WhoAmI)
            var w = localStorage.getItem('WhoAmI');
            var k = JSON.parse(w);
            localStorage.setItem('UserId',response2.UserId);
            localStorage.setItem('UserId22', response2.UserId);

            localStorage.setItem('ciclo', "C1");
            localStorage.setItem('ciclo_name', "18-3");
            localStorage.setItem('GUIDCiclo',"8026c76c-4bee-e611-a5d4-005056be4250");

            var UserId = localStorage.getItem('UserId22');

                var url_user ="https://laulatammxqa.api.crm.dynamics.com/api/data/v8.2/systemusers("+UserId+")";
                var settings2 = {
                  "async": true,
                  "crossDomain": true,
                  "url": url_user,
                  "method": "GET",
                  "headers": {
                    "authorization": "Bearer "+localStorage.getItem('access_token'),
                    "content-type": "application/json",
                    "odata.metadata": "minimal",
                  }
                }

                $.ajax(settings2).done(function (response){
                  var user = JSON.stringify(response)
                  localStorage.setItem('user',user);
                  $.ajax('http://10.210.136.121/fmbapp_qa/public/api/roles/'+response.domainname,
                    {
                       //data: {user_id:''},
                        contentType: 'application/json',
                        type: 'GET',
                        success: function(result) {
                            console.log(result);
                            var dat = JSON.stringify(result);
                            this.landings = result;
                            localStorage.setItem('landings', dat);
                            old.onGoto('/home');
                        }
                    });


                });
          });
    }

    if (localStorage.getItem('user') == null && this.getParameterByName('code') == '' && this.getParameterByName('access_token') == '') {
      window.location.href = "https://login.microsoftonline.com/346a1d1d-e75b-4753-902b-74ed60ae77a1/oauth2/authorize?client_id=a8399c04-2d08-44c8-ac84-2ad578e8a1ae&response_type=code&redirect_uri=http://10.210.136.121&response_mode=query&resource=https://laulatammxqa.crm.dynamics.com"; 
      //window.location.href = "https://login.microsoftonline.com/346a1d1d-e75b-4753-902b-74ed60ae77a1/oauth2/authorize?client_id=7c8db090-1712-47dd-aa0b-f34d5357893e&response_type=code&redirect_uri=http://localhost:4200&response_mode=query&resource=https://laulatammxqa.crm.dynamics.com";
    }else{
      this.onGoto('/home');
    }

  }

  validUsuario(control: FormControl){
    if(this.inputError == 'username'){
      return {'error': true};
    }

    return null;
  }

  onLogin() {
        window.location.href = "https://login.microsoftonline.com/346a1d1d-e75b-4753-902b-74ed60ae77a1/oauth2/authorize?client_id=7c8db090-1712-47dd-aa0b-f34d5357893e&response_type=code&redirect_uri=https://10.210.136.121&response_mode=query&resource=https://laulatammxqa.crm.dynamics.com";
        
  }



  getParameterByName(name) {
      name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(location.search);
      return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

  onGoto(url:string){
    this.router.navigate([url]);
  }


}
