require("dotenv").config();
const jwt = require('jsonwebtoken');

const CreateToken = async (_token) => {

    console.log("============CREATE TOKEN ==========");

    const token = await jwt.sign({ _token }, process.env.SECRET, {
        expiresIn: 300
    });

    console.log("=========TOKEN TO RETURN========");
    return { token }
}

module.exports = { CreateToken };