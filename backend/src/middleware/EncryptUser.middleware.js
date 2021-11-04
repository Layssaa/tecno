const bcrypt = require('bcrypt');

const EncryptUserDataBcrypt = async (_token, _email) => {
    console.log("======================== ENCRYPT PHASE ===========================");
    const saltRounds = 10;
    const token = _token + _email;
    console.log(token);

    const { hash, salt } = await MadeHashPassword(token, saltRounds)
    console.log("======================== THE END ENCRYPT  ===========================");

    return { hash, salt }

}

const MadeHashPassword = async (_token, _saltRounds) => {
    
    console.log("---------- RUN MADE HASH --------")
    try {
    
        const salt = await bcrypt.genSalt(_saltRounds);
        const hash = await bcrypt.hash(_token, salt);

        console.log("----------------RESPONSE -------------");
        console.log(salt, hash);

        return { hash, salt }

    } catch (err) {
        return console.log(err);
    }
};

const AuthenticUserBcrypt = async (_token, _email, hash) => {
    console.log("---------- BCRYPT COMPARE --------");
    const token = _token + _email;
    console.log(token, hash);
    return await bcrypt.compare(token, hash);

};

module.exports = {
    EncryptUserDataBcrypt,
    AuthenticUserBcrypt
}