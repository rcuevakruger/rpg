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

    /**
     * Transaccion para traspasar el dominio de propietario a otro propietario
     * @param {org.rpg.traspasoDeDominio} traspaso 
     * @transaction
     */
    async function traspasoDeDominio(traspaso) {
        
        const factory = getFactory();
        const NS = 'org.rpg';
        const personaRegistry = await getParticipantRegistry(NS +'.Propietario');
        const predioRegistry = await getAssetRegistry(NS + '.Predio');
        
        
        if (traspaso.codigoCatastralPredio.propietario === traspaso.cedulaAntiguoPropietario) {

            if (traspaso.codigoCatastralPredio.estado == "LIBRE") {
                
                if (await personaRegistry.exists(traspaso.cedulaNuevoPropietario)) {
                    
                    traspaso.codigoCatastralPredio.propietario = factory.newRelationship(NS, 'Propietario', traspaso.cedulaNuevoPropietario);
                    
                    await predioRegistry.update(traspaso.codigoCatastralPredio);
                    
                } else {
                    
                    const persona = factory.newResource(NS, 'Propietario', traspaso.cedulaNuevoPropietario);
                    persona.nombre = traspaso.nombre;  
                    persona.apellido = traspaso.apellido;
                    
                    await personaRegistry.add(persona);            
                    
                    traspaso.codigoCatastralPredio.propietario = factory.newRelationship(NS, 'Propietario', traspaso.cedulaNuevoPropietario);
                    
                    await predioRegistry.update(traspaso.codigoCatastralPredio);
        
                }
            } else {
                
                throw new Error('Predio se encuentra en estado BLOQUEADO para la venta');
                            
            }
        } else {
            
            throw new Error('Cedula de antiguo propietario no coincide con datos en predio a modificar');

        }
    }


    /**
     * Transaccion para que municipio o RPG cambie el estado del predio entre LIBRE O BLOQUEADO
     * @param {org.rpg.cambiarEstadoDePredio} cambioEstado
     * @transaction
     */

    async function cambiarEstadoDePredio(cambioEstado) {

        const factory = getFactory();
        const NS = 'org.rpg';

        cambioEstado.codigoCatastralPredio.estado = cambioEstado.estado;

        const predioRegistry = await getAssetRegistry(NS + '.Predio');
        await predioRegistry.update(cambioEstado.codigoCatastralPredio);

    }

