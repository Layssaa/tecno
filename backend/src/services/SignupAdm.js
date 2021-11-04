const fs = require('fs');
const { EncryptUserDataBcrypt } = require("../middleware/EncryptUser");
const readTheFile = require("./readFile");


const signupADMService = async (user) => {
    const token = new Date().getTime();
    let session = {};

    try {
        const response = await readTheFile("./src/database/Adm.json");

        console.log("=======RESPONSE=======");
        console.log(response);

        userVerify = await response.find(element => element.email == user.email);
        console.log('--------------VERIFY-----------------');
        console.log(userVerify);

        if (userVerify !== undefined) {
            throw new Error("User Already Exist.");
        }

        const { hash } = await EncryptUserDataBcrypt(user.password, user.email);
        const ID = response.length + 1

        //  ---------------- USER --------------------
        userToSend = {
            id: ID,
            hash: hash,
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

        console.log('--------------USER TO SEND-----------------');
        console.log(userToSend);

        // ---------------- New Lists ----------------
        let admList = await response.concat(userToSend);
        let newListSession = sessionsList.concat(session);

        console.log('--------------NEW LIST-----------------');
        console.log(admList);

        fs.writeFile("./src/database/Adm.json", `${JSON.stringify(admList)}`, () => {
            console.log("Cadastrado!");
        });

        fs.writeFile("./src/database/Session.json", `${JSON.stringify(newListSession)}`, () => {
            console.log("Sessão cadastrada!");
        });



    } catch (err) {
        console.log('DEU ERRO');
        console.log(err);
        return err
    }

    return { session }
}

module.exports = { signupADMService };