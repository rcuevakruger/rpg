import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.rpg{
   export class Propietario extends Participant {
      cedulaPropietario: string;
      nombre: string;
      apellido: string;
   }
   export class Municipio extends Participant {
      idMunicipio: string;
   }
   export class RegistroPropiedadGuayaquil extends Participant {
      idRPG: string;
   }
   export class Predio extends Asset {
      codigoCatastral: string;
      propietario: Propietario;
   }
   export class Escritura extends Asset {
      idEscritura: string;
      predio: Predio;
      propietario: Propietario;
      fecha: string;
      hashDocumento: string;
   }
   export class Planos extends Asset {
      idPlano: string;
      predio: Predio;
      hashDocumento: string;
   }
   export class InscribirPredio extends Transaction {
      codigoCatastral: string;
      cedulaPropietario: string;
      nombre: string;
      apellido: string;
   }
   export class agregarEscritura extends Transaction {
      idEscritura: string;
   }
// }
