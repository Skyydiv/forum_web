import {useState} from "react";
import Register from "./Register";
import Login from "./Login";
import Forum from "./Forum"
import Topic from "./Topic"
import NavBarre from "./NavBarre";

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
                    <h2>Composant liste message</h2>
                </div>
            )

        default:
           return <Login changePage={setCurr}/>
    };
}

export default PageHandler;