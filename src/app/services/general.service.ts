import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from './constants';

@Injectable()
export class GeneralService {
  token: any;
  userId: any;
  headers: any;
  options: any;

  private apiUrl = this.appConfig.API_URL_PROD;

  private headerss = {headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })};

  constructor(public http: HttpClient, private appConfig: AppConfig) {

  }

  createHeader(token) {
    this.headers = {headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'token': token })};
  }

  login(params){
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'landing/login', params, this.headerss)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  register(params){
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'landing/nuevo-inbound', params, this.headerss)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  registerPromo(params){
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'landing/nuevo-promotor', params, this.headerss)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  registerSolo(params){
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'landing/nuevo-solovino', params, this.headerss)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  referidoReferente(params){
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'landing/referido-onb', params, this.headerss)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  referidoWeb(params){
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'landing/referido-web', params, this.headerss)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }


  searchRegister(params){
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'landing/busqueda-inbound', params, this.headerss)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  searchRegisterSolo(params){
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'landing/busqueda-solovino', params, this.headerss)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }


  validInput(params){
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'landing/valid-input', params, this.headerss)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

}
