import {useEffect, useState} from "react"
import axios from "axios"

function ResearchMessages ({content, changePage, userLogged}){
    
    const [error, setError] = useState({
        value: false,
        message: ""
    });

    const [MessagesList, setMessagesList] = useState([]);
    axios.defaults.baseURL = "http://localhost:8000";

    useEffect(() => {
        const postToServer = async () => {
            try {
                console.log("je suis la")
                console.log(content.content)
                const res = await axios.post("/getMessages", content.content);
                setMessagesList(res.data);
                console.log(MessagesList)
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

    const handleChange = (message) => {
        //afficher le topic dans lelquel le message est
        changePage(prev => ({
            ...prev,
            "num": 3,
            "topic": {"id":message.id_topic}
        }))
        }
    
    return (
        <div>
        <p>Liste des messages correspondant à votre recherche:</p>
        {MessagesList.map(message => (
             <button onClick={() => handleChange(message)}>{message.content}</button>
            
        ))}
        
    </div>
    );
}

export default ResearchMessages 