const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000;

const data = {
    "name":"Louis",
    "password":1234,
}

app.use(cors());
app.use(express.json());


app.get("/data", (req,res) => {
    console.log("serveur is sending data");
    res.json(data);
    res.end();
})


app.listen(port, () => {console.log(`launching the serveur on port ${port}`)})