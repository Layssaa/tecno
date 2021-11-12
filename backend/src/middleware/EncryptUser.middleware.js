const bcrypt = require('bcrypt');

const EncryptUserDataBcrypt = async (_token, _email) => {
    const saltRounds = 10;
    const token = _token + _email;

    const { hash, salt } = await MadeHashPassword(token, saltRounds)

    return { hash, salt }

}

const MadeHashPassword = async (_token, _saltRounds) => {
    
    try {
    
        const salt = await bcrypt.genSalt(_saltRounds);
        const hash = await bcrypt.hash(_token, salt);

        return { hash, salt }

    } catch (err) {
        return console.log(err);
    }
};

const AuthenticUserBcrypt = async (_token, _email, hash) => {
    const token = _token + _email;
    return await bcrypt.compare(token, hash);

};

module.exports = {
    EncryptUserDataBcrypt,
    AuthenticUserBcrypt
}