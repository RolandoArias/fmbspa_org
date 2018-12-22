/* 
*  Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. 
*  See LICENSE in the source repository root for complete license information. 
*/

import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import * as hello from 'hellojs/dist/hello.all.js';

@Injectable()
export class HttpService {
  getAccessToken() {
    const msft = hello('msft').getAuthResponse();
    var rick = JSON.parse(localStorage.hello);		
    const accessToken = rick.msft.access_token;
    return accessToken;
  }
}
