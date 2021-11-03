const fs = require('fs');
const { AuthenticUserBcrypt, EncryptUserDataBcrypt } = require("../middleware/EncryptUser");
const readTheFile = require("./readFile");

const AddEventService_USER = async (idEvent, hash) => {
    let data;
    let userVerify = {};
    console.log("============   HASH  ==============");
    console.log(hash);
    console.log("================================");
    try {
        const userList = await readTheFile("./src/database/User.json");
        let sessionList = await readTheFile("./src/database/Session.json");

        sessionList = await sessionList.find(element => element.token == hash);

        console.log("======= SESSION ABERTA ENCONTRADA ======");
        console.log(sessionList);

        userVerify = await userList.find(element => element.hash == sessionList.hash);
        console.log('============= USUÁRIO ENCONTRADO A PARTIR DA SESSION');
        console.log(userVerify);

        if (userVerify == undefined) {
            throw new Error("User not found!");
        }

        const eventsList = await readTheFile("./src/database/Events.json");
        console.log("============ ID EVENT =============");
        console.log(idEvent);

        const event = eventsList.find(element => element.id === idEvent.id);


        data = {
            hash: userVerify.hash,
            event: event,
            delete: false
        };

        console.log("===========DATA EVENT============");
        console.log(data);

        let userEventsList = await readTheFile("./src/database/UserEvents.json");
        userEventsList = userEventsList.concat(data);

        fs.writeFile("./src/database/UserEvents.json", `${JSON.stringify(eventsList)}`, () => {
            console.log("Inscrito no evento!");
        });

    } catch (err) {
        console.log('DEU ERRO');
        console.log(err);
        return err
    }

    return { data }
}

module.exports = { AddEventService_USER };