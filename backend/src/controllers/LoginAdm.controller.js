const { CreateToken } = require("../middleware/MakeJWT");
const { LoginAdmService } = require("../services/LoginAdm.service");
const readTheFile = require("../services/readFile.service");

const LoginAdm = async (req, res) => {

    const user = req.body;
    const { cookies } = req;

    const validation = await validationCookies(cookies);

    try {
        const { data, session } = await LoginAdmService(user, cookies.user, validation);
        const { token } = await CreateToken(session.token);

        console.log("============TOKEN SEND==============");
        console.log(token);

        !cookies.token ? res.cookie("token", token, {
            secure: true,
            httpOnly: true,
            sameSite: 'none'
        }) : null;

        res.send(data);
    }
    catch (error) {
        return res.status(403).json({ "msg": "Usuário não encontrado" })
    }
};

const validationCookies = async (cookies) => {
    if (cookies.user) {
        let session = await readTheFile("./src/database/Session.json");
        session = await session.filter(element => element.token == cookies.user);

        let expires = Number(session[0].creat_At) + new Date().getTime();

        expires > Number(session[0].experies_In) ? false : true
    }

    return cookies
}

module.exports = { LoginAdm };