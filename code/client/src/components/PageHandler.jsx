import {useState} from "react";
import Register from "./Register";
import Login from "./Login";
import Forum from "./Forum"
import Topic from "./Topic"
import NavBarre from "./NavBarre";
import Profile02 from "./Profile02";
import MessagesList from "./MessagesList";
import CreateTopic from "./CreateTopic";

function PageHandler(){
    const [curr, setCurr] = useState({
        "num":0,
        "user":{},
        "topic":{}
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
            return(
                <div>
                    <NavBarre curr={curr} changePage={setCurr}/>
                    <Topic id={curr.topic}/>
                    
                    <MessagesList objMethod={{"id_topic":curr.topic.id}}/>
                </div>
            )
        
        // profile
        case 4:
            return(
                <div>
                    <NavBarre curr={curr} changePage={setCurr}/>
                    <Profile02 user={curr.user}/>
                    <MessagesList objMethod={{"id_author":curr.topic.id}}/>
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

        default:
            // return <Message id_message="66347748dd933a57a0fa8306"/>
           return <Login changePage={setCurr}/>
            
    };
}

export default PageHandler;