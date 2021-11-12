const { doLogoutService } = require("../services/LogoutService.service");

const doLogout = async (req, res) => {

    const { cookies } = req;

    try {
        await doLogoutService(cookies);
        res.clearCookie("user", {
            domain: "127.0.0.1",
            path: "/",
            secure: true,
            httpOnly: true,
            sameSite: 'none'
        }).send()
        console.log('enviado');

    }
    catch (error) {
        console.log(error);
        return res.status(403).json({ "msg": "Error in logout" })
    }
};



module.exports = { doLogout };