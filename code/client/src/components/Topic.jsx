import axios from "axios";
import {useEffect,useState} from "react";

function Topic({topic_id, changePage, userLogged}){
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

    let DeleteTopic = async (Topic) => {
        try {
            console.log(Topic);
            const res = await axios.post("/DeleteTopic", Topic);
            changePage(prev => ({...prev, "num":2 }));
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect( () => {
        retrieveTopic();
    },[])
    
    if(topic){
        return(
            
            <div>
                {(userLogged.privilege === "admin" || userLogged.username === topic.author) && (
                        <button onClick={() => DeleteTopic(topic)}>delete topic </button>)
                }

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