const express = require("express");
const cors = require("cors");
const {MongoClient} = require("mongodb")

const app = express();
const port = 8000;

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);


app.use(cors());
app.use(express.json());



app.post("/login",async(req,res)=>{
    try{
        await client.connect();
        console.log("connected to database");

        const users = client.db("ForumBDD").collection("users");
        const dataUser = await users.find({"username":req.body.username}).next();
        
        console.log("data user:",dataUser);
        if(dataUser == null){
            throw new Error("Unknown user");
        }

        if(dataUser.password != req.body.password){
            throw new Error("Invalid password");
        }

        res.status(200);
        res.json({"value":true,"message":"succes"});
        res.end();
    }

    catch(e){
        console.log(e.message);
        res.status(400);
        res.send(e.message);
    }

    finally{
        await client.close();
    }
})


app.listen(port, () => {console.log(`launching the serveur on port ${port}`)})