const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const cookieparser = require("cookie-parser");
const bcrypt = require('bcrypt');
const qr = require("qrcode-generator");

const routes_admin  = require('./src/routes/admin.routes');
const routes_user = require("./src/routes/user.routes")

const PORT = 4000;

// -----------------------------------------------------------------------------------------------------//
app.use(cookieparser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    "origin": "http://localhost:3000",
    "methods": "GET,POST",
    "credentials": true
}));

app.use(morgan("dev"));

app.use(express.static(path.join(__dirname, '/public')));
app.use("/admin", routes_admin);
app.use("/user", routes_user);

app.use(require('./src/routes/routes'));

// -----------------------------------------------------------------------------------------------------//
module.exports = app;
