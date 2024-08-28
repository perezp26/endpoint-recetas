const {DataTypes} = require('sequelize');
const db = require('../db/configMysql');

const tipoReceta = db.define('tiposReceta',{
    idTipoReceta: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement : true
    },
    descripcion : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    activo : {
        type : DataTypes.CHAR, 
        allowNull : false,
    },
},{
    timestamps: false,
    tableName: 'tiposReceta'
});

module.exports =  tipoReceta; 