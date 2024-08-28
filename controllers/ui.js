const path = require('path');
const { dirname } = require('path');
const sequelize = require('sequelize');
const { producto, tipoReceta, tipoDispensacion } = require('../models/indexDb');

const getCatalogosContrato = async( req, res ) => {

    const catProductos =  Promise.all(
        [
            await producto.findAll({ 
                                                    where:{ activo : '1' },
                                                    attributes : [
                                                        ['idProducto', 'value'],
                                                        ['descripcion','label'],
                                                        'tipoMedicamento'
                                                    ]
            }),
            await tipoReceta.findAll({
                                        where: { activo : '1' }
            }),
            await tipoDispensacion.findAll({
                                        where: { activo : '1' }
            })
        ]
    )

    const values = await catProductos;
    const [ productos, tiposReceta, tiposDispensacion ] = values;
        res.status(200).json({
            ok: true,
            data : { 
                    productos,
                    tiposReceta,
                    tiposDispensacion
             },
        })

}


module.exports = {getCatalogosContrato }