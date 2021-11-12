const fs = require('fs');
const { EncryptUserDataBcrypt } = require("../middleware/EncryptUser.middleware");
const readTheFile = require("./readFile.service");


const signupADMService = async (user) => {
    const token = new Date().getTime();
    let session = {};

    try {
        const response = await readTheFile("./src/database/Adm.json");

        userVerify = await response.find(element => element.email == user.email);

        if (userVerify !== undefined) {
            throw new Error("User Already Exist.");
        }

        const { hash } = await EncryptUserDataBcrypt(user.password, user.email);
        const ID = response.length + 1

        //  ---------------- USER --------------------
        userToSend = {
            id: ID,
            hash: hash,
            type:"admin",
            ...user
        }

        //  ---------------- SESSION -----------------
        const sessionHash = await EncryptUserDataBcrypt(token, user.email);
        const experies_In = token + 600000;

        const sessionsList = await readTheFile("./src/database/Session.json")

        session = {
            token: sessionHash.hash,
            user_id: ID,
            creat_At: token,
            experies_In: experies_In
        }

        // ---------------- New Lists ----------------
        let admList = await response.concat(userToSend);
        let newListSession = sessionsList.concat(session);

        fs.writeFile("./src/database/Adm.json", `${JSON.stringify(admList)}`, () => {
            console.log("Cadastrado!");
        });

        fs.writeFile("./src/database/Session.json", `${JSON.stringify(newListSession)}`, () => {
            console.log("Sessão cadastrada!");
        });



    } catch (err) {
        console.log('DEU ERRO ===== Signup Adm');
        console.log(err);
        return err
    }

    return { session }
}

module.exports = { signupADMService };