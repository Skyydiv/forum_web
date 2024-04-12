const express = require("express");
const cors = require("cors");
const {MongoClient} = require("mongodb")

const app = express();
const port = 8000;

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);


app.use(cors());
app.use(express.json());

app.post("/login1",(req,res)=>{
    console.log("login request", req.body);

    res.json({message:"your infos", ...req.body});
    res.end();
})

app.get("/data1", (req,res)=>{
    res.json({okkk:"ouii"});
    res.end();
})

app.get("/data", async (req,res) => {
    try{
        await client.connect();
        console.log("connected");

        const db = client.db("ForumBDD");
        const users = db.collection("users");

        const data = await users.find({"name":"Pablo"}).next();
        console.log("datas:\n",data);
        
        res.json(data);
    }

    catch(e){
        console.err("Error when fetching data");
    }

    finally{
        await client.close();
        console.log("serveur closed");
    }

})

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
        res.send("connected");
    }

    catch(e){
        console.log(e.message);
        res.status(500);
        res.send(e.message);
    }

    finally{
        await client.close();
    }
})


app.listen(port, () => {console.log(`launching the serveur on port ${port}`)})