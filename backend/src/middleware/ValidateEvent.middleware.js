async function ValidateEvent(values) {
    const date = await values.date.replace(/-/g, '/');
    const time = await values.time.replace(/:/g, 'h') + "m";

    let infoUser = {
        ...values,
        date: date,
        time: time
    }
    return infoUser
}

module.exports = { ValidateEvent };