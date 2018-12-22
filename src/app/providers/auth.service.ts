/* 
*  Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. 
*  See LICENSE in the source repository root for complete license information. 
*/

// This sample uses an open source OAuth 2.0 library that is compatible with the Azure AD v2.0 endpoint. 
// Microsoft does not provide fixes or direct support for this library. 
// Refer to the library’s repository to file issues or for other support. 
// For more information about auth libraries see: https://azure.microsoft.com/documentation/articles/active-directory-v2-libraries/ 
// Library repo: https://github.com/MrSwitch/hello.js

import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import * as $ from 'jquery';

import * as hello from 'hellojs/dist/hello.all.js';

import { Configs } from '../providers/configs';

@Injectable()
export class AuthService {
  constructor(
    private zone: NgZone,
    private router: Router
  ) { }

  initAuth() {
    hello.init({
      msft: {
        id: '8b121322-84ec-4bb9-8929-6c64333775f6',
        oauth: {
          version: 2,          
          auth: 'https://login.microsoftonline.com/346a1d1d-e75b-4753-902b-74ed60ae77a1/oauth2/v2.0/authorize',
        },
        scope_delim: ' ',
        form: false
      },
    },
      { redirect_uri: window.location.href, response_type: 'code' }
    );
  }

  login() {
    hello.init({
      msft: {
        id: '8b121322-84ec-4bb9-8929-6c64333775f6',
        oauth: {
          version: 2,          
          auth: 'https://login.microsoftonline.com/346a1d1d-e75b-4753-902b-74ed60ae77a1/oauth2/v2.0/authorize',
        },
        scope_delim: ' ',
        form: false
      },
    },
      { redirect_uri: window.location.href, response_type: 'code' }
    );
     

    hello('msft').login({ 
      scope: 'User.Read Mail.Send',
      response_type: 'code',
      //resource:'https://laulatammxqa.crm.dynamics.com',
      redirect_uri: window.location.href
     }).then(
      () => {
        this.zone.run(() => {          
          this.router.navigate(['/home']);
          let userLocal = localStorage.getItem('user');
          let datos = JSON.parse(userLocal); 
          $.ajax('http://localhost:8000/api/roles/'+datos.mail,
          {
             //data: {user_id:''},
              contentType: 'application/json',
              type: 'GET',
              success: function(result) {
                  console.log(result);
                  let dat = JSON.stringify(result);
                  localStorage.setItem('landings123', dat);
              }
          });
        });
      },
      e => console.log(e.error.message)
    );
  }

  logout() {
    hello('msft').logout().then(
      () => window.location.href = '/',
      e => console.log(e.error.message)
    );
  }

  isAuthenticated() {
    if (localStorage.getItem("user") === null) {
      return true; 
    } else {
      return false;
    }
  }
}