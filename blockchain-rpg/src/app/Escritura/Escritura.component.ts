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

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { EscrituraService } from './Escritura.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-escritura',
  templateUrl: './Escritura.component.html',
  styleUrls: ['./Escritura.component.css'],
  providers: [EscrituraService]
})
export class EscrituraComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  idEscritura = new FormControl('', Validators.required);
  predio = new FormControl('', Validators.required);
  propietario = new FormControl('', Validators.required);
  fecha = new FormControl('', Validators.required);
  hashDocumento = new FormControl('', Validators.required);

  constructor(public serviceEscritura: EscrituraService, fb: FormBuilder) {
    this.myForm = fb.group({
      idEscritura: this.idEscritura,
      predio: this.predio,
      propietario: this.propietario,
      fecha: this.fecha,
      hashDocumento: this.hashDocumento
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceEscritura.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.rpg.Escritura',
      'idEscritura': this.idEscritura.value,
      'predio': this.predio.value,
      'propietario': this.propietario.value,
      'fecha': this.fecha.value,
      'hashDocumento': this.hashDocumento.value
    };

    this.myForm.setValue({
      'idEscritura': null,
      'predio': null,
      'propietario': null,
      'fecha': null,
      'hashDocumento': null
    });

    return this.serviceEscritura.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'idEscritura': null,
        'predio': null,
        'propietario': null,
        'fecha': null,
        'hashDocumento': null
      });
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
          this.errorMessage = error;
      }
    });
  }


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.rpg.Escritura',
      'predio': this.predio.value,
      'propietario': this.propietario.value,
      'fecha': this.fecha.value,
      'hashDocumento': this.hashDocumento.value
    };

    return this.serviceEscritura.updateAsset(form.get('idEscritura').value, this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteAsset(): Promise<any> {

    return this.serviceEscritura.deleteAsset(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceEscritura.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'idEscritura': null,
        'predio': null,
        'propietario': null,
        'fecha': null,
        'hashDocumento': null
      };

      if (result.idEscritura) {
        formObject.idEscritura = result.idEscritura;
      } else {
        formObject.idEscritura = null;
      }

      if (result.predio) {
        formObject.predio = result.predio;
      } else {
        formObject.predio = null;
      }

      if (result.propietario) {
        formObject.propietario = result.propietario;
      } else {
        formObject.propietario = null;
      }

      if (result.fecha) {
        formObject.fecha = result.fecha;
      } else {
        formObject.fecha = null;
      }

      if (result.hashDocumento) {
        formObject.hashDocumento = result.hashDocumento;
      } else {
        formObject.hashDocumento = null;
      }

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  resetForm(): void {
    this.myForm.setValue({
      'idEscritura': null,
      'predio': null,
      'propietario': null,
      'fecha': null,
      'hashDocumento': null
      });
  }

}
