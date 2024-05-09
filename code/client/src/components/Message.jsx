import {useEffect, useState} from "react"
import axios from "axios"

function Message (infos){
    
    const [error, setError] = useState({
        value: false,
        message: ""
    });

    const [messageData, setMessageData] = useState({});

    useEffect(() => {
        setMessageData(infos.infos);
        // console.log("je suis dans message, voila les infos", infos);
        // console.log(infos.infos.content);
    }, [infos]);

    

    let bool = true;

    axios.defaults.baseURL = "http://localhost:8000";


    return(
        <div>
            {/* <p>oui</p> */}
            {messageData.content ? (
                <div>
                    <h1>Message </h1>
                    <p>author : {messageData.author}</p> 
                    <p>date : {messageData.date}</p>
                    <p> {messageData.content}</p>
                </div>
            ) : (
                <p>Chargement des données...</p>
            )}
            {error.value && typeof error.message === 'string' && <p>{error.message}</p>}
        </div>
    )
}

export default Message;