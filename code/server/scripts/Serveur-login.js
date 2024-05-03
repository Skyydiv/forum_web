const express = require("express");
const cors = require("cors");
 
const {MongoClient, Collection} = require("mongodb")
const ObjectId = require('mongodb').ObjectId; 

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
        res.json({"value":true,"user":dataUser});
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

app.post("/signUp", async(req,res)=>{
    try{
        await client.connect();

        const usersBDD = client.db("ForumBDD").collection("users");
        const bddRes = await usersBDD.insertOne(req.body);

        // if(bddRes.insertedCount !=1){
        //     throw new Error("Insertion failled ");
        // }

        res.json({"message":"ok","result":"ok"});
        res.end();
    }

    catch(err){
        res.status(500);
        res.send("error {err.message}");
    }

    finally{
        await client.close();
    }
})


app.get("/Forum", async(req,res) => {
    
    try{
        await client.connect();
        const topics = client.db("ForumBDD").collection("Topics");

        const projection = { "subject": 1, "_id": 1 };
        const data = await topics.find().project(projection).toArray();

        console.log(data);
        res.json(data);
    }
    catch(e){
        console.error(e);
        res.status(500);
        res.send("Error");
    }
    finally{
        await client.close();
    }
})

app.post("/Topic", async(req,res) => {
  const client2 = new MongoClient(uri); //need of 2 different client for Topic and MessagesList in order to do request in the same time
    try{
        console.log("debut")
        await client2.connect();
        const topics = client2.db("ForumBDD").collection("Topics");

        console.log(req.body,req.body.id);
        const id = new ObjectId(req.body.id);
        const projection = {"_id": 0};
        const data = await topics.find({"_id": id}).project(projection).next(); 
        console.log("data",data);
        console.log("fin");
        res.json(data);
    }
    catch(e){
        console.error(e);
        res.status(500);
        res.send("Error");
    }
    finally{
        await client2.close();
    }
})

//

app.post("/CreateTopic", async(req,res) =>{
  try{
    // console.log("recive");
    await client.connect();
    const topics = client.db("ForumBDD").collection("Topics");
    await topics.insertOne(req.body);

    res.send("ok");
  }

  catch(err){
    console.error(err);
    res.status(500).send();
  }

  finally{
    await client.close();
  }
  
})



//
app.post("/MessagesList", async(req, res) => {
    console.log("j'ai reçu une requete sur /MessagesList");
    const client1 = new MongoClient(uri);
    try{
      // Connexion à la base de données
      await client1.connect();
      console.log("connected to database");
  
      // Opérations sur la collection "messages"
      const messages = client1.db("ForumBDD").collection("Messages");
      const messagesList = await messages.find(req.body).toArray();
      console.log("messages list:", messagesList);
  
      // Envoi de la réponse contenant les données de l'utilisateur
      res.json(messagesList);
    }
    catch(err){
      console.log(err.message);
      res.status(400);
      res.send(err.message)
    }
    finally{
      await client1.close();
    }
  });

//Récupérer les informations d'un message sur la bdd et les transmettre
  app.post("/Message", async(req, res) => {
    console.log("j'ai reçu une requete sur /Message");
    try{
      // Connexion à la base de données
      await client.connect();
      console.log("connected to database\n body: ",req.body);
  
      // Opérations sur la collection "messages"
      const messages = client.db("ForumBDD").collection("Messages");
      
      const dataMessage = await messages.find(req.body).next();
      console.log("data message:", dataMessage);
  
      // Envoi de la réponse contenant les données de l'utilisateur
      res.json(dataMessage);
    }
    catch(err){
      console.log(err.message);
      res.status(400);
      res.send(err.message)
    }
    finally{
      await client.close();
    }
  });


 

app.listen(port, () => {console.log(`launching the serveur on port ${port}`)})