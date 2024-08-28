const {DataTypes} = require('sequelize');
const db = require('../db/configMysql');

const tipoDispensacion = db.define('tiposDispensacion',{
    idTipoDispensacion: {
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
    tableName: 'tiposDispensacion'
});

module.exports =  tipoDispensacion; 