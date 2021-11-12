const fs = require('fs');
const { AuthenticUserBcrypt, EncryptUserDataBcrypt } = require("../middleware/EncryptUser.middleware");
const readTheFile = require("./readFile.service");

const AddEventService_USER = async (idEvent, hash) => {
    let data;
    let userVerify = {};
    let userList;

    console.log("AQUI");
    console.log(idEvent);
    console.log(hash);

    try {
        userList = await readTheFile("./src/database/User.json");
        let sessionList = await readTheFile("./src/database/Session.json");

        sessionList = await sessionList.find(element => element.token == hash);

        userVerify = await userList.find(element => element.id == sessionList.user_id);

        if (userVerify == undefined) {
            throw new Error("User not found!");
        }

        const eventsList = await readTheFile("./src/database/Events.json");

        const event = eventsList.find(element => element.id === idEvent.id);

        userVerify = await userList.find(element => element.id == sessionList.user_id);

        userVerify.qrcodes.push(event)

        data = {
            hash: userVerify.hash,
            event: event,
            delete: false
        };

        let userEventsList = await readTheFile("./src/database/UserEvents.json");
        userEventsList = await userEventsList.concat(data);

        fs.writeFile("./src/database/UserEvents.json", `${JSON.stringify(userEventsList)}`, () => {
            console.log("==========Inscrito no evento!=========");
            console.log(eventsList);
        });

        fs.writeFile("./src/database/User.json", `${JSON.stringify(userList)}`, () => {
            console.log("==========Inscrito no evento!(User.json)=========");
            console.log(userList);
        })

    } catch (err) {
        console.log('DEU ERRO ==== Add Event Service');
        console.log(err);
        return err
    }

    return { data, userVerify }
}

module.exports = { AddEventService_USER };