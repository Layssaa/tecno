const app = require("./server");
const PORT = 4000;


app.listen(process.env.PORT || PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});