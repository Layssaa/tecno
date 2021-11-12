const { ValidateTicketService } = require("../services/ValidateTicket.service");

const ValidateTicket = async (req, res) => {

    try {
       const validate = await ValidateTicketService(req.query.code, req.query.event_id);
       res.send(`${validate}`);
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = { ValidateTicket };