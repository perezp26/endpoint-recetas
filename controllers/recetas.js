
const {sequelize} = require('sequelize');
const db = require('../db/configMysql');
const { receta, folio, recetaDetalle, medico, producto, tipoDispensacion } = require('../models/indexDb');
const paciente  = require('../models/paciente');

const addNewReceta = async ( req, res ) => {

    let transaction;
    transaction = await db.transaction()
    const data = req.body
    console.log(data);
    const { 
                idTipoReceta, 
                idPaciente, curp, nombrePaciente, fechaNacimiento, expediente, idSaihweb, isSaihweb,  
                idMedico, 
                fechaReceta, 
                diagnostico, 
                recetaDetalles
          } = data;

   try {
        let newPaciente = {}
        if ( isSaihweb ){
           newPaciente =  await paciente.create( {curp, nombrePaciente, fechaNacimiento, expediente, idSaihweb }, { transaction })
        }
        const _idPaciente = idPaciente === 0 ? newPaciente.idPaciente : idPaciente

        const foliador = await folio.findOne( { where : { idTipoReceta}, transaction } );
        const elfolio = await foliador.update( {folio : foliador.folio + 1 }, { transaction })
        
        const dataReceta = await receta.create( { idTipoReceta, folio: elfolio.folio, idPaciente : _idPaciente, idMedico, fechaReceta, diagnostico }, { transaction } );

        for( d of recetaDetalles ){
            await recetaDetalle.create({
                idReceta : dataReceta.idReceta,
                noEnvases : d.noEnvases,
                idTipoDispensacion : d.tiposDispensacion.idTipoDispensacion,
                idProducto : d.producto.value,
                dosis : d.dosis,
                viaAdmin : d.viaAdmin,
                duracion : d.duracion
            }, { transaction })
        }

        await transaction.commit();

        res.status(200).json({
            ok: true,
            dataReceta : { ...dataReceta },
            paciente : { idPaciente : _idPaciente, curp, nombrePaciente, fechaNacimiento, expediente, idSaihweb, isSaihweb : false }
        })

    } catch (error) {
        
        await transaction.rollback();
        res.status(500).json({
            ok: false,
            msg: 'llamar al administrador error al agregar una nueva receta',
            error
        });

    }
}

const getRecetasPacientes = async(req, res) => {

    try {
        const { idPaciente } = req.params;
        const recetas = await receta.findAll( { where: { idPaciente }} );
        res.status(200).json({
            ok: true,
            recetas
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'llamar al administrador error al obtener las recetas de los pacientes',
            error
        });
    }
}

const getRecetaPaciente = async( req, res ) =>{

    try {
        const {idReceta} = req.params;

        const lareceta = await receta.findOne({
            where : { idReceta },
            include : [
                {
                    model: medico
                },
                {
                    model: paciente
                },
                {
                    model: recetaDetalle,
                    attributes:['dosis','duracion','idRecetaDetalle','noEnvases','viaAdmin'],
                    include:[
                        {
                            model: producto,
                            attributes: [ ['idProducto', 'value'], ['descripcion','label'], 'tipoMedicamento' ]
                        },
                        {
                            model: tipoDispensacion
                        }
                    ]
                }
            ]
        })

        const dataReceta = {
            cedulaProfesional : lareceta.dataValues.medico.dataValues.cedulaProfesional,
            curp : lareceta.dataValues.paciente.dataValues.curp,
            diagnostico : lareceta.dataValues.diagnostico,
            expediente : lareceta.dataValues.paciente.dataValues.expediente,
            fechaNacimiento : lareceta.dataValues.paciente.dataValues.fechaNacimiento,
            fechaReceta : lareceta.dataValues.fechaReceta,
            folio : lareceta.dataValues.folio,
            idMedico : lareceta.dataValues.idMedico,
            idPaciente : lareceta.dataValues.paciente.dataValues.idPaciente,
            idSaihweb : lareceta.dataValues.paciente.dataValues.idSaihweb,
            idTipoReceta : lareceta.dataValues.idTipoReceta,
            isSaihweb : false,
            nombreMedico : lareceta.dataValues.medico.nombreMedico,
            nombrePaciente: lareceta.dataValues.paciente.nombrePaciente,
            recetaDetalles : [...lareceta.dataValues.recetaDetalles ],
            universidad : lareceta.dataValues.medico.universidad,
        }

        res.status(200).json({
            ok: true,
            dataReceta :dataReceta
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'llamar al administrador error al obtener la receta especifica',
            error
        });
    }
}

module.exports = {
    addNewReceta,
    getRecetaPaciente,
    getRecetasPacientes
}