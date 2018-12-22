import { AbstractControl, ValidatorFn } from '@angular/forms';
import { LandingService } from '../services/landing.service';
import { FormControl} from '@angular/forms';

export class LandingValidation {

    public palabraMal:string;

    constructor(){ }

    static palabraMalaValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            const name = control.value;
            if(name!=""){
                let array = localStorage.getBasuraObss;
                if (array.search(new RegExp(name, "i"))>0) {
                    return { 'palabraMala': { name } }
                } else {
                    return null;
                }
            }

        };
    }

    static requiredSelectValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            const name = control.value;
            if (name == '') {
                return { 'requiredSelect': { name } }
            } else {
                return null;
            }
        };
    }

    static aceptNumberValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            const name = control.value;

            const only5number = /1{5}|2{5}|3{5}|4{5}|5{5}|6{5}|7{5}|8{5}|9{5}|0{5}/;
                     let arrarNum = '["1234567890,2345678901,3456789012,4567890123,5678901234,6789012345,7890123456,8901234567,9012345678"]';
            if (arrarNum.search(new RegExp(name, "i")) > 0) {
                return { 'aceptNumber': { name } }
            } else {
                return null;
            }
        };
    }

    static getValidaNumeroPermitido(tel) {
          const name = tel.value;

          const only5number = /1{5}|2{5}|3{5}|4{5}|5{5}|6{5}|7{5}|8{5}|9{5}|0{5}/;
                   let arrarNum = '["1234567890,2345678901,3456789012,4567890123,5678901234,6789012345,7890123456,8901234567,9012345678"]';
          if (arrarNum.search(new RegExp(name, "i")) > 0) {
              return { 'aceptNumber': { name } }
          } else {
              return null;
          }

  }

    static numberConValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            const name = control.value;
            const only5number = /1{5}|2{5}|3{5}|4{5}|5{5}|6{5}|7{5}|8{5}|9{5}|0{5}/;
            if (only5number.test(name)) {
                return { 'numberCon': { name } }
            } else {
                return null;
            }
        };
    }

    static emailMaloValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {

            const name = control.value;
            let arrayBasura = localStorage.getBasuraObss;
                if (name === "") {
                }else if(name===null){

                }else{
                    if(name.search(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i) !== -1){
                    let arrEmail = control.value.split('@');
                    let lenUser  = arrEmail[0].length;
                    let username = arrEmail[0];
                    let arrDominio = arrEmail[1].split('.');
                    let arrLargo = arrDominio.length;
                    let ddominio =arrDominio[0];


                        if (arrayBasura.search(new RegExp(username, "i"))>0) {
                            return {'emailMalo': {name}}
                        }else if (arrayBasura.search(new RegExp(ddominio, "i"))>0) {
                            return {'emailMalo': {name}}
                            //Validamos que no existen caracteres especiales en el dominio
                        }else if(username.search(/[^a-zA-Z0-9_.-]/)!=-1){
                            return {'emailMalo': {name}}
                            //Validacion de dominios MS
                        }else if(ddominio.search(/(hotmail|outlook|live)/i)!= -1 && (arrEmail[0][lenUser-1].search(/\./)!=-1 || arrEmail[0][0].search(/(-|_|\.|[0-9])/)!=-1 || arrEmail[0].search(/\.{2}/g) != -1) ){
                            return {'emailMalo': {name}}
                            //Validacion de dominios gmail
                        }else if(ddominio.search(/gmail/i)!= -1 && (arrEmail[0][lenUser-1].search(/[^a-zA-Z0-9]/)!=-1 || arrEmail[0][0].search(/(-|_|\.|[0-9])/)!=-1 || arrEmail[0].search(/\.{2}/g) != -1 || arrEmail[0].search(/(-|_)/g) != -1)){
                            return {'emailMalo': {name}}
                            //Validacion de dominios yahoo
                        } else if(ddominio.search(/yahoo/i)!= -1 && (arrEmail[0][lenUser-1].search(/[^a-zA-Z0-9]/)!=-1 || arrEmail[0][0].search(/(_|\.|[0-9])/)!=-1 || arrEmail[0].search(/(\.|_){2}/g) != -1 || arrEmail[0].search(/-/g)!=-1 ) ){
                            return {'emailMalo': {name}}
                            //Validacion de dominios restantes
                        }else if(ddominio.search(/(^hotmail|outlook|gmail|live|yahoo)/i) == -1 && ( arrEmail[0][lenUser-1].search(/(-|_|\.)/)!=-1 || arrEmail[0][0].search(/(-|_|\.|[0-9])/)!=-1 || arrEmail[0].search(/(-|_|\.){2}/g) != -1)){
                            return {'emailMalo': {name}}
                            //Validacion de dominios por ejemplo debe tener @mail.com por ejemplo
                        }else{
                            return null;
                        }
                    }else{
                            return {'emailMalo': {name}}
                    }

                }
             return null;
        };
    }


    static ValidacionEmail(value) {

          const name = value;
          let arrayBasura = localStorage.getBasuraObss;
              if (name === "") {
              }else if(name===null){

              }else{
                  if(name.search(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i) !== -1){
                  let arrEmail = value.split('@');
                  let lenUser  = arrEmail[0].length;
                  let username = arrEmail[0];
                  let arrDominio = arrEmail[1].split('.');
                  let arrLargo = arrDominio.length;
                  let ddominio =arrDominio[0];


                      if (arrayBasura.search(new RegExp(username, "i"))>0) {
                          return {'emailMalo': {name}}
                      }else if (arrayBasura.search(new RegExp(ddominio, "i"))>0) {
                          return {'emailMalo': {name}}
                          //Validamos que no existen caracteres especiales en el dominio
                      }else if(username.search(/[^a-zA-Z0-9_.-]/)!=-1){
                          return {'emailMalo': {name}}
                          //Validacion de dominios MS
                      }else if(ddominio.search(/(hotmail|outlook|live)/i)!= -1 && (arrEmail[0][lenUser-1].search(/\./)!=-1 || arrEmail[0][0].search(/(-|_|\.|[0-9])/)!=-1 || arrEmail[0].search(/\.{2}/g) != -1) ){
                          return {'emailMalo': {name}}
                          //Validacion de dominios gmail
                      }else if(ddominio.search(/gmail/i)!= -1 && (arrEmail[0][lenUser-1].search(/[^a-zA-Z0-9]/)!=-1 || arrEmail[0][0].search(/(-|_|\.|[0-9])/)!=-1 || arrEmail[0].search(/\.{2}/g) != -1 || arrEmail[0].search(/(-|_)/g) != -1)){
                          return {'emailMalo': {name}}
                          //Validacion de dominios yahoo
                      } else if(ddominio.search(/yahoo/i)!= -1 && (arrEmail[0][lenUser-1].search(/[^a-zA-Z0-9]/)!=-1 || arrEmail[0][0].search(/(_|\.|[0-9])/)!=-1 || arrEmail[0].search(/(\.|_){2}/g) != -1 || arrEmail[0].search(/-/g)!=-1 ) ){
                          return {'emailMalo': {name}}
                          //Validacion de dominios restantes
                      }else if(ddominio.search(/(^hotmail|outlook|gmail|live|yahoo)/i) == -1 && ( arrEmail[0][lenUser-1].search(/(-|_|\.)/)!=-1 || arrEmail[0][0].search(/(-|_|\.|[0-9])/)!=-1 || arrEmail[0].search(/(-|_|\.){2}/g) != -1)){
                          return {'emailMalo': {name}}
                          //Validacion de dominios por ejemplo debe tener @mail.com por ejemplo
                      }else{
                          return null;
                      }
                  }else{
                          return {'emailMalo': {name}}
                  }

              }
           return null;

  }

    static letterName(event:any, name:any){
        //const only3letter = /a{3,10}|b{3,10}|c{3,10}|d{3,10}|e{3,10}|f{3,10}|g{3,10}|h{3,10}|i{3,10}|j{3,10}|k{3,10}|l{3,10}|m{3,10}|n{3,10}|o{3,10}|p{3,10}|q{3,10}|w{3,10}|r{3,10}|s{3,10}|t{3,10}|u{3,10}|v{3,10}|w{3,10}|x{3,10}|y{3,10}|z{3,10}|A{3,10}|B{3,10}|C{3,10}|D{3,10}|E{3,10}|F{3,10}|G{3,10}|H{3,10}|I{3,10}|J{3,10}|K{3,10}|L{3,10}|M{3,10}|N{3,10}|O{3,10}|P{3,10}|Q{3,10}|W{3,10}|R{3,10}|S{3,10}|T{3,10}|U{3,10}|V{3,10}|W{3,10}|X{3,10}|Y{3,10}|Z{3,10}/;
        const only3letter = /[aA]{3}|[bB]{3}|[cC]{3}|[dD]{3}|[eE]{3}|[fF]{3}|[gG]{3}|[hH]{3}|[iI]{3}|[jJ]{3}|[kK]{3}|[lL]{3}|[mM]{3}|[nN]{3}|[ñÑ]{3}|[oO]{3}|[pP]{3}|[qQ]{3}|[rR]{3}|[sS]{3}|[tT]{3}|[uU]{3}|[vV]{3}|[wW]{3}|[xX]{3}|[yY]{3}|[zZ]{3}/;
        if(only3letter.test(name)){
            event.preventDefault();
            return false;
        }else{
            return true;
        }
    }

    static onlyNumber(event: any) {
        const pattern = /[0-9]/;
        let inputChar = String.fromCharCode(event.charCode);

        if (!pattern.test(inputChar)) {
          // invalid character, prevent input
          event.preventDefault();
        }
    }
    static onlyNumberIgual(event: any, name: any) {
        const only5number = /1{5}|2{5}|3{5}|4{5}|5{5}|6{5}|7{5}|8{5}|9{5}|0{5}/;
        let arrarNum = '["1234567890,2345678901,3456789012,4567890123,5678901234,6789012345,7890123456,8901234567,9012345678"]';

        if (only5number.test(name)) {
            event.preventDefault();
            return false;
        } else if (arrarNum.search(new RegExp(name, "i"))>0){

        }else {
            return true;
        }


    }
    static onlyLetter(event: any) {
        var pattern2 = /[a-zA-Z\s\u00f1\u00d1]/;

        var inputChar2 = String.fromCharCode(event.charCode);

        console.log(pattern2.test(inputChar2));

        if (!pattern2.test(inputChar2)) {
          event.preventDefault();
        }
    }

    static fechaLimite(){

            return new Date(new Date().setDate(new Date().getDate() + 3));

     }

     static fechaLimiteInbound(n_dias){

      if(n_dias == 0  || n_dias === undefined){

        return new Date(new Date().setDate(new Date().getDate() + 3));

      }else{

        return new Date(new Date().setDate(new Date().getDate() + n_dias));

      }

 }



    static fechaInicio(){
       return new Date(1990,0,1);
    }

    static showFocus(event: any,input:any) {
        if(event.charCode==9){
            input.focus();
        }
    }

    static limitChar(event: any, word: any){
        if(word.length > 9){
            event.preventDefault();
        }
    }

    static getMensaje(campo: any){
        let m = campo.split('.');
        let field = m[0];
        let mjs = m[1];
        let object = JSON.parse(localStorage.getMgss);
        return object[field][mjs];
    }

    static edadMinValidator(): ValidatorFn { //Validacion de edad
        return (control: AbstractControl): { [key: string]: any } => {
            const name = control.value;
            if(name < 12 && name != ""){
                return { 'edadMin': { name } }
            }else{
                return null;
            }
        };
    }



    static getObjects(obj, key, val) {
        var objects = [];
        for (var i in obj) {
            if (!obj.hasOwnProperty(i)) continue;
            if (typeof obj[i] == 'object') {
                objects = objects.concat(this.getObjects(obj[i], key, val));
            } else
                //if key matches and value matches or if key matches and value is not passed (eliminating the case where key matches but passed value does not)
                if (i == key && obj[i] == val || i == key && val == '') { //
                    objects.push(obj);
                } else if (obj[i] == val && key == '') {
                    //only add if the object is not already in the array
                    if (objects.lastIndexOf(obj) == -1) {
                        objects.push(obj);
                    }
                }
        }
        return objects;
    }
}
