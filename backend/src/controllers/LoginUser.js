const { LoginUserService } = require("../services/LoginUser");
const readTheFile = require("../services/readfile");

const LoginUser = async (req, res) => {
    const user = req.body;
    const { cookies } = req;

    const validation = await validationCookies(cookies);

    try {
        const { data, session } = await LoginUserService(user, cookies.user, validation);

        !cookies.user ? res.cookie("user", session.token, {
            secure: true,
            httpOnly: true,
            sameSite: 'none'
        }) : null;

        res.send(data);
    }
    catch (error) {
        console.log(error);
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

module.exports = { LoginUser };