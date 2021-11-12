const fs = require('fs');
const { EncryptUserDataBcrypt } = require("../middleware/EncryptUser.middleware");
const readTheFile = require("./readFile.service");


const signupUSERservice = async (user) => {
    const token = new Date().getTime();
    let session = {};
    let userToSend= {};

    try {
        const response = await readTheFile("./src/database/User.json");

        userVerify = await response.find(element => element.email == user.email || element.username == user.username);

        if (userVerify !== undefined) {
            throw new Error("User Already Exist.");
        }

        const { hash } = await EncryptUserDataBcrypt(user.password, user.email);
        const ID = response.length;

        //  ---------------- USER --------------------
        userToSend = {
            id: ID,
            hash: hash,
            fullname: user.fullname,
            username: user.username,
            email: user.email,
            type: "user",
            qrcodes: []
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

        // ---------------- New Lists ----------------
        let userList = await response.concat(userToSend);
        let newListSession = sessionsList.concat(session);


        fs.writeFile("./src/database/User.json", `${JSON.stringify(userList)}`, () => {
            console.log("User Cadastrado!");
        });

        fs.writeFile("./src/database/Session.json", `${JSON.stringify(newListSession)}`, () => {
            console.log("Sessão cadastrada!");
        });



    } catch (err) {
        console.log('DEU ERRO === Signup User');
        console.log(err);
        return err
    }

    return { session }
}

module.exports = { signupUSERservice };