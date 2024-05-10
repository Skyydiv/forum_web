import {useEffect, useState} from "react"
import axios from "axios"
import Message from "./Message";

function MessagesList ({criteria, changePage}){
    
    const [error, setError] = useState({
        value: false,
        message: ""
    });

    const [messagesList, setMessagesList] = useState([]);
    axios.defaults.baseURL = "http://localhost:8000";

    useEffect(() => {
        const postToServer = async () => {
            try {
                const res = await axios.post("/MessagesList", criteria);
                setMessagesList(res.data);
            } catch (err) {
                setError({
                    value: true,
                    message: "Erreur lors de la requête."
                });
                console.error(err.message);
            }
        };

        postToServer();
    }, [criteria]);

    return (
        //<li key ={message.id}>{message.content}</li>
        <div>
            <p>Liste des messages:</p>
            {messagesList.map(message => (
                <div>
                    <Message infos={message} changePage={changePage}/>
                    <hr/>
                </div>
            ))}
            
        </div>
    );
}

export default MessagesList;