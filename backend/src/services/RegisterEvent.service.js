// ADICIONADO CONDIÇÃO PARA EVITAR QUE DOIS EVENTOS TENHAM O MESMO NOME
const fs = require('fs');
const { element } = require('prop-types');
const { AuthenticUserBcrypt, EncryptUserDataBcrypt } = require("../middleware/EncryptUser.middleware");
const readTheFile = require("./readFile.service");

const RegisterEventService = async (event, hash) => {
    let data;
    let userVerify = {};

    try {
        const adminlist = await readTheFile("./src/database/Adm.json");
        let sessionList = await readTheFile("./src/database/Session.json");
        let eventsList = await readTheFile("./src/database/Events.json");

        sessionList = await sessionList.find(element => element.token == hash);

        console.log("======= SESSION ABERTA ENCONTRADA ======");
        console.log(sessionList);

        userVerify = await adminlist.find(element => element.hash == sessionList.hash);
        console.log('============= USUÁRIO ENCONTRADO A PARTIR DA SESSION');
        console.log(userVerify);

        if (userVerify == undefined) {
            throw new Error("User not found!");
        }

        if (eventsList.find(element => element.title === event.title)) {
            throw new Error("Event already exist. Please choose a different name.")
        }

        const ID = eventsList.length + 1;

        const info = {
            id: ID,
            hash: userVerify.hash,
            ...event
        };

        eventsList = eventsList.concat(info);

        data = {
            events: eventsList
        }

        fs.writeFile("./src/database/Events.json", `${JSON.stringify(eventsList)}`, () => {
            console.log("Evento cadastrado!");
        });

    } catch (err) {
        console.log('DEU ERRO ===== Register Event');
        console.log(err);
        return err
    }

    return { data }
}

module.exports = { RegisterEventService };