import { NgModule } from '@angular/core';
import { Routes, CanActivate, RouterModule } from '@angular/router';
import { NuevoRegistroPromotorComponent } from './nuevo-promotor/nuevo-promotor.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { BusquedaInboundComponent } from './busqueda-inbound/busqueda-inbound.component';
import { BusquedaSolovinoComponent } from './busqueda-solovino/busqueda-solovino.component';
import { CargaBaseComponent } from './carga-base/carga-base.component';
import { CargaSisComponent } from './carga-sis/carga-sis.component';

import { ResultadoInboundComponent } from './resultado-inbound/resultado-inbound.component';
import { ResultadoSolovinoComponent } from './resultado-solovino/resultado-solovino.component';

import { NuevoRegistroInboundComponent } from './nuevo-inbound/nuevo-inbound.component';
import { NuevoRegistroSolovinoComponent} from './nuevo-solovino/nuevo-solovino.component';
import { ModalConfirmComponent} from "./modal-confirm/modal-confirm.component";
import { ReferidoReferenteComponent } from './referido-referente/referido-referente.component';
import { ReferidoPromotorComponent } from './referido-promotor/referido-promotor.component';
import { ReferidoTlmkComponent } from './referido-tlmk/referido-tlmk.component';
import { ReferidoWebComponent } from './referido-web/referido-web.component';
import { ExistenteInboundComponent } from './existente-inbound/existente-inbound.component';
import { ExistenteSolovinoComponent } from './existente-solovino/existente-solovino.component';
import { FormComponent } from './form/form.component';
import {
  AuthGuardService as AuthGuard
} from './providers/auth-guard.service';



const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'menu',
    component: FormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'nuevo-inbound',
    component: NuevoRegistroInboundComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'nuevo-solovino',
    component: NuevoRegistroSolovinoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'referido-promotor',
    component: ReferidoPromotorComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'referido-tlmk',
    component: ReferidoTlmkComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'referido-web',
    component: ReferidoWebComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'referido-onb',
    component: ReferidoReferenteComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'carga-base',
    component: CargaBaseComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'carga-sis',
    component: CargaSisComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'busqueda-inbound',
    component: BusquedaInboundComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'busqueda-solovino',
    component: BusquedaSolovinoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'existente-inbound',
    component: ExistenteInboundComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'existente-solovino',
    component: ExistenteSolovinoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'nuevo-promotor',
    component: NuevoRegistroPromotorComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'resultado-inbound',
    component: ResultadoInboundComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'resultado-solovino',
    component: ResultadoSolovinoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'modal',
    component: ModalConfirmComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
