import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class SendService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private headers2 = new Headers({ 'Content-Type':'text/plain' });


  constructor(private http: Http) { }

  sendDataToApi(data) {
      return this.http.post("https://endpoint.scribesoft.com/v1/orgs/27038/requests/6523?accesstoken=8d0e3e43-a352-409a-bbee-401e2ee99b9f", data, {headers: this.headers});
    }
  sendData0(data) {
    return this.http.post("https://endpoint.scribesoft.com/v1/orgs/27038/requests/7030?accesstoken=8d0e3e43-a352-409a-bbee-401e2ee99b9f", data, { headers: this.headers });
  }
    sendData(data) {

      return this.http.post("https://endpoint.scribesoft.com/v1/orgs/27038/requests/6523?accesstoken=8d0e3e43-a352-409a-bbee-401e2ee99b9f", data, {headers: this.headers});
    }

    sendData2(data) {
      return this.http.post("https://endpoint.scribesoft.com/v1/orgs/27038/requests/5876?accesstoken=8d0e3e43-a352-409a-bbee-401e2ee99b9f", data, {headers: this.headers});
    }

  sendData3(data) {
    return this.http.post("https://endpoint.scribesoft.com/v1/orgs/27038/requests/6523?accesstoken=8d0e3e43-a352-409a-bbee-401e2ee99b9f", data, { headers: this.headers });
  }

  sendData4(data) {
    return this.http.post("https://endpoint.scribesoft.com/v1/orgs/27038/requests/7030?accesstoken=8d0e3e43-a352-409a-bbee-401e2ee99b9f", data, { headers: this.headers });
  }

  sendData4Inbound(data) {
    return this.http.post("https://endpoint.scribesoft.com/v1/orgs/27038/requests/7628?accesstoken=8d0e3e43-a352-409a-bbee-401e2ee99b9f", data, { headers: this.headers });
  }


  sendData5(data) {
    //return this.http.post("https://endpoint.scribesoft.com/v1/orgs/27038/requests/7031?accesstoken=8d0e3e43-a352-409a-bbee-401e2ee99b9f", data, { headers: this.headers });
    return this.http.post("https://endpoint.scribesoft.com/v1/orgs/27038/requests/8066?accesstoken=8d0e3e43-a352-409a-bbee-401e2ee99b9f", data, { headers: this.headers });
  }

  sendData6(data) {
    return this.http.post("https://endpoint.scribesoft.com/v1/orgs/27038/requests/7032?accesstoken=8d0e3e43-a352-409a-bbee-401e2ee99b9f", data, { headers: this.headers });
  }
  sendData7(data) {
    return this.http.post("https://endpoint.scribesoft.com/v1/orgs/27038/requests/7088?accesstoken=8d0e3e43-a352-409a-bbee-401e2ee99b9f", data, { headers: this.headers });
  }
  sendData8(data, Archivo){
    return this.http.post("https://endpoint.scribesoft.com/v1/orgs/27038/requests/7618?accesstoken=8d0e3e43-a352-409a-bbee-401e2ee99b9f&Archivo="+Archivo+"", data, { headers: this.headers });
  }
  sendData8Error(data, MensajeError, Archivo){
    return this.http.post("https://endpoint.scribesoft.com/v1/orgs/27038/requests/7618?accesstoken=8d0e3e43-a352-409a-bbee-401e2ee99b9f&MensajeError="+MensajeError+"&Archivo="+Archivo, data, { headers: this.headers });
  }


//Nuevos EndPoint 07-08-2018


sendDataSolovino(data) {
//  return this.http.post("https://endpoint.scribesoft.com/v1/orgs/27038/requests/7661?accesstoken=8d0e3e43-a352-409a-bbee-401e2ee99b9f", data, { headers: this.headers });
  return this.http.post("https://endpoint.scribesoft.com/v1/orgs/27038/requests/8066?accesstoken=8d0e3e43-a352-409a-bbee-401e2ee99b9f", data, { headers: this.headers });

}

sendDataPromotor(data) { //Tambien para Carga Base
//  return this.http.post("https://endpoint.scribesoft.com/v1/orgs/27038/requests/7662?accesstoken=8d0e3e43-a352-409a-bbee-401e2ee99b9f", data, { headers: this.headers });
  return this.http.post("https://endpoint.scribesoft.com/v1/orgs/27038/requests/8066?accesstoken=8d0e3e43-a352-409a-bbee-401e2ee99b9f", data, { headers: this.headers });



}

public sendDataPromotor_CargaBase(data){
  return this.http.post("https://endpoint.scribesoft.com/v1/orgs/27038/requests/8066?accesstoken=8d0e3e43-a352-409a-bbee-401e2ee99b9f", data, { headers: this.headers });
}

