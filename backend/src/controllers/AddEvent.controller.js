const readTheFile = require("../services/readFile.services");
const { AddEventService_USER } = require("../services/AddEvent.services");
const { MakeQrCode } = require("../middleware/MakeQrCode.middleware");

const AddEventUSER = async (req, res) => {
    const idEvent = req.body;
    const { cookies } = req;

    console.log("ID DO EVENTO RECEBIDO NA REQUISITION");
    console.log(idEvent);

    const validation = await validationCookies(cookies);

    try {
        const { data } = await AddEventService_USER(idEvent, cookies.user);
        console.log(data.hash, data.event.id);

        const qrcodeImg = await MakeQrCode(data.hash, data.event.id);
        console.log("Enviado storage");
        console.log(qrcodeImg);

        res.send(qrcodeImg);
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

module.exports = { AddEventUSER };