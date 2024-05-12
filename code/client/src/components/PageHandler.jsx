import {useState} from "react";
import Register from "./Register";
import Login from "./Login";
import Forum from "./Forum"
import Topic from "./Topic"
import NavBarre from "./NavBarre";
import Profile02 from "./Profile02";
import MessagesList from "./MessagesList";
import CreateTopic from "./CreateTopic";
import CreateMessage from "./CreateMessage";
import GetAdminRequests from "./GetAdminRequests";
import ShowProfile from "./ShowProfile";
import ManageUsers from "./ManageUsers";

function PageHandler(){
    const [curr, setCurr] = useState({
        "num":0,
        "user":{},
        "topic":{},
        "user_visit":""
    });



    console.log("num",curr.num);
    switch(curr.num){
        // register
        case 1:
            return <Register changePage={setCurr}/>

        // forum
        case 2:
            return (
                <div>
                    <NavBarre curr={curr} changePage={setCurr}/>
                    <Forum curr={curr} changePage={setCurr}/>
                </div>
            )
        
        // topic
        case 3:
            console.log("dans pageHandler topic :", curr.topic.id);
            
            return(
                <div>
                    <NavBarre curr={curr} changePage={setCurr}/>
                    <Topic topic_id={curr.topic} changePage={setCurr} userLogged={curr.user}/>
                    <MessagesList changePage={setCurr} criteria={{"id_topic":curr.topic.id}} userLogged={curr.user}/>
                    
                </div>
            )
        
        // profile
        case 4:
            return(
                <div>
                    
                    <NavBarre curr={curr} changePage={setCurr}/>
                    <Profile02 user={curr.user} changePage={setCurr} curr={curr}/>
                    <MessagesList changePage={setCurr} criteria={{"author":curr.user.username}} userLogged={curr.user}/>
                </div>
            )
        
        //create Topic
        case 5:
            return(
                <div>
                    <NavBarre curr={curr} changePage={setCurr}/>
                    <CreateTopic user={curr.user} changePage={setCurr}/>
                </div>
            )

        //create Message
        case 6:
            return (
                <div>
                <NavBarre curr={curr} changePage={setCurr}/>
                <CreateMessage user={curr.user} id_topic={curr.topic} changePage={setCurr}/>
            </div> 
            )

        //Affiche le profile d'user différent de l'user loggé
        case 7:
            return (
                <div>
                <NavBarre curr={curr} changePage={setCurr}/>
                <ShowProfile curr={curr} changePage={setCurr}/>
                <MessagesList changePage={setCurr} criteria={{"author":curr.user_visit}} userLogged={curr.user}/>
            </div> 
            )
        case 8:
            return (
                <div>
                <NavBarre curr={curr} changePage={setCurr}/>
                <ManageUsers changePage={setCurr} curr={curr}/>
            </div> 
            )
        default:
            // return <Message id_message="66347748dd933a57a0fa8306"/>
           return <Login changePage={setCurr}/>
            
    };
}

export default PageHandler;