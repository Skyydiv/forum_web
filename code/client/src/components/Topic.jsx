import axios from "axios";
import {useEffect,useState} from "react";
import "../styles/Topic.css"

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
            
            <div className="topic-container">
                <div className="topic-header">
                    <h1>{topic.subject}</h1>
                    {(userLogged.privilege === "admin" || userLogged.username === topic.author) && !del && (
                        <button onClick={() => setDel(true)}>Delete Topic</button>
                    )}
                </div>

                {del && (
                        <> 
                            <div className="delete-confirmation" role="group" aria-labelledby="sharedL">
                                <label id="sharedL">Are you sure</label>
                                <button onClick={() => DeleteTopic(topic)}>yes</button>
                                <button onClick={() => setDel(false)}>no</button>
                            </div>
                        </>
                    )}

                <div className="topic-content">
                    <p>{topic.text}</p>
                    <p>Written by: {topic.author} on {topic.date}</p>
                    <p>Visible to: {topic.privilege}</p>
                </div>
                
                <input className="new-message-button" type="button" value="New Message" onClick={() => (
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