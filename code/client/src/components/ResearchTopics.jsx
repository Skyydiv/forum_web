import {useEffect, useState} from "react"
import axios from "axios"

function ResearchTopics ({content, changePage, userLogged}){
    
    const [error, setError] = useState({
        value: false,
        message: ""
    });

    const [TopicList, setTopicList] = useState([]);
    axios.defaults.baseURL = "http://localhost:8000";

    useEffect(() => {
        const postToServer = async () => {
            try {
                console.log("je suis la")
                console.log(content.content)
                const res = await axios.post("/getTopics", content.content);
                setTopicList(res.data);
                console.log(TopicList)
            } catch (err) {
                setError({
                    value: true,
                    message: "Erreur lors de la requête."
                });
                console.error(err.message);
            }
        };

        postToServer();
    }, [content]);

    const handleChange = (topic) => {
        //afficher le topic dans lelquel le message est
        changePage(prev => ({
            ...prev,
            "num": 3,
            "topic": {"id":topic._id}
        }))
        }
    
    return (
        <div>
        <p>Liste des topics correspondant à votre recherche:</p>
        {TopicList.map(topic => (
             <button onClick={() => handleChange(topic)}>{topic.subject}</button>
            
        ))}
        
    </div>
    );
}

export default ResearchTopics