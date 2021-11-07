
const doVerifyService = async (cookies) => {

    try {
        if(!cookies.user){
            throw new Error("Offline")
        }
        return true
    }
    catch (error) {
        console.log(error);
        return res.status(403).json({ "msg": "Cookie verification error" })
    }
};



module.exports = { doVerifyService };