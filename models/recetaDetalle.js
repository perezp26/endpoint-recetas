const {DataTypes} = require('sequelize');
const db = require('../db/configMysql');

const recetaDetalle = db.define('recetaDetalles',{
    idRecetaDetalle: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement : true
    },
    idReceta : {
        type : DataTypes.INTEGER,
        allowNull : false,
    },
    noEnvases : {
        type : DataTypes.INTEGER, 
        allowNull : false,
    },
    idTipoDispensacion : {
        type : DataTypes.INTEGER,
        allowNull :false,
    },
    idProducto : {
        type: DataTypes.INTEGER,
        allowNull : false,
    },
    dosis : {
        type: DataTypes.STRING,
        allowNull : false,
    },
    viaAdmin : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    duracion : {
        type: DataTypes.STRING,
        allowNull : false
    }

},{
    timestamps: false,
    tableName : 'recetaDetalles'
});


module.exports = recetaDetalle 