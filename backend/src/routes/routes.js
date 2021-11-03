const router = require('express').Router();



const typeNumber = 4;
const errorCorrectionLevel = 'L';
const qrcode = require("qrcode-generator");
const qr = qrcode(typeNumber, errorCorrectionLevel);

// --------- QR TESTE -------------
router.get("/qrcode", async (req, res) => {
    await qr.addData("TesteQrCode")
    await qr.make()
    res.send(await qr.createImgTag())
});

module.exports = router;