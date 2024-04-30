import {useState} from "react";
import Register from "./Register";
import Login from "./Login";
import Forum from "./Forum"
import Topic from "./Topic"

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
            return <Forum changePage={setCurr}/>
        
        case 3:
            return(
                <div>
                    <Topic id={curr.topic}/>
                    <Topic id={curr.topic}/>
                </div>
            )

        default:
           return <Login changePage={setCurr}/>
    };
}

export default PageHandler;