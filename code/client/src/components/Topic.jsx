import axios from "axios";
import {useEffect,useState} from "react";

function Topic(props){
    const [topic, setTopic] = useState();


    let url = "http://localhost:8000"

    let retrieveTopic = () =>{
        axios.post(`${url}/Topic`, props)
        .then( (rep)=> {
            console.log(rep.data);
            setTopic(rep.data);
        })

        .catch((e) => {
            console.error(e);
        })
    }

    useEffect( () => {
        retrieveTopic();
    },[])

    if(topic){
        return(
            <div>
                <h1>{topic.subject}</h1>
                <p>{topic.text}</p>
            </div>
        )
    }
    else{
        return(
            <p>fetching data</p> 
        )
    }
}
export default Topic;