import {useState} from "react";
import Register from "./Register";
import Login from "./Login";
import Forum from "./Forum"
import Topic from "./Topic"
import NavBarre from "./NavBarre";
import Message from "./Message";
import Profile02 from "./Profile02";
import MessagesList from "./MessagesList";

function PageHandler(){
    const [curr, setCurr] = useState({
        "num":0,
        "user":{},
        "topic":{}
    });



    console.log("num",curr.num);
    switch(curr.num){
        case 1:
            return <Register changePage={setCurr}/>

        case 2:
            return (
                <div>
                    <NavBarre curr={curr} changePage={setCurr}/>
                    <Forum curr={curr} changePage={setCurr}/>
                </div>
            )
        
        case 3:
            return(
                <div>
                    <NavBarre curr={curr} changePage={setCurr}/>
                    <Topic id={curr.topic}/>
                    
                    <MessagesList objMethod={{"id_topic":curr.topic.id}}/>
                </div>
            )
        
        case 4:
            return(
                <div>
                    <NavBarre curr={curr} changePage={setCurr}/>
                    <Profile02 user={curr.user}/>
                    <MessagesList objMethod={{"id_author":curr.topic.id}}/>
                </div>
            )
        

        default:
            // return <Message id_message="66347748dd933a57a0fa8306"/>
           return <Login changePage={setCurr}/>
            
    };
}

export default PageHandler;