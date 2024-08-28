const {DataTypes} = require('sequelize');
const db = require('../db/configMysql');

const receta = db.define('recetas',{
    idReceta: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement : true
    },
    idTipoReceta : {
        type : DataTypes.SMALLINT,
        allowNull : false,
    },
    folio : {
        type : DataTypes.INTEGER, 
        allowNull : false,
    },
    idPaciente : {
        type: DataTypes.INTEGER,
        allowNull : false,
    },
    idMedico : {
        type: DataTypes.INTEGER,
        allowNull : false,
    },
    fechaReceta : {
        type : DataTypes.DATEONLY,
        allowNull : false,
    },
    diagnostico : {
        type: DataTypes.STRING,
        allowNull : false
    }

},{
    timestamps: false
});


module.exports = receta 