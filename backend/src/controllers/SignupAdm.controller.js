const { signupADMService } = require("../services/SignupAdm.service");

const signupADM = async (req, res) => {
    console.log("REQ BODY IN SIGNUP ADMIN");
    console.log(req.body);

    try {
        const { session } = await signupADMService(req.body)

        console.log("============ SEND COOKIE ==========");
        console.log(session.token);

        res.cookie("user", session.token, {  secure: true, sameSite: 'none' });
        res.send("User validate");
    } catch (error) {
        console.log(error);
    }
}

module.exports = { signupADM };