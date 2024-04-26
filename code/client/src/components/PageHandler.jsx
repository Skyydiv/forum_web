import {useState} from "react";
import Register from "./Register";
import Login from "./Login";

function PageHandler(){
    const [curr, setCurr] = useState({
        "num":0,
        "infos":{}
    });

    console.log("num",curr.num);
    switch(curr.num){
        case 1:
            return <Register changePage={setCurr}/>
        
        default:
           return <Login changePage={setCurr}/>
    };
}

export default PageHandler;