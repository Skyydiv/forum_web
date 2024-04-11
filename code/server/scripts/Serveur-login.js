const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000;


app.use(cors());
app.use(express.json());

app.post("/login",(req,res)=>{
    console.log("login request", req.body);

    res.json({message:"your infos", ...req.body});
    res.end();
})


app.listen(port, () => {console.log(`launching the serveur on port ${port}`)})