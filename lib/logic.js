    'use strict';

    /**
     * Transaccion para inscribir predio
     * @param {org.rpg.InscribirPredio} inscribir
     * @transaction
     */
    async function inscribirPredio(inscribir) {
        
        const factory = getFactory();
        const NS = 'org.rpg';

        const personaRegistry = await getParticipantRegistry(NS +'.Propietario');
        const predioRegistry = await getAssetRegistry(NS + '.Predio');
        Traspaso
        if (await personaRegistry.exists(inscribir.cedulaPropietario) /* || await predioRegistry.exists(inscribir.codigoCatastral) */) {
            
            const predio = factory.newResource(NS, 'Predio', inscribir.codigoCatastral);
            predio.propietario = factory.newRelationship(NS, 'Propietario', inscribir.cedulaPropietario);
            
            const predioRegistry = await getAssetRegistry(NS + '.Predio');
            await predioRegistry.add(predio);
            
        } else {
            
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