const readTheFile = require("../services/readFile.service");
const { AddEventService_USER } = require("../services/AddEvent.service");
const { MakeQrCode } = require("../middleware/MakeQrCode.middleware");

const AddEventUSER = async (req, res) => {
    const idEvent = req.body.id;
    const { token_session } = req;
    console.log("========== REQ TOKEN SESSION USER==========");
    console.log(token_session);

    // const validation = await validationCookies(req.token_session);

    const sessionList = await readTheFile("./src/database/Session.json");

    const userList = await readTheFile("./src/database/User.json");

    const session = await sessionList.find(element => element.token == token_session);

    const selectUser = await userList.find(element => element.id === session.user_id);
    console.log('user found');
    console.log(selectUser);

    if ( selectUser.qrcodes.length === 0 || selectUser.qrcodes.find(element => element === null) || selectUser.qrcodes.find(element => element.id === idEvent.id) === undefined) {
        try {
            console.log("ADD FUN");
            const { data, userVerify } = await AddEventService_USER(idEvent, token_session);
            
            const qrcodeImg = await MakeQrCode(data.hash, data.event.id);
            const qrCodeURL = {
                url: qrcodeImg
            }
            console.log("EVENTO ADICIONADO");
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

const validationCookies = async (token_sessions) => {
    if (token_sessions) {
        let session = await readTheFile("./src/database/Session.json");
        session = await session.filter(element => element.token == token_session);

        let expires = Number(session[0].creat_At) + new Date().getTime();

        expires > Number(session[0].experies_In) ? false : true
    }

    return cookies
}

module.exports = { AddEventUSER };