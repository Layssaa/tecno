const { ValidateTicketService } = require("../services/ValidateTicket");

const ValidateTicket = async (req, res) => {
    console.log("REQ WITH QRCODE");
    console.log(req.query);

    try {
       const validate = await ValidateTicketService(req.query.code, req.query.event_id);
       res.send(`${validate}`);
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
}

module.exports = { ValidateTicket };