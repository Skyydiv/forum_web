import {useEffect, useState} from "react"
import axios from "axios"

function Message ({infos}){
    //props = identifiant du message
    
    const [error, setError] = useState({
        value: false,
        message: ""
    });

    const [messageData, setMessageData] = useState(infos);

    let bool = true;

    axios.defaults.baseURL = "http://localhost:8000";


    return(
        <div>
            {/* <p>oui</p> */}
            {messageData.content ? (
                <div>
                    <h1>Message : </h1>
                    <p>Id author: {messageData.id_author}</p> 
                    <p>Id topic : {messageData.id_topic}</p>
                    <p> {messageData.content}</p>
                </div>
            ) : (
                <p>Chargement des données...</p>
            )}
            {error.value && <p>{error.message}</p>}
        </div>
    )
}

export default Message;