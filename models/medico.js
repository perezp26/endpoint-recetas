const {DataTypes} = require('sequelize');
const db = require('../db/configMysql');

const medico = db.define('medicos',{
    idMedico: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement : true
    },
    rfc : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    nombreMedico : {
        type : DataTypes.STRING, 
        allowNull : false,
    },
    cedulaProfesional : {
        type: DataTypes.STRING,
        allowNull : false,
    },
    universidad : {
        type: DataTypes.STRING,
    },
    activo : {
        type : DataTypes.CHAR,
        allowNull : false,
    }

},{
    timestamps: false
});


module.exports = { medico }