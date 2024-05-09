import axios from "axios";
import {useEffect,useState} from "react";

function Topic({topic_id, changePage}){
    const [topic, setTopic] = useState();


    let url = "http://localhost:8000"

    let retrieveTopic = () =>{
        axios.post(`${url}/Topic`, topic_id)
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
                <h1>{topic.subject} </h1>
                <p>{topic.text}</p>
                <p>écrit par : {topic.author} à {topic.date}</p>
                <p> Visible par : {topic.privilege}</p>
                
                <input type="button" value="New Message" onClick={() => (
                changePage(prev =>(
                    {...prev,"num":6}
                ))
            )}/>
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