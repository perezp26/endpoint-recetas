const {DataTypes} = require('sequelize');
const db = require('../db/configMysql');

const paciente = db.define('pacientes',{
    idPaciente: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement : true
    },
    curp : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    nombrePaciente : {
        type : DataTypes.STRING, 
        allowNull : false,
    },
    fechaNacimiento : {
        type: DataTypes.DATEONLY,
        allowNull : false,
    },
    expediente : {
        type: DataTypes.STRING,
    },
    idSaihweb : {
        type : DataTypes.INTEGER,
        allowNull : false,
    }

},{
    timestamps: false
});


module.exports = paciente 