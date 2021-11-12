const { LoginAdm } = require('../controllers/LoginAdm.controller');
const { RegisterEvent } = require('../controllers/RegisterEvent.controller');
const { signupADM } = require('../controllers/SignupAdm.controller');
const { ValidateTicket } = require('../controllers/ValidateTicket.controller');
const { AuthenticJWT } = require('../middleware/AuthenticJWT');

// --------------------- ADMIN ROUTES  ---------------------------
const routerAdmin = require('express').Router();

routerAdmin.post("/login", LoginAdm);

routerAdmin.post("/signup", signupADM);

routerAdmin.post("/register-event", AuthenticJWT, RegisterEvent);

routerAdmin.get("/validate?", ValidateTicket);


module.exports = routerAdmin;