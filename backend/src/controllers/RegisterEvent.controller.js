// ADICIONADO VALIDAÇÃO DO EVENTO POR QUESTÕES DE UX, 
// DATAS SEPARAS POR BARRA 
// HORAS 00h00m

const { ValidateEvent } = require("../middleware/ValidateEvent.middleware");
const readTheFile = require("../services/readFile.service");
const { RegisterEventService } = require("../services/RegisterEvent.service")

const RegisterEvent = async (req, res) => {
    const event = req.body;
    const { cookies } = req;
    console.log("========== REQ TOKEN SESSION ==========");
    console.log(req.token_session);

    const eventValid = await ValidateEvent(event);

    const validation = await validationCookies(cookies);

    try {
        const { data } = await RegisterEventService(eventValid, req.token_session);

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