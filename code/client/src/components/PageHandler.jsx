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

function PageHandler(){
    const [curr, setCurr] = useState({
        "num":0,
        "user":{},
        "topic":{},
        "user_visit":{}
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
                    <Topic topic_id={curr.topic} changePage={setCurr}/>
                    <MessagesList criteria={{"id_topic":curr.topic.id}}/>
                    
                </div>
            )
        
        // profile
        case 4:
            return(
                <div>
                    
                    <NavBarre curr={curr} changePage={setCurr}/>
                    <Profile02 user={curr.user} changePage={setCurr} curr={curr}/>
                    <MessagesList criteria={{"author":curr.user.username}}/>
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
            case 7:
                return (
                    <div>
                    <NavBarre curr={curr} changePage={setCurr}/>
                    <ShowProfile user={curr.user_visit} curr={curr}/>
                </div> 
                )

        default:
            // return <Message id_message="66347748dd933a57a0fa8306"/>
           return <Login changePage={setCurr}/>
            
    };
}

export default PageHandler;