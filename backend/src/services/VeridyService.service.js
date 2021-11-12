
const doVerifyService = async (cookies) => {

    try {
        if(!cookies.token){
            throw new Error("Offline")
        }
        return true
    }
    catch (error) {
        console.log(error);
        // return res.status(403).json({ "msg": "Cookie verification error" })
    }
};



module.exports = { doVerifyService };