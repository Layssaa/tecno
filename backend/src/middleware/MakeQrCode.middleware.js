const typeNumber = 0;
const errorCorrectionLevel = 'L';
const qrcode = require("qrcode-generator");
const qr = qrcode(typeNumber, errorCorrectionLevel);

const MakeQrCode =  async(_hash, _eventId) => {
    console.log("========== MADE QR CODE==========");
    console.log(_hash, _eventId);
    const URL = `http://localhost:4000/user/validate?code=${_hash}&event=${_eventId}`;

    await qr.addData(`${URL}`)
    await qr.make()
    return await qr.createImgTag()
}

module.exports = { MakeQrCode };