const { Router } = require("express");
const { validarJWT } = require("../middlewares/validar-jwt");
const { getCatalogosContrato  } = require("../controllers/ui");

const router = Router();
//router.use( validarJWT );

router.get('/catalogoscontrato', getCatalogosContrato );

module.exports = router