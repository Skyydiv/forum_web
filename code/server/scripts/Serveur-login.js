const express = require("express");
const cors = require("cors");
 
const {MongoClient, Collection} = require("mongodb");
const { Console } = require("console");
const ObjectId = require('mongodb').ObjectId; 

const app = express();
const port = 8000;

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

app.use(cors());
app.use(express.json());



app.post("/login",async(req,res)=>{
    try{
        const client = new MongoClient(uri);
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
        if(dataUser.privilege === "awaiting"){
            throw new Error("Your inscription is still not confirmed yet !");
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

app.post("/Register", async(req,res)=>{
    try{
        const client = new MongoClient(uri);
        await client.connect();

        const usersBDD = client.db("ForumBDD").collection("users");
        console.log(req.body.username)
        const sameUsername = await usersBDD.find({username:req.body.username}).toArray();

        if(sameUsername.length > 0){
          throw new Error("Nom d'utilisateur déjà utilisé");
          
        }
        else{
          const bddRes = await usersBDD.insertOne(req.body);
        }
        

        // if(bddRes.insertedCount !=1){
        //     throw new Error("Insertion failled ");
        // }

        res.json({"message":"ok","result":"ok"});
        res.end();
    }

    catch(err){
        res.status(500);
        res.send("error ${err.message}");
    }

    finally{
        await client.close();
    }
})


app.post("/Forum", async(req,res) => {
    
    try{
        const client = new MongoClient(uri);
        await client.connect();
        const topics = client.db("ForumBDD").collection("Topics");

        //afficher que les topics qui sont accessible au privilege de l'user
        let filter = {};
        if (req.body.privilege === "admin") {
            // Si req = "admin", ne pas appliquer de filtre
            // Renvoyer tous les sujets
            console.log("je suis admin");
        } else {
            // Si req != "admin", filtrer pour les sujets où privilege = "user"
            filter = { privilege: "user" };
        }
        const projection = { "subject": 1, "author":1, "date":1, "privilege":1 ,"_id": 1 };
        const data = await topics.find(filter).project(projection).toArray();

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
        await client2.connect();
        const topics = client2.db("ForumBDD").collection("Topics");

        console.log(req.body,req.body.id);
        const id = ObjectId.createFromHexString(req.body.id);
        const projection = {"_id": 0};
        const data = await topics.find({"_id": id}).project(projection).next(); 
        console.log("data",data);
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
    const client = new MongoClient(uri);
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

app.post("/CreateMessage", async(req,res) =>{
  try{
    // console.log("recive");
    const client = new MongoClient(uri);
    await client.connect();
    const topics = client.db("ForumBDD").collection("Messages");
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
      console.log("la requête se fait sur : ", req.body);
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
  // app.post("/Message", async(req, res) => {
  //   console.log("j'ai reçu une requete sur /Message");
  //   try{
  //     // Connexion à la base de données
  //     await client.connect();
  //     console.log("connected to database\n body: ",req.body);
  
  //     // Opérations sur la collection "messages"
  //     const messages = client.db("ForumBDD").collection("Messages");
      
  //     const dataMessage = await messages.find(req.body).next();
  //     console.log("data message:", dataMessage);
  
  //     // Envoi de la réponse contenant les données de l'utilisateur
  //     res.json(dataMessage);
  //   }
  //   catch(err){
  //     console.log(err.message);
  //     res.status(400);
  //     res.send(err.message)
  //   }
  //   finally{
  //     await client.close();
  //   }
  // });
  
  
  //Ajouter un user sur la liste d'attente des demandes d'admin
  app.post("/AdminRequest", async(req, res) => {
    console.log("j'ai reçu une requete sur /AdminRequest");
    const client2 = new MongoClient(uri);

    try{
      // Connexion à la base de données
      await client2.connect();
      console.log("connected to database");
      console.log("le req : ", req.body.username);
  
      // Vérifier que l'user n'est pas dans inscrit dans la liste de demande d'admin
      const listUsers = client2.db("ForumBDD").collection("users");
      console.log("here")
      const dataUsers = await listUsers.updateOne({username: req.body.username}, {$set: {adminRequest: "true"}});
      res.send("ok");

    }
    catch(err){
      console.log(err.message);
      res.status(400);
      res.send(err.message)
    }
    finally{
      await client2.close();
    }
  });

  app.post("/User", async(req, res) => {
    console.log("j'ai reçu une requete sur /User");
    try{
      // Connexion à la base de données
      const client = new MongoClient(uri);
      await client.connect();
      console.log("Voila le contenu de ma demande user", req.body);
      
      // Opérations sur la collection "users"
      const projection = {"username":1, "privilege":1, "adminRequest":1};
      const users = client.db("ForumBDD").collection("users");
      const dataUser = await users.find({"username":req.body.username}).project(projection).next();
      console.log("dans /User : data user:", dataUser);
  
      // Envoi de la réponse contenant les données de l'utilisateur
      res.json(dataUser);
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

  app.get("/getAdminRequests", async(req, res) => {
    console.log("j'ai reçu une requete sur /getAdminRequests");
    try{
      // Connexion à la base de données
      const client = new MongoClient(uri);
      await client.connect();
      
      // Opérations sur la collection "users"
      const requests = client.db("ForumBDD").collection("users");
      const dataRequests = await requests.find({adminRequest:"true"}).toArray();
      console.log(dataRequests);
  
      // Envoi de la réponse contenant les données de l'utilisateur
      res.json(dataRequests);
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

  app.get("/getNewRegistrations", async(req, res) => {
    console.log("j'ai reçu une requete sur /getNewRegistrations");
    try{
      // Connexion à la base de données
      const client = new MongoClient(uri);
      await client.connect();
      
      // Opérations sur la collection "users"
      const requests = client.db("ForumBDD").collection("users");
      const dataRequests = await requests.find({privilege:"awaiting"}).toArray();
      console.log(dataRequests);
  
      // Envoi de la réponse contenant les données de l'utilisateur
      res.json(dataRequests);
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

  // modifier ou non le privilege comme admin 
  app.post("/SetAdmin", async(req, res) => {
    console.log("j'ai reçu une requete sur /SetAdmin");
    const client2 = new MongoClient(uri);
    console.log(req.body)
      try{
        // Connexion à la base de données
        await client2.connect();
        console.log("connected to database");
        console.log("le req : ", req.body.st);
        
        const listUsers = client2.db("ForumBDD").collection("users");
        
        // Si state = true alors l'user devient admin
        if (req.body.st==true){
          const dataUsers = await listUsers.updateOne({username: req.body.us.username}, {$set: {privilege: "admin"}});
          console.log("user ajouté aux admins")
        }
        else{
          console.log("utilisateur refusé")
        }
        const dataUsers = await listUsers.updateOne({username: req.body.us.username}, {$set: {adminRequest: "false"}});
        res.send(`user ajouté aux admins:${req.body.st}`);
      }
      catch(err){
        console.log(err.message);
        res.status(400);
        res.send(err.message)
      }
      finally{
        await client2.close();
      } 
    });
   
  // modifier ou non le privilege comme user
  app.post("/SetMember", async(req, res) => {
    console.log("j'ai reçu une requete sur /SetMember");
    const client2 = new MongoClient(uri);
    console.log(req.body)
      try{
        // Connexion à la base de données
        await client2.connect();
        console.log("connected to database");
        console.log("le req : ", req.body.st);
        
        const listUsers = client2.db("ForumBDD").collection("users");
        
        // Si state = true alors l'awaiting devient user
        if (req.body.st==true){
          const dataUsers = await listUsers.updateOne({username: req.body.us.username}, {$set: {privilege: "user"}});
          console.log("inscription validée")
        }
        else{
          console.log("inscription refusée")
          const dataUsers = await listUsers.deleteOne({username: req.body.us.username});
        }
        res.send(`inscription validée:${req.body.st}`);
      }
      catch(err){
        console.log(err.message);
        res.status(400);
        res.send(err.message)
      }
      finally{
        await client2.close();
      } 
    });

  //Supprimer un compte
  app.post("/DeleteAccount", async(req, res) => {
    console.log("j'ai reçu une requete sur /DeleteAccount");
    const client2 = new MongoClient(uri);

    try{
      // Connexion à la base de données
      await client2.connect();
      console.log("connected to database");
      console.log("le req : ", req.body.username);

      const listUsers = client2.db("ForumBDD").collection("users");
      const dataUsers = await listUsers.deleteOne({username: req.body.username});
      console.log("utilisateur supprimé")
      res.send(`Account Deleted`);
    }
    catch(err){
      console.log(err.message);
      res.status(400);
      res.send(err.message)
    }
    finally{
      await client2.close();
    }
  });

   // remove admin privilege
   app.post("/RemoveAdmin", async(req, res) => {
    console.log("j'ai reçu une requete sur /RemoveAdmin");
    const client2 = new MongoClient(uri);
    console.log(req.body)
      try{
        // Connexion à la base de données
        await client2.connect();
        console.log("connected to database");
        console.log("le req : ", req.body);
        
        const listUsers = client2.db("ForumBDD").collection("users");
        const dataUsers = await listUsers.updateOne({username: req.body.username}, {$set: {privilege: "user"}});
        console.log("the user is no longer an admin")
        res.send(`admin privilege removed`);
      }
      catch(err){
        console.log(err.message);
        res.status(400);
        res.send(err.message)
      }
      finally{
        await client2.close();
      } 
    });

    //Supprimer un message
    app.post("/DeleteMessage", async(req, res) => {
    console.log("j'ai reçu une requete sur /DeleteMessage");
    const client2 = new MongoClient(uri);

    try{
      // Connexion à la base de données
      await client2.connect();
      console.log("connected to database");
      console.log("le req : ", req.body.content);

      const listUsers = client2.db("ForumBDD").collection("Messages");
      const dataUsers = await listUsers.deleteOne({content:req.body.content});
      console.log("Message supprimé")
      res.send(`Message supprimé`);
    }
    catch(err){
      console.log(err.message);
      res.status(400);
      res.send(err.message)
    }
    finally{
      await client2.close();
    }
  });

  //Supprimer un topic
  app.post("/DeleteTopic", async(req, res) => {
    console.log("j'ai reçu une requete sur /DeleteTopic");
    const client2 = new MongoClient(uri);

    try{
      // Connexion à la base de données
      await client2.connect();
      console.log("connected to database");
      console.log("le req : ", req.body.text);

      const listUsers = client2.db("ForumBDD").collection("Topics");
      const dataUsers = await listUsers.deleteOne({text:req.body.text});
      console.log("Topic supprimé")
      res.send(`Topic supprimé`);
    }
    catch(err){
      console.log(err.message);
      res.status(400);
      res.send(err.message)
    }
    finally{
      await client2.close();
    }
  });

app.listen(port, () => {console.log(`launching the serveur on port ${port}`)})