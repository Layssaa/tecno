const fs = require('fs');

fs.open('../../data/users.json', "r", (err, data) => {
});

function readTheFile(_filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(`${_filePath}`, 'utf-8', (err, data) => {
            if (err) throw err
            resolve(JSON.parse(data || "[]"));
            reject(err);
        })
    }).catch(err => {
        console.log(err.msg)
    });
};

module.exports = readTheFile;