const fs = require('fs');
const { AuthenticUserBcrypt, EncryptUserDataBcrypt } = require("../middleware/EncryptUser.middleware");
const readTheFile = require("./readFile.service");

const AddEventService_USER = async (idEvent, hash) => {
    let data;
    let userVerify = {};
    let userList;
    console.log("============   HASH  ==============");
    console.log(hash);
    console.log("================================");
    try {
        userList = await readTheFile("./src/database/User.json");
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

        userList.forEach(element => {
            if (element.hash == sessionList.hash) {
                element.qrcodes.push(event.hash);
            }
        })
        userVerify = await userList.find(element => element.hash == sessionList.hash);

        data = {
            hash: userVerify.hash,
            event: event,
            delete: false
        };

        console.log("===========DATA EVENT============");
        console.log(data);

        let userEventsList = await readTheFile("./src/database/UserEvents.json");
        userEventsList = await userEventsList.concat(data);

        fs.writeFile("./src/database/UserEvents.json", `${JSON.stringify(userEventsList)}`, () => {
            console.log("==========Inscrito no evento!=========");
            console.log(eventsList);
        });

        fs.writeFile("./src/database/user.json", `${JSON.stringify(userList)}`, () => {
            console.log("==========Inscrito no evento!(User.json)=========");
            console.log(userList);
        })

    } catch (err) {
        console.log('DEU ERRO');
        console.log(err);
        return err
    }

    return { data, userVerify }
}

module.exports = { AddEventService_USER };