const { LoginUser } = require('../controllers/LoginUser.controller');
const { signupUSER } = require('../controllers/SignupUser.controller');
const { AddEventUSER } = require('../controllers/AddEvent.controller');

// --------------------- USER ROUTES  ---------------------------
const routerUser = require('express').Router();

routerUser.get("/", (req, res) => {
    res.send("teste user");
});

routerUser.post("/login", LoginUser);

routerUser.post("/signup", signupUSER);

routerUser.post("/addEvent", AddEventUSER);



module.exports = routerUser;