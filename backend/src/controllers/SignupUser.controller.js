const { signupUSERservice } = require("../services/SignupUser.service");

const signupUSER = async (req, res) => {

    try {
        const { session } = await signupUSERservice(req.body)

        res.cookie("user", session.token, {  secure: true, sameSite: 'none' });
        res.send("User register");
    } catch (error) {
        console.log(error);
    }
}

module.exports = { signupUSER };