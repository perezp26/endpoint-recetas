const { Router } = require("express");
const { validarJWT } = require("../middlewares/validar-jwt");
const { consultaPaciente } = require("../controllers/pacientes");

const router = Router();

router.use( validarJWT );

router.get('/getdatapaciente/:curp', consultaPaciente);

module.exports = router