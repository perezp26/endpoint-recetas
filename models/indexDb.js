
const { medico} = require('./medico');
const paciente = require('./paciente');
const producto = require( './productos' );
const receta = require('./receta');
const recetaDetalle = require('./recetaDetalle');
const tipoReceta = require('./tipoReceta');
const tipoDispensacion = require('./tipoDispensacion');
const folio = require('./folio');

receta.belongsTo( medico, { foreignKey:'idMedico' } );
receta.belongsTo( paciente, { foreignKey:'idPaciente' } );
receta.hasMany( recetaDetalle, { foreignKey:'idReceta'} );


recetaDetalle.belongsTo( producto, { foreignKey:'idProducto' } );
recetaDetalle.belongsTo( tipoDispensacion, { foreignKey:'idTipoDispensacion' } )

module.exports = {
    folio,
    medico,
    paciente,
    producto,
    receta,
    recetaDetalle,
    tipoDispensacion,
    tipoReceta
}