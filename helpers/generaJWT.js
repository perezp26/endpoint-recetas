const jwt = require('jsonwebtoken');

const generarJWT = ( idMedico = '', rfc = '', nombreMedico = '', cedulaProfesional='' ) =>{

    return new Promise( (resolve, reject) => {

        const payload = { idMedico, rfc, nombreMedico, cedulaProfesional  };
        jwt.sign( payload, process.env.SECRET_JWT_SEED,{
            expiresIn: '24h'
        }, (err, token) =>{
            
            if (err) {
                console.log(err);
                reject('No se pudo generar el token')
            } else {
                resolve(token);
            }
            
        });

    }) 

}

module.exports = generarJWT