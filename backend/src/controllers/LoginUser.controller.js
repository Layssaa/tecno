const { LoginUserService } = require("../services/LoginUser.service");
const readTheFile = require("../services/readFile.service");

const LoginUser = async (req, res) => {
    const user = req.body;
    const { cookies } = req;

    console.log("USER RECEBIDO NA REQUISITION");
    console.log(user);

    const validation = await validationCookies(cookies);

    try {
        const { data, session } = await LoginUserService(user, cookies.user, validation);
        console.log("Enviado ao cookie");
        console.log(session);

        console.log("Enviado storage");
        console.log(data);

        !cookies.user ? console.log("Cookie vai ser mandado") : console.log("Cookie já existe, Não faça nada");

        !cookies.user ? res.cookie("user", session.token, {
            maxAge: 600000,
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