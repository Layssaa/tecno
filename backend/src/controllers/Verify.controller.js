const { doVerifyService } = require("../services/VeridyService.service");

const doVerify = async (req, res) => {

    const { cookies } = req;

    try {
        const response = await doVerifyService(cookies);
        res.send(response);
    }
    catch (error) {
        console.log(error);
        return res.status(403).json({ "msg": "Error in logout" })
    }
};



module.exports = { doVerify };