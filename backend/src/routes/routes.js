const router = require('express').Router();

const { doLogout } = require('../controllers/Logout.controller');
const { doVerify } = require('../controllers/Verify.controller');

router.get("/logout", doLogout)
router.get("/verify", doVerify)


module.exports = router;