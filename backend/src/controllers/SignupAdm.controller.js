const { signupADMService } = require("../services/SignupAdm.service");

const signupADM = async (req, res) => {

    try {
        const { session } = await signupADMService(req.body)

        res.cookie("user", session.token, {  secure: true, sameSite: 'none' });
        res.send("User validate");
    } catch (error) {
        console.log(error);
    }
}

module.exports = { signupADM };