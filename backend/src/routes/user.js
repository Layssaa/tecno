const { LoginUser } = require('../controllers/LoginUser');
const { signupUSER } = require('../controllers/SignupUser');
const { AddEventUSER } = require('../controllers/AddEvent');

// --------------------- USER ROUTES  ---------------------------
const routerUser = require('express').Router();

routerUser.get("/", (req, res) => {
    res.send("teste user");
});

routerUser.post("/login", LoginUser);

routerUser.post("/signup", signupUSER);

routerUser.post("/addEvent", AddEventUSER);



module.exports = routerUser;