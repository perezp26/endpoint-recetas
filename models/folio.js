const {DataTypes} = require('sequelize');
const db = require('../db/configMysql');

const folio = db.define('folios',{
    idFolio: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement : true
    },
    idTipoReceta : {
        type : DataTypes.INTEGER,
        allowNull : false,
    },
    folio : {
        type : DataTypes.INTEGER, 
        allowNull : false,
    },
},{
    timestamps: false,
    tableName: 'folios'
});

module.exports =  folio; 