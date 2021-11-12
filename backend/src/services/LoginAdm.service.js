const fs = require('fs');
const { AuthenticUserBcrypt, EncryptUserDataBcrypt } = require("../middleware/EncryptUser.middleware");
const readTheFile = require("./readFile.service");

const LoginAdmService = async (user, cookie, validation) => {
    const token = new Date().getTime();
    let session = {};
    let data;

    try {
        const response = await readTheFile("./src/database/Adm.json");

        userVerify = await response.find(element => element.email === user.email);

        if (userVerify == undefined) {
            throw new Error("User not found!");
        }

        const authenticUser = await AuthenticUserBcrypt(user.password, user.email, userVerify.hash);

        if (!authenticUser) {
            throw new Error("Invalid password")
        }

        let eventsList = await readTheFile("./src/database/Events.json");
        eventsList = await eventsList.filter(element => element.hash == userVerify.hash);

        data = {
            hash: userVerify.hash,
            events: eventsList
        }

        //  ---------------- SESSION -----------------
        const sessionHash = await EncryptUserDataBcrypt(token, user.email);
        const experies_In = token + 600000;

        const sessionsList = await readTheFile("./src/database/Session.json");

        session = {
            token: sessionHash.hash,
            hash: userVerify.hash,
            user_id: userVerify.id,
            creat_At: token,
            experies_In: experies_In
        }

        // ---------------- New Lists ----------------
        let newListSession = sessionsList.concat(session);

        fs.writeFile("./src/database/Session.json", `${JSON.stringify(newListSession)}`, () => {
            console.log("Sessão cadastrada!");
        });

    } catch (err) {
        console.log('DEU ERRO ====== Login Adm Service');
        console.log(err);
        return err
    }

    return { session, data }
}

module.exports = { LoginAdmService };