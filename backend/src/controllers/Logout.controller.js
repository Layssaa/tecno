const { doLogoutService } = require("../services/LogoutService.service");

const doLogout = async (req, res) => {

    const { cookies } = req;
    console.log("DELETE COOKIE");

    try {
        await doLogoutService(cookies);
        res.clearCookie("user");
    }
    catch (error) {
        console.log(error);
        return res.status(403).json({ "msg": "Error in logout" })
    }
};



module.exports = { doLogout };