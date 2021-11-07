const router = require('express').Router();

const { doLogout } = require('../controllers/Logout');
const { doVerify } = require('../controllers/Verify');

// rotas de uso comum aos dois tipos de usuário
// adicionada funções de logout
//             &
// verificação de cookie p utilizar no front
router.get("/logout", doLogout)
router.get("/verify", doVerify)


module.exports = router;