const typeNumber = 0;
const errorCorrectionLevel = 'L';
const qrcode = require("qrcode-generator");
const qr = qrcode(typeNumber, errorCorrectionLevel);

const MakeQrCode =  async(_hash, _eventId) => {
    const URL = `http://localhost:4000/admin/validate?code=${_hash}&event_id=${_eventId}`;

    await qr.addData(`${URL}`)
    await qr.make()
    return await qr.createDataURL()
}

module.exports = { MakeQrCode };