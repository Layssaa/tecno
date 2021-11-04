const { LoginAdm } = require('../controllers/LoginAdm');
const { RegisterEvent } = require('../controllers/RegisterEvent');
const { signupADM } = require('../controllers/SignupAdm');
const { ValidateTicket } = require('../controllers/ValidateTicket');

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