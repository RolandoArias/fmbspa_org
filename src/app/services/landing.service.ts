import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';
import { Palabra } from '../interfaces/palabra';


@Injectable()
export class LandingService {


	configUrl = "http://10.210.159.46/assets/palabras_basura.json";
	mesajesUrl = "http://10.210.159.46/assets/mensajes_validaciones.json";

  	constructor(private http: HttpClient) { }

	getPalabrasMalas() {
		localStorage.removeItem('getBasuraObs');
		if (localStorage.getBasuraObss === undefined) {
			return this.http.get(this.configUrl)
				.subscribe(data => {
					localStorage.getBasuraObss = JSON.stringify(data);
				});
		} else {
			return false;
		}
	}

	getMensajes() {
		if (localStorage.getMgss === undefined) {
			console.log('creando MEnsaje localstorage');
			return this.http.get(this.mesajesUrl)
				.subscribe(data => {
					localStorage.getMgss = JSON.stringify(data);
				});
		} else {
			return false;
		}
	}


	getInit(){
		this.getMensajes();
		this.getPalabrasMalas();
	}

}
