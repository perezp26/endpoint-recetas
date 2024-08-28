const { Router } = require("express");
const { validarJWT } = require("../middlewares/validar-jwt");
const { loginUsuario, revalidarToken } = require("../controllers/auth");


const router = Router();


router.post('/', loginUsuario );

router.post('/renew',[ validarJWT ], revalidarToken );



module.exports = router