const {DataTypes} = require('sequelize');
const db = require('../db/configMysql');

const producto = db.define('productos',{
    idProducto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement : true
    },
    descripcion : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    tipoMedicamento : {
        type: DataTypes.CHAR,
        allowNull : false
    },
    activo : {
        type : DataTypes.CHAR, 
        allowNull : false,
    },
},{
    timestamps: false,
    tableName: 'productos'
});

module.exports =  producto; 