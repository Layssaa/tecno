const { LoginUser } = require('../controllers/LoginUser.controller');
const { signupUSER } = require('../controllers/SignupUser.controller');
const { AddEventUSER } = require('../controllers/AddEvent.controller');
const { AuthenticJWT } = require('../middleware/AuthenticJWT');

// --------------------- USER ROUTES  ---------------------------
const routerUser = require('express').Router();

routerUser.post("/login", LoginUser);

routerUser.post("/signup", signupUSER);

routerUser.post("/addEvent", AuthenticJWT, AddEventUSER);


module.exports = routerUser;