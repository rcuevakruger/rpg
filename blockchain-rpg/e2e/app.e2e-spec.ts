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

import { AngularTestPage } from './app.po';
import { ExpectedConditions, browser, element, by } from 'protractor';
import {} from 'jasmine';


describe('Starting tests for blockchain-rpg', function() {
  let page: AngularTestPage;

  beforeEach(() => {
    page = new AngularTestPage();
  });

  it('website title should be blockchain-rpg', () => {
    page.navigateTo('/');
    return browser.getTitle().then((result)=>{
      expect(result).toBe('blockchain-rpg');
    })
  });

  it('network-name should be blockchain-rpg@0.0.1',() => {
    element(by.css('.network-name')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('blockchain-rpg@0.0.1.bna');
    });
  });

  it('navbar-brand should be blockchain-rpg',() => {
    element(by.css('.navbar-brand')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('blockchain-rpg');
    });
  });

  
    it('Predio component should be loadable',() => {
      page.navigateTo('/Predio');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Predio');
      });
    });

    it('Predio table should have 3 columns',() => {
      page.navigateTo('/Predio');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(3); // Addition of 1 for 'Action' column
      });
    });
  
    it('Escritura component should be loadable',() => {
      page.navigateTo('/Escritura');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Escritura');
      });
    });

    it('Escritura table should have 6 columns',() => {
      page.navigateTo('/Escritura');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(6); // Addition of 1 for 'Action' column
      });
    });
  
    it('Planos component should be loadable',() => {
      page.navigateTo('/Planos');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Planos');
      });
    });

    it('Planos table should have 4 columns',() => {
      page.navigateTo('/Planos');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(4); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('Propietario component should be loadable',() => {
      page.navigateTo('/Propietario');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Propietario');
      });
    });

    it('Propietario table should have 4 columns',() => {
      page.navigateTo('/Propietario');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(4); // Addition of 1 for 'Action' column
      });
    });
  
    it('Municipio component should be loadable',() => {
      page.navigateTo('/Municipio');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Municipio');
      });
    });

    it('Municipio table should have 2 columns',() => {
      page.navigateTo('/Municipio');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(2); // Addition of 1 for 'Action' column
      });
    });
  
    it('RegistroPropiedadGuayaquil component should be loadable',() => {
      page.navigateTo('/RegistroPropiedadGuayaquil');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('RegistroPropiedadGuayaquil');
      });
    });

    it('RegistroPropiedadGuayaquil table should have 2 columns',() => {
      page.navigateTo('/RegistroPropiedadGuayaquil');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(2); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('InscribirPredio component should be loadable',() => {
      page.navigateTo('/InscribirPredio');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('InscribirPredio');
      });
    });
  
    it('agregarEscritura component should be loadable',() => {
      page.navigateTo('/agregarEscritura');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('agregarEscritura');
      });
    });
  

});