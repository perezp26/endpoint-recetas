
const fetch = require('node-fetch');
const FormData  = require('form-data');
const paciente  = require('../models/paciente');

const consultaPaciente = async(req, res ) => {

    const { curp } = req.params;

    const dataPaciente = await paciente.findOne( { where:{ curp }  } )   
     if (!!dataPaciente ){
        res.status(200).json({
            ok: true,
            dataPaciente : { ...dataPaciente.dataValues,
            isSaihweb : false,
            vigenciaValida : 't',
            }
        })
     }
     else {

        // var request = new XMLHttpRequest();  
        // request.open('GET', 'http://192.168.162.48/apisPHP/getPaciente.php', true);  
        // request.send();  
         
        // if (request.status === "404") {  
        //     alert("No existe pagina");
        // }else{

            const form = new FormData();
            form.append('curp', curp);

            fetch(`http://192.168.151.51/apisPHP/getPaciente.php`, {
                method: 'POST',
                body: form,
            })
                .then(response => response.json())
                .then(data => {
                                    res.status(200).json({
                                        ok: true,
                                        dataPaciente : {
                                                        idPaciente : 0,
                                                        curp : data.curp,
                                                        nombrePaciente : `${ data.nombre } ${data.apellido1} ${data.apellido2}`,
                                                        fechaNacimiento : data.fechanacimiento.substring(6) + '-' + data.fechanacimiento.substring(3,5) + '-' + data.fechanacimiento.substring(0,2),
                                                        expediente : '', 
                                                        idSaihweb : data.idpaciente,
                                                        isSaihweb : true,
                                                        vigenciaValida : data.vigenciavalida
                                        } 
                                    })
                            })
                .catch(error => { console.error('Error:', error)
                    res.status(500).json({
                        ok: false,
                        msg: 'llamar al administrador error al obtener los datos del saihweb',
                        error
                    });
                });
        }
   //}

   
}

module.exports = { consultaPaciente }