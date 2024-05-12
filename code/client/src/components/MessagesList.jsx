import {useEffect, useState} from "react"
import axios from "axios"
import Message from "./Message";
import DeleteMessage from "./DeleteMessage";

function MessagesList ({criteria, changePage, userLogged}){
    
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

    const handleChange = (message) => {
        console.log("je suis dans handleChange")
        DeleteMessage (message)
        }
    
    return (
        //<li key ={message.id}>{message.content}</li>
        <div>
            <p>Liste des messages:</p>
            {messagesList.map(message => (
                <div>
                    <Message infos={message} changePage={changePage}/>
                    {(userLogged.privilege === "admin" || userLogged.username === message.author) && (
                        <button onClick={() => handleChange(message) }>delete message</button>)}
                    
                </div>
            ))}
            
        </div>
    );
}

export default MessagesList;