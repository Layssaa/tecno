const { LoginAdm } = require('../controllers/LoginAdm.controller');
const { RegisterEvent } = require('../controllers/RegisterEvent.controller');
const { signupADM } = require('../controllers/SignupAdm.controller');
const { ValidateTicket } = require('../controllers/ValidateTicket.controller');

// --------------------- ADMIN ROUTES  ---------------------------
const routerAdmin = require('express').Router();

routerAdmin.get("/", (req, res) => {
    res.send("teste admin")
})

routerAdmin.post("/login", LoginAdm);

routerAdmin.post("/signup", signupADM);

routerAdmin.post("/register-event", RegisterEvent);

routerAdmin.get("/validate?", ValidateTicket);




module.exports = routerAdmin;