sendDataWeb(data) { //Para las 3 de marketing
//  return this.http.post("https://endpoint.scribesoft.com/v1/orgs/27038/requests/7663?accesstoken=8d0e3e43-a352-409a-bbee-401e2ee99b9f", data, { headers: this.headers });
  return this.http.post("https://endpoint.scribesoft.com/v1/orgs/27038/requests/8066?accesstoken=8d0e3e43-a352-409a-bbee-401e2ee99b9f", data, { headers: this.headers });
}

sendDataReferidoWeb(data) {
  return this.http.post("https://endpoint.scribesoft.com/v1/orgs/27038/requests/7664?accesstoken=8d0e3e43-a352-409a-bbee-401e2ee99b9f", data, { headers: this.headers });
}

sendDataReferidoTlmkyOnboarding(data) {
//  return this.http.post("https://endpoint.scribesoft.com/v1/orgs/27038/requests/7664?accesstoken=8d0e3e43-a352-409a-bbee-401e2ee99b9f", data, { headers: this.headers });
  return this.http.post("https://endpoint.scribesoft.com/v1/orgs/27038/requests/8066?accesstoken=8d0e3e43-a352-409a-bbee-401e2ee99b9f", data, { headers: this.headers });
}

sendDataSis(data) {
  return this.http.post("https://endpoint.scribesoft.com/v1/orgs/27038/requests/7666?accesstoken=8d0e3e43-a352-409a-bbee-401e2ee99b9f", data, { headers: this.headers });
//  return this.http.post("https://endpoint.scribesoft.com/v1/orgs/27038/requests/8066?accesstoken=8d0e3e43-a352-409a-bbee-401e2ee99b9f", data, { headers: this.headers });
}

sendDataBase(data){
//  return this.http.post("https://endpoint.scribesoft.com/v1/orgs/27038/requests/7662?accesstoken=8d0e3e43-a352-409a-bbee-401e2ee99b9f", data, { headers: this.headers });
  return this.http.post("https://endpoint.scribesoft.com/v1/orgs/27038/requests/8066?accesstoken=8d0e3e43-a352-409a-bbee-401e2ee99b9f", data, { headers: this.headers });

}

sendHubSpot(firstname, lastname, mobilphone, email, city, phone){
  return this.http.post("https://test.devmx.com.mx/formHub?firstname="+firstname+"&lastname="+lastname+"&mobilphone="+mobilphone+"&email="+email+"&city="+city+"&phone="+phone, { headers: this.headers2 });
}


sendInbound2(data){
  //return this.http.post("https://endpoint.scribesoft.com/v1/orgs/27038/requests/7841?accesstoken=8d0e3e43-a352-409a-bbee-401e2ee99b9f", data, { headers: this.headers });
//  return this.http.post("https://endpoint.scribesoft.com/v1/orgs/27038/requests/8052?accesstoken=8d0e3e43-a352-409a-bbee-401e2ee99b9f", data, { headers: this.headers });
return this.http.post("https://endpoint.scribesoft.com/v1/orgs/27038/requests/8066?accesstoken=8d0e3e43-a352-409a-bbee-401e2ee99b9f", data, { headers: this.headers });
}

sendInbound3(data){
  return this.http.post("https://endpoint.scribesoft.com/v1/orgs/27038/requests/8066?accesstoken=8d0e3e43-a352-409a-bbee-401e2ee99b9f", data, { headers: this.headers });

}


//Endpoint para envio de lista de seguimiento: NO CAMBIAR

sendListadeSeguimiento(data){
  return this.http.post("https://endpoint.scribesoft.com/v1/orgs/27038/requests/7924?accesstoken=8d0e3e43-a352-409a-bbee-401e2ee99b9f", data, { headers: this.headers });

}

sendRegister2(data){
  return this.http.post("https://endpoint.scribesoft.com/v1/orgs/27038/requests/8052?accesstoken=8d0e3e43-a352-409a-bbee-401e2ee99b9f", data, { headers: this.headers });

}

sendRegister_tlmk_web_onboarding(data){
  return this.http.post("https://endpoint.scribesoft.com/v1/orgs/27038/requests/8145?accesstoken=8d0e3e43-a352-409a-bbee-401e2ee99b9f", data, { headers: this.headers });

}

sendCargaBase2(data){
  return this.http.post("https://endpoint.scribesoft.com/v1/orgs/27038/requests/8145?accesstoken=8d0e3e43-a352-409a-bbee-401e2ee99b9f", data, { headers: this.headers });

}


sendRegister_2(data){
  return this.http.post("https://endpoint.scribesoft.com/v1/orgs/27038/requests/8235?accesstoken=8d0e3e43-a352-409a-bbee-401e2ee99b9f", data, { headers: this.headers });
}

sendRegister_3(data){
  return this.http.post("https://endpoint.scribesoft.com/v1/orgs/27038/requests/8236?accesstoken=8d0e3e43-a352-409a-bbee-401e2ee99b9f", data, { headers: this.headers });
}






//Servicios Dev


//8506

