/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { DataService } from './data.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { PredioComponent } from './Predio/Predio.component';
import { EscrituraComponent } from './Escritura/Escritura.component';
import { PlanosComponent } from './Planos/Planos.component';

import { PropietarioComponent } from './Propietario/Propietario.component';
import { MunicipioComponent } from './Municipio/Municipio.component';
import { RegistroPropiedadGuayaquilComponent } from './RegistroPropiedadGuayaquil/RegistroPropiedadGuayaquil.component';

import { InscribirPredioComponent } from './InscribirPredio/InscribirPredio.component';
import { traspasoDeDominioComponent } from './traspasoDeDominio/traspasoDeDominio.component';
import { cambiarEstadoDePredioComponent } from './cambiarEstadoDePredio/cambiarEstadoDePredio.component';
import { agregarEscrituraComponent } from './agregarEscritura/agregarEscritura.component';

import {BlockUIModule} from 'ng-block-ui';

  @NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PredioComponent,
    EscrituraComponent,
    PlanosComponent,
    PropietarioComponent,
    MunicipioComponent,
    RegistroPropiedadGuayaquilComponent,
    InscribirPredioComponent,
    traspasoDeDominioComponent,
    cambiarEstadoDePredioComponent,
    agregarEscrituraComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    BlockUIModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
