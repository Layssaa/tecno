const { LoginAdm } = require('../controllers/LoginAdm');
const { RegisterEvent } = require('../controllers/RegisterEvent');
const { signupADM } = require('../controllers/SignupAdm');

// --------------------- ADMIN ROUTES  ---------------------------
const routerAdmin = require('express').Router();

routerAdmin.get("/", (req, res) => {
    res.send("teste admin")
})

routerAdmin.post("/login", LoginAdm);

routerAdmin.post("/signup", signupADM);

routerAdmin.post("/register-event", RegisterEvent);



module.exports = routerAdmin;