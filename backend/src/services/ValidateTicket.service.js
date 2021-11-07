const { element } = require("prop-types");
const readTheFile = require("./readFile.service");

const ValidateTicketService = async (hash, eventId) => {

    try {
        const eventsList = await readTheFile("./src/database/Events.json");
        const userList = await readTheFile("./src/database/User.json");

        const findEvent = eventsList.find(element => element.id == eventId);
        const findUser = userList.find(element => element.hash === hash);

        if (!findEvent) {
            throw new Error("Can't found event.");
        }

        if (!findUser) {
            throw new Error("Can't found user.");
        }

        const findTicket = await readTheFile("./src/database/UserEvents.json");
        const verifyTicket = await findTicket.find(element =>{
            console.log("===================================================");
            console.log(element.hash,hash, element.event.id, eventId);
            console.log("===================================================");

            return element.hash === hash && element.event.id == eventId});

        if(!verifyTicket){
            throw new Error("Can't found ticket.")
        }

        return true
    } catch (error) {
        console.log(error);
        false
    }
}

module.exports = { ValidateTicketService };

// ===================================================
// $2b$10$YXGQ/D4rZV4PGzUms46t8eJzLudPD9wdGhscIrKhMA5ld1ArcA2YO $2b$10$YXGQ/D4rZV4PGzUms46t8eJzLudPD9wdGhscIrKhMA5ld1ArcA2YO 2 2
// ===================================================
// ===================================================
// $2b$10$YXGQ/D4rZV4PGzUms46t8eJzLudPD9wdGhscIrKhMA5ld1ArcA2YO $2b$10$YXGQ/D4rZV4PGzUms46t8eJzLudPD9wdGhscIrKhMA5ld1ArcA2YO 2 2
// ===================================================