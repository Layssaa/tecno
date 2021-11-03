const readTheFile = require("../services/readfile");
const { RegisterEventService } = require("../services/RegisterEvent")

const RegisterEvent = async (req, res) => {
    const event = req.body;
    const { cookies } = req;

    console.log("EVENT RECEBIDO NA REQUISITION");
    console.log(event);

    const validation = await validationCookies(cookies);
    console.log("teste de cookies ");
    console.log(validation);

    try {
        console.log('========requisition========');
        const { data } = await RegisterEventService(event, cookies.user);

        console.log("Enviado storage");
        console.log(data);

        res.send(data);
    }
    catch (error) {
        console.log(error);
        return res.status(403).json({ "msg": "Usuário não encontrado" })
    }
};

const validationCookies = async (cookies) => {
    console.log(cookies);
    if (cookies.user) {
        let session = await readTheFile("./src/database/Session.json");
        session = await session.filter(element => element.token == cookies.user);

        let expires = Number(session[0].creat_At) + new Date().getTime();

        expires > Number(session[0].experies_In) ? false : true
    }

    return cookies
}

module.exports = { RegisterEvent };