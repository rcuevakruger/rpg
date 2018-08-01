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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { PredioComponent } from './Predio/Predio.component';
import { EscrituraComponent } from './Escritura/Escritura.component';
import { PlanosComponent } from './Planos/Planos.component';

import { PropietarioComponent } from './Propietario/Propietario.component';
import { MunicipioComponent } from './Municipio/Municipio.component';
import { RegistroPropiedadGuayaquilComponent } from './RegistroPropiedadGuayaquil/RegistroPropiedadGuayaquil.component';

import { InscribirPredioComponent } from './InscribirPredio/InscribirPredio.component';
import { agregarEscrituraComponent } from './agregarEscritura/agregarEscritura.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Predio', component: PredioComponent },
  { path: 'Escritura', component: EscrituraComponent },
  { path: 'Planos', component: PlanosComponent },
  { path: 'Propietario', component: PropietarioComponent },
  { path: 'Municipio', component: MunicipioComponent },
  { path: 'RegistroPropiedadGuayaquil', component: RegistroPropiedadGuayaquilComponent },
  { path: 'InscribirPredio', component: InscribirPredioComponent },
  { path: 'agregarEscritura', component: agregarEscrituraComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: []
})
export class AppRoutingModule { }
