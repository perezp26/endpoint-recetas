const sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
const db = require('../db/configMysql');

const generarJWT = require('../helpers/generaJWT');
const generarId = require('../helpers/generarId');

const { medico } = require("../models/indexDb");

const loginUsuario = async( req, res) => {

    try {
            const { rfc, cedulaProfesional  } = req.body;
        
            const user = await medico.findOne({
                where: {
                    rfc  , cedulaProfesional, activo : '1'
                },
            })

            if (!user){
                return res.status(400).json({
                     ok : false,
                     msg: 'Credenciales invalidas!!'
                 }) 
             }
     
            const token = await generarJWT(user.idMedico, user.rfc, user.nombreMedico, user.cedulaProfesional )

            res.status(200).json({
                ok: true,  
                medico : user,
                token
            })

    } catch (error) {
            res.status(500).json({
                ok: false,
                msg: 'Hable con el administrador'
        }) 
    }

}

const revalidarToken = async( req, res) => {

    const  {idMedico, rfc, nombreMedico, cedulaProfesional } = req
    try {
        const token = await generarJWT( idMedico, rfc, nombreMedico, cedulaProfesional )

            const user = await medico.findByPk( idMedico );

            res.status(200).json(
                {
                    ok : true,
                    medico : user,
                    token
                }
            )
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}



module.exports = {
    loginUsuario,
    revalidarToken
}