import {useEffect, useState} from "react"
import axios from "axios"
import "../styles/Message.css"

function Message ({infos, changePage}){
    
    const [error, setError] = useState({
        value: false,
        message: ""
    });

    const [messageData, setMessageData] = useState({});

    useEffect(() => {
        setMessageData(infos);
        // console.log("je suis dans message, voila les infos", infos);
        // console.log(infos.infos.content);
    }, [infos]);

    

    let bool = true;

    axios.defaults.baseURL = "http://localhost:8000";

    let goUserProfile = (e) => {
        e.preventDefault();
        console.log("go to user selected", infos);
        changePage(prev => ({...prev, "num":7, "user_visit":infos.author}));
        
    }   

    return(
        <div className="Message">
            {/* <p>oui</p> */}
            {messageData.content ? (
                <div>
                    {/* <h1>Message </h1> */}
                    <a href='' onClick={goUserProfile}>author : {messageData.author}</a>
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