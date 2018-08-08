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
import { traspasoDeDominioService } from './traspasoDeDominio.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-traspasodedominio',
  templateUrl: './traspasoDeDominio.component.html',
  styleUrls: ['./traspasoDeDominio.component.css'],
  providers: [traspasoDeDominioService]
})
export class traspasoDeDominioComponent implements OnInit {

  myForm: FormGroup;

  private allTransactions;
  private Transaction;
  private currentId;
  private errorMessage;

  codigoCatastralPredio = new FormControl('', Validators.required);
  cedulaNuevoPropietario = new FormControl('', Validators.required);
  cedulaAntiguoPropietario = new FormControl('', Validators.required);
  nombre = new FormControl('', Validators.required);
  apellido = new FormControl('', Validators.required);
  transactionId = new FormControl('', Validators.required);
  timestamp = new FormControl('', Validators.required);


  constructor(private servicetraspasoDeDominio: traspasoDeDominioService, fb: FormBuilder) {
    this.myForm = fb.group({
      codigoCatastralPredio: this.codigoCatastralPredio,
      cedulaNuevoPropietario: this.cedulaNuevoPropietario,
      cedulaAntiguoPropietario: this.cedulaAntiguoPropietario,
      nombre: this.nombre,
      apellido: this.apellido,
      transactionId: this.transactionId,
      timestamp: this.timestamp
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.servicetraspasoDeDominio.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(transaction => {
        tempList.push(transaction);
      });
      this.allTransactions = tempList;
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
   * @param {String} name - the name of the transaction field to update
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
   * only). This is used for checkboxes in the transaction updateDialog.
   * @param {String} name - the name of the transaction field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified transaction field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addTransaction(form: any): Promise<any> {
    this.Transaction = {
      $class: 'org.rpg.traspasoDeDominio',
      'codigoCatastralPredio': this.codigoCatastralPredio.value,
      'cedulaNuevoPropietario': this.cedulaNuevoPropietario.value,
      'cedulaAntiguoPropietario': '"' + this.cedulaAntiguoPropietario.value + '"',
      'nombre': this.nombre.value,
      'apellido': this.apellido.value,
      'transactionId': this.transactionId.value,
      'timestamp': this.timestamp.value
    };

    this.myForm.setValue({
      'codigoCatastralPredio': null,
      'cedulaNuevoPropietario': null,
      'cedulaAntiguoPropietario': null,
      'nombre': null,
      'apellido': null,
      'transactionId': null,
      'timestamp': null
    });

    return this.servicetraspasoDeDominio.addTransaction(this.Transaction)
    .toPromise()
    .then(() => {
      this.loadAll();
      this.errorMessage = null;
      this.myForm.setValue({
        'codigoCatastralPredio': null,
        'cedulaNuevoPropietario': null,
        'cedulaAntiguoPropietario': null,
        'nombre': null,
        'apellido': null,
        'transactionId': null,
        'timestamp': null
      });
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
        this.errorMessage = error;
      }
    });
  }

  updateTransaction(form: any): Promise<any> {
    this.Transaction = {
      $class: 'org.rpg.traspasoDeDominio',
      'codigoCatastralPredio': this.codigoCatastralPredio.value,
      'cedulaNuevoPropietario': this.cedulaNuevoPropietario.value,
      'cedulaAntiguoPropietario': this.cedulaAntiguoPropietario.value,
      'nombre': this.nombre.value,
      'apellido': this.apellido.value,
      'timestamp': this.timestamp.value
    };

    return this.servicetraspasoDeDominio.updateTransaction(form.get('transactionId').value, this.Transaction)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
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

  deleteTransaction(): Promise<any> {

    return this.servicetraspasoDeDominio.deleteTransaction(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
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

    return this.servicetraspasoDeDominio.getTransaction(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'codigoCatastralPredio': null,
        'cedulaNuevoPropietario': null,
        'cedulaAntiguoPropietario': null,
        'nombre': null,
        'apellido': null,
        'transactionId': null,
        'timestamp': null
      };

      if (result.codigoCatastralPredio) {
        formObject.codigoCatastralPredio = result.codigoCatastralPredio;
      } else {
        formObject.codigoCatastralPredio = null;
      }

      if (result.cedulaNuevoPropietario) {
        formObject.cedulaNuevoPropietario = result.cedulaNuevoPropietario;
      } else {
        formObject.cedulaNuevoPropietario = null;
      }

      if (result.cedulaAntiguoPropietario) {
        formObject.cedulaAntiguoPropietario = result.cedulaAntiguoPropietario;
      } else {
        formObject.cedulaAntiguoPropietario = null;
      }

      if (result.nombre) {
        formObject.nombre = result.nombre;
      } else {
        formObject.nombre = null;
      }

      if (result.apellido) {
        formObject.apellido = result.apellido;
      } else {
        formObject.apellido = null;
      }

      if (result.transactionId) {
        formObject.transactionId = result.transactionId;
      } else {
        formObject.transactionId = null;
      }

      if (result.timestamp) {
        formObject.timestamp = result.timestamp;
      } else {
        formObject.timestamp = null;
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
      'codigoCatastralPredio': null,
      'cedulaNuevoPropietario': null,
      'cedulaAntiguoPropietario': null,
      'nombre': null,
      'apellido': null,
      'transactionId': null,
      'timestamp': null
    });
  }
}