sendInbound_dev(data){
  return this.http.post("https://endpoint.scribesoft.com/v1/orgs/27038/requests/8506?accesstoken=8d0e3e43-a352-409a-bbee-401e2ee99b9f", data, { headers: this.headers });
}

sendSolovino_dev(data){
  return this.http.post("https://endpoint.scribesoft.com/v1/orgs/27038/requests/8506?accesstoken=8d0e3e43-a352-409a-bbee-401e2ee99b9f", data, { headers: this.headers });
}

sendPromotor_dev(data){
  return this.http.post("https://endpoint.scribesoft.com/v1/orgs/27038/requests/8506?accesstoken=8d0e3e43-a352-409a-bbee-401e2ee99b9f", data, { headers: this.headers });
}

sendCarga_base_dev(data){
  return this.http.post("https://endpoint.scribesoft.com/v1/orgs/27038/requests/8506?accesstoken=8d0e3e43-a352-409a-bbee-401e2ee99b9f", data, { headers: this.headers });
}

sendCarga_sis_dev(data){
  return this.http.post("https://endpoint.scribesoft.com/v1/orgs/27038/requests/8506?accesstoken=8d0e3e43-a352-409a-bbee-401e2ee99b9f", data, { headers: this.headers });
}




//8505

sendReferido_Web_dev(data){
  return this.http.post("https://endpoint.scribesoft.com/v1/orgs/27038/requests/8505?accesstoken=8d0e3e43-a352-409a-bbee-401e2ee99b9f", data, { headers: this.headers });
}

sendReferido_Tlmk_dev(data){
  return this.http.post("https://endpoint.scribesoft.com/v1/orgs/27038/requests/8505?accesstoken=8d0e3e43-a352-409a-bbee-401e2ee99b9f", data, { headers: this.headers });
}

sendReferido_Referente_dev(data){
  return this.http.post("https://endpoint.scribesoft.com/v1/orgs/27038/requests/8505?accesstoken=8d0e3e43-a352-409a-bbee-401e2ee99b9f", data, { headers: this.headers });
}

sendReferido_Promotor_dev(data){
  return this.http.post("https://endpoint.scribesoft.com/v1/orgs/27038/requests/8505?accesstoken=8d0e3e43-a352-409a-bbee-401e2ee99b9f", data, { headers: this.headers });
}



//QA

sendAllQA_Referidos(data){
  return this.http.post( "https://endpoint.scribesoft.com/v1/orgs/27038/requests/8704?accesstoken=8d0e3e43-a352-409a-bbee-401e2ee99b9f" , data, {headers: this.headers});
}

sendAllQA_s_i_p(data){
  return this.http.post( "https://endpoint.scribesoft.com/v1/orgs/27038/requests/8739?accesstoken=8d0e3e43-a352-409a-bbee-401e2ee99b9f" , data, {headers: this.headers});
}



//Test DEv
sendAllDev_cargabase(data){

  return this.http.post( "https://endpoint.scribesoft.com/v1/orgs/27038/requests/9455?accesstoken=8d0e3e43-a352-409a-bbee-401e2ee99b9f" , data, {headers: this.headers});

}





//EndPoint CRM TEST Solo para inbound
 sendCRM_TestInbound(data){
  return this.http.post( "https://endpoint.scribesoft.com/v1/orgs/31915/requests/9042?accesstoken=ca14cddc-cbdb-4cd3-96f6-f176b94b6cce" , data, {headers: this.headers});
 }


//Endpoint para QA GIT

send_Todos_inb_sol_prom_QA(data){

  //return this.http.post( "https://endpoint.scribesoft.com/v1/orgs/31915/requests/9308?accesstoken=ca14cddc-cbdb-4cd3-96f6-f176b94b6cce" , data, {headers: this.headers});
  return this.http.post( "https://endpoint.scribesoft.com/v1/orgs/31915/requests/9042?accesstoken=ca14cddc-cbdb-4cd3-96f6-f176b94b6cce" , data, {headers: this.headers});
  
}

 send_ListaSeguimiento_QA(data){

 // return this.http.post( "https://endpoint.scribesoft.com/v1/orgs/31915/requests/9312?accesstoken=ca14cddc-cbdb-4cd3-96f6-f176b94b6cce" , data, {headers: this.headers});
 return this.http.post( "https://endpoint.scribesoft.com/v1/orgs/27038/requests/7924?accesstoken=8d0e3e43-a352-409a-bbee-401e2ee99b9f" , data, {headers: this.headers});

 }

send_Todos_Referidos_QA(data){

  return this.http.post( "https://endpoint.scribesoft.com/v1/orgs/31915/requests/9309?accesstoken=ca14cddc-cbdb-4cd3-96f6-f176b94b6cce" , data, {headers: this.headers});

}

send_Todos_cargasis_QA(data){

  return this.http.post( "https://endpoint.scribesoft.com/v1/orgs/31915/requests/9311?accesstoken=ca14cddc-cbdb-4cd3-96f6-f176b94b6cce" , data, {headers: this.headers});

}





}
