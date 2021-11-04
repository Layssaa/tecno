const { signupUSERservice } = require("../services/SignupUser.services");

const signupUSER = async (req, res) => {
    console.log("REQ BODY IN SIGNUP USER");
    console.log(req.body);

    try {
        const { session } = await signupUSERservice(req.body)

        console.log("============ SEND COOKIE ==========");
        console.log(session.token);

        res.cookie("user", session.token, {  secure: true, sameSite: 'none' });
        res.send("User register");
    } catch (error) {
        console.log(error);
    }
}

module.exports = { signupUSER };