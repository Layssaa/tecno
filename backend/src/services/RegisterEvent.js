const fs = require('fs');
const { AuthenticUserBcrypt, EncryptUserDataBcrypt } = require("../middleware/EncryptUser");
const readTheFile = require("./readFile");

const RegisterEventService = async (event, hash) => {
    let data;
    let userVerify = {};
    console.log("============   HASH  ==============");
    console.log(hash);
    console.log("================================");
    try {
        const adminlist = await readTheFile("./src/database/Adm.json");
        let sessionList = await readTheFile("./src/database/Session.json");

        sessionList = await sessionList.find( element => element.token == hash);

        console.log("======= SESSION ABERTA ENCONTRADA ======");
        console.log(sessionList);

        userVerify = await adminlist.find(element => element.hash == sessionList.hash);
        console.log('============= USUÁRIO ENCONTRADO A PARTIR DA SESSION');
        console.log(userVerify);

        if (userVerify == undefined) {
            throw new Error("User not found!");
        }

        let eventsList = await readTheFile("./src/database/Events.json");
        const ID = eventsList.length;

        const info = {
            id: ID,
            hash: userVerify.hash,
            ...event
        };

        eventsList = eventsList.concat(info);

        data = {
            events: eventsList
        }

        console.log('--------------INFO TO SEND-----------------');
        console.log(data);

        fs.writeFile("./src/database/Events.json", `${JSON.stringify(eventsList)}`, () => {
            console.log("Evento cadastrado!");
        });

    } catch (err) {
        console.log('DEU ERRO');
        console.log(err);
        return err
    }

    return { data }
}

module.exports = { RegisterEventService };