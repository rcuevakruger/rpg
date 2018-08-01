    'use strict';

    /**
     * Transaccion para inscribir predio
     * @param {org.rpg.InscribirPredio} inscribir
     * @transaction
     */
    async function inscribirPredio(inscribir) {
        
        // guardar getFactory en variable factory para poder usar metodos en ella
        const factory = getFactory();
        // guardar namespace en variable NS para poder usarla luego en metodos
        const NS = 'org.rpg';
        
        // guardar registro de tipo Propietario en variable personaRegistry para utilizar metodos en ella
        const personaRegistry = await getParticipantRegistry(NS +'.Propietario');
        // guardar registro de tipo Predio en variable predioRegistry para utilizar metodos en ella
        const predioRegistry = await getAssetRegistry(NS + '.Predio');
        
        /* 
        crear un if/else
        en if, revisa si existe previamente un propietario a traves de su cedula 
        si retorna true, crea solo el predio
        en else, como retorno false entonces crea primero el propietario y despues el predio
         */
        if (await personaRegistry.exists(inscribir.cedulaPropietario) /* || await predioRegistry.exists(inscribir.codigoCatastral) */) {
            
            //crea un nuevo recurso de tipo Predio con el codigo catastral que se paso en la transaccion como codigoCatastral
            const predio = factory.newResource(NS, 'Predio', inscribir.codigoCatastral);
            //crea una relacion que esta establecida en predio con propietario
            predio.propietario = factory.newRelationship(NS, 'Propietario', inscribir.cedulaPropietario);
            
            //guarda registro de predios en variable y agrega nuevo predio en registro con metodo .add
            const predioRegistry = await getAssetRegistry(NS + '.Predio');
            await predioRegistry.add(predio);
            
        } else {
            
            //crea un nuevo recurso de propietario con la cedula propietario que se paso en la transaccion como cedulaPropietario
            const persona = factory.newResource(NS, 'Propietario', inscribir.cedulaPropietario);
            persona.nombre = inscribir.nombre;
            persona.apellido = inscribir.apellido;
            
            const personaRegistry = await getParticipantRegistry(NS +'.Propietario');
            await personaRegistry.add(persona);            
            
            const predio = factory.newResource(NS, 'Predio', inscribir.codigoCatastral);
            predio.propietario = factory.newRelationship(NS, 'Propietario', inscribir.cedulaPropietario);
            
            const predioRegistry = await getAssetRegistry(NS + '.Predio');
            await predioRegistry.add(predio);

        }
    }
