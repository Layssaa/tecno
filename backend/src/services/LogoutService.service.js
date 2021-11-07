const { element } = require("prop-types");
const readTheFile = require("../services/readFile.service");
const fs = require('fs');

const doLogoutService = async (cookies) => {

    try {
        let sessions = await readTheFile("../backend/src/database/Session.json");
        sessions = await sessions.filter(element => element.hash !== cookies.user);

        fs.writeFile("./src/database/Session.json", `${JSON.stringify(sessions)}`, () => {
            console.log("Sessão removida!");
        });

        return sessions
    }
    catch (error) {
        console.log(error);
        return res.status(403).json({ "msg": "Error in logout" })
    }
};



module.exports = { doLogoutService };