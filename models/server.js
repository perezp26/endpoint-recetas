const express = require('express');
const cors = require('cors');
const path = require('path');
const dbMysql = require('../db/configMysql')

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth : '/api/auth',
            receta : '/api/receta',
            paciente: '/api/paciente',
            ui : '/api/ui',
        }
        this.dbConnectionMysql();

        this.middlewares();

        this.rotures();
    };

    middlewares(){
        this.app.use( cors() );
        this.app.use( express.static('public') );
        this.app.use(express.json({limit: '1mb'}));
    }

    rotures(){
        this.app.use(this.paths.auth, require('../routers/auth'));
        this.app.use(this.paths.receta, require('../routers/recetas'));
        this.app.use(this.paths.paciente, require('../routers/pacientes'));
        this.app.use(this.paths.ui, require('../routers/ui'));

        this.app.get("/*", function(req, res) {
            res.sendFile( path.join(__dirname, '../',"public", "index.html"));
        });
    }

    async dbConnectionSqlSrv(){
        try {
            await dbSqlSrv.authenticate();
        } catch (error) {
            console.log(error);
            throw new Error();
        }
    }

    async dbConnectionMysql(){
       try {
            await dbMysql.authenticate();
        } catch (error) {
            console.log(error);
            throw new Error();
        }
    }


    listen(){
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en el puerto ', this.port);
        })
    }
}

module.exports = Server; 