import { IdleUserService } from './providers/idle-user.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule,CanActivate  } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule, JsonpModule } from '@angular/http';

import { DialogComponent } from './dialog/dialog.component';

import * as $ from 'jquery';
import * as XLSX from 'xlsx';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatGridListModule } from '@angular/material';
import { MatTableModule, MatDatepickerModule, MatNativeDateModule, MatDialogModule, MatRadioModule } from '@angular/material';
import { MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatListModule, MatMenuModule} from '@angular/material';

import { AppComponent } from './app.component';

import { BusquedaInboundComponent } from './busqueda-inbound/busqueda-inbound.component';
import { BusquedaSolovinoComponent } from './busqueda-solovino/busqueda-solovino.component';
import { CargaBaseComponent } from './carga-base/carga-base.component';
import { CargaSisComponent } from './carga-sis/carga-sis.component';

import { LoginComponent } from './login/login.component';

import { ResultadoInboundComponent } from './resultado-inbound/resultado-inbound.component';
import { ResultadoSolovinoComponent } from './resultado-solovino/resultado-solovino.component';

import { NuevoRegistroInboundComponent } from './nuevo-inbound/nuevo-inbound.component';
import { NuevoRegistroSolovinoComponent } from './nuevo-solovino/nuevo-solovino.component';
import { NuevoRegistroPromotorComponent } from './nuevo-promotor/nuevo-promotor.component';


// Providers
import { CsqService } from './providers/csq.service';
import { PnnService } from './providers/pnn.service';
import { HoraService } from './providers/hora.service';
import { SendService } from './providers/send.service';
import { NivelService } from './providers/nivel.service';
import { CanalService } from './providers/canal.service';
import { CicloService } from './providers/ciclo.service';
import { TurnoService } from './providers/turno.service';
import { FormatService } from './providers/format.service';
import { CampusService } from './providers/campus.service';
import { AsesorService} from './providers/asesor.service';
import { AsesorGrupalService } from './providers/asesor-grupal.service';
import { GeneroService } from './providers/genero.service';
import { InteresService } from './providers/interes.service';
import { CarreraService } from './providers/carrera.service';
import { UsuarioService } from './providers/usuario.service';
import { ModalidadService } from './providers/modalidad.service';
import { SinCorreoService } from './providers/sin-correo.service';
import { ParentescoService } from './providers/parentesco.service';
import { TerritorioService } from './providers/territorio.service';
import { CampusCitaService } from './providers/campus-cita.service';
import { ProgramacionService } from './providers/programacion.service';
import { TipificacionService } from './providers/tipificacion.service';
import { TransferenciaService } from './providers/transferencia.service';
import { CampusCarreraService } from './providers/campus-carrera.service';
import { PaginaLandingService } from './providers/pagina-landing.service';
import { TipoActividadService } from './providers/tipo-actividad.service';
import { TipoReferenteService } from './providers/tipo-referente.service';
import { EscuelaEmpresaService } from './providers/escuela-empresa.service';
import { CitaProspeccionService } from './providers/cita-prospeccion.service';
import { ActividadAgendaService } from './providers/actividad-agenda.service';
import { GeneralService } from './services/general.service';
import { LandingService } from './services/landing.service';
import { SubsubtipoActividadService } from './providers/subsubtipo-actividad.service';
import { Subysubsubtipo2Service } from './providers/subysubsubtipo2.service';
import { CalidadService } from './providers/calidad.service';
import { FuenteObtencionService } from './providers/fuenteobtencion.service';


import { AppConfig } from './services/constants';
import { ModalConfirmComponent } from './modal-confirm/modal-confirm.component';
import { HomeComponent } from './home/home.component';
import { ReferidoReferenteComponent } from './referido-referente/referido-referente.component';
import { ReferidoPromotorComponent } from './referido-promotor/referido-promotor.component';
import { ReferidoTlmkComponent } from './referido-tlmk/referido-tlmk.component';
import { ReferidoWebComponent } from './referido-web/referido-web.component';

import { ExistenteInboundComponent } from './existente-inbound/existente-inbound.component';
import { ExistenteSolovinoComponent } from './existente-solovino/existente-solovino.component';
import { FormComponent } from './form/form.component';

import { HttpService } from './providers/http.service';
import { AuthService } from './providers/auth.service';
import { HomeService } from './providers/home.service';
import { AuthGuardService } from './providers/auth-guard.service';
import { DialogFormComponent } from './dialog-form/dialog-form.component';


@NgModule({
  declarations: [
    AppComponent,
    BusquedaInboundComponent,
    BusquedaSolovinoComponent,
    CargaBaseComponent,
    CargaSisComponent,
    LoginComponent,
    ResultadoInboundComponent,
    ResultadoSolovinoComponent,
    NuevoRegistroInboundComponent,
    NuevoRegistroSolovinoComponent,
    NuevoRegistroPromotorComponent,
    ModalConfirmComponent,
    HomeComponent,
    ReferidoReferenteComponent,
    ReferidoPromotorComponent,
    ReferidoTlmkComponent,
    ReferidoWebComponent,
    ExistenteInboundComponent,
    ExistenteSolovinoComponent,
    FormComponent,
    DialogComponent,
    DialogFormComponent

  ],
  entryComponents: [
    DialogComponent,
    DialogFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    JsonpModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatGridListModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatRadioModule,
    MatGridListModule,
    MatInputModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatListModule,
    MatMenuModule

  ],
  providers: [CanalService, CsqService, TipificacionService, InteresService, FuenteObtencionService,
              ParentescoService, CampusService, NivelService, ModalidadService, SubsubtipoActividadService,
              CarreraService, CicloService, AsesorService,AsesorGrupalService, HoraService, PnnService, SendService, FormatService,
              CampusCitaService, CitaProspeccionService, EscuelaEmpresaService, GeneroService, PaginaLandingService,
              ProgramacionService, SinCorreoService, TerritorioService, TipoActividadService, TipoReferenteService,
              TransferenciaService, TurnoService, UsuarioService, AppConfig, GeneralService, LandingService, HttpService, Subysubsubtipo2Service,
              AuthService, HomeService, CampusCarreraService, AuthGuardService, ActividadAgendaService, CalidadService, IdleUserService,
            ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
