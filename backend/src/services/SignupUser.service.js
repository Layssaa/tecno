const fs = require('fs');
const { EncryptUserDataBcrypt } = require("../middleware/EncryptUser.middleware");
const readTheFile = require("./readFile.service");


const signupUSERservice = async (user) => {
    const token = new Date().getTime();
    let session = {};
        let userToSend= {}

    try {
        const response = await readTheFile("./src/database/User.json");

        console.log("=======RESPONSE=======");
        console.log(response);

        userVerify = await response.find(element => element.email == user.email || element.username == user.username);
        console.log('--------------VERIFY-----------------');
        console.log(userVerify);

        if (userVerify !== undefined) {
            throw new Error("User Already Exist.");
        }

        const { hash } = await EncryptUserDataBcrypt(user.password, user.email);
        const ID = response.length + 1;

        //  ---------------- USER --------------------
        userToSend = {
            id: ID,
            hash: hash,
            fullname: user.fullname,
            username: user.username,
            email: user.email,
            events: []
        }

        //  ---------------- SESSION -----------------
        const sessionHash = await EncryptUserDataBcrypt(token, user.email);
        const experies_In = token + 600000;

        const sessionsList = await readTheFile("./src/database/Session.json");

        session = {
            token: sessionHash.hash,
            user_id: ID,
            creat_At: token,
            experies_In: experies_In
        }

        console.log('--------------USER TO SEND-----------------');
        console.log(userToSend);

        // ---------------- New Lists ----------------
        let userList = await response.concat(userToSend);
        let newListSession = sessionsList.concat(session);

        console.log('--------------NEW LIST-----------------');
        console.log(userList);

        fs.writeFile("./src/database/User.json", `${JSON.stringify(userList)}`, () => {
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

module.exports = { signupUSERservice };