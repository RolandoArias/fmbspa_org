/* 
*  Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. 
*  See LICENSE in the source repository root for complete license information. 
*/

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromPromise';
import * as MicrosoftGraph from "@microsoft/microsoft-graph-types"
import * as MicrosoftGraphClient from "@microsoft/microsoft-graph-client"
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import * as $ from 'jquery';

import { HttpService } from '../providers/http.service';

@Injectable()
export class HomeService {
  url = 'https://graph.microsoft.com/v1.0';
  file = 'demo.xlsx';
  table = 'Table1';

  constructor(
    private http: Http,
    private httpService: HttpService) {
  }
  getInit(){

    var client = MicrosoftGraphClient.Client.init({
      authProvider: (done) => {
        done(null, this.httpService.getAccessToken()); //first parameter takes an error if you can't get an access token
      }
    });

    console.log('GOOOOOOOOOOOOOOOO 12345678');
    console.log(client);

    Observable.fromPromise(client
      .api('me')
      .select("mail, displayName")
      .get()
      .then((res => {
        console.log('ssss22222222222');
        let datos = JSON.stringify(res);
        localStorage.setItem('user', datos);
        $.ajax('http://10.210.159.46/fmbapp_qa/public/api/roles/'+res.mail,
        {
           //data: {user_id:''},
            contentType: 'application/json',
            type: 'GET',
            success: function(result) {
                console.log(result);
                let dat = JSON.stringify(result);
                localStorage.setItem('landings0000', dat);
            }
        });
      }))
    );

    
  }
  
  getClient(): MicrosoftGraphClient.Client
  {
    var client = MicrosoftGraphClient.Client.init({
      authProvider: (done) => {
          done(null, this.httpService.getAccessToken()); //first parameter takes an error if you can't get an access token
      }
    });

    console.log('client ok');
    console.log(client);

    return client;
  }

  getMe(): Observable<MicrosoftGraph.User>
  {
    var client = this.getClient();    
    return Observable.fromPromise(client
    .api('me')
    .select("id, displayName, mail, userPrincipalName")
    .get()
    .then ((res => {    
      return res;
    } ) )
    );
  }

}
