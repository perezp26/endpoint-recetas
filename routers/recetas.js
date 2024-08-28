const { Router } = require("express");
const { validarJWT } = require("../middlewares/validar-jwt");
const { addNewReceta, getRecetasPacientes, getRecetaPaciente } = require("../controllers/recetas");

const router = Router();

router.use( validarJWT );
router.get('/getreceta/:idReceta', getRecetaPaciente);
router.get('/getrecetaspaciente/:idPaciente', getRecetasPacientes);
router.post('/addnewreceta', addNewReceta);

module.exports = router