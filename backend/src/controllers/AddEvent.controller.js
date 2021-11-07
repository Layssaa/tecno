const readTheFile = require("../services/readFile.service");
const { AddEventService_USER } = require("../services/AddEvent.service");
const { MakeQrCode } = require("../middleware/MakeQrCode.middleware");

const AddEventUSER = async (req, res) => {
    const idEvent = req.body;
    const { cookies } = req;

    console.log("ID DO EVENTO RECEBIDO NA REQUISITION");
    console.log(idEvent);

    console.log("COOKIES DA REQUISITION");
    console.log(cookies);

    const validation = await validationCookies(cookies);

    const sessionList = await readTheFile("./src/database/Session.json");

    console.log("-------SESSION LIST-----------")
    console.log(sessionList)

    const userList = await readTheFile("./src/database/User.json");

    console.log("-------USER LIST-----------")
    console.log(userList)

    const session = await sessionList.find(element => element.token == cookies.user);

    console.log("-------SESSION-----------")
    console.log(session)

    const selectUser = await userList.find(element => element.id === session.user_id);

    console.log("-------USER-----------")
    console.log(selectUser)

    if ( selectUser.qrcodes.length === 0 || selectUser.qrcodes.find(element => element.id === idEvent.id) === undefined) {
        try {
            const { data, userVerify } = await AddEventService_USER(idEvent, cookies.user);
            
            console.log(data.hash, data.event.id);
            console.log(userVerify);
    
            const qrcodeImg = await MakeQrCode(data.hash, data.event.id);
            const qrCodeURL = {
                url: qrcodeImg
            }
            
            console.log("Enviado storage");
            console.log(qrCodeURL);
            
            res.send(qrcodeImg);
    
        }
        catch (error) {
            console.log(error);
            return res.status(403).json({ "msg": "Usuário não encontrado" })
        }    
    }else {
        res.status(403).send("Evento já existe")
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