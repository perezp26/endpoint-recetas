const  { Sequelize  } = require('sequelize');

const dbMysql = new Sequelize( process.env.DATABASE_Mysql, process.env.USUARIO_Mysql, process.env.PASS_Mysql ,{
    host: process.env.HOST_Mysql,
    dialect : process.env.TYPEDATABASE_Mysql,
    port: process.env.PORT_DB_Mysql,
    dialectOptions: {
        decimalNumbers: true
      }
} );


module.exports = dbMysql