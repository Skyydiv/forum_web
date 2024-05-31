import axios from "axios";
import {useEffect,useState} from "react";

function Topic({topic_id, changePage, userLogged}){
    const [topic, setTopic] = useState();
    const [del,setDel] = useState(false);

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
                {(userLogged.privilege === "admin" || userLogged.username === topic.author) && !del && (
                        <button onClick={() => setDel(true)}>delete topic </button>)
                }

                {del && (
                        <> 
                            <div role="group" aria-labelledby="sharedL">
                                <label id="sharedL">Are you sure</label>
                                <button onClick={() => DeleteTopic(topic)}>yes</button>
                                <button onClick={() => setDel(false)}>no</button>
                            </div>
                        </>
                    )}

